import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Cliente from '../components/Cliente';

import api from '../components/Api';

import {useNavigation,} from '@react-navigation/native';

type ClienteType = { id: number; nome: string; cpf: string; saldo: number };

export default function ListarClientes() {

    const navigation = useNavigation();

    const [clientes, setCliente] = useState<ClienteType[]>([]);

    async function buscaClientes(){
        const response = await api.get('clientes');
        setCliente(response.data);
    }

    useEffect(
        ()=>{
            buscaClientes();
        },[]
    );

    async function excluir(id: number) {
            try {
               const r = await api.delete(`clientes/${id}`);

                Alert.alert(
                "Excluir",`${JSON.stringify(r.data)}`
                );

                await buscaClientes();
            } catch (e: any) {
                Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
            }
    }

   function editar(item: ClienteType){
  navigation.navigate('TelaEditar' as never, { cliente: item } as never);
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
                data={clientes}
                keyExtractor={(item)=> String(item.id)}
                renderItem={({item})=><Cliente nome={item.nome} cpf={item.cpf} saldo={item.saldo} 
                id={item.id} onExcluir={()=>excluir(item.id)} onEditar={()=>editar(item)}/>}
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
    backgroundColor: '#121629', 
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
    backgroundColor: '#232946', 
    borderRadius: 15,
    alignSelf: 'center'
  }
});