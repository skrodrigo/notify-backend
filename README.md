# News CRUD API

Esta é uma API para gerenciar notícias, permitindo criar, listar, atualizar e deletar notícias.

## Tecnologias Utilizadas

- Node.js
- Fastify
- Prisma
- PostgreSQL

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/skrodrigo/news.crud.api.git
   cd news.crud.api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados no arquivo `.env`:
   ```bash
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/newsAPI
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Endpoints

- `GET /news`: Listar todas as notícias
- `GET /news/:id`: Obter uma notícia por ID
- `POST /news`: Criar uma nova notícia
- `PUT /news/:id`: Atualizar uma notícia existente
- `DELETE /news/:id`: Deletar uma notícia por ID

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests.
