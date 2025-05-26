import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getProfissionais, Profissional } from '../database/ProfissionalService';
import { addAgendamento, Agendamento } from '../database/AgendamentoService';
import { Picker } from '@react-native-picker/picker';
import { Servico } from '../database/ServicosService';
import { getServicos } from './ListaServicosScreen';
import { GlobalStyles } from '../styles/GlobalStyles';

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
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Novo Agendamento</Text>

            <View style={[GlobalStyles.pickerContainer, GlobalStyles.pickerContainerAg]}>
                <Picker
                    selectedValue={profissionalId}
                    onValueChange={setProfissionalId}
                >
                    <Picker.Item label="Selecione o profissional..." value={undefined} style={GlobalStyles.placeholder}  />
                    {profissionais.map(p => (
                        <Picker.Item key={p.id} label={p.nome} value={p.id} style={GlobalStyles.placeholder}  />
                    ))}
                </Picker>
            </View>

            <View style={[GlobalStyles.pickerContainer, GlobalStyles.pickerContainerAg]}>
                <Picker selectedValue={servicoId} onValueChange={setServicoId}>
                    <Picker.Item label="Selecione o serviço..." value={undefined} style={GlobalStyles.placeholder}  />
                    {servicos.map(s => (
                        <Picker.Item key={s.id} label={s.nome} value={s.id} style={GlobalStyles.placeholder}  />
                    ))}
                </Picker>
            </View>

            <TextInput
                style={GlobalStyles.input}
                placeholder="Ex: Ana Souza"
                placeholderTextColor="gray"
                value={cliente}
                onChangeText={setCliente}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={GlobalStyles.inputPlace}>
                <Text style={GlobalStyles.labelPlace}>Data:</Text>
                <Text style={GlobalStyles.value}>{`${data.getDate().toString().padStart(2, '0')}/` +
                    `${(data.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${data.getFullYear()}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={GlobalStyles.inputPlace}>
                <Text style={GlobalStyles.labelPlace}>Hora:</Text>
                <Text style={GlobalStyles.value}>{`${hora.getHours().toString().padStart(2, '0')}:` +
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

            <TouchableOpacity
                style={GlobalStyles.button}
                onPress={handleSave}
            >
                <Text style={GlobalStyles.buttonText}>Salvar Agendamento</Text>
            </TouchableOpacity>
        </View>
    );
}


