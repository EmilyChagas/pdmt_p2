import {
    Text,
    View,
    Image,
    StyleSheet,
    Button
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react' 

import {buscarESalvarFotoDoDia}  from "../utils/salvaFoto";

interface Nasa {
    url: string
    data: string
    id: string
}

const FotoDoDia = () => {
    const [fotosNasa, setFotosNasa] = useState<Nasa[]>([])
    const [carregado, setCarregado] = useState(false)

    const carregarFotosSalvas = async () => {
        try {
            const chaves = await AsyncStorage.getAllKeys()
            const itensSalvos = await AsyncStorage.multiGet(chaves)

            const fotosFormatadas: Nasa[] = itensSalvos
                .map(([chave, valor]) => {
                    if (valor) {
                        return JSON.parse(valor)
                    }
                    return null
                })
                .filter((foto): foto is Nasa => foto !== null)
            setFotosNasa(fotosFormatadas)
            setCarregado(true)
        } catch (erro) {
            console.log("Erro ao carregar fotos do storage:", erro)
        }
    }

    if (!carregado) {
        carregarFotosSalvas() 
    }


    return (
        <View style={styles.container}>
            {fotosNasa.map((foto) => (
                <View key={foto.id} style={styles.cartaoFoto} >
                    <Image
                        source={{ uri: foto.url }}
                        style={styles.imagemFoto}
                    />
                    <Text style={styles.textoData}>{foto.data}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10
    },
    cartaoFoto: {
        height: 100,
        width: 100,
        borderRadius: 16,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 4
    },
    imagemFoto: {
        width: '100%', 
        height: '100%', 
        borderRadius: 10,
    },
    textoData: {
        color: 'white', 
        textAlign: 'left', 
        fontSize: 12,
    }
})

export default FotoDoDia