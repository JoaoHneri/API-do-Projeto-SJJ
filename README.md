# API do Projeto SJJ

Uma API REST completa com autenticação JWT e CRUD de usuários, construída com NestJS e PostgreSQL.

## 🚀 Características

- **Autenticação JWT**: Sistema completo de registro e login
- **CRUD de Usuários**: Operações completas de Create, Read, Update, Delete
- **PostgreSQL**: Banco de dados robusto com TypeORM
- **Validação**: Validação automática de dados com class-validator
- **Segurança**: Senhas criptografadas com bcrypt
- **Guards**: Proteção de rotas com JWT Auth Guard

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## ⚙️ Configuração

1. **Clone o repositório e instale as dependências:**
```bash
npm install
```

2. **Configure o banco de dados PostgreSQL:**
   - Crie um banco de dados chamado `sjj_project`
   - Atualize as variáveis no arquivo `.env`

3. **Configure as variáveis de ambiente:**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=sjj_project

# JWT Configuration
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d

# Application Configuration
PORT=3000
NODE_ENV=development
```

## 🎯 Uso

### Iniciar o servidor
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

### API Endpoints

#### Autenticação

**Registrar usuário:**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Login:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Usuários (Requer autenticação)

**Listar todos os usuários:**
```http
GET /users
Authorization: Bearer {token}
```

**Buscar usuário por ID:**
```http
GET /users/{id}
Authorization: Bearer {token}
```

**Atualizar usuário:**
```http
PATCH /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Novo Nome",
  "isActive": true
}
```

**Deletar usuário:**
```http
DELETE /users/{id}
Authorization: Bearer {token}
```

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Guards de autenticação
│   ├── strategies/      # Estratégias Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # Módulo de usuários
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades TypeORM
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── config/             # Configurações
│   ├── config.module.ts
│   └── typeorm.config.ts
├── database/           # Configuração do banco
│   └── database.module.ts
├── app.module.ts       # Módulo principal
└── main.ts            # Ponto de entrada
```

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- JWT tokens para autenticação stateless
- Validação de dados de entrada
- Guards para proteção de rotas
- CORS habilitado

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📚 Tecnologias Utilizadas

- **NestJS**: Framework Node.js
- **TypeORM**: ORM para TypeScript
- **PostgreSQL**: Banco de dados
- **JWT**: Autenticação
- **bcryptjs**: Criptografia de senhas
- **class-validator**: Validação de dados
- **Passport**: Estratégias de autenticação

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute `npm run build`
3. Execute `npm run start:prod`

## 📝 Licença

Este projeto está sob a licença UNLICENSED.