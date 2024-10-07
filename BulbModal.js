// BulbModal.js
import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const BulbModal = ({ visible, onClose }) => {
  const [bulbOn, setBulbOn] = useState(true);
  const [brightness, setBrightness] = useState(50); // Brightness from 0 to 100

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
                <Text style={styles.roomTitle}>Bedroom Bulb</Text>
                <TouchableOpacity onPress={() => setBulbOn(!bulbOn)}>
                  <View style={[styles.toggleButton, bulbOn ? styles.toggleOn : styles.toggleOff]}>
                    <FontAwesome name="power-off" size={16} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Brightness Control */}
              <View style={styles.brightnessControl}>
                <View style={styles.brightnessCircle}>
                  <Text style={styles.brightnessText}>{brightness}%</Text>
                </View>
                <View style={styles.brightnessAdjust}>
                  <TouchableOpacity onPress={() => setBrightness((prev) => Math.max(prev - 10, 0))}>
                    <FontAwesome name="minus" size={24} color="#f5a623" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setBrightness((prev) => Math.min(prev + 10, 100))}>
                    <FontAwesome name="plus" size={24} color="#f5a623" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.autoText}>Adjust Brightness</Text>
              </View>

              {/* Bottom Control Panel */}
              <View style={styles.controlPanel}>
                <TouchableOpacity style={styles.controlButton}>
                  <FontAwesome name="sun-o" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>READING</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <FontAwesome name="moon-o" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>NIGHT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <FontAwesome name="lightbulb-o" size={20} color="#008CBA" />
                  <Text style={styles.controlButtonText}>NORMAL</Text>
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
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleOn: {
    backgroundColor: "#008CBA",
  },
  toggleOff: {
    backgroundColor: "#555555",
  },
  brightnessControl: {
    alignItems: "center",
    marginBottom: 40,
  },
  brightnessCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  brightnessText: {
    fontSize: 36,
    color: "#008CBA",
    fontWeight: "bold",
  },
  brightnessAdjust: {
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

export default BulbModal;
