import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, Modal } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Trạng thái thông báo, mặc định là bật
  const [darkModeEnabled, setDarkModeEnabled] = useState(false); // Trạng thái chế độ tối, mặc định là tắt

  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false); // Trạng thái hiển thị modal chỉnh sửa hồ sơ, mặc định là ẩn
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false); // Trạng thái hiển thị modal thay đổi mật khẩu, mặc định là ẩn

  const [profileName, setProfileName] = useState("John Doe"); // Tên hồ sơ người dùng, mặc định là "John Doe"
  const [email, setEmail] = useState("john.doe@example.com"); // Email của người dùng, mặc định là "john.doe@example.com"
  const [oldPassword, setOldPassword] = useState(""); // Mật khẩu cũ, khởi tạo là chuỗi rỗng
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới, khởi tạo là chuỗi rỗng

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState); // Hàm chuyển đổi trạng thái thông báo (bật/tắt)
  const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState); // Hàm chuyển đổi trạng thái chế độ tối (bật/tắt)

  const openEditProfileModal = () => {
    setEditProfileModalVisible(true); // Mở modal chỉnh sửa hồ sơ
  };

  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false); // Đóng modal chỉnh sửa hồ sơ
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalVisible(true); // Mở modal thay đổi mật khẩu
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalVisible(false); // Đóng modal thay đổi mật khẩu
  };


  return (
    <View style={styles.settingsContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"} Back</Text>
      </TouchableOpacity>
      <Text style={styles.settingsTitle}>Settings</Text>
      <TextInput style={styles.searchBar} placeholder="Search" />

      <ScrollView>
        {/* Tài khoản */}
        <SectionHeader title="Account" />
        <TouchableOpacity style={styles.settingsOption} onPress={openEditProfileModal}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption} onPress={openChangePasswordModal}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Privacy</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Security</Text>
        </View>

        {/* Thông báo */}
        <SectionHeader title="Preferences" />
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
          />
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Language</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Theme</Text>
        </View>

        {/* Thông tin ứng dụng */}
        <SectionHeader title="App Information" />
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>About</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Help</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Feedback</Text>
        </View>

        {/* Box đăng nhập */}
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Logins</Text>
          <TouchableOpacity style={styles.loginOption}>
            <Text style={styles.loginOptionText}>Add or switch accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginOptionText}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption}>
            <Text style={styles.loginOptionText}>Log out all accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Edit Profile */}
      <Modal visible={editProfileModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.modalInput}
              value={profileName}
              onChangeText={setProfileName}
              placeholder="Name"
            />
            <TextInput
              style={styles.modalInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeEditProfileModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeEditProfileModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Change Password */}
      <Modal visible={changePasswordModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.modalInput}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Old Password"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.modalInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeChangePasswordModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeChangePasswordModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Component tiêu đề của mỗi phần
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
    settingsContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    backButton: {
      marginBottom: 20,
    },
    backButtonText: {
      fontSize: 16,
      color: '#6e6e6e',
    },
    settingsTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'rgb(74, 144, 226)',
      marginBottom: 20,
    },
    searchBar: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      marginBottom: 20,
    },
    sectionHeader: {
      marginTop: 30,
      marginBottom: 10,
    },
    sectionHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#6e6e6e',
    },
    settingsOption: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    optionText: {
      fontSize: 18,
    },
    loginBox: {
      marginTop: 30,
      padding: 15,
      borderColor: '#eee',
      borderWidth: 1,
      borderRadius: 10,
    },
    loginTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    loginOption: {
      marginBottom: 10,
    },
    loginOptionText: {
      fontSize: 16,
      color: '#rgb(74, 144, 226)',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalInput: {
      height: 45,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      backgroundColor: '#6e00ff',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default SettingsScreen;
