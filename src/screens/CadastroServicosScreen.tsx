import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { addServico } from '../database/ServicosService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { MaskedTextInput } from 'react-native-mask-text';
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroServico'>;

export default function CadastroServicosScreen({ route, navigation }: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');


  const handleSave = async () => {
    const precoNumber = Number(preco.replace(/\D/g, '')) / 100;

    if (!nome.trim() || (precoNumber === 0)) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (isNaN(precoNumber)) {
      Alert.alert('Erro', 'Digite um preço válido');
      return;
    }
    console.log(nome, preco)
    await addServico({ nome, preco: precoNumber });
    // Mostrando alerta de sucesso
    Alert.alert('Sucesso', 'Serviço cadastrado!');

    // Voltando para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Cadastro de Serviço</Text>

      <TextInput
        placeholder="Nome do Serviço"
        placeholderTextColor="gray"
        value={nome}
        onChangeText={setNome}
        style={GlobalStyles.input}
      />

      <MaskedTextInput
        type="currency"
        options={{
          prefix: 'R$',
          decimalSeparator: ',',
          groupSeparator: '.',
          precision: 2
        }}
        onChangeText={setPreco}
        style={GlobalStyles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={handleSave}
      >
        <Text style={GlobalStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};