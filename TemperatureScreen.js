import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TemperatureScreen = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://192.168.110.68/'); // Đường dẫn server Arduino
        const data = await response.json();
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      } catch (error) {
        console.error('There was a problem fetching the sensor data:', error.message);
      }
    };

    const intervalId = setInterval(fetchSensorData, 5000); // Lấy dữ liệu mỗi 5 giây

    return () => clearInterval(intervalId); // Xóa interval khi component unmount
  }, []);

  const handleSetTemperature = () => {
    // Xử lý thiết lập nhiệt độ ở đây
    alert(`Đã thiết lập nhiệt độ: ${temperature}°C và độ ẩm: ${humidity}%`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Temperature & Humidity Control</Text>
      <View style={styles.sensorData}>
        <Text style={styles.sensorText}>Temperature: {temperature}°C</Text>
        <Text style={styles.sensorText}>Humidity: {humidity}%</Text>
      </View>
      <TouchableOpacity style={styles.setButton} onPress={handleSetTemperature}>
        <Text style={styles.buttonText}>Thiết lập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  sensorData: {
    marginBottom: 20,
  },
  sensorText: {
    fontSize: 18,
    marginBottom: 10,
  },
  setButton: {
    width: 300,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default TemperatureScreen;
