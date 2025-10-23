 import { useState } from 'react';
 import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
 
 import {useNavigation,} from '@react-navigation/native';
 
 import api from '../components/Api';
 
 export default function TelaCadUsuario() {
 
  const navigation = useNavigation();
 
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha,setSenha] = useState('');
  return (
     <>
         <View style={styles.container}>
               <Text>Cadastro de Usuário</Text>
         
               <View style={styles.bloco}>
                 
                 <TextInput 
                     placeholder='Digite seu nome ...'
                     value={nome}
                     onChangeText={(value)=>setNome(value)}
                 />
 
                 <TextInput 
                     placeholder='Digite seu Login ...'
                     value={login}
                     onChangeText={(value)=>setLogin(value)}
                 />
 
 
                 <TextInput 
                     placeholder='Digite sua Senha ...'
                     value={senha}
                     onChangeText={(value)=>setSenha(value)}
                 />
 
                 <TouchableOpacity  style={styles.btn}>
                   <Text style={styles.txtBtn} onPress={async ()=> {
                     try{
                         const resp = await api.post('usuario',{
                                     nome: nome,
                                     login:login,
                                     senha:senha
                                 });
 
                                 alert(JSON.stringify(resp.data.message));
                                 navigation.navigate('ListarUsuarios' as never);
                         }catch{
                                 alert("Deu erro!");
                         }        
                     }
                         
                     }
                   >Cadastrar</Text>
                 </TouchableOpacity>
         
                 
         
               </View>
             </View>
 
    </>
   );
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff', 
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20
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
  btn: {
    backgroundColor: '#191970', 
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#232946', 
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff', 
    fontWeight: 'bold',
    letterSpacing: 1
  }
});