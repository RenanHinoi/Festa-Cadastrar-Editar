import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Usuario from '../components/Usuario';
import api from '../components/Api';
import { useNavigation } from '@react-navigation/native';

type UsuarioType = { id: number; nome: string; login: string };

export default function ListarUsuarios() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

  async function buscaUsuarios() {
    const response = await api.get('usuarios');
    setUsuarios(response.data);
  }

  useEffect(() => {
    buscaUsuarios();
  }, []);

  async function excluir(id: number) {
    try {
      const r = await api.delete(`usuarios/${id}`);
      Alert.alert("Excluir", `${JSON.stringify(r.data)}`);
      await buscaUsuarios();
    } catch (e: any) {
      Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
    }
  }

  function editar(item: UsuarioType) {
    navigation.navigate('TelaEditarUsuario' as never, { usuario: item } as never);
  }

  return (
    <>
      <View style={styles.bloco}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('TelaCadUsuario' as never)}
        >
          <Text style={styles.txtBtn}>Cadastrar Novo Usuário</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>Lista de Usuários</Text>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Usuario
              nome={item.nome}
              login={item.login}
              id={item.id}
              onExcluir={() => excluir(item.id)}
              onEditar={() => editar(item)}
            />
          )}
          style={styles.lista}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff', 
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  btn: {
    backgroundColor: '#191970', 
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff', 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  bloco: {
    width: '100%'
  },
  lista: {
    width: '90%',
    height: '75%',
    backgroundColor: '#191970', 
    borderRadius: 15,
    alignSelf: 'center'
  }
});