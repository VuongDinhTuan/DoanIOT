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
  const [slideAnimAvatar] = useState(new Animated.Value(-300)); // Khởi tạo một biến animated với giá trị ban đầu -300 để tạo hiệu ứng trượt
  const navigation = useNavigation(); // Sử dụng hook useNavigation để điều hướng giữa các màn hình trong ứng dụng

  const openAvatarModal = () => {
    Animated.timing(slideAnimAvatar, { // Bắt đầu hoạt ảnh trượt vào
      toValue: 0, // Trượt đến vị trí 0 (vị trí hiện tại trên màn hình)
      duration: 300, // Thời gian của hoạt ảnh (300 ms)
      useNativeDriver: false, // Không sử dụng native driver cho hoạt ảnh
    }).start(); // Bắt đầu hoạt ảnh
  };

  const closeAvatarModal = () => {
    Animated.timing(slideAnimAvatar, { // Bắt đầu hoạt ảnh trượt ra
      toValue: -300, // Trượt đến vị trí -300 (ra khỏi màn hình)
      duration: 300, // Thời gian của hoạt ảnh (300 ms)
      useNativeDriver: false, // Không sử dụng native driver
    }).start(() => onClose()); // Bắt đầu hoạt ảnh và sau khi hoàn tất sẽ gọi hàm onClose
  };

  const handleGesture = (event) => {
    const { translationX } = event.nativeEvent; // Lấy giá trị kéo ngang từ event
    if (translationX < 100) { // Nếu kéo sang trái quá 100px
      closeAvatarModal(); // Đóng modal
    }
  };

  const handleLogout = () => {
    Alert.alert("Bạn muốn đăng xuất à?", "Đừng đăng xuất mà , xin đấy huhu", [ // Hiển thị thông báo xác nhận đăng xuất
      { text: "Ô kê thôi", style: "cancel" }, // Lựa chọn huỷ
      {
        text: "Đăng xuất", // Lựa chọn đăng xuất
        onPress: () => {
          closeAvatarModal(); // Đóng modal
          navigation.navigate("Login"); // Điều hướng đến màn hình Login
        },
      },
    ]);
  };

  const handleSettings = () => {
    closeAvatarModal(); // Đóng modal
    navigation.navigate("Settings"); // Điều hướng đến màn hình Settings
  };

  useEffect(() => {
    if (visible) { // Kiểm tra nếu visible là true
      openAvatarModal(); // Mở modal nếu visible là true
    }
  }, [visible]); // useEffect sẽ chạy mỗi khi visible thay đổi
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
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
