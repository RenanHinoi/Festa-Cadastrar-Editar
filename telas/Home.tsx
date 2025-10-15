import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciador de Festa</Text>

      <View style={styles.bloco}>

          <TouchableOpacity style={styles.btn}
            onPress={()=>navigation.navigate('ListarClientes' as never)}
          >
              <Text style={styles.txtBtn}>Clientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}
            onPress={()=>navigation.navigate('ListarUsuarios' as never)}
          >
              <Text style={styles.txtBtn}>Usuários</Text>
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
    fontSize: 38,
    fontWeight: 'bold',
    color: '#ffffff', 
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30
  },
  btn: {
    backgroundColor: '#121629', 
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    padding: 22,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 22,
    color: '#ffffff', 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  bloco: {
    width: '100%'
  }
});