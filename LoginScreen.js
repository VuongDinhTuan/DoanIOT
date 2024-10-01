import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }

    try {
      const response = await axios.get(
        `https://662365923e17a3ac846f27f8.mockapi.io/api/v1/user?username=${username}&password=${password}`
      );

      console.log("API response:", response.data);

      if (response.data.length > 0) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Bạn đã nhập sai mật khẩu hoặc tài khoản");
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/dolphin.jpg")} // Thêm logo của ứng dụng
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.subText}>Please login to your account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#888888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888888"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>

      <View style={styles.registerSection}>
        <Text style={styles.registerPrompt}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    elevation: 10, // Tạo hiệu ứng bóng đổ cho logo
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#888888",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333333",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Hiệu ứng bóng đổ cho input
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A90E2",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  forgotPassword: {
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 14,
    color: "#4A90E2",
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerPrompt: {
    fontSize: 14,
    color: "#888888",
  },
  registerText: {
    fontSize: 14,
    color: "#4A90E2",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default LoginScreen;
