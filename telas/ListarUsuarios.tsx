import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Usuarios from '../components/Usuario';

import api from '../components/Api';

import {useNavigation,} from '@react-navigation/native';

type UsuarioType = { id: number; nome: string; login: string };

export default function ListarUsuarios() {

    const navigation = useNavigation();

    const [usuario, setUsuarios] = useState<UsuarioType[]>([]);

    async function buscaUsuarios(){
        const response = await api.get('usuarios');
        setUsuarios(response.data);
    }

    useEffect(
        ()=>{
            buscaUsuarios();
        },[]
    );

    async function excluir(id: number) {
            try {
               const r = await api.delete(`usuario/${id}`);

                Alert.alert(
                "Excluir",`${JSON.stringify(r.data)}`
                );

                await buscaUsuarios();
            } catch (e: any) {
                Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
            }
    }

    function editar(item: UsuarioType){
      navigation.navigate('TelaEditar' as never, {usuario : item} as never);
    }
 return (
    <>
        <View style={styles.bloco}>
            <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('TelaCad' as never)}>
                <Text style={styles.txtBtn}>Cadastrar Novo Cliente</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.bloco}>
            <Text style={styles.titulo}> Lista de Clientes </Text>

            <FlatList 
                data={usuario}
                keyExtractor={(item)=> String(item.id)}
                renderItem={({item})=><Usuarios nome={item.nome} login={item.login} 
                id={item.id} onExcluir={()=>excluir(item.id)} onEditar={()=>editar(item)}/>}
                style={styles.lista}
            />

        </View>       
    </>   
  );
}

const styles = StyleSheet.create({
  titulo:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20
  },
  btn:{
    backgroundColor:'#669988',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:20,
    padding:20,
    borderRadius:20
  },
  txtBtn:{
    textAlign:'center',
    fontSize:20
  },
  bloco:{
    width:'100%'
  },
  lista:{
    width:'80%',
    height:'70%'
  }
});