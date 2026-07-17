# 🏥 BioSaúde — Plataforma Multi-Tenant de Farmácias (Frontend)

Este diretório contém o frontend completo desenvolvido em **Next.js 14/15 (App Router)** com TypeScript e Tailwind CSS para a plataforma **BioSaúde**. A aplicação é estruturada de forma modular e white-label, permitindo que cada farmácia parceira tenha sua própria customização visual e dados regulatórios específicos (ANVISA).

---

## 🚀 Tecnologias Utilizadas

- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS (Estilo Moderno Teal/Sleek)
- **Gerenciamento de Estado:** Zustand (Carrinho, Autenticação, Pedidos ao Vivo)
- **Validação de Formulários:** React Hook Form + Zod
- **Real-Time:** Socket.io-client (com mock reativo automático integrado)
- **Requisições HTTP:** Axios Client pronto para conexão backend

---

## 🛠️ Como Rodar Localmente

1. Entre no diretório do projeto:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

4. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📡 Integração com o Backend (Para o Desenvolvedor do Backend)

### Variáveis de Ambiente (`.env.local`)
Para desativar a simulação de rede e os dados mockados locais, altere o valor no arquivo `.env.local`:
```env
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.seudominio.com/v1
NEXT_PUBLIC_SOCKET_URL=https://api.seudominio.com
```

### Contratos de API (Types)
Todos os contratos de API esperados pelo frontend estão tipados em `src/types/`:
- [product.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/product.ts)
- [order.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/order.ts)
- [customer.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/customer.ts)
- [promotion.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/promotion.ts)
- [loyalty.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/loyalty.ts)
- [carousel.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/carousel.ts)
- [store.ts](file:///c:/Users/gs117/.antigravity/projeto%20farmacia/frontend/src/types/store.ts)

### Endpoints Esperados pelo Frontend

| Endpoint | Método | Descrição | Payload Esperado |
|---|---|---|---|
| `/auth/login` | POST | Login do cliente | `{ email: string, document: string }` |
| `/auth/admin` | POST | Autenticação do painel admin | `{ password: string }` |
| `/products` | GET | Listagem de produtos filtrada | Query: `search, category, minPrice, maxPrice, requiresPrescription, onlyPromotions` |
| `/products` | POST | Cadastro de novo produto | Objeto `Product` (sem id) |
| `/products/:slug` | GET | Detalhe do produto por slug | - |
| `/products/:id` | PUT | Atualização de produto | Objeto `Partial<Product>` |
| `/products/:id` | DELETE | Remoção de produto do estoque | - |
| `/orders` | GET | Listagem de pedidos | - |
| `/orders` | POST | Criação de novo pedido | Objeto `Order` (sem id e status) |
| `/orders/:id/status`| PATCH | Altera o status do pedido | `{ status: OrderStatus }` |
| `/loyalty/config` | GET | Busca regras do cashback | - |
| `/loyalty/config` | PUT | Altera regras do cashback | Objeto `LoyaltyConfig` |
| `/store/config` | GET | Busca dados visual/ANVISA | - |
| `/store/config` | PUT | Altera dados visual/ANVISA | Objeto `StoreConfig` |

### Fluxo de Real-Time com Socket.io
O frontend escuta o evento `order-status-changed` na sala correspondente do pedido para atualizar o tracker visual de entrega automaticamente:
- Evento emitido pelo backend: `order-status-changed`
- Payload: `{ orderId: string, status: OrderStatus }`
