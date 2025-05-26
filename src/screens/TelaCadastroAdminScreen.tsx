import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { addUser } from '../database/UserService';
import { GlobalStyles } from '../styles/GlobalStyles';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function TelaCadastroAdmin() {
  const navigation = useNavigation<NavigationProp>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    try {
      await addUser({ nome, email, senha });
      Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível cadastrar. Verifique se o e-mail já foi cadastrado.');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Cadastro de Administrador</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={GlobalStyles.input}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={GlobalStyles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={GlobalStyles.input}
      />

      <TextInput
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={GlobalStyles.input}
      />

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={handleCadastro}
      >
        <Text style={GlobalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={GlobalStyles.link}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
};