import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const FanModal = ({ visible, onClose }) => {
  const [fanSpeed, setFanSpeed] = useState(12); // Default fan speed
  const [fanOn, setFanOn] = useState(true); // Fan power state
  const translateX = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = ({ nativeEvent }) => {
    if (nativeEvent.translationX > 150) {
      // If swiped right enough, animate out and close the modal
      Animated.timing(translateX, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onClose();
        translateX.setValue(0); // Reset the position for future use
      });
    } else {
      // If not swiped enough, reset position
      Animated.spring(translateX, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              handleGestureEnd(event);
            }
          }}
        >
          <Animated.View style={[styles.modalContent, { transform: [{ translateX }] }]}>
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome name="arrow-left" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.roomTitle}>Bedroom</Text>
              <TouchableOpacity onPress={() => setFanOn(!fanOn)}>
                <View style={[styles.toggleButton, fanOn ? styles.toggleOn : styles.toggleOff]}>
                  <FontAwesome name="power-off" size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Central Fan Speed Display */}
            <View style={styles.speedControl}>
              <View style={styles.speedCircle}>
                <Text style={styles.speedText}>{fanSpeed}</Text>
              </View>
              <View style={styles.speedAdjust}>
                <TouchableOpacity onPress={() => setFanSpeed((prev) => Math.max(prev - 1, 0))}>
                  <FontAwesome name="minus" size={24} color="#f5a623" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFanSpeed((prev) => Math.min(prev + 1, 100))}>
                  <FontAwesome name="plus" size={24} color="#f5a623" />
                </TouchableOpacity>
              </View>
              <Text style={styles.autoText}>Auto</Text>
            </View>

            {/* Bottom Control Panel */}
            <View style={styles.controlPanel}>
              <TouchableOpacity style={styles.controlButton}>
                <FontAwesome name="tachometer" size={20} color="#008CBA" />
                <Text style={styles.controlButtonText}>SPEED</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <FontAwesome name="exchange" size={20} color="#008CBA" />
                <Text style={styles.controlButtonText}>MODE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <FontAwesome name="clock-o" size={20} color="#008CBA" />
                <Text style={styles.controlButtonText}>TIMER</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  speedControl: {
    alignItems: "center",
    marginBottom: 40,
  },
  speedCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  speedText: {
    fontSize: 36,
    color: "#008CBA",
    fontWeight: "bold",
  },
  speedAdjust: {
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
    width: "22%",
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

export default FanModal;
