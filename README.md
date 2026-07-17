# 🏥 BioSaúde — Plataforma de Farmácias White-Label

> **Status:** Fase 1 — Frontend com dados mockados ✅ | Backend — A implementar 🔧

Plataforma SaaS white-label para farmácias com gestão de pedidos em tempo real (iFood-style), programa de fidelidade/cashback e total autonomia do dono do negócio.

---

## 🚀 Como Rodar

```bash
cd frontend
npm install
npm run dev
# Acesse: http://localhost:3000
```

### Credenciais de acesso (modo mock)

| Tipo | Email | Senha |
|---|---|---|
| **Admin** | admin@biosaude.com | admin123 |
| **Cliente** | qualquer email | qualquer senha |

---

## 📁 Estrutura do Projeto

```
Farmacia/
├── frontend/               # ← Next.js 14 (FASE 1 — em desenvolvimento)
│   ├── src/
│   │   ├── app/            # Páginas (App Router)
│   │   ├── components/     # Componentes React
│   │   ├── mocks/          # Dados mockados (substituir pela API)
│   │   ├── store/          # Zustand (estado global)
│   │   ├── types/          # Tipos TypeScript (contratos de API)
│   │   ├── services/       # Camada de serviços (mock → real)
│   │   └── lib/            # Utilitários e constantes
│   ├── .env.example        # Template de variáveis
│   └── .env.local          # Config local (NEXT_PUBLIC_USE_MOCK=true)
│
├── index.html              # ← MVP original (descontinuado)
├── app.js
└── style.css
```

---

## 🗺️ Páginas Implementadas

### Storefront (Cliente)
- `GET /` — Loja com carrossel, filtros sidebar, vitrine de produtos, carrinho
- `GET /checkout` — Finalização do pedido (3 steps) — **A IMPLEMENTAR**
- `GET /pedido/[id]` — Rastreamento em tempo real — **A IMPLEMENTAR**
- `GET /conta/pedidos` — Histórico de pedidos — **A IMPLEMENTAR**
- `GET /conta/fidelidade` — Saldo e extrato de cashback — **A IMPLEMENTAR**

### Painel Admin
- `GET /admin` — Dashboard — **A IMPLEMENTAR**
- `GET /admin/pedidos` — Board iFood ao vivo — **A IMPLEMENTAR**
- `GET /admin/produtos` — CRUD de produtos — **A IMPLEMENTAR**
- `GET /admin/carrossel` — Editor visual de banners — **A IMPLEMENTAR**
- `GET /admin/promocoes` — Gerenciar promoções — **A IMPLEMENTAR**
- `GET /admin/fidelidade` — Config cashback — **A IMPLEMENTAR**
- `GET /admin/clientes` — CRM de clientes — **A IMPLEMENTAR**
- `GET /admin/configuracoes` — White-label / visual — **A IMPLEMENTAR**

---

## 🔌 Como Trocar Mock por API Real

No arquivo `.env.local`, mude:

```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.seudominio.com
```

Cada service em `src/services/` verifica essa variável:

```typescript
// src/services/productService.ts
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export async function getProducts(filters?: ProductFilters) {
  if (USE_MOCK) {
    await delay(300); // simula latência
    return mockProducts.filter(...);
  }
  const { data } = await api.get('/products', { params: filters });
  return data;
}
```

---

## 📦 Stack Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 14 (App Router) | Framework principal |
| TypeScript | 5.x | Tipagem |
| Tailwind CSS | 4.x | Estilização |
| Zustand | 5.x | Estado global (carrinho, auth, pedidos) |
| Axios | latest | HTTP client |
| Lucide React | latest | Ícones |
| React Hook Form | latest | Formulários |
| Zod | latest | Validação |
| Socket.io-client | latest | Real-time (preparado — aguarda backend) |

---

## 🏗️ Backend a Implementar (Fase 2)

### Stack

| Tecnologia | Uso |
|---|---|
| Node.js + Express + TypeScript | API REST |
| PostgreSQL + Prisma ORM | Banco de dados |
| Redis | Cache, sessões, fila de pedidos |
| Socket.io | Real-time de pedidos |
| Mercado Pago SDK | Pagamentos |
| Docker + Nginx + PM2 | Deploy no VPS Hostinger |
| JWT + Refresh Token | Autenticação |

### Endpoints esperados pelo frontend

#### Auth
```
POST   /api/auth/register    → { name, email, password, phone }
POST   /api/auth/login       → { email, password }
POST   /api/auth/refresh     → { refreshToken }
POST   /api/auth/logout
```

#### Produtos
```
GET    /api/products          → filters: { category, search, type, brand, maxPrice }
GET    /api/products/:id
POST   /api/products          → ADMIN — body: Product
PUT    /api/products/:id      → ADMIN — body: Partial<Product>
DELETE /api/products/:id      → ADMIN
```

#### Pedidos
```
POST   /api/orders            → { items, address, paymentMethod, cashbackAmount }
GET    /api/orders            → Pedidos do cliente logado
GET    /api/orders/:id        → Detalhes de um pedido
GET    /api/orders/admin/all  → ADMIN — todos os pedidos com filtros
PATCH  /api/orders/:id/status → ADMIN — { status: OrderStatus }
```

#### Fidelidade / Cashback
```
GET    /api/loyalty           → { balance, totalEarned, totalRedeemed }
GET    /api/loyalty/history   → Extrato de transações
POST   /api/loyalty/redeem    → { orderId, amount } — usa cashback no pedido
GET    /api/loyalty/config    → Config do programa
PUT    /api/loyalty/config    → ADMIN — { cashbackPercent, minOrder, validity... }
POST   /api/loyalty/adjust    → ADMIN — { userId, amount, description }
```

#### Carrossel
```
GET    /api/carousel          → Slides ativos (ordenados)
POST   /api/carousel          → ADMIN — criar slide
PUT    /api/carousel/:id      → ADMIN — editar slide
DELETE /api/carousel/:id      → ADMIN — excluir slide
PATCH  /api/carousel/reorder  → ADMIN — { ids: string[] } — reordenar
```

#### Config da Loja (White-Label)
```
GET    /api/store/config      → Config pública da loja
PUT    /api/store/config      → ADMIN — { name, colors, logo, anvisa... }
```

#### Promoções
```
GET    /api/promotions        → Promoções ativas
POST   /api/promotions        → ADMIN — criar promoção
DELETE /api/promotions/:id    → ADMIN — desativar
```

---

## 🌐 Multi-Tenancy

Cada farmácia é identificada por `storeId`. O frontend passa o store via:
- Header HTTP: `X-Store-ID: store_abc`
- Ou subdomínio: `farmaciajoao.biosaude.com` → resolve `storeId` pelo domínio

```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-Store-ID': process.env.NEXT_PUBLIC_STORE_ID,
  },
});
```

---

## ⚡ Real-time (Socket.io)

O hook `useSocket` em `src/hooks/useSocket.ts` já está preparado.
Quando o backend estiver pronto, emitir:

```typescript
// Backend emite ao criar pedido:
io.to(`store_${storeId}`).emit('new_order', order);

// Admin emite ao mudar status:
io.to(`order_${orderId}`).emit('order_status_update', { status });
```

O admin entra na sala: `socket.join('store_store_1')`
O cliente entra na sala: `socket.join('order_ORD-1042')`

---

## 💳 Mercado Pago

Usar o **Checkout Pro** ou **Checkout Transparente**.

```typescript
// Backend — criar preferência de pagamento:
const preference = await mp.preferences.create({
  items: order.items,
  external_reference: order.id,
  notification_url: 'https://api.seudominio.com/webhooks/mercadopago',
  back_urls: {
    success: `https://app.com/pedido/${order.id}`,
    failure: `https://app.com/checkout?error=true`,
  },
});
```

---

## 🚀 Deploy (VPS Hostinger)

```bash
# Backend
docker build -t biosaude-api .
docker run -d -p 3001:3001 biosaude-api

# Nginx proxy
server {
  server_name api.seudominio.com;
  location / {
    proxy_pass http://localhost:3001;
  }
}

# Frontend
npm run build
npm start  # ou PM2: pm2 start "npm start" --name biosaude-frontend
```

---

## 📋 Próximas Etapas (Para o Dev Backend)

1. **Auth** — JWT, registro, login, refresh token
2. **Produtos** — CRUD com upload de imagem (Cloudinary)
3. **Pedidos** — Criar pedido + Socket.io para real-time
4. **Cashback** — Calcular e creditar após pedido entregue
5. **Mercado Pago** — Webhook para atualizar `paymentStatus`
6. **Multi-tenancy** — Middleware `storeId` em todas as queries
7. **Carrossel** — CRUD com upload de imagem
8. **White-Label** — Config visual por loja

---

## 📞 Contato

Projeto desenvolvido pela **Antigravity**.
