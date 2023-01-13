import { useCallback, useEffect, useState } from 'react'

import { Box, Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import ITag from '../../../interfaces/ITag';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';


const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricaoPrato] = useState('')
  const [restaurante, setRestaurante] = useState('')
  const [tag, setTag] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [tags, setTags] = useState<ITag[]>([])

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(response => setTags(response.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(res => setRestaurantes(res.data))
  }, [])

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length){
      setImagem(event.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem){
    formData.append('imagem', imagem)      
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(() => alert('Prato cadastrado com sucesso'))
    .catch(error => console.log(error))
  }, [nomePrato, descricao, tag, restaurante,imagem])

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Nome do Prato"
                variant="standard"
                fullWidth
                value={nomePrato}
                onChange={e => setNomePrato(e.target.value)}
                required
                margin="dense"
              />
              <TextField
                id="standard-basic"
                label="Descrição"
                variant="standard"
                fullWidth
                value={descricao}
                onChange={e => setDescricaoPrato(e.target.value)}
                required
                margin="dense"
              />
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId='select-tag' value={tag} onChange={e => setTag(e.target.value)}>
                  {tags.map((tag) => <MenuItem key={tag.id} value={tag.value}>
                    {tag.value}
                  </MenuItem>)}
                </Select>
              </FormControl>
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                <Select labelId='select-restaurante' value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                  {restaurantes.map((restaurante) => <MenuItem key={restaurante.id} value={restaurante.id}>
                    {restaurante.nome}
                  </MenuItem>)}
                </Select>
              </FormControl>
              <input type="file" onChange={selecionarArquivo}/>
              <Button sx={{ marginTop: 1 }} variant="outlined" type="submit" fullWidth>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
};

export default FormularioPrato;