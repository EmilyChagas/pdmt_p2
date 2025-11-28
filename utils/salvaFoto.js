import AsyncStorage from '@react-native-async-storage/async-storage'
import nasaClient from './nasaClient'

const api = 'bEpYLeLAMf1xNhdYsXkdTPwlaqWuOyzlmqmeeR3Q'
const apiUrl = `api.nasa.gov{api}`

const buscarESalvarFotoDoDia = async () => {
    try {
        const resposta = await nasaClient.get(apiUrl)
        const dados = resposta.data
        const chave = "foto_" + dados.date
        
        const fotoExistente = await AsyncStorage.getItem(chave)
        
        if (!fotoExistente) {
            const foto = {
                data: dados.date,
                url: dados.url,
                id: chave
            }
            await AsyncStorage.setItem(chave, JSON.stringify(foto))
            console.log("Nova foto do dia salva automaticamente no Storage")
        } else {
            console.log("Foto do dia já existe no Storage, não precisa buscar novamente")
        }

    } catch (erro) {
        console.log("Erro ao buscar ou salvar a foto do dia:", erro)
    }
}
buscarESalvarFotoDoDia()
export { buscarESalvarFotoDoDia }
