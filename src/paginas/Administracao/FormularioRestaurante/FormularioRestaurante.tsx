import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material"

import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

const FormularioRestaurante = () => {
  const parametros = useParams()
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(response => {
          setNomeRestaurante(response.data.nome)
        })
    }
  }, [parametros])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso!')
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!')
        })
    }
  }, [nomeRestaurante, parametros])

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Nome do Restaurante"
                variant="standard"
                fullWidth
                value={nomeRestaurante}
                required
                onChange={e => setNomeRestaurante(e.target.value)} />
              <Button sx={{ marginTop: 1 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
};

export default FormularioRestaurante;