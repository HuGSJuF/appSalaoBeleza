# 💇‍♀️ App de Agendamento para Salão de Beleza

Este é um aplicativo mobile desenvolvido em **React Native** com banco de dados local **SQLite**, criado como parte de um projeto de extensão acadêmica. O app permite a gestão de agendamentos, profissionais e serviços para salões de beleza.

---

## 📱 Funcionalidades

- Cadastro de profissionais
- Cadastro de serviços
- Cadastro de agendamentos
- Listagem de agendamentos
- Filtros por data e por profissional
- Edição e exclusão de registros
- Banco de dados local SQLite
- Interface amigável e responsiva

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Picker](https://github.com/react-native-picker/picker)
- [React Native DateTimePicker](https://github.com/react-native-datetimepicker/datetimepicker)
- [Ionicons](https://ionic.io/ionicons)

---

## ⚙️ Configuração e Execução do Projeto

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente  
```bash
npm install -g expo-cli
```
### 📦 Instalação
Clone este repositório:
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
Acesse a pasta do projeto:
```bash
cd nome-do-repositorio
```

Instale as dependências:
```bash
npm install
# ou
yarn
```
### ▶️ Executando o Projeto
Inicie o servidor de desenvolvimento Expo:

```bash
npx expo start
```
Abra no emulador, no navegador ou no seu celular:
Para rodar no celular, baixe o app Expo Go (Android | iOS).
Escaneie o QR code exibido no terminal ou no navegador.

### 🗄️ Banco de Dados
O app utiliza SQLite local, integrado via Expo SQLite.
O banco é criado automaticamente na primeira execução.
As tabelas são geradas com scripts que estão no arquivo:

```bash
/src/database/DatabaseConnection.ts
```
As entidades incluem:

- Profissionais
- Serviços
- Agendamentos

### 🏗️ Estrutura de Pastas
```plaintext
📦nome-do-repositorio
 ┣ 📂assets           → Imagens e recursos estáticos
 ┣ 📂components       → Componentes reutilizáveis
 ┣ 📂database         → Configuração e conexão com SQLite
 ┣ 📂screens          → Telas do app (Cadastro, Lista, etc.)
 ┣ 📂styles           → Estilos globais
 ┣ 📂types            → Tipagens TypeScript
 ┣ 📂utils            → Funções utilitárias (ex.: formatação de datas)
 ┣ 📜App.tsx          → Arquivo principal do app
 ┗ 📜README.md        → Este documento
```
### 🐞 Problemas Conhecidos

- O app não possui autenticação de usuários.
- Banco de dados local, não sincroniza com nuvem.
- Funciona apenas no dispositivo local onde foi instalado.

### 👨‍🎓 Projeto Acadêmico
Este projeto foi desenvolvido como parte da atividade de extensão do curso de [Seu Curso], na [Sua Faculdade], com foco em aplicar conceitos de desenvolvimento mobile, banco de dados local e design de interfaces.

### 📜 Licença
Este projeto é de código aberto, feito para fins acadêmicos.

### 💌 Contato
Nome: Humberto Gonçalves

[E-mail: megasitebarato@gmail.com](mailto:megasitebarato@gmail.com)

[LinkedIn: hugsjuf](https://www.linkedin.com/in/hugsjuf/)



