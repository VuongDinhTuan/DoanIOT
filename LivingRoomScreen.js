import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import FanModal from "./FanModal";
import ACModal from "./ACModal";
import CeilingLightModal from "./CeilingLightModal"; // Import Ceiling Light Modal
import BulbModal from "./BulbModal"; // Import Bulb Modal
import PurifierModal from "./PurifierModal"; // Import Purifier Modal
import ClimateModal from "./ClimateModal"; // Import Climate Modal

const LivingRoomScreen = () => {
  // Trạng thái của các thiết bị và modal
  const [devices, setDevices] = useState({
    fan: false,
    ac: false,
    ceilingLight: false,
    bulb: false,
    purifier: false,
    climate: false,
  });

  // Trạng thái hiển thị của modal
  const [modalVisible, setModalVisible] = useState({
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

  // Hàm mở modal
  const openModal = (device) => {
    setModalVisible((prevState) => ({
      ...prevState,
      [device]: true,
    }));
  };

  // Hàm đóng modal
  const closeModal = (device) => {
    setModalVisible((prevState) => ({
      ...prevState,
      [device]: false,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LivingRoomScreen</Text>
      <ScrollView contentContainerStyle={styles.deviceContainer}>
        {/* Fan */}
        <TouchableOpacity style={styles.cardContent} onPress={() => openModal("fan")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/fan.png")} // Thêm hình ảnh của Fan
              style={styles.icon}
            />
            <Text style={styles.deviceName}>Fan</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.fan ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.fan ? styles.on : styles.off]}
                onPress={() => toggleDevice("fan")}
              >
                <View
                  style={[styles.circle, devices.fan ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* AC */}
        <TouchableOpacity onPress={() => openModal("ac")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/ac.png")} // Thêm hình ảnh của AC
              style={styles.icon}
            />
            <Text style={styles.deviceName}>AC</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.ac ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.ac ? styles.on : styles.off]}
                onPress={() => toggleDevice("ac")}
              >
                <View
                  style={[styles.circle, devices.ac ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Ceiling Light */}
        <TouchableOpacity onPress={() => openModal("ceilingLight")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/ceilinglight.png")} // Thêm hình ảnh của Ceiling Light
              style={styles.icon}
            />
            <Text style={styles.deviceName}>Ceiling Light</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.ceilingLight ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.ceilingLight ? styles.on : styles.off]}
                onPress={() => toggleDevice("ceilingLight")}
              >
                <View
                  style={[styles.circle, devices.ceilingLight ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Bulb */}
        <TouchableOpacity onPress={() => openModal("bulb")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/on.png")} // Thêm hình ảnh của Bulb
              style={styles.icon}
            />
            <Text style={styles.deviceName}>Bulb</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.bulb ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.bulb ? styles.on : styles.off]}
                onPress={() => toggleDevice("bulb")}
              >
                <View
                  style={[styles.circle, devices.bulb ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Purifier */}
        <TouchableOpacity onPress={() => openModal("purifier")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/purifier.png")} // Thêm hình ảnh của Purifier
              style={styles.icon}
            />
            <Text style={styles.deviceName}>Purifier</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.purifier ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.purifier ? styles.on : styles.off]}
                onPress={() => toggleDevice("purifier")}
              >
                <View
                  style={[styles.circle, devices.purifier ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Climate */}
        <TouchableOpacity onPress={() => openModal("climate")}>
          <View style={styles.card}>
            <Image
              source={require("./assets/climate.png")} // Thêm hình ảnh của Climate
              style={styles.icon}
            />
            <Text style={styles.deviceName}>Climate</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{devices.climate ? "On" : "Off"}</Text>
              <TouchableOpacity
                style={[styles.toggle, devices.climate ? styles.on : styles.off]}
                onPress={() => toggleDevice("climate")}
              >
                <View
                  style={[styles.circle, devices.climate ? styles.circleOn : styles.circleOff]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Fan Modal */}
      <FanModal visible={modalVisible.fan} onClose={() => closeModal("fan")} />

      {/* AC Modal */}
      <ACModal visible={modalVisible.ac} onClose={() => closeModal("ac")} />

      {/* Ceiling Light Modal */}
      <CeilingLightModal visible={modalVisible.ceilingLight} onClose={() => closeModal("ceilingLight")} />

      {/* Bulb Modal */}
      <BulbModal visible={modalVisible.bulb} onClose={() => closeModal("bulb")} />

      {/* Purifier Modal */}
      <PurifierModal visible={modalVisible.purifier} onClose={() => closeModal("purifier")} />

      {/* Climate Modal */}
      <ClimateModal visible={modalVisible.climate} onClose={() => closeModal("climate")} />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFF4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "#4A90E2",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  deviceName: {
    color: "#000000",
    fontSize: 16,
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    color: "#555555",
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
  },
  circleOn: {
    left: 28,
    backgroundColor: "#ffff",
  },
  circleOff: {
    left: 4,
    backgroundColor: "#ffff",
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

export default LivingRoomScreen;
