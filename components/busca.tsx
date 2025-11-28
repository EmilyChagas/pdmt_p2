import { Text, StyleSheet, Image, FlatList, Button, View, TextInput, Pressable } from "react-native";
import nasaClient from "../utils/nasaClient";
import { useState } from "react";
const limitarTexto = (texto: string | undefined | null, limite: number) => {
    if (!texto || typeof texto !== 'string') {
        return 'Detalhe não disponível'
    }
    
    if (texto.length > limite) {
        return texto.substring(0, limite) + '...'
    }
    return texto
}

const BuscarNasa = () => {

    const [NasaBusca, setNasaBusca] = useState<string>('')
    const [DataBusca, setDataBusca] = useState<string>('')
    const [NasaBuscar, setNasaBuscar] = useState<any[]>([]) 
    const [limite] = useState<number>(10)
    const termoBusca = async () => {
        if (NasaBusca === '')
            return
        try {
            const respond = await fetch(`http://localhost:3000/search?busca=${NasaBusca}`)

            const dadoNasa = await respond.json()
            const itensBuscados = dadoNasa.items || []
            setNasaBuscar(itensBuscados.slice(0, limite))
        } catch (err) {
            console.log('Erro')
        }
    }

    const BuscarAno = async (ano: string) => {
        const respond = await fetch(`http://localhost:3000/search-year?ano=${ano}`)
        const dadoNasa = await respond.json()

        const filtroBusca = dadoNasa.items || []
        setNasaBuscar(filtroBusca.slice(0, limite))
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {['2020', '2021', '2022', '2023', '2024'].map((ano) => (
              <Pressable
                  key={ano} 
                  onPress={() => BuscarAno(ano)}
                  style={styles.buttonFiltro}>
                  <Text style={{ color: '#FF8630', textAlign: 'center', fontSize: 18 }}>{ano}</Text>
              </Pressable>
                ))}
                <View style={{ marginRight: 20 }}></View>
                <Pressable
                    style={styles.buttonDestaque}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, }}>2025</Text>
                </Pressable>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, flexDirection: 'row'}}>
                <TextInput
                    style={styles.input}
                    value={NasaBusca}
                    onChangeText={setNasaBusca}
                    placeholder="Digite o termo de busca "
                />
                <Pressable
                    style={styles.button}
                    onPress={termoBusca}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }} >buscar</Text>
                </Pressable>
                </View>
                <FlatList
                    data={NasaBuscar}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const imagem = item.links ? item.links[0].href : null

                        if (!imagem)
                            return null
                        return (
                            <View style={{
                                height: 150,
                                width: 250,
                                borderRadius: 16,
                                margin: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingBottom: 4,
                            }}>
                                <Text style={{ color: 'white', textAlign: 'left', fontSize: 14 }}>
                                    {limitarTexto(item.data[0].title, 40)}
                                </Text>
                                <Image
                                    source={{ uri: imagem }}
                                    style={{ width: '70%', height: '70%', borderRadius: 10, backgroundColor: '#fff' }}
                                >
                                </Image>
                                <Text style={{ color: 'white', textAlign: 'left', fontSize: 11, marginTop: 5 }}>
                                    {limitarTexto(item.data[0].description, 40)}
                                </Text>
                            </View>

                        )
                    }
                    }

                />
            </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center'
    },
    button: {
        width: '20%',
        height: '80%',
        backgroundColor: '#323b5fff',
        borderRadius: 16,
        marginLeft:10,
        paddingTop: 5
    },
    buttonFiltro: {
        width: 50,
        height: 50,
        marginLeft: 25,
        backgroundColor: "#fff",
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDestaque: {
        width: 55,
        height: 55,
        backgroundColor: "#FF8630",
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: '100%',
        textAlign: 'left',
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#D9D9D9'
    }
})
export default BuscarNasa