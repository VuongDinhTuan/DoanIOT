import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post('https://662365923e17a3ac846f27f8.mockapi.io/api/v1/user', {
        email,
        username,
        password,
      });

      if (response.data) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Đăng ký không thành công');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
      Alert.alert('Error', 'Đăng ký không thành công');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/dolphin.jpg')} // Hình ảnh cho giao diện đăng ký (logo hoặc icon)
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Create Account</Text>
      <Text style={styles.subText}>Sign up to get started!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#888888"
      />
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888888"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginSection}>
        <Text style={styles.loginPrompt}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    elevation: 10, // Bóng đổ cho hình ảnh
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Bóng đổ cho input
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(74, 144, 226);', 
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#888888',
  },
  loginText: {
    fontSize: 14,
    color: 'rgb(74, 144, 226);',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
