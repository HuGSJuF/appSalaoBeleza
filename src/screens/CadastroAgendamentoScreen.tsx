import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getProfissionais, Profissional } from '../database/ProfissionalService';
import { addAgendamento, Agendamento } from '../database/AgendamentoService';
import { Picker } from '@react-native-picker/picker';
import { Servico } from '../database/ServicosService';
import { getServicos } from './ListaServicosScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroAgendamento'>;

export default function CadastroAgendamentoScreen({ navigation }: Props) {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [profissionalId, setProfissionalId] = useState<number>();
    const [servicoId, setServicoId] = useState<number>();
    const [cliente, setCliente] = useState('');

    // estados para date/time picker
    const [data, setData] = useState<Date>(new Date());
    const [hora, setHora] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        getProfissionais().then(setProfissionais);
        getServicos().then(setServicos);
    }, []);

    const onChangeDate = (_: any, selected?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selected) setData(selected);
    };
    const onChangeTime = (_: any, selected?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selected) setHora(selected);
    };

    const handleSave = async () => {
        if (
            !profissionalId ||
            !servicoId ||
            !cliente.trim()
        ) {
            Alert.alert('Erro', 'Selecione profissional, serviço e insira nome do cliente.');
            return;
        }

        // formata data e hora
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataISO = `${ano}-${mes}-${dia}`;

        const hh = String(hora.getHours()).padStart(2, '0');
        const mm = String(hora.getMinutes()).padStart(2, '0');
        const horaStr = `${hh}:${mm}`;

        const ag: Agendamento = {
            profissional_id: profissionalId,
            servico_id: servicoId,
            cliente_nome: cliente,
            data: dataISO,
            hora: horaStr
        };

        try {
            await addAgendamento(ag);
            Alert.alert('Sucesso', 'Agendamento cadastrado!');
            navigation.goBack();
        } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novo Agendamento</Text>

            <Text style={styles.label}>Profissional</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={profissionalId}
                    onValueChange={setProfissionalId}
                >
                    <Picker.Item label="Selecione..." value={undefined} />
                    {profissionais.map(p => (
                        <Picker.Item key={p.id} label={p.nome} value={p.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Serviço</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={servicoId} onValueChange={setServicoId}>
                    <Picker.Item label="Selecione..." value={undefined} />
                    {servicos.map(s => (
                        <Picker.Item key={s.id} label={s.nome} value={s.id} />
                    ))}
                </Picker>
            </View>


            <Text style={styles.label}>Nome do Cliente</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Ana Souza"
                value={cliente}
                onChangeText={setCliente}
            />

            <Text style={styles.label}>Data</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{`${data.getDate().toString().padStart(2, '0')}/` +
                    `${(data.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${data.getFullYear()}`}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
                <Text>{`${hora.getHours().toString().padStart(2, '0')}:` +
                    `${hora.getMinutes().toString().padStart(2, '0')}`}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={data}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    locale="pt-BR"
                    onChange={onChangeDate}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={hora}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
                    locale="pt-BR"
                    is24Hour={true}  
                    onChange={onChangeTime}
                />
            )}

            <View style={styles.button}>
                <Button title="Salvar Agendamento" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginTop: 12 },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8
    },
    button: { marginTop: 20, borderRadius: 8, overflow: 'hidden' }
});
