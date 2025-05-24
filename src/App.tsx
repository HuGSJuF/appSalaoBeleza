import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/RootStackParams';

import TelaLogin from './screens/TelaLoginScreen';
import TelaPrincipal from './screens/TelaPrincipalScreen';
import CadastroProfissional from './screens/CadastroProfissionalScreen';
import TelaCadastroAdmin from './screens/TelaCadastroAdminScreen';
import { enableScreens } from 'react-native-screens';
import { useEffect } from 'react';
import { createTables } from './database/DatabaseSetup';
import ListaAgendamentosScreen from './screens/ListaAgendamentosScreen';
import ListaServicosScreen from './screens/ListaServicosScreen';
import ListaProfissionaisScreen from './screens/ListaProfissionaisScreen';
import CadastroAgendamentoScreen from './screens/CadastroAgendamentoScreen';
import CadastroServicosScreen from './screens/CadastroServicosScreen';


enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    createTables();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TelaPrincipal} options={{ title: 'Tela Principal' }} />
        <Stack.Screen name="CadastroProfissional" component={CadastroProfissional} options={{ title: 'Cadastro de Profissional' }} />
        <Stack.Screen name="CadastroServico" component={CadastroServicosScreen} options={{ title: 'Cadastro de Serviços' }} />
        <Stack.Screen name="CadastroAgendamento" component={CadastroAgendamentoScreen} options={{ title: 'Novo Agendamento' }} />
        <Stack.Screen name="ListaAgendamentos" component={ListaAgendamentosScreen} options={{ title: 'Agendamentos' }} />
        <Stack.Screen name="ListaServicos" component={ListaServicosScreen} options={{ title: 'Serviços' }} />
        <Stack.Screen name="ListaProfissionais" component={ListaProfissionaisScreen} options={{ title: 'Profissionais' }} />
        <Stack.Screen name="CadastroAdmin" component={TelaCadastroAdmin} options={{ title: 'Cadastro de Administrador' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
