#include <FS.h>
#include <Wire.h>
#include <Adafruit_MCP9808.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include <TimeLib.h>

const int relayPin = D1;
int dayTemperature;
int nightTemperature;
String dayStart;
String nightStart;
bool on = false;
long triggerTimeout = 5000;
String rootHtml;
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
  webServer->on("/", HTTPMethod::HTTP_GET, handleRoot);
  webServer->on("/save", HTTPMethod::HTTP_POST, handleSave);
  webServer->begin();
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
  if (SPIFFS.begin())
  {
    Serial.println("mounted file system");
    if (SPIFFS.exists("/config.json"))
    {
      //file exists, reading and loading
      Serial.println("reading config file");
      File configFile = SPIFFS.open("/config.json", "r");
      if (configFile)
      {
        Serial.println("opened config file");
        size_t size = configFile.size();
        // Allocate a buffer to store contents of the file.
        std::unique_ptr<char[]> buf(new char[size]);

        configFile.readBytes(buf.get(), size);
        DynamicJsonBuffer jsonBuffer;
        JsonObject &json = jsonBuffer.parseObject(buf.get());
        json.printTo(Serial);
        if (json.success())
        {
          Serial.println("\nparsed json");
          dayTemperature = json.get<int>("dayTemperature");
          nightTemperature = json.get<int>("nightTemperature");
          dayStart = json.get<String>("dayStart");
          nightStart = json.get<String>("nightStart");
          on = json.get<boolean>("on");
          triggerTimeout = json.get<long>("triggerTimeout");
        }
        else
        {
          Serial.println("failed to load json config");
        }
      }
    }

    Serial.println("reading root.html file");
    File rootFile = SPIFFS.open("/root.html", "r");
    rootHtml = rootFile.readString();
    rootFile.close();
  }
  else
  {
    Serial.println("failed to mount FS");
  }
}

void save_settings()
{
  Serial.println("saving config");
  DynamicJsonBuffer jsonBuffer;
  JsonObject &json = jsonBuffer.createObject();
  json["dayTemperature"] = dayTemperature;
  json["dayStart"] = dayStart;
  json["nightTemperature"] = nightTemperature;
  json["nightStart"] = nightStart;
  json["on"] = on;
  json["triggerTimeout"] = triggerTimeout;

  File configFile = SPIFFS.open("/config.json", "w");
  if (!configFile)
  {
    Serial.println("failed to open config file for writing");
  }

  json.printTo(Serial);
  json.printTo(configFile);
  configFile.close();
}

void setup_relay()
{
  pinMode(relayPin, OUTPUT);
}

// NTP Servers:
IPAddress timeServer(103, 214, 220, 220); // time-a.timefreq.bldrdoc.gov
// IPAddress timeServer(132, 163, 4, 101); // time-a.timefreq.bldrdoc.gov
// IPAddress timeServer(132, 163, 4, 102); // time-b.timefreq.bldrdoc.gov
// IPAddress timeServer(132, 163, 4, 103); // time-c.timefreq.bldrdoc.gov
const int timeZone = 11;
WiFiUDP Udp;
unsigned int localPort = 8888; // local port to listen for UDP packets
void setup_time()
{
  Serial.println("Starting UDP");
  Udp.begin(localPort);
  Serial.print("Local port: ");
  Serial.println(Udp.localPort());
  Serial.println("waiting for sync");
  setSyncProvider(getNtpTime);
}

/*-------- NTP code ----------*/

const int NTP_PACKET_SIZE = 48;     // NTP time is in the first 48 bytes of message
byte packetBuffer[NTP_PACKET_SIZE]; //buffer to hold incoming & outgoing packets

time_t getNtpTime()
{
  while (Udp.parsePacket() > 0)
    ; // discard any previously received packets
  Serial.println("Transmit NTP Request");
  sendNTPpacket(timeServer);
  uint32_t beginWait = millis();
  while (millis() - beginWait < 1500)
  {
    int size = Udp.parsePacket();
    if (size >= NTP_PACKET_SIZE)
    {
      Serial.println("Receive NTP Response");
      Udp.read(packetBuffer, NTP_PACKET_SIZE); // read packet into the buffer
      unsigned long secsSince1900;
      // convert four bytes starting at location 40 to a long integer
      secsSince1900 = (unsigned long)packetBuffer[40] << 24;
      secsSince1900 |= (unsigned long)packetBuffer[41] << 16;
      secsSince1900 |= (unsigned long)packetBuffer[42] << 8;
      secsSince1900 |= (unsigned long)packetBuffer[43];
      return secsSince1900 - 2208988800UL + timeZone * SECS_PER_HOUR;
    }
  }
  Serial.println("No NTP Response :-(");
  return 0; // return 0 if unable to get the time
}

// send an NTP request to the time server at the given address
void sendNTPpacket(IPAddress &address)
{
  // set all bytes in the buffer to 0
  memset(packetBuffer, 0, NTP_PACKET_SIZE);
  // Initialize values needed to form NTP request
  // (see URL above for details on the packets)
  packetBuffer[0] = 0b11100011; // LI, Version, Mode
  packetBuffer[1] = 0;          // Stratum, or type of clock
  packetBuffer[2] = 6;          // Polling Interval
  packetBuffer[3] = 0xEC;       // Peer Clock Precision
  // 8 bytes of zero for Root Delay & Root Dispersion
  packetBuffer[12] = 49;
  packetBuffer[13] = 0x4E;
  packetBuffer[14] = 49;
  packetBuffer[15] = 52;
  // all NTP fields have been given values, now
  // you can send a packet requesting a timestamp:
  Udp.beginPacket(address, 123); //NTP requests are to port 123
  Udp.write(packetBuffer, NTP_PACKET_SIZE);
  Udp.endPacket();
}

long lastLoop = 0;
char msg[500];
DynamicJsonBuffer jsonBuffer;
long triggerTime = 0;
bool isOn = false;
JsonObject &json = jsonBuffer.createObject();

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
    sprintf(currentTime, "%02d:%02d", hour(), minute());
    if (strcmp(currentTime, dayStart.c_str()) > 0 && strcmp(currentTime, nightStart.c_str()) < 0)
    {
      return dayTemperature;
    }
    else
    {
      return nightTemperature;
    }
}

void handleRoot()
{
  char root[3000];
  int currentT = (int)tempsensor.readTempC();
  sprintf(root, rootHtml.c_str(), hour(), minute(), second(), currentT, getTriggerTemperature(), dayTemperature, dayStart.c_str(), nightTemperature, nightStart.c_str(), on ? "checked" : "", triggerTimeout);
  webServer->send(200, "text/html", root);
}

void handleSave()
{
  String dayTemperatureString = webServer->arg("dayTemperature");
  dayStart = webServer->arg("dayStart");
  String nightTemperatureString = webServer->arg("nightTemperature");
  nightStart = webServer->arg("nightStart");
  String onString = webServer->arg("on");
  String triggerTimeoutString = webServer->arg("triggerTimeout");
  dayTemperature = atof(dayTemperatureString.c_str());
  nightTemperature = atof(nightTemperatureString.c_str());
  on = onString == "on";
  triggerTimeout = atof(triggerTimeoutString.c_str());
  save_settings();
  webServer->sendHeader("Location", "/");
  webServer->send(302, "text/html", "OK");
}