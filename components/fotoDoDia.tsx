import {
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    Pressable
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react' 

import buscarESalvarFotoDoDia  from "../utils/salvaFoto";

interface Nasa {
    url: string
    data: string
    id: string
}

const FotoDoDia = () => {
    const [fotosNasa, setFotosNasa] = useState<Nasa[]>([])
    const [carregado, setCarregado] = useState(false)
    const [NasaPhoto, setNasaPhoto] = useState<string>('')
    const [DataPhoto, setDataPhoto] = useState<string>('')
    
    const GeraFotoDia = async () =>{
                try {
            const response = await fetch('http://localhost:3000/apod')
            const NasaImagem = await response.json()
            const urlNasa: Nasa = {
                id: NasaImagem.id,
                url: NasaImagem.url,
                data: NasaImagem.date,
                
            }
            setFotosNasa(imgUrl => [...imgUrl, urlNasa])
            setNasaPhoto(NasaImagem.url)
            setDataPhoto(NasaImagem.date)
            const chave = "foto_" + DataPhoto
            const foto = {
                data: DataPhoto,
                url: NasaPhoto,
                
            }
            
            await AsyncStorage.setItem(chave, JSON.stringify(foto))
        } catch (err) {
            console.log(err)
        }
    }
    

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
            <Pressable
            onPress={()=>GeraFotoDia()} 
            > teste</Pressable>
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