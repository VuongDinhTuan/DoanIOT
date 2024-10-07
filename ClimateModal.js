// ClimateModal.js
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const ClimateModal = ({ visible, onClose }) => {
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState("Cool");

  const handlePanGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 100) {
      onClose();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal transparent={true} visible={visible} animationType="slide">
        <PanGestureHandler onGestureEvent={handlePanGesture}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header Section */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <FontAwesome name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.roomTitle}>Climate Control</Text>
              </View>

              {/* Temperature Display */}
              <View style={styles.temperatureControl}>
                <View style={styles.temperatureCircle}>
                  <Text style={styles.temperatureText}>{temperature}°C</Text>
                </View>
                <View style={styles.temperatureAdjust}>
                  <TouchableOpacity onPress={() => setTemperature((prev) => Math.max(prev - 1, 16))}>
                    <FontAwesome name="minus" size={24} color="#f5a623" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setTemperature((prev) => Math.min(prev + 1, 30))}>
                    <FontAwesome name="plus" size={24} color="#f5a623" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.autoText}>{mode} Mode</Text>
              </View>

              {/* Bottom Control Panel */}
              <View style={styles.controlPanel}>
                <TouchableOpacity style={styles.controlButton} onPress={() => setMode("Cool")}>
                  <FontAwesome name="snowflake-o" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>COOL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => setMode("Heat")}>
                  <FontAwesome name="fire" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>HEAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => setMode("Fan")}>
                  <FontAwesome name="fan" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>FAN</Text>
                </TouchableOpacity>
              </View>

              {/* Close Button */}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  roomTitle: {
    fontSize: 20,
    color: "#008CBA",
    fontWeight: "bold",
  },
  temperatureControl: {
    alignItems: "center",
    marginBottom: 40,
  },
  temperatureCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureText: {
    fontSize: 36,
    color: "#008CBA",
    fontWeight: "bold",
  },
  temperatureAdjust: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginVertical: 20,
  },
  autoText: {
    fontSize: 18,
    color: "#008CBA",
  },
  controlPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },
  controlButtonText: {
    color: "#008CBA",
    marginTop: 5,
    fontSize: 12,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#008CBA",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ClimateModal;
