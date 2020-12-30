#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>
#include <ArduinoJson.h>
#include "DHT.h"

#define DHTPIN 27
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "UPCA47486E-ext";
const char* password = "hkwcebj5nyB3";

int Buzzer = 26;
int motionSensor = 34;
int ledPin = 25;
int ledPin_white = 33;
int fotoZellePin = 35;

float temperature = 0;
float luftfeuchtigkeit = 0;
bool dunkel = false;
bool motionDetected = false;
bool alarmanlage = false;
int numNewRequests;
int counter = 0;
String text = "";
String chat_id = "";
String from_name = "";
String antwort = "";

// Telegram Bot
#define BOTtoken "1429613863:AAEg0Dt-Ws8funTP0QGbeCmzUFyhT5nQycA"

WiFiClientSecure client;
UniversalTelegramBot bot(BOTtoken, client);


void IRAM_ATTR detectsMovement() {
  motionDetected = true;
}

void handleNewRequests(int numNewRequests) {
  for (int i = 0; i < numNewRequests; i++) {
    chat_id = String(bot.messages[i].chat_id);
    text = bot.messages[i].text;
    Serial.println(text);

    from_name = bot.messages[i].from_name;

    if (text == "/start") {
      antwort = "Willkommen, " + from_name + ". 👋\n\n";
      bot.sendMessage(chat_id, antwort, "");
      text = "/status";
    }

    if (text == "/status") {
      antwort = "";
      if (dunkel) {
        antwort += "Draußen ist es dunkel. Daher wird das Außenlicht bei Bewegungen aktiviert. 🌙\n\n";
      } else {
        antwort += "Draußen ist es hell. Daher wird das Außenlicht bei Bewegungen nicht aktiviert. 🌞\n\n";
      }
      if (alarmanlage) {
        antwort += "Die Alarmanlage ist aktiviert. ✔️\n\n";
      } else {
        antwort += "Die Alarmanlage ist deaktiviert. ❌\n\n";
      }
      antwort += "Es sind " + String(temperature) + " ºC draußen mit einer Luftfeucht von " + String(luftfeuchtigkeit) + " %.\n\n";
      antwort += "Folgende Befehle stehen dir zur Auswahl:\n";
      antwort += "/messen ➡ aktuelle Termperatur und Luftfeuchtigkeit ausgeben \n";
      antwort += "/alarmanlage ➡ Einstellungen an der Alarmanlage vornehmen \n";
      antwort += "/oeffnen ➡ Haustüre öffnen \n";
      antwort += "/alarm ➡ Alarm auslösen \n\n";
      antwort += "/status ➡ Zurück zur Übersicht";
      bot.sendMessage(chat_id, antwort, "");
    }

    if (text == "/messen") {
      bot.sendMessage(chat_id, "Temperatur: " + String(temperature) + " ºC\nLuftfeuchtigkeit: " + String(luftfeuchtigkeit) + " %\n\n/status ➡ Zurück zur Übersicht", "");
    }

    if (text == "/alarmanlage") {
      if (alarmanlage) {
        bot.sendMessage(chat_id, "Alarmanlage ist aktiv! ✔️\n /deaktivieren\n\n/status ➡ Zurück zur Übersicht", "");
      } else {
        bot.sendMessage(chat_id, "Alarmanlage ist inaktiv! ❌\n /aktivieren\n\n/status ➡ Zurück zur Übersicht", "");
      }
    }

    if (text == "/deaktivieren") {
      alarmanlage = false;
      digitalWrite (ledPin, LOW);
      bot.sendMessage(chat_id, "Alarmanlage ist nun inaktiv! ❌\n /aktivieren\n\n/status ➡ Zurück zur Übersicht", "");
    }

    if (text == "/aktivieren") {
      alarmanlage = true;
      digitalWrite (ledPin, HIGH);
      bot.sendMessage(chat_id, "Alarmanlage ist nun aktiv! ✔️\n /deaktivieren\n\n/status ➡ Zurück zur Übersicht", "");
    }

    if (text == "/bild") {
      bot.sendMessage(chat_id, "http://gph.is/127GrTy", "");
      bot.sendMessage(chat_id, "/oeffnen\n\n/status ➡ Zurück zur Übersicht", "");
    }

    if (text == "/oeffnen") {
      bot.sendMessage(chat_id, "Türe wurde geöffnet\n\n/status ➡ Zurück zur Übersicht", "");
    }

    if (text == "/alarm") {
      digitalWrite (Buzzer, HIGH); // Buzzer wird eingeschaltet
      delay (500);
      digitalWrite (Buzzer, LOW);
      bot.sendMessage(chat_id, "Alarm wird ausgelöst 🚨🚨🚨\n/stoppen\n\n/status ➡ Zurück zur Übersicht", "");
      Serial.print("Alarm wird ausgelöst");
      
    }

    if (text == "/stoppen") {
      bot.sendMessage(chat_id, "Alarm wurde gestoppt\n Alarmanlage /deaktivieren\n\n/status ➡ Zurück zur Übersicht", "");
    }
  }
}


void setup() {
  Serial.begin(115200);

  dht.begin();
  pinMode(motionSensor, INPUT_PULLUP);
  pinMode (Buzzer, OUTPUT);
  pinMode (ledPin, OUTPUT);
  pinMode (ledPin_white, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);

  Serial.print("Connecting Wifi: ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}


void loop() {
  int numNewRequests = bot.getUpdates(bot.last_message_received + 1);
  while (numNewRequests) {
    Serial.println("Anfrage erhalten");
    handleNewRequests(numNewRequests);
    numNewRequests = bot.getUpdates(bot.last_message_received + 1);
  }

  if (touchRead(13) < 25) {
    digitalWrite (Buzzer, HIGH);
    delay (500);
    digitalWrite (Buzzer, LOW);
    bot.sendMessage(chat_id, "Es klingelt an der Haustür. \n/oeffnen\n/bild\n\n/status ➡ Zurück zur Übersicht", "");
    Serial.print("Es hat geklingelt");
  }

  if (dunkel || alarmanlage) {
    if (motionDetected) {
      digitalWrite (ledPin_white, HIGH);
      if (alarmanlage) {
        bot.sendMessage(chat_id, "Die Alarmanlage hat angeschlagen. 🚨🚨", "");
        bot.sendMessage(chat_id, "https://gph.is/1OTEUeE", "");
        bot.sendMessage(chat_id, "/alarm auslösen\n Alarmanlage /deaktivieren \n\n/status ➡ Zurück zur Übersicht", "");
        Serial.println("Motion Detected");
        motionDetected = false;
      }
      delay (1000);
    } else {
      digitalWrite (ledPin_white, LOW);
    }
  } else {
    digitalWrite (ledPin_white, LOW);
  }

  if(counter==10){
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
  } else {
    temperature = t;
    luftfeuchtigkeit = h;
  }

  if (analogRead(fotoZellePin) < 2000) {
    dunkel = true;
  } else {
    dunkel = false;
    
  }
  counter=0;
  }

  counter++;
}
