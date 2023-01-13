import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao';

import Restaurante from './Restaurante';

import style from './ListaRestaurantes.module.scss';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(()=>{
    //obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
    .then(response => {
      setRestaurantes(response.data.results)
      setProximaPagina(response.data.next)
    }).catch(erro => {
      console.log(erro)
    })
  },[])

  const verMais = useCallback(()=>{
    axios.get<IPaginacao<IRestaurante>>(proximaPagina).then(response => {
      setRestaurantes([...restaurantes, ...response.data.results])
      setProximaPagina(response.data.next)
    }).catch(erro => {
      console.log(erro)
    })
  },[restaurantes, proximaPagina])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && 
    <button onClick={verMais}>
      Ver mais
    </button>
    }
  </section>)
}

export default ListaRestaurantes