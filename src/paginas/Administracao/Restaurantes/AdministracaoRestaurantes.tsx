import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { Button, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import IRestaurante from "../../../interfaces/IRestaurante"
import http from '../../../http'

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get('restaurantes/')
      .then(response => {
        setRestaurantes(response.data)
      })
  }, [])

  const handleExcluir = useCallback((restauranteExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteExcluir.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter((restaurante) => restaurante.id !== restauranteExcluir.id)
        setRestaurantes([...listaRestaurante])
      })
  }, [restaurantes])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleExcluir(restaurante)}>
                  EXCLUIR
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes