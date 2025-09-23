# 🚀 **API TESTS - Sistema Completo de Usuários**

## 📋 **Base URL**
```
http://localhost:3000
```

---

## **1️⃣ REGISTRO INICIAL**

### **POST /auth/register**
```json
{
  "name": "João Silva Santos",
  "email": "joao.silva@advogados.com.br",
  "password": "MinhaSenh@123"
}
```

**Resposta Correta (Cookie HTTP-only é definido automaticamente):**
```json
{
  "user": {
    "id": "uuid-gerado",
    "tenant_id": null,
    "name": "João Silva Santos",
    "email": "joao.silva@advogados.com.br",
    "phone": null,
    "cpf_cnpj": null,
    "profession": null,
    "company_name": null,
    "profile_picture_url": null,
    "subscription_plan": "free",
    "subscription_status": "trial",
    "trial_end_date": null,
    "billing_address": null,
    "payment_method": null,
    "preferences": null,
    "system_preferences": null,
    "role": "member",
    "is_verified": false,
    "two_factor_enabled": false,
    "last_ip": null,
    "last_device": null,
    "status": "active",
    "created_at": "2025-09-22T...",
    "updated_at": "2025-09-22T...",
    "last_login": null
  }
}
```

**⚠️ IMPORTANTE:** O `access_token` não aparece na resposta, mas é automaticamente salvo como cookie HTTP-only!

---

## **2️⃣ LOGIN**

### **POST /auth/login**
```json
{
  "email": "joao.silva@advogados.com.br",
  "password": "MinhaSenh@123"
}
```

**Resposta (Cookie HTTP-only é atualizado automaticamente):**
```json
{
  "user": {
    "id": "uuid-do-usuario",
    "tenant_id": null,
    "name": "João Silva Santos",
    "email": "joao.silva@advogados.com.br",
    "phone": null,
    "cpf_cnpj": null,
    "profession": null,
    "company_name": null,
    "profile_picture_url": null,
    "subscription_plan": "free",
    "subscription_status": "trial",
    "trial_end_date": null,
    "billing_address": null,
    "payment_method": null,
    "preferences": null,
    "system_preferences": null,
    "role": "member",
    "is_verified": false,
    "two_factor_enabled": false,
    "last_ip": null,
    "last_device": null,
    "status": "active",
    "created_at": "2025-09-22T...",
    "updated_at": "2025-09-22T...",
    "last_login": null
  }
}
```

## **2.1️⃣ LOGOUT**

### **POST /auth/logout**
*(Não precisa de body - apenas cookie)*

**Resposta:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## **3️⃣ PERFIL DO USUÁRIO**

### **GET /users/profile**
*(Requer autenticação via cookie)*

**Resposta:** Dados completos do usuário logado

---

## **4️⃣ VERIFICAR COMPLETUDE DO PERFIL**

### **GET /users/profile/completeness**
*(Requer autenticação via cookie)*

**Resposta Esperada:**
```json
{
  "percentage": 45,
  "completed_required": 2,
  "total_required": 5,
  "completed_optional": 1,
  "total_optional": 6,
  "missing_required": ["phone", "cpf_cnpj", "profession"],
  "missing_optional": ["company_name", "profile_picture_url", "billing_address", "payment_method", "preferences"]
}
```

---

## **5️⃣ COMPLEMENTO DO PERFIL - ETAPAS**

### **ETAPA 1: Informações Pessoais**

#### **PATCH /users/profile/personal**
```json
{
  "phone": "+5511987654321",
  "cpf_cnpj": "12345678901",
  "profession": "Advogado",
  "company_name": "Silva & Advogados Ltda",
  "profile_picture_url": "https://exemplo.com/foto.jpg"
}
```

### **ETAPA 2: Endereço de Cobrança**

#### **PATCH /users/profile/address**
```json
{
  "billing_address": {
    "street": "Rua Augusta",
    "number": "1234",
    "complement": "Sala 501",
    "neighborhood": "Consolação",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01305-100",
    "country": "Brasil"
  }
}
```

### **ETAPA 3: Método de Pagamento**

#### **PATCH /users/profile/payment**

**Cartão de Crédito:**
```json
{
  "payment_method": {
    "type": "credit_card",
    "card_last_four": "1234",
    "card_brand": "Visa"
  }
}
```

**PIX:**
```json
{
  "payment_method": {
    "type": "pix",
    "pix_key": "joao.silva@advogados.com.br"
  }
}
```

**Boleto:**
```json
{
  "payment_method": {
    "type": "boleto",
    "bank_account": "Banco do Brasil - Ag: 1234 Cc: 56789"
  }
}
```

### **ETAPA 4: Preferências do Usuário**

#### **PATCH /users/profile/preferences**
```json
{
  "preferences": {
    "language": "pt-BR",
    "theme": "dark",
    "timezone": "America/Sao_Paulo",
    "notifications": {
      "email": true,
      "sms": false,
      "whatsapp": true,
      "marketing": false
    }
  }
}
```

### **ETAPA 5: Configurações do Sistema**

#### **PATCH /users/profile/preferences**
```json
{
  "system_preferences": {
    "contracts": {
      "auto_generate": true,
      "default_template": "template_advogado",
      "signature_required": true
    },
    "fiscal": {
      "auto_calculate_tax": true,
      "default_tax_rate": 0.18,
      "invoice_numbering": "sequential"
    },
    "integrations": {
      "accounting_software": "contabilizei",
      "crm_system": "pipedrive",
      "email_provider": "gmail"
    }
  }
}
```

---

## **6️⃣ ATUALIZAÇÃO COMPLETA DO PERFIL**

### **PATCH /users/profile**
```json
{
  "name": "João Silva Santos Junior",
  "phone": "+5511987654321",
  "cpf_cnpj": "12345678901",
  "profession": "Advogado Especialista",
  "company_name": "Silva & Advogados Associados Ltda",
  "profile_picture_url": "https://exemplo.com/nova-foto.jpg",
  "billing_address": {
    "street": "Avenida Paulista",
    "number": "2000",
    "complement": "Conjunto 1501",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01310-100",
    "country": "Brasil"
  },
  "payment_method": {
    "type": "credit_card",
    "card_last_four": "5678",
    "card_brand": "Mastercard"
  },
  "preferences": {
    "language": "pt-BR",
    "theme": "light",
    "timezone": "America/Sao_Paulo",
    "notifications": {
      "email": true,
      "sms": true,
      "whatsapp": true,
      "marketing": false
    }
  },
  "system_preferences": {
    "contracts": {
      "auto_generate": true,
      "default_template": "template_premium",
      "signature_required": true
    },
    "fiscal": {
      "auto_calculate_tax": true,
      "default_tax_rate": 0.20,
      "invoice_numbering": "custom"
    },
    "integrations": {
      "accounting_software": "sage",
      "crm_system": "hubspot",
      "email_provider": "outlook"
    }
  }
}
```

---

## **7️⃣ EXEMPLOS ADICIONAIS PARA TESTES**

### **Profissões Variadas:**
- `"Médico"`
- `"Engenheiro"`
- `"Contador"`
- `"Arquiteto"`
- `"Dentista"`
- `"Consultor"`

### **Empresas Variadas:**
- `"Silva & Associados Ltda"`
- `"Clínica Médica Santos"`
- `"Engenharia XYZ S/A"`
- `"Escritório Contábil ABC"`

### **Temas Disponíveis:**
- `"light"` - Tema claro
- `"dark"` - Tema escuro  
- `"auto"` - Automático

### **Tipos de Pagamento:**
- `"credit_card"` - Cartão de crédito
- `"pix"` - PIX
- `"boleto"` - Boleto bancário

### **Bandeiras de Cartão:**
- `"Visa"`
- `"Mastercard"`
- `"American Express"`
- `"Elo"`

---

## **8️⃣ LOGOUT**

### **POST /auth/logout**
*(Requer autenticação via cookie)*

**Body:** *(vazio)*

---

## **🔧 Como Testar no Postman/Insomnia:**

1. **Registre um usuário** com `POST /auth/register`
2. **Faça login** com `POST /auth/login` 
3. **Configure cookies automáticos** (o JWT será enviado via cookie)
4. **Teste cada endpoint** dos exemplos acima
5. **Verifique a completude** com `GET /users/profile/completeness` após cada atualização
6. **Veja o perfil completo** com `GET /users/profile`

### **⚙️ Configuração de Cookies (IMPORTANTE!):**

**No Postman:**
1. Vá em `Settings` → `General` 
2. Ative `Automatically follow redirects`
3. Ative `Send anonymous usage data to Postman` (opcional)
4. **MAIS IMPORTANTE:** Na aba de uma requisição, vá em `Cookies` e certifique-se que está enviando cookies automaticamente

**No Insomnia:**
1. Os cookies são gerenciados automaticamente
2. Verifique na aba `Timeline` se o cookie `access_token` está sendo enviado

### **🐛 Troubleshooting:**

**❌ Erro 401 Unauthorized:**
- Verifique se fez login corretamente
- Confirme que o cookie `access_token` está sendo enviado
- Tente fazer logout e login novamente

**❌ Erro 409 Conflict (Email/CPF duplicado):**
- Use email diferente para cada teste
- Use CPF/CNPJ diferentes
- Limpe o banco de dados se necessário: `DROP DATABASE sjj_app; CREATE DATABASE sjj_app;`

**❌ Erro de conexão com banco:**
- Certifique-se que PostgreSQL está rodando
- Verifique as variáveis de ambiente no `.env`
- Recrie o banco: `DROP DATABASE IF EXISTS sjj_app; CREATE DATABASE sjj_app;`

---

## **📊 Fluxo Recomendado de UX:**

```
REGISTRO → LOGIN → PERSONAL INFO → ADDRESS → PAYMENT → PREFERENCES → SYSTEM CONFIG
   |          |           |           |          |          |            |
  18%       18%         45%         63%       81%        90%         100%
```

**Cada etapa aumenta a completude do perfil gradualmente!** 🚀

---

## **🔍 Como Verificar Cookies no Navegador:**

1. **Chrome/Edge:** F12 → Application → Cookies → localhost:3000
2. **Firefox:** F12 → Storage → Cookies → http://localhost:3000
3. **Procure por:** `access_token` com valor JWT

**O cookie deve ter:**
- `HttpOnly: true` ✅
- `Secure: false` (em desenvolvimento) ✅  
- `SameSite: Strict` ✅
- `Max-Age: 604800` (7 dias) ✅