export type RootStackParamList = {
  Login: undefined;
  CadastroAdmin: undefined;
  CadastroServico: { updateList: () => void };
  Home: undefined;
  CadastroProfissional: { updateList: () => void };
  CadastroAgendamento: { updateList: () => void };
  ListaProfissionais: undefined;
  ListaServicos: undefined;
  ListaAgendamentos: undefined;
};