require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express= require('express')
const app = express()
app.use(cors())

app.get('/apod', async(req,res) =>{
    const nasaClientApod = axios.create({
        baseURL: 'https://api.nasa.gov/planetary/',
    })

const resultado = await nasaClientApod.get('/apod',{
    params:{
            api_key: process.env.NASA_KEY
        }
    })
    res.json(resultado.data)
})

app.get('/search', async(req,res) => {
    const busca = req.query.busca
    
    if(!busca) {
        return res.status(400).json({erro:'sem termo de busca'})
    }

    const nasaBusca = axios.create({
        baseURL: 'https://images-api.nasa.gov/'
    })

    const resultado = await nasaBusca.get('/search', {
        params: {
            q: busca,
            media_type: 'image'
        }
    })
    res.json({ items: resultado.data.collection.items })
})

app.get('/search-year', async (req,res) =>{
    const ano = req.query.ano

    
        const nasaAno = axios.create({
            baseURL:'https://images-api.nasa.gov/'
        })
        const resultado = await nasaAno.get('/search', {
            params:{
                year_start: ano,
                year_end: ano,
                media_type: 'image'
            }
        })
        res.json({ items: resultado.data.collection.items })
    
})

const port = 3000
app.listen(port,() => {console.log(`Back. Port${port}`)})
