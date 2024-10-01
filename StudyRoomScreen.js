import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const StudyRoomScreen = () => {
  // Trạng thái của các thiết bị
  const [devices, setDevices] = useState({
    fan: false,
    ac: false,
    ceilingLight: false,
    bulb: false,
    purifier: false,
    climate: false,
  });

  // Hàm bật/tắt trạng thái của thiết bị
  const toggleDevice = (device) => {
    setDevices((prevDevices) => ({
      ...prevDevices,
      [device]: !prevDevices[device],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StudyRoomScreen</Text>
      <ScrollView contentContainerStyle={styles.deviceContainer}>
        
        {/* Fan */}
        <View style={styles.card}>
          <Image
            source={require('./assets/fan.png')} // Thêm hình ảnh của Fan
            style={styles.icon}
          />
          <Text style={styles.deviceName}>Fan</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.fan ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.fan ? styles.on : styles.off]}
              onPress={() => toggleDevice("fan")}
            >
              <View style={[styles.circle, devices.fan ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AC */}
        <View style={styles.card}>
          <Image
            source={require('./assets/ac.png')} // Thêm hình ảnh của AC
            style={styles.icon}
          />
          <Text style={styles.deviceName}>AC</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.ac ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.ac ? styles.on : styles.off]}
              onPress={() => toggleDevice("ac")}
            >
              <View style={[styles.circle, devices.ac ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ceiling Light */}
        <View style={styles.card}>
          <Image
            source={require('./assets/ceilinglight.png')} // Thêm hình ảnh của Ceiling Light
            style={styles.icon}
          />
          <Text style={styles.deviceName}>Ceiling Light</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.ceilingLight ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.ceilingLight ? styles.on : styles.off]}
              onPress={() => toggleDevice("ceilingLight")}
            >
              <View style={[styles.circle, devices.ceilingLight ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bulb */}
        <View style={styles.card}>
          <Image
            source={require('./assets/on.png')} // Thêm hình ảnh của Bulb
            style={styles.icon}
          />
          <Text style={styles.deviceName}>Bulb</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.bulb ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.bulb ? styles.on : styles.off]}
              onPress={() => toggleDevice("bulb")}
            >
              <View style={[styles.circle, devices.bulb ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Purifier */}
        <View style={styles.card}>
          <Image
            source={require('./assets/purifier.png')} // Thêm hình ảnh của Purifier
            style={styles.icon}
          />
          <Text style={styles.deviceName}>Purifier</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.purifier ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.purifier ? styles.on : styles.off]}
              onPress={() => toggleDevice("purifier")}
            >
              <View style={[styles.circle, devices.purifier ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Climate */}
        <View style={styles.card}>
          <Image
            source={require('./assets/climate.png')} // Thêm hình ảnh của Climate
            style={styles.icon}
          />
          <Text style={styles.deviceName}>Climate</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{devices.climate ? "On" : "Off"}</Text>
            <TouchableOpacity
              style={[styles.toggle, devices.climate ? styles.on : styles.off]}
              onPress={() => toggleDevice("climate")}
            >
              <View style={[styles.circle, devices.climate ? styles.circleOn : styles.circleOff]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFF4", // Màu nền sáng hơn
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "#4A90E2", // Màu tối hơn để tương phản
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF", // Màu sáng cho thẻ thiết bị
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3, // Độ nổi cho thẻ
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  deviceName: {
    color: "#000000", // Màu chữ tối cho tên thiết bị
    fontSize: 16,
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    color: "#555555", // Màu chữ tối hơn cho trạng thái
    fontSize: 14,
    marginRight: 15,
  },
  toggle: {
    width: 52,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#3b3b5b",
    justifyContent: "center",
    position: "relative",
    padding: 3,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: 4,
    transition: "0.2s",
  },
  circleOn: {
    left: 28,
    backgroundColor: "#ffff", // Màu đỏ cho nút bật
  },
  circleOff: {
    left: 4,
    backgroundColor: "#ffff", // Màu xanh cho nút tắt
  },
  on: {
    backgroundColor: "#FF6F61",
  },
  off: {
    backgroundColor: "#4A90E2",
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FF6F61",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
});

export default StudyRoomScreen;
