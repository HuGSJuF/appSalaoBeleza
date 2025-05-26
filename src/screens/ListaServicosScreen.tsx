import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getDBConnection } from '../database/DatabaseConnection';
import Ionicons from '@react-native-vector-icons/ionicons';
import { MaskedText } from 'react-native-mask-text';
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaServicos'>;

export const getServicos = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM servicos;`);
  const rows = results[0].rows;
  const servicos = [];
  for (let i = 0; i < rows.length; i++) {
    servicos.push(rows.item(i));
  }

  return servicos;
}

// Função para excluir um serviço
const deleteServico = async (id: number, setServicos: React.Dispatch<React.SetStateAction<any[]>>) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM servicos WHERE id = ?;`, [id]);

  const updatedServicos = await getServicos();
  setServicos(updatedServicos);
};

export default function ListaServicosScreen({ navigation }: Props) {
  const [servicos, setServicos] = useState<any[]>([]);

  useEffect(() => {
    const loadServicos = async () => {
      const data = await getServicos();
      setServicos(data);
    };
    // ao montar e sempre que voltar a esta tela:
    const unsub = navigation.addListener('focus', loadServicos);
    return unsub;
  }, [navigation]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Excluir Serviço",
      "Tem certeza de que deseja excluir este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deleteServico(id, setServicos) }
      ]
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleList}>Servicos</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CadastroServico', {
            updateList: () => {
              getServicos().then(setServicos);
            },
          })
        }
      >
        <Text style={GlobalStyles.linkLsit}>Cadastrar Serviço</Text>
      </TouchableOpacity>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={GlobalStyles.card}>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Ionicons name="close" size={24} color="red" style={GlobalStyles.deleteIcon} />
            </TouchableOpacity>
            <Text style={GlobalStyles.text}>Nome: {item.nome}</Text>
            <Text>Valor:&nbsp;
              <MaskedText type="currency"
                options={{
                  prefix: 'R$',
                  decimalSeparator: ',',
                  groupSeparator: '.',
                  precision: 2
                }}>{(item.preco * 100).toString()}</MaskedText>
            </Text>
          </View>
        )}
      />
    </View>
  );
};
