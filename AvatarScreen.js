import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Animated,
  Alert,
} from "react-native";
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const AvatarScreen = ({ visible, onClose }) => {
  const [slideAnimAvatar] = useState(new Animated.Value(-300));
  const navigation = useNavigation();

  const openAvatarModal = () => {
    Animated.timing(slideAnimAvatar, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeAvatarModal = () => {
    Animated.timing(slideAnimAvatar, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  const handleGesture = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < 100) {
      closeAvatarModal();
    }
  };

  const handleLogout = () => {
    Alert.alert("Bạn muốn đăng xuất à?", "Đừng đăng xuất mà , xin đấy huhu", [
      { text: "Ô kê thôi", style: "cancel" },
      {
        text: "Đăng xuất",
        onPress: () => {
          closeAvatarModal();
          navigation.navigate("Login");
        },
      },
    ]);
  };

  const handleSettings = () => {
    closeAvatarModal();
    navigation.navigate("Settings");
  };

  useEffect(() => {
    if (visible) {
      openAvatarModal();
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={closeAvatarModal}></TouchableOpacity>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[styles.avatarModalContent, { right: slideAnimAvatar }]}>
          <TouchableOpacity onPress={closeAvatarModal} style={styles.backButton}>
            <Image source={require("./assets/angle-left.png")} style={styles.backButtonIcon} />
          </TouchableOpacity>
          <View style={styles.avatarInfo}>
            <Image source={require("./assets/avatar.png")} style={styles.avatarLarge} />
            <Text style={styles.userName}>Tuấn Kẹo Béo</Text>
            <Text style={styles.userHandle}>@TuấnKẹoBéo4029</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Chỉnh sửa hồ sơ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require("./assets/bell.png")} style={styles.menuIcon} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Quản lý Thông báo</Text>
                <Text style={styles.tokenText}>0 thông báo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require("./assets/search-alt.png")} style={styles.menuIcon} />
              <Text style={styles.menuText}>Quản lý thư mục</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
              <Image source={require("./assets/settings.png")} style={styles.menuIcon} />
              <Text style={styles.menuText}>Cài đặt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Image source={require("./assets/exit.png")} style={styles.menuIcon} />
              <Text style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
};

const styles = StyleSheet.create({
  avatarModalContent: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%", // Để tạo cảm giác như một bảng điều khiển bên cạnh
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "flex-start",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
  },
  avatarInfo: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  userHandle: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 18,
    color: "#333333",
  },
  tokenText: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  logoutText: {
    color: "#FF6F61",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default AvatarScreen;
