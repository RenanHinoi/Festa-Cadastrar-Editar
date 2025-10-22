import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';

interface propCliente{
    id:number,
    nome:String,
    cpf:String,
    saldo:number,
    onExcluir?: () => void,
    onEditar?: () => void
}

export default function Cliente({id, nome, cpf, saldo,  onExcluir, onEditar}:propCliente) {
 return (
   <>
        <Text style={styles.texto}>Cod.: {id}</Text>
        <Text style={styles.texto}>Nome: {nome}</Text>
        <Text style={styles.texto}>CPF: {cpf}</Text>
        <Text style={styles.texto}>Saldo: {saldo}</Text>

        <View style={styles.row}>
            <TouchableOpacity style={styles.btn}  onPress={onExcluir}>
                <Text style={styles.txtBtn}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn2} onPress={onEditar}>
                <Text style={styles.txtBtn}>Editar</Text>
            </TouchableOpacity>
        </View>
   </>
  );
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 22,
        color: '#ffffff', 
        marginBottom: 2,
        textAlign: 'center'
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    btn: {
        flex: 1,
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 8,
        margin: 10,
        borderWidth: 2,
        borderColor: '#ffffff', 
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    btn2: {
        flex: 1,
        backgroundColor: 'red', 
        padding: 15,
        borderRadius: 8,
        margin: 10,
        borderWidth: 2,
        borderColor: '#ffffff', 
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    txtBtn: {
        textAlign: 'center',
        color: '#ffffff', 
        fontWeight: 'bold'
    }
});