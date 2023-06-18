#include <FS.h>
#include <LittleFS.h>
#include <Wire.h>
#include <Adafruit_MCP9808.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include <TimeLib.h>

int myTimeZone = 10.00; // change this to your time zone (see in timezone.h)

const int relayPin = D1;
int dayTemperature;
int nightTemperature;
String dayStart("06:00");
String nightStart("23:00");
bool on = false;
bool daylightSavings = false;
long triggerTimeout = 5000;
std::unique_ptr<ESP8266WebServer> webServer;
WiFiClient espClient;
Adafruit_MCP9808 tempsensor = Adafruit_MCP9808();

void setup()
{
  Serial.begin(115200);

  setup_wifi();

  setup_web_server();

  load_settings();

  setup_relay();

  setup_sensor();

  setup_time();
}

void setup_wifi()
{
  WiFiManager wifiManager;
  wifiManager.autoConnect();
}

void setup_web_server()
{
  webServer.reset(new ESP8266WebServer(80));
  webServer->on("/save", HTTPMethod::HTTP_POST, handleSave);
  webServer->on("/settings", HTTPMethod::HTTP_GET, handleSettingsGet);
  webServer->on("/settings", HTTPMethod::HTTP_OPTIONS, sendCrossOriginHeader);
  webServer->on("/settings", HTTPMethod::HTTP_POST, handleSettingsPost);
  webServer->serveStatic("/", LittleFS, "/", "public"); 
  webServer->begin();
}

void sendCrossOriginHeader()
{
  setCrossOrigin();
  webServer->send(204);
}

void setup_sensor()
{
  Wire.begin(4, 0);
  if (!tempsensor.begin())
  {
    Serial.println("Couldn't find MCP9808!");
    while (1)
      ;
  }
}

void load_settings()
{
  Serial.println("mounting FS...");
  if (LittleFS.begin())
  {
    Serial.println("mounted file system");
    Serial.println("reading config file");
    File configFile = LittleFS.open("/config.json", "r");
    if (configFile)
    {
      Serial.println("opened config file");
      DynamicJsonDocument doc(1024);
      DeserializationError error = deserializeJson(doc, configFile);
      if (error)
      {
        Serial.println("failed to load json config");
      }
      else
      {
        Serial.println("\nparsed json");
        serializeJson(doc, Serial);
        dayTemperature = doc["dayTemperature"];
        nightTemperature = doc["nightTemperature"];
        dayStart = doc["dayStart"].as<String>();
        nightStart = doc["nightStart"].as<String>();
        on = doc["on"];
        daylightSavings = doc["daylightSavings"];
        triggerTimeout = doc["triggerTimeout"];
      }
    }
  }
  else
  {
    Serial.println("failed to mount FS");
  }
}

void save_settings()
{
  Serial.println("saving config");
  DynamicJsonDocument doc(1024);
  doc["dayTemperature"] = dayTemperature;
  doc["dayStart"] = dayStart;
  doc["nightTemperature"] = nightTemperature;
  doc["nightStart"] = nightStart;
  doc["on"] = on;
  doc["daylightSavings"] = daylightSavings;
  doc["triggerTimeout"] = triggerTimeout;

  File configFile = LittleFS.open("/config.json", "w");
  if (!configFile)
  {
    Serial.println("failed to open config file for writing");
  }
  serializeJson(doc, Serial);
  serializeJson(doc, configFile);
  configFile.close();
}

void setup_relay()
{
  pinMode(relayPin, OUTPUT);
}

void setup_time()
{
  configTime(myTimeZone * 3600, daylightSavings ? 0 : 3600, "pool.ntp.org", "time.nist.gov");
}

long lastLoop = 0;
char msg[500];
long triggerTime = 0;
bool isOn = false;

void loop()
{
  webServer->handleClient();

  long now = millis();
  if (now - lastLoop > 2000)
  {
    lastLoop = now;
    int c = (int)tempsensor.readTempC();

    bool shouldBeOn = on && c < getTriggerTemperature();
    if (shouldBeOn != isOn)
    {
      triggerTime = millis();
      isOn = shouldBeOn;
    }

    if (now - triggerTime > triggerTimeout)
    {
      digitalWrite(relayPin, isOn ? HIGH : LOW);
    }
  }
}

char currentTime[6];
char currentTime1[6];
int getTriggerTemperature()
{
  struct tm *timeinfo;
  time_t utc = now();
  time(&utc);
  timeinfo = localtime(&utc);

  sprintf(currentTime, "%02d:%02d", timeinfo->tm_hour, timeinfo->tm_min);
  if (strcmp(currentTime, dayStart.c_str()) > 0 && strcmp(currentTime, nightStart.c_str()) < 0)
  {
    return dayTemperature;
  }
  else
  {
    return nightTemperature;
  }
}

void handleSave()
{
  String dayTemperatureString = webServer->arg("dayTemperature");
  dayStart = webServer->arg("dayStart");
  String nightTemperatureString = webServer->arg("nightTemperature");
  nightStart = webServer->arg("nightStart");
  String triggerTimeoutString = webServer->arg("triggerTimeout");
  dayTemperature = atof(dayTemperatureString.c_str());
  nightTemperature = atof(nightTemperatureString.c_str());
  on = webServer->arg("on") == "on";
  daylightSavings = webServer->arg("daylightSavings") == "on";
  triggerTimeout = atof(triggerTimeoutString.c_str());
  save_settings();
  webServer->sendHeader("Location", "/");
  webServer->send(302, "text/html", "OK");
}

void setCrossOrigin()
{
  webServer->sendHeader("Access-Control-Allow-Origin", "*");
  webServer->sendHeader("Access-Control-Max-Age", "600");
  webServer->sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
  webServer->sendHeader("Access-Control-Allow-Headers", "*");
  webServer->sendHeader("Access-Control-Allow-Private-Network", "true");
};

void handleSettingsGet()
{
  struct tm *timeinfo;
  time_t utc = now();
  time(&utc);
  timeinfo = localtime(&utc);

  setCrossOrigin();
  DynamicJsonDocument doc(1024);
  sprintf(currentTime, "%02d:%02d", timeinfo->tm_hour, timeinfo->tm_min);
  doc["currentTime"] = currentTime,
  doc["currentTemperature"] = (int)tempsensor.readTempC();
  doc["dayTemperature"] = dayTemperature;
  doc["dayStart"] = dayStart;
  doc["nightTemperature"] = nightTemperature;
  doc["nightStart"] = nightStart;
  doc["on"] = on;
  doc["daylightSavings"] = daylightSavings;
  doc["triggerTimeout"] = triggerTimeout;
  String json_str;
  serializeJson(doc, json_str);
  webServer->send(200, "application/json", json_str);
}

void handleSettingsPost()
{
  setCrossOrigin();
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, webServer->arg("plain"));
  if (error)
  {
    webServer->send(422);
    return;
  }

  serializeJson(doc, Serial);
  dayTemperature = doc["dayTemperature"];
  nightTemperature = doc["nightTemperature"];
  dayStart = doc["dayStart"].as<String>();
  nightStart = doc["nightStart"].as<String>();
  on = doc["on"];
  daylightSavings = doc["daylightSavings"];
  triggerTimeout = doc["triggerTimeout"];
  save_settings();
  webServer->send(200);
}
