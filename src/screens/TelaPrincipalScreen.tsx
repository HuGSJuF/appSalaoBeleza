import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParams';
import Ionicons from '@react-native-vector-icons/ionicons';
import { GlobalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function TelaPrincipal({ navigation }: Props) {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleHome}>Salão Vanessa Santos</Text>

      <View style={GlobalStyles.menuContainer}>

        <TouchableOpacity
          style={GlobalStyles.buttonHome}
          onPress={() => navigation.navigate('ListaProfissionais')}
        >
          <Ionicons name="person" size={40} color="#fff" />
          <Text style={GlobalStyles.buttonTextHome}>Profissionais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.buttonHome}
          onPress={() => navigation.navigate('ListaAgendamentos')}
        >
          <Ionicons name="calendar" size={40} color="#fff" />
          <Text style={GlobalStyles.buttonTextHome}>Agendamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.buttonHome}
          onPress={() => navigation.navigate('ListaServicos')}
        >
          <Ionicons name="cut" size={40} color="#fff" />
          <Text style={GlobalStyles.buttonTextHome}>Serviços</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};