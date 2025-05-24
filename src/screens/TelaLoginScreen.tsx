import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { loginUser } from '../database/UserService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getDBConnection } from '../database/DatabaseConnection';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const getUsuarios = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM usuarios;`);
  const rows = results[0].rows;
  const usuarios = [];

  for (let i = 0; i < rows.length; i++) {
    usuarios.push(rows.item(i));
  }

  console.log('Usuarios cadastrados:', usuarios);
  return usuarios;
};


export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

    const handleLogin = async () => {
    const user = await loginUser(email, senha);
    console.log('Resultado do login:', user);
    if (user) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos');
    }
  };
    useEffect(() => {
    getUsuarios();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salão Vanessa Santos</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CadastroAdmin')}
      >
        <Text style={styles.link}>Cadastrar Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#7D5FFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  link: {
    color: '#7D5FFF',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});
