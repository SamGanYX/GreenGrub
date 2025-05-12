import { Button, StyleSheet } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  interface User {
    id: number;
    username: string;
    name: string;
    email: string;
  }


  const [users,setUsers] = useState<User[]>([]);
  const [message,setMessage] = useState("starter");
  // const axios = require('axios');

  useEffect(() => {

    const loadUsers= async () => {
      // console.log('axios:', axios);
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    }
    loadUsers();
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Username</Text>
        </View>
        {users.map((user, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{user.id}</Text>
            <Text style={styles.tableCell}>{user.username}</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/tabs/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});
