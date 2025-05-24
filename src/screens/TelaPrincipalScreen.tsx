import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function TelaPrincipal({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Salão Vanessa Santos</Text>

      <View style={styles.menuContainer}>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('ListaProfissionais')}
        >
          <Ionicons name="person" size={40} color="#fff" />
          <Text style={styles.textoBotao}>Profissionais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('ListaAgendamentos')}
        >
          <Ionicons name="calendar" size={40} color="#fff" />
          <Text style={styles.textoBotao}>Agendamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('ListaServicos')}
        >
          <Ionicons name="cut" size={40} color="#fff" />
          <Text style={styles.textoBotao}>Serviços</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Clientes')}
        >
          <Ionicons name="people" size={40} color="#fff" />
          <Text style={styles.textoBotao}>Clientes</Text>
        </TouchableOpacity> */}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  botao: {
    backgroundColor: '#7D3C98',
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});
