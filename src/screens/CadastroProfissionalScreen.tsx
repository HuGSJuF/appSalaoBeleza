import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { addProfissional } from '../database/ProfissionalService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { MaskedTextInput } from "react-native-mask-text";
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroProfissional'>;

export default function CadastroProfissionalScreen({ route, navigation }: Props) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const handleSave = async () => {

    if (!nome.trim() || !telefone.trim() || !especialidade.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const precoNumber = parseFloat(telefone);
    if (isNaN(precoNumber)) {
      Alert.alert('Erro', 'Digite um telefone válido');
      return;
    }

    // Adicionando o profissional
    await addProfissional({ nome, telefone, especialidade });

    // Mostrando alerta de sucesso
    Alert.alert('Sucesso', 'Profissional cadastrado!');

    // Voltando para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Cadastro de Profissional</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={GlobalStyles.input}
      />
      <MaskedTextInput
        placeholder="Telefone"
        mask="(99) 99999-9999"
        onChangeText={(text, rawText) => setTelefone(rawText)}
        value={telefone}
        style={GlobalStyles.input}
      />
      <TextInput
        placeholder="Especialidade"
        value={especialidade}
        onChangeText={setEspecialidade}
        style={GlobalStyles.input}
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};