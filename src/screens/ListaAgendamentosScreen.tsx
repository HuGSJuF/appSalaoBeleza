import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getDBConnection } from '../database/DatabaseConnection';
import Ionicons from '@react-native-vector-icons/ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { MaskedText } from 'react-native-mask-text';
import { extractDayMonth } from '../utils/dateUtils';
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaAgendamentos'>;

interface Agendamento {
  id: number;
  profissional_id: number;
  cliente_nome: string;
  data: string;
  hora: string;
  profissional_nome: string;
  servico_id: number;
  servico_nome: string;
}

interface Profissional {
  id: number;
  nome: string;
}

export const getAgendamentos = async (): Promise<Agendamento[]> => {
  const db = await getDBConnection();
  const results = await db.executeSql(`
    SELECT 
      a.id,
      a.profissional_id,
      p.nome   AS profissional_nome,
      a.servico_id,
      s.nome   AS servico_nome,
      a.cliente_nome,
      a.data,
      a.hora
    FROM agendamentos a
    LEFT JOIN profissionais p ON a.profissional_id = p.id
    LEFT JOIN servicos     s ON a.servico_id       = s.id;
  `);
  const rows = results[0].rows;
  const list: Agendamento[] = [];
  for (let i = 0; i < rows.length; i++) list.push(rows.item(i));
  return list;
};


const deleteAgendamento = async (
  id: number,
  setAgendamentos: React.Dispatch<React.SetStateAction<Agendamento[]>>
) => {
  const db = await getDBConnection();
  await db.executeSql(`DELETE FROM agendamentos WHERE id = ?;`, [id]);
  const updated = await getAgendamentos();
  setAgendamentos(updated);
};


export default function ListaAgendamentosScreen({ navigation }: Props) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [filtroProfissional, setFiltroProfissional] = useState<number | 'all'>('all');
  const [filtroData, setFiltroData] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Carrega lista de profissionais
  const loadProfissionais = useCallback(async () => {
    const db = await getDBConnection();
    const res = await db.executeSql(`SELECT id, nome FROM profissionais;`);
    const rows = res[0].rows;
    const list: Profissional[] = [];
    for (let i = 0; i < rows.length; i++) list.push(rows.item(i));
    setProfissionais(list);
  }, []);

  const loadAgendamentos = useCallback(async () => {
    const db = await getDBConnection();
    const clauses: string[] = [];

    if (filtroData !== undefined) {
      const dateISO = filtroData.toISOString().slice(0, 10);
      clauses.push(`a.data = '${dateISO}'`);
    }
    if (filtroProfissional !== 'all') {
      clauses.push(`a.profissional_id = ${filtroProfissional}`);
    }


    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const sql = `
    SELECT 
      a.id,
      a.profissional_id,
      p.nome AS profissional_nome,
      a.servico_id,
      s.nome AS servico_nome,
      a.cliente_nome,
      a.data,
      a.hora
    FROM agendamentos a
    JOIN profissionais p ON p.id = a.profissional_id
    LEFT JOIN servicos s ON a.servico_id = s.id
    ${where}
    ORDER BY a.hora ASC;
  `;
    const res = await db.executeSql(sql);
    const rows = res[0].rows;
    const list: Agendamento[] = [];
    for (let i = 0; i < rows.length; i++) list.push(rows.item(i));
    setAgendamentos(list);
  }, [filtroData, filtroProfissional]);

  // Carrega profissionais uma única vez
  useEffect(() => {
    loadProfissionais();
  }, [loadProfissionais]);

  // Recarrega agendamentos quando a tela ganha foco ou filtros mudam
  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      loadAgendamentos();
    });
    return unsub;
  }, [navigation, loadAgendamentos]);

  // Também recarrega agendamentos sempre que o usuário muda filtroData ou filtroProfissional
  useEffect(() => {
    loadAgendamentos();
  }, [loadAgendamentos]);

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Excluir Agendamento',
      'Deseja realmente excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteAgendamento(id, setAgendamentos) }
      ]
    );
  };

  const onChangeDate = (_: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) setFiltroData(selected);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleList}>Agendamentos</Text>

      <View style={GlobalStyles.lineTop}>
        {/* Botão add  */}
        <TouchableOpacity
          style={GlobalStyles.addButton}
          onPress={() =>
            navigation.navigate('CadastroAgendamento', {
              updateList: () => getAgendamentos().then(setAgendamentos),
            })}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={GlobalStyles.TextButton}>Novo Agendamento</Text>
        </TouchableOpacity>
        {/* Botão Limpar Filtros */}
        <TouchableOpacity
          style={GlobalStyles.clearButton}
          onPress={() => { setFiltroProfissional('all'); setFiltroData(undefined); }}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={GlobalStyles.TextButton}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={GlobalStyles.lineTop}>
        <View style={GlobalStyles.pickerContainer}>
          <Picker
            selectedValue={filtroProfissional}
            onValueChange={v => setFiltroProfissional(v)}
          >
            <Picker.Item label="Todos Profissionais" value={'all'} style={GlobalStyles.placeholder} />
            {profissionais.map(p => (
              <Picker.Item key={p.id} label={p.nome} value={p.id} style={GlobalStyles.placeholder} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={GlobalStyles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} />
          <Text style={GlobalStyles.dateText}>
            {filtroData
              ? `${filtroData.getDate().toString().padStart(2, '0')}/` +
              `${(filtroData.getMonth() + 1).toString().padStart(2, '0')}/` +
              `${filtroData.getFullYear()}`
              : 'Data'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={filtroData ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChangeDate}
          />
        )}
      </View>

      <FlatList
        data={agendamentos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={GlobalStyles.cardAg}>
            <View style={GlobalStyles.timeMarker}>
              <MaskedText mask="99/99" style={GlobalStyles.timeText}>{extractDayMonth(item.data)}</MaskedText >
              <Text style={GlobalStyles.timeText}>{item.hora}</Text>
            </View>
            <View style={GlobalStyles.info}>
              <Text style={GlobalStyles.textBold}>{item.cliente_nome}</Text>
              <Text>{item.profissional_nome}</Text>
              <Text><Text style={GlobalStyles.textBold}>Serviço: </Text>{item.servico_nome}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Ionicons name="close" size={24} color="red" style={GlobalStyles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={GlobalStyles.empty}>Nenhum agendamento</Text>}
      />
    </View>
  );
}
