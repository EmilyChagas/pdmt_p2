import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
export default class Busca extends componenets {


state = {
termoBuscado: ''
}

onAlteracao = (evento) => {
this.setState({
    termoBuscado: evento.target.value
})

}


onbuscar =(evento)=>{
    evento.preventdefault()
    this.props.onbuscafeita(this.state.termoBuscado)
}
}
render()