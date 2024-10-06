import fastify from 'fastify'
import { newsRoutes } from '../routes/news-routes'

const app = fastify()
app.register(newsRoutes)

app.listen({ port: 3333 }).then(() => console.log('server up!'))
