import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNew, setCreateNew] = React.useState(false);

  const handleSubmit = () => {
    if (createNew) {
      handleCreateAccount();
    } else {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
        Alert.alert('Success', 'Login successful!');
    } else {
        Alert.alert('Error', 'Invalid credentials');
    }
  };

  const handleCreateAccount = () => {

  };

  const handleSwapMode = () => {
    setCreateNew(!createNew);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{createNew ? 'Create New Account' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={createNew ? 'Create Account' : 'Login'} onPress={handleLogin} />
      <Button title={createNew ?  'Login with Existing Account' : 'Create New Account'} onPress={handleSwapMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
