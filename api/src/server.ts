import * as http from 'http'
import { app } from './main'

const PORT: string = process.env.PORT || '5000'

const server = http.createServer(app.callback())
server.on('error', (err) => console.error(err))
server.on('unhandledRejectionError', (reason: string) => {
  throw reason
})
server.on('uncaughtexception', (error: Error) => {
  console.error(error.message)
  process.exit(1)
})
server.on('listening', () =>
  console.log(`Listening on http://localhost:${PORT}`),
)

server.listen(PORT)
