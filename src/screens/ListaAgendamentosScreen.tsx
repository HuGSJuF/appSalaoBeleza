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
  const [filtroProfissional, setFiltroProfissional] = useState<number | undefined>(undefined);
  const [filtroData, setFiltroData] = useState<Date | undefined>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log(agendamentos)
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
    if (filtroProfissional !== undefined) {
      clauses.push(`a.profissional_id = ${filtroProfissional}`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const sql = `
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
      JOIN profissionais p ON p.id = a.profissional_id
      LEFT JOIN servicos     s ON a.servico_id       = s.id;
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
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>

      <View style={styles.lineTop}>
        {/* Botão add  */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('CadastroAgendamento', {
              updateList: () => getAgendamentos().then(setAgendamentos),
            })}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.TextButton}>Novo Agendamento</Text>
        </TouchableOpacity>
        {/* Botão Limpar Filtros */}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => { setFiltroProfissional(undefined); setFiltroData(undefined); }}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.TextButton}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineTop}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filtroProfissional}
            onValueChange={v => setFiltroProfissional(v)}
          >
            <Picker.Item label="Todos Profissionais" value={undefined} />
            {profissionais.map(p => (
              <Picker.Item key={p.id} label={p.nome} value={p.id} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} />
          <Text style={styles.dateText}>
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
          <View style={styles.card}>
            <View style={styles.timeMarker}>
              <MaskedText mask="99/99" style={styles.timeText}>{extractDayMonth(item.data)}</MaskedText >
              <Text style={styles.timeText}>{item.hora}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.textBold}>{item.cliente_nome}</Text>             
               <Text>{item.profissional_nome}</Text>
              <Text><Text style={styles.textBold}>Serviço: </Text>{item.servico_nome}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Ionicons name="close" size={24} color="red" style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum agendamento</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  lineTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  addButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#00CF56', padding: 8, borderRadius: 8
  },
  clearButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FF6B6B', padding: 8, borderRadius: 8, marginLeft: 8
  },
  TextButton: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
  pickerContainer: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, marginRight: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  dateButton: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8
  },
  dateText: { marginLeft: 6 },
  card: {
    flexDirection: 'row', borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, marginBottom: 8, overflow: 'hidden'
  },
  timeMarker: {
    width: 60, backgroundColor: '#7D5FFF',
    justifyContent: 'center', alignItems: 'center'
  },
  timeText: { color: '#fff', fontWeight: 'bold' },
  info: { flex: 1, padding: 8 },
  textBold: { fontWeight: 'bold', fontSize: 16 },
  deleteIcon: { marginRight: 8, marginTop: 8 },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 }
});
