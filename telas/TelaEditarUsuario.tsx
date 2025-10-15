import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../components/Api';

export default function TelaEditarUsuario() {

  type UsuarioType = { id: number, nome: string, login: string, senha: string };

  const route = useRoute();
  const { usuario } = route.params as { usuario: UsuarioType };

  const navigation = useNavigation();

  const [id, setId] = useState(String(usuario?.id ?? ''));
  const [nome, setNome] = useState(String(usuario?.nome ?? ''));
  const [login, setLogin] = useState(String(usuario?.login ?? ''));
  const [senha, setSenha] = useState('');

  async function salvarAlteracoes() {
    try {
      const resp = await api.put('usuarios', {
        id: id,
        nome: nome,
        login: login,
        senha: senha ? senha : undefined 
      });

      Alert.alert('Sucesso', resp.data.message || 'Usuário alterado!');
      navigation.navigate('ListarUsuarios' as never);
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message || 'Deu erro!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Cadastro de Usuário</Text>

      <View style={styles.bloco}>
        <TextInput
          placeholder='ID ...'
          value={id}
          editable={false}
          style={styles.input}
        />

        <TextInput
          placeholder='Digite seu nome ...'
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder='Digite seu Login ...'
          value={login}
          onChangeText={setLogin}
          style={styles.input}
        />

        <TextInput
          placeholder='Digite nova Senha (opcional) ...'
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.btn} onPress={salvarAlteracoes}>
          <Text style={styles.txtBtn}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232946', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#121629', 
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 28,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1
  },
  bloco: {
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    backgroundColor: '#fff', 
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#232946'
  },
  input: {
    borderWidth: 2,
    borderColor: '#232946', 
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    fontSize: 18,
    color: '#232946',
    backgroundColor: '#f7f7f7'
  },
  btn: {
    backgroundColor: '#121629', 
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#232946', 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 16
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff', 
    fontWeight: 'bold',
    letterSpacing: 1
  }
});