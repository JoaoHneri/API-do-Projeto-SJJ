# 🍪 Testando Autenticação via Cookies HTTP-Only

## ✅ Implementação Concluída

A autenticação agora utiliza **cookies HTTP-only** em vez de tokens JWT no header, proporcionando maior segurança contra ataques XSS.

## 📋 Funcionalidades Implementadas

- ✅ **Cookie Parser** configurado no main.ts
- ✅ **CORS com credentials** habilitado
- ✅ **JWT Cookie Strategy** para extrair tokens dos cookies
- ✅ **JWT Cookie Auth Guard** para proteção de rotas
- ✅ **Método de logout** para limpar cookies
- ✅ **Configuração segura** de cookies (httpOnly, secure, sameSite)

## 🧪 Exemplos de Teste

### 1. **Registro de Usuário**
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@test.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "uuid-gerado",
    "name": "João Silva",
    "email": "joao@test.com",
    "isActive": true,
    "createdAt": "2025-09-22T...",
    "updatedAt": "2025-09-22T..."
  }
}
```
**+ Cookie `access_token` definido automaticamente**

### 2. **Login**
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "joao@test.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "uuid-gerado",
    "name": "João Silva",
    "email": "joao@test.com",
    "isActive": true,
    "createdAt": "2025-09-22T...",
    "updatedAt": "2025-09-22T..."
  }
}
```
**+ Cookie `access_token` definido automaticamente**

### 3. **Acessando Rota Protegida** (Cookie é enviado automaticamente)
```http
GET http://localhost:3000/users
```
**Não precisa de header Authorization!** O cookie é enviado automaticamente pelo navegador.

### 4. **Logout**
```http
POST http://localhost:3000/auth/logout
```

**Resposta:**
```json
{
  "message": "Logout realizado com sucesso"
}
```
**+ Cookie `access_token` removido automaticamente**

## 🔒 Configuração de Segurança dos Cookies

```typescript
response.cookie('access_token', token, {
  httpOnly: true,        // Não acessível via JavaScript (proteção XSS)
  secure: process.env.NODE_ENV === 'production', // HTTPS em produção
  sameSite: 'strict',    // Proteção CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
});
```

## 🌐 Testando com Frontend

### JavaScript/Fetch:
```javascript
// Registro
fetch('http://localhost:3000/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // IMPORTANTE: Para enviar cookies
  body: JSON.stringify({
    name: 'João Silva',
    email: 'joao@test.com',
    password: '123456'
  })
});

// Acessar rota protegida
fetch('http://localhost:3000/users', {
  credentials: 'include' // IMPORTANTE: Para enviar cookies
});

// Logout
fetch('http://localhost:3000/auth/logout', {
  method: 'POST',
  credentials: 'include' // IMPORTANTE: Para enviar cookies
});
```

### Axios:
```javascript
// Configuração global
axios.defaults.withCredentials = true;

// Ou por requisição
axios.get('http://localhost:3000/users', {
  withCredentials: true
});
```

## 🛠️ Testando com Postman

1. **Configure o Postman:**
   - Vá em Settings → General
   - Habilite "Automatically follow redirects"
   - Habilite "Send cookies"

2. **Faça o registro/login** - O cookie será automaticamente salvo
3. **Teste rotas protegidas** - O cookie será enviado automaticamente

## 🔄 Diferenças da Implementação Anterior

### ❌ **Antes (Header Authorization):**
```http
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ✅ **Agora (Cookies HTTP-Only):**
```http
GET /users
Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Vantagens dos Cookies HTTP-Only

- **🛡️ Proteção XSS**: JavaScript malicioso não pode acessar o token
- **🔄 Gerenciamento automático**: Browser cuida do envio/recebimento
- **⏰ Expiração automática**: Cookies expiram automaticamente
- **🚫 Proteção CSRF**: sameSite='strict' previne ataques CSRF

## 🚀 Para Produção

Certifique-se de configurar:

1. **HTTPS obrigatório** (secure: true)
2. **Domínios específicos** no CORS
3. **Variáveis de ambiente** seguras
4. **Logs de segurança** adequados

**A implementação está pronta para uso!** 🎉