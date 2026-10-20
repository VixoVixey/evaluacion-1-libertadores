import express from 'express'
import cors from 'cors'
import { paises, clubes } from './datos.js'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

// 1. GET /api/clubes y GET /api/clubes?pais=Chile (Búsqueda anidada)
app.get('/api/clubes', (req, res) => {
  const { pais } = req.query

  if (!pais) {
    return res.status(200).json(clubes)
  }

  // Paso 1: resolver el país sin importar mayúsculas
  const paisEncontrado = paises.find(
    p => p.nombre.toLowerCase() === pais.trim().toLowerCase()
  )

  if (!paisEncontrado) {
    return res.status(404).json({ error: `El país '${pais}' no existe en la base de datos` })
  }

  // Paso 2: filtrar clubes asociados al id del país encontrado
  const clubesDelPais = clubes.filter(c => c.paisId === paisEncontrado.id)
  return res.status(200).json(clubesDelPais)
})

// 2. GET /api/clubes/:id
app.get('/api/clubes/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID proporcionado debe ser un número válido' })
  }

  const club = clubes.find(c => c.id === id)

  if (!club) {
    return res.status(404).json({ error: `No existe el club con ID ${id}` })
  }

  return res.status(200).json(club)
})

// 3. GET /api/titulos/:club (Permite nombres con espacios o guiones, ej: colo-colo)
app.get('/api/titulos/:club', (req, res) => {
  const clubParam = req.params.club.trim().toLowerCase().replace(/-/g, ' ')

  const clubEncontrado = clubes.find(
    c => c.nombre.toLowerCase() === clubParam
  )

  if (!clubEncontrado) {
    return res.status(404).json({ error: `El club '${req.params.club}' no existe` })
  }

  // Si existe pero no registra títulos, entrega status 200 con array vacío []
  return res.status(200).json(clubEncontrado.titulos)
})

// Desafío opcional 1: Títulos ordenados cronológicamente
app.get('/api/titulos', (req, res) => {
  const todosLosTitulos = clubes
    .flatMap(c => c.titulos)
    .sort((a, b) => a - b)
  return res.status(200).json(todosLosTitulos)
})

// Desafío opcional 2: Estadísticas consolidadas
app.get('/api/estadisticas', (req, res) => {
  const totalClubes = clubes.length
  const totalTitulos = clubes.reduce((acc, c) => acc + c.titulos.length, 0)

  const titulosPorPais = paises.map(p => {
    const clubesPais = clubes.filter(c => c.paisId === p.id)
    const titulos = clubesPais.reduce((acc, c) => acc + c.titulos.length, 0)
    return { pais: p.nombre, titulos }
  })

  return res.status(200).json({ totalClubes, totalTitulos, titulosPorPais })
})

app.listen(PORT, () => {
  console.log(`🏆 API escuchando en http://localhost:${PORT}`)
})