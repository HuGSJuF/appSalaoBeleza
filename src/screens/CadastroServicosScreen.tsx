import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { addServico } from '../database/ServicosService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { MaskedTextInput } from 'react-native-mask-text';

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
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Serviço</Text>

      <TextInput
        placeholder="Nome do Serviço"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
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
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
