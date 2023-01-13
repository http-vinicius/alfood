import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { Button, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import IPrato from "../../../interfaces/IPrato"
import http from '../../../http'

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get('pratos/')
      .then(response => {
        setPratos(response.data)
      })
  }, [])

  const handleExcluir = useCallback((pratoExcluir: IPrato) => {
    http.delete(`pratos/${pratoExcluir.id}/`)
      .then(() => {
        const listaPrato = pratos.filter((prato) => prato.id !== pratoExcluir.id)
        setPratos([...listaPrato])
      })
  }, [pratos])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleExcluir(prato)}>
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

export default AdministracaoPratos