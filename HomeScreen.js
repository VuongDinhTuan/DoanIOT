import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  Animated,
  TextInput,
  Alert,
} from "react-native";
import AvatarScreen from "./AvatarScreen";



const HomeScreen = ({ navigation }) => { //để điều hướng giữa các màn hình trong ứng dụng React Native. Prop này cho phép bạn điều hướng qua lại giữa các màn hình.
  const [modalVisible, setModalVisible] = useState(false); //xác định trạng thái hiển thị
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);//tên của biến state,Đây là một hàm (function),useState là một hook của React, được sử dụng để tạo ra một state trong một function component.
  const [slideAnim] = useState(new Animated.Value(-300));//vị trí khởi đầu của một animation trên trục Y hoặc X là -300 (ngoài màn hình)
  const [slideAnimAvatar] = useState(new Animated.Value(-300));

  const [rooms, setRooms] = useState([
    { id: 1, name: "Living Room", devices: 7, image: require("./assets/livingroom.png") },
    { id: 2, name: "Bedroom", devices: 6, image: require("./assets/bedroom.png") },
    { id: 3, name: "Study Room", devices: 3, image: require("./assets/studyroom.png") },
    { id: 4, name: "Kitchen", devices: 8, image: require("./assets/kitchenroom.png") },
  ]);//setRooms: Đây là hàm được cung cấp bởi useState, cho phép bạn thay đổi giá trị của biến

  const [newRoomName, setNewRoomName] = useState("");
  const [newDeviceCount, setNewDeviceCount] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,//Xác định giá trị kết thúc của animation
      duration: 300,//Xác định thời gian của hiệu ứng (300ms).
      useNativeDriver: false,//sử dụng Native Driver để tăng hiệu suất không.
    }).start();//Sau khi thiết lập animation với timing, hàm .start() được gọi để bắt đầu chạy hiệu ứng.
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));//Sau khi animation kết thúc, hàm start sẽ nhận một callback, và callback này sẽ đặt modalVisible về false để ẩn modal sau khi animation trượt ra hoàn thành. Điều này đảm bảo rằng modal chỉ ẩn khi hiệu ứng kết thúc hoàn toàn.
  };

  const openRoomModal = (roomId = null) => {
    setSelectedRoomId(roomId);
    if (roomId) {
      const room = rooms.find((r) => r.id === roomId);//Tìm phòng có id trùng với roomId trong mảng rooms. 
      setNewRoomName(room.name);
      setNewDeviceCount(room.devices.toString());// Cập nhật trạng thái newDeviceCount với số lượng thiết bị của phòng, được chuyển thành chuỗi để có thể hiển thị trong một input field
    } else {
      setNewRoomName(""); //xóa tên phòng cũ và đặt tên mới thành chuỗi rỗng,
      setNewDeviceCount("");
    }
    setRoomModalVisible(true);
  };

  const closeRoomModal = () => {
    setRoomModalVisible(false);//Đặt trạng thái roomModalVisible về false để ẩn modal liên quan đến phòng.
    setSelectedRoomId(null);//Đặt selectedRoomId về null, nghĩa là không có phòng nào được chọn nữa.
    setNewRoomName("");
    setNewDeviceCount("");//Xóa nội dung của newRoomName và newDeviceCount
  };

  const handleSaveRoom = () => { //Hàm này xử lý việc lưu hoặc cập nhật thông tin của một phòng (room).
    const deviceCount = parseInt(newDeviceCount, 10); //Chuyển đổi chuỗi newDeviceCount thành một số nguyên, vì số lượng thiết bị cần là một số chứ không phải chuỗi.
    if (selectedRoomId) { // Kiểm tra nếu có một roomId được chọn (tức là đang chỉnh sửa phòng hiện có).
      setRooms((prevRooms) => //Hàm này cập nhật trạng thái của rooms (mảng các phòng). Nó sử dụng hàm map để duyệt qua từng phòng trong mảng:
        prevRooms.map((room) => 
          room.id === selectedRoomId //Nếu room.id khớp với selectedRoomId, phòng đó sẽ được cập nhật với tên mới (newRoomName) và số lượng thiết bị mới (deviceCount).
            ? { ...room, name: newRoomName, devices: deviceCount }
            : room
        )
      );
    } else {
      const newRoom = { //Nếu selectedRoomId không tồn tại (tức là người dùng đang thêm một phòng mới).
        id: rooms.length + 1,// số phòng hiện có +1
        name: newRoomName,
        devices: deviceCount,
        image: require("./assets/on.png"), // Hình ảnh mặc định cho phòng mới
      };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    }
    closeRoomModal();
  };

  const handleDeleteRoom = () => {
    if (selectedRoomId) { //Kiểm tra xem có phòng nào đang được chọn không.
      Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa phòng này?", [ //Hiển thị một thông báo xác nhận
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            setRooms((prevRooms) =>
              prevRooms.filter((room) => room.id !== selectedRoomId)
            );
            closeRoomModal();
          },
        },
      ]);
    }
  };

  const handleGesture = (event) => {
    const { translationX } = event.nativeEvent;  //Chứa thông tin chi tiết về cử chỉ của người dùng.
    // Nếu vuốt sang trái
    if (translationX < 100) {
      closeAvatarModal();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Modal cho menu */}
        <Modal transparent={true} visible={modalVisible} animationType="none">
          <TouchableOpacity style={styles.overlay} onPress={closeModal}></TouchableOpacity>
          <Animated.View style={[styles.modalContent, { left: slideAnim }]}>
            <View style={styles.languageSection}>
              <TouchableOpacity style={styles.languageItem}>
                <Image source={require("./assets/vietnam.png")} style={styles.flagIcon} />
                <Text style={styles.languageText}>Tiếng Việt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageItem}>
                <Image source={require("./assets/uk.png")} style={styles.flagIcon} />
                <Text style={styles.languageText}>English</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require("./assets/home1.png")} style={styles.menuIcon} />
              <Text style={styles.menuText}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require("./assets/book-user.png")} style={styles.menuIcon} />
              <Text style={styles.menuText}>Đăng nhập/ Đăng ký</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>

        {/* Modal cho avatar */}
        <AvatarScreen visible={avatarModalVisible} onClose={() => setAvatarModalVisible(false)} />
        {/* Modal cho phòng */}
        <Modal transparent={true} visible={roomModalVisible} animationType="slide">
          <View style={styles.roomModalContainer}>
            <Text style={styles.roomModalTitle}>
              {selectedRoomId ? "Cập nhật phòng" : "Thêm phòng"}
            </Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Tên phòng"
              value={newRoomName}
              onChangeText={setNewRoomName}
            />
            <TextInput
              style={styles.roomInput}
              placeholder="Số lượng thiết bị"
              value={newDeviceCount}
              onChangeText={setNewDeviceCount}
              keyboardType="numeric"
            />
            <View style={styles.roomModalButtons}>
              <TouchableOpacity onPress={handleSaveRoom} style={styles.roomButton}>
                <Text style={styles.roomButtonText}>Lưu</Text>
              </TouchableOpacity>
              {selectedRoomId && (
                <TouchableOpacity onPress={handleDeleteRoom} style={styles.roomButton}>
                  <Text style={styles.roomButtonText}>Xóa</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={closeRoomModal} style={styles.roomButton}>
                <Text style={styles.roomButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Phần header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openModal}>
            <Image source={require("./assets/menu-burger.png")} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
          <Image source={require("./assets/avatar.png")} style={styles.avatar} />
        </TouchableOpacity>
        </View>

        <Text style={styles.greetingText}>Hello Tuấn Kẹo Béo 👋</Text>
        <Text style={styles.subText}>Welcome to Home</Text>

        {/* Thẻ thời tiết */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherRow}>
            <Image source={require("./assets/cloudy.png")} style={styles.weatherIcon} />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherText}>Mostly Cloudy</Text>
              <Text style={styles.weatherLocation}>Sydney, Australia</Text>
            </View>
            <Text style={styles.tempText}>22°C</Text>
          </View>
          <View style={styles.weatherDetails}>
            <Text style={styles.weatherDetail}>27°C Sensible</Text>
            <Text style={styles.weatherDetail}>4% Precipitation</Text>
            <Text style={styles.weatherDetail}>66% Humidity</Text>
            <Text style={styles.weatherDetail}>16 km/h Wind</Text>
          </View>
        </View>

        {/* Phần Rooms */}
        <View style={styles.roomsSection}>
          <Text style={styles.sectionTitle}>Your Rooms</Text>
          <View style={styles.roomGrid}>
            {rooms.map((room) => (
              <View key={room.id} style={styles.roomCardContainer}>
                <TouchableOpacity
                  style={styles.roomCard}
                  onPress={() => navigation.navigate(`${room.name.replace(" ", "")}Screen`)} // Điều hướng đến màn hình phòng tương ứng
                >
                  <Image
                    source={room.image} // Sử dụng hình ảnh từ dữ liệu
                    style={styles.roomImage}
                  />
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.deviceCount}>{room.devices} Devices</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.threeDots}
                  onPress={() => openRoomModal(room.id)}
                >
                  <Text style={styles.threeDotsText}>⋮</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => openRoomModal()}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Giao diện dưới cùng */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Image source={require("./assets/home2.png")} style={styles.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require("./assets/microphone.png")} style={styles.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
         <Image source={require("./assets/settings.png")} style={styles.icon} />
      </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Màu nền sáng hơn
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Để tránh bị chồng lấp với bottom container
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F8FF",
    borderRadius: 20,
    position: "absolute", // Thay đổi từ "fixed" sang "absolute"
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    elevation: 10,
  },
  
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingText: {
    color: "#000000", // Chữ màu tối
    fontSize: 28,
    fontWeight: "bold",
  },
  subText: {
    color: "#555555", // Chữ phụ màu tối hơn
    fontSize: 16,
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: "#F0F8FF", // Màu sáng cho thẻ thời tiết
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 5, // Tăng độ nổi cho thẻ thời tiết
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherInfo: {
    flex: 1,
    marginLeft: 10,
  },
  weatherText: {
    color: "#000000", // Chữ màu tối
    fontSize: 18,
  },
  weatherLocation: {
    color: "#555555", // Chữ phụ màu tối hơn
    fontSize: 14,
  },
  tempText: {
    color: "#000000", // Chữ màu tối
    fontSize: 48,
    fontWeight: "bold",
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  weatherDetail: {
    color: "#555555", // Chữ phụ màu tối hơn
    fontSize: 11,

  },
  roomsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#000000", // Chữ tiêu đề màu tối
    fontSize: 24,
    fontWeight: "bold",
  },
  roomGrid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  roomCardContainer: {
    position: "relative",
    width: "48%",
    marginBottom: 20,
  },
  roomCard: {
    backgroundColor: "#F0F8FF", // Màu sáng cho thẻ phòng
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  roomImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  roomName: {
    color: "#000000", // Chữ tên phòng màu tối
    fontSize: 18,
    fontWeight: "bold",
  },
  deviceCount: {
    color: "#555555", // Chữ phụ màu tối hơn
    fontSize: 14,
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
    bottom: 80,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  modalContent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "flex-start",
    paddingTop:40,
  },
  avatarModalContent: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "flex-start",
  },
  avatarInfo: {
    alignItems: "center",
    marginBottom: 20,
    marginTop:20,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userHandle: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
  tokenText: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  languageSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  roomModalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  roomModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  roomInput: {
    height: 45,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  roomModalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  roomButton: {
    flex: 1,
    backgroundColor: "#FF6F61",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  roomButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  threeDots: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  threeDotsText: {
    color: "#000000", // Đổi màu cho ba chấm
    fontSize: 24,
  },
});

export default HomeScreen;
