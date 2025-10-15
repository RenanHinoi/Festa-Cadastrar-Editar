import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import api from '../components/Api';

export default function TelaEditar() {

type ClienteType = {id:number, nome: string, cpf: string, saldo: number};

const route = useRoute();

const {cliente} = route.params as {cliente: ClienteType};

 const navigation = useNavigation();

 const [id, setId] = useState(String(cliente?.id ?? ''));
 const [nome, setNome] = useState(String(cliente?.nome ?? ''));
 const [cpf, setCpf] = useState(String(cliente?.cpf ?? ''));
 const [saldo, setSaldo] = useState(String(cliente?.saldo ?? ''));
 return (
    <>
        <View style={styles.container}>
              <Text>Editar Cadastro do Cliente</Text>
        
              <View style={styles.bloco}>
                <TextInput 
                    placeholder='ID ...'
                    value={id}
                    onChangeText={(value)=>setId(value)}
                    editable={false}
                />
                
                <TextInput 
                    placeholder='Digite seu nome ...'
                    value={nome}
                    onChangeText={(value)=>setNome(value)}
                />

                <TextInput 
                    placeholder='Digite seu CPF ...'
                    value={cpf}
                    onChangeText={(value)=>setCpf(value)}
                />


                <TextInput 
                    placeholder='Digite o saldo ...'
                    value={saldo}
                    onChangeText={(value)=>setSaldo(value)}
                />

                <TouchableOpacity  style={styles.btn}>
                  <Text style={styles.txtBtn} onPress={async ()=> {
                    try{
                        const resp = await api.put('clientes',{
                                    id:id,
                                    nome: nome,
                                    cpf:cpf,
                                    saldo:saldo
                                });

                                alert(JSON.stringify(resp.data.message));
                                navigation.navigate('ListarClientes' as never);
                        }catch{
                                alert("Deu erro!");
                        }        
                    }
                        
                    }
                  >Salvar Alterações</Text>
                </TouchableOpacity>
        
                
        
              </View>
            </View>

   </>
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