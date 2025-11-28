import {
    Text,
    View,
    Button,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import nasaClient from '../utils/nasaClient';
interface Nasa {
    url: string
    data: string
}

const FotoDoDia = () => {
    const api = 'bEpYLeLAMf1xNhdYsXkdTPwlaqWuOyzlmqmeeR3Q'
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${api}`
    const [NasaPhoto, setNasaPhoto] = useState<string>('')
    const [DataPhoto, setDataPhoto] = useState<string>('')
    const [NasaPhotos, setNasaPhotos] = useState<Nasa[]>([])

    // OnBuscaNasa = (termo) =>{
    //    GET https://api.nasa.gov/planetary/apod
    // }
    const FotoDia = async () => {
        try {
            const response = await nasaClient.get(apiUrl)

            const urlNasa: Nasa = {
                url: response.data.url,
                data: response.data.date
            }
            setNasaPhotos(imgUrl => [...imgUrl, urlNasa])
            setNasaPhoto(response.data.url)
            setDataPhoto(response.data.date)
            const chave = "foto_" + DataPhoto
            const foto = {
                data: DataPhoto,
                url: NasaPhoto
            }
            await AsyncStorage.setItem(chave, JSON.stringify(foto))
        } catch (err) {
            console.log(err)
        }
    }
    // try {
    //     const response = await nasaClient.get(apiUrl)
    //     const url = response.data.url
    //     const data = response.data.date
    //     setNasaPhoto(url)
    //     setDataPhoto(data)
    //     const chave = "foto_" + data
    //     const foto = {
    //         data: data,
    //         url: url
    //     }
    //     await AsyncStorage.setItem(chave, JSON.stringify(foto))
    // } catch (err) {
    //     console.log(err)
    // }
    // };
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Button title='mostrar' onPress={() => FotoDia()}/>
            {NasaPhotos.map((foto) => (
                <View key={foto.data} style={{
                    height: 150,
                    width: 150,
                    borderRadius: 16,
                    margin: 20,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: 4
                }} >
                    <Image
                        source={{ uri: foto.url }}
                        style={{ width:'100%', height:'100%',borderRadius: 10, flexDirection:'row'}}
                    />
                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 12 }}>{foto.data}</Text>
                </View>
            ))}
        </View>
    )
}

export default FotoDoDia
{/* <Text style={{ color: 'white', textAlign: 'left' }}>{DataPhoto}</Text> */ }