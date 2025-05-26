import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import { getDBConnection } from '../database/DatabaseConnection';
import Ionicons from '@react-native-vector-icons/ionicons';
import { MaskedText } from "react-native-mask-text";
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaProfissionais'>;

export const getProfissionais = async () => {
    const db = await getDBConnection();
    const results = await db.executeSql(`SELECT * FROM profissionais;`);
    const rows = results[0].rows;
    const profissionais = [];
    for (let i = 0; i < rows.length; i++) {
        profissionais.push(rows.item(i));
    }

    console.log('profissionais cadastrados:', profissionais);
    return profissionais;
}

// Função para excluir um profissional do banco de dados
const deleteProfissional = async (id: number, setProfissionais: React.Dispatch<React.SetStateAction<any[]>>) => {
    const db = await getDBConnection();

    // Deleta o profissional no banco
    await db.executeSql(`DELETE FROM profissionais WHERE id = ?;`, [id]);

    // Atualiza a lista de profissionais após a exclusão
    const updatedProfissionais = await getProfissionais();
    setProfissionais(updatedProfissionais);  // Atualiza o estado
};


export default function ListaProfissionaisScreen({ navigation }: Props) {
    // Estado para armazenar os profissionais
    const [profissionais, setProfissionais] = useState<any[]>([]);

    // Carregar profissionais ao montar o componente
    useEffect(() => {
        const loadProfissionais = async () => {
            const data = await getProfissionais();
            setProfissionais(data); // Atualiza o estado com os dados
        };

        // ao montar e sempre que voltar a esta tela:
        const unsub = navigation.addListener('focus', loadProfissionais);
        return unsub;
    }, [navigation]);

    // Função para confirmar a exclusão
    const confirmDelete = (id: number) => {
        Alert.alert(
            "Excluir Profissional",
            "Tem certeza de que deseja excluir este profissional?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => deleteProfissional(id, setProfissionais)
                }
            ]
        );
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Profissionais</Text>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('CadastroProfissional', {
                        // Passando a função setProfissionais para atualizar a lista
                        updateList: () => {
                            getProfissionais().then(setProfissionais);
                        },
                    })
                }
            >
                <Text style={GlobalStyles.link}>Cadastrar Profissional</Text>
            </TouchableOpacity>
            <FlatList
                data={profissionais}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={GlobalStyles.card}>
                        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                            <Ionicons name="close" size={24} color="red" style={GlobalStyles.deleteIcon} />
                        </TouchableOpacity>
                        <Text style={GlobalStyles.text}>
                            <Text style={GlobalStyles.boldText}>Nome: </Text>{item.nome}
                        </Text>
                        <Text style={GlobalStyles.text}>
                            <Text style={GlobalStyles.boldText}>Especialidade: </Text>{item.especialidade}
                        </Text>
                        <Text style={GlobalStyles.text}>
                            <Text style={GlobalStyles.boldText}>Telefone: </Text>
                            <MaskedText mask="(99) 99999-9999" style={GlobalStyles.text}>
                                {item.telefone}
                            </MaskedText>
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};