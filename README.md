# 🚀 Linx Front-end

Bem-vindo ao repositório **Linx Front-end**!

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📦 Versões recomendadas

- 🐳 **Docker**: `28.3.3`
- 🐳 **Docker Compose**: `2.39.1`

---

## ⚡ Como rodar o projeto

Siga os passos abaixo para iniciar o ambiente de desenvolvimento:

```bash
# 1️⃣ Copie o arquivo de exemplo do .env
cp .env.example .env

# 2️⃣ Inicialize o projeto via Docker Compose
docker-compose -f docker-compose.dev.yml --env-file .env up --build

# 3️⃣ Acesse o front-end no navegador
# URL: http://localhost:5173
