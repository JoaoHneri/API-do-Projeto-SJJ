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

**Resposta Esperada:**
```json
{
  "user": {
    "id": "uuid-gerado",
    "name": "João Silva Santos",
    "email": "joao.silva@advogados.com.br",
    "subscription_plan": "free",
    "subscription_status": "trial",
    "role": "member",
    "status": "active",
    "is_verified": false,
    "created_at": "2025-09-22T..."
  },
  "access_token": "jwt-token"
}
```

---

## **2️⃣ LOGIN**

### **POST /auth/login**
```json
{
  "email": "joao.silva@advogados.com.br",
  "password": "MinhaSenh@123"
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

---

## **📊 Fluxo Recomendado de UX:**

```
REGISTRO → LOGIN → PERSONAL INFO → ADDRESS → PAYMENT → PREFERENCES → SYSTEM CONFIG
   |          |           |           |          |          |            |
   3%       18%         45%         63%       81%        90%         100%
```

**Cada etapa aumenta a completude do perfil gradualmente!** 🚀