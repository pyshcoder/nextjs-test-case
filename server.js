const express = require('express')
const next = require('next')
const fetch = require('node-fetch')

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const API_URL = 'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=1&n=5'

app.prepare().then(() => {
  const server = express()

  server.get('/api/quotes', async (req, res) => {
    const response = await fetch(API_URL)
    const json = await response.json()

    return res.json(json)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
