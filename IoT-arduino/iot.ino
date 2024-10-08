#include <WiFi.h>
#include <WiFiClientSecure.h> // Thêm thư viện này để hỗ trợ kết nối bảo mật
#include <PubSubClient.h>
#include <DHT.h>

// Cấu hình WiFi và MQTT Broker
const char* ssid = "Dolphin";
const char* password = "28082002";

const char* mqtt_server = "bca5208c07354d41b2ec65c6f6ad9f36.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_username = "truong0907";
const char* mqtt_password = "Truong123";

WiFiClientSecure espClient; // Dùng WiFiClientSecure cho kết nối SSL/TLS
PubSubClient client(espClient);

#define DHTPIN 25
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Chân nối LED
const int ledPin1 = 15;
const int ledPin2 = 4;

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void callback(char* topic, byte* message, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  
  if (String(topic) == "home/led1") {
    digitalWrite(ledPin1, msg == "on" ? HIGH : LOW);
  } else if (String(topic) == "home/led2") {
    digitalWrite(ledPin2, msg == "on" ? HIGH : LOW);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    // Kết nối tới MQTT Broker với thông tin bảo mật
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
      Serial.println("Connected to MQTT Broker");
      
      // Đăng ký topic để điều khiển LED
      client.subscribe("home/led1");
      client.subscribe("home/led2");
    } else {
      Serial.print("Failed to connect, rc=");
      Serial.print(client.state());
      delay(5000); // Thử lại sau 5 giây nếu kết nối thất bại
    }
  }
}

void setup() {
  Serial.begin(115200);
  
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  
  setup_wifi();
  
  // Thiết lập kết nối an toàn với MQTT Broker
  espClient.setInsecure(); // Bỏ qua xác thực chứng chỉ (cần nếu không có file chứng chỉ CA)
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  
  dht.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Đọc dữ liệu từ cảm biến DHT
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Nếu dữ liệu hợp lệ, gửi lên MQTT Broker
  if (!isnan(h) && !isnan(t)) {
    String payload = "{\"temperature\":" + String(t) + ",\"humidity\":" + String(h) + "}";
    client.publish("home/sensor", payload.c_str());
  }

  delay(2000);
}
