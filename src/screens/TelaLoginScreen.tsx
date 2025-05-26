import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../database/UserService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getDBConnection } from '../database/DatabaseConnection';
import { GlobalStyles } from '../styles/GlobalStyles';


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
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Salão Vanessa Santos</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={GlobalStyles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={GlobalStyles.input}
      />

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={handleLogin}
      >
        <Text style={GlobalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CadastroAdmin')}
      >
        <Text style={GlobalStyles.link}>Cadastrar Admin</Text>
      </TouchableOpacity>
    </View>
  );
};
