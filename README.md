# Seazone — Guia Digital do Hóspede

Aplicação web personalizada onde cada imóvel possui um link único (`/FLN001`, `/GRM001`) com informações da estadia, guia de experiências gerado por IA e assistente virtual com streaming.

## Demo

| App | URL |
|---|---|
| Frontend (Vercel) | _deploy pendente_ |
| Backend API (Railway) | _deploy pendente_ |

---

## Funcionalidades

- **Guia personalizado por imóvel** — URL única por código (`/[code]`)
- **Guia de Experiências gerado por IA** — restaurantes, atrações e serviços reais próximos ao endereço, com dica sazonal; gerado uma única vez e cacheado no banco
- **Assistente Virtual com streaming** — respostas em tempo real via `ReadableStream`; contexto inclui todos os dados do imóvel + guia gerado
- **Regra de segurança para senha do WiFi** — o assistente solicita o número de reserva antes de fornecer a senha, e informa que ela muda a cada reserva
- **Responsivo** — mobile-first; chat em drawer full-screen no mobile, painel flutuante no desktop

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js 14 (API routes only), TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| AI | Anthropic Claude (claude-sonnet-4-6 para guia, claude-haiku-4-5 para chat) |
| Monorepo | pnpm workspaces + Turborepo |
| Testes | Vitest |
| Deploy | Vercel (web) + Railway (api + db) |

---

## Arquitetura

```
seazone-challenge/
├── apps/
│   ├── web/          # Next.js frontend (porta 3000)
│   └── api/          # Next.js API-only (porta 3001)
├── packages/
│   └── shared/       # Zod schemas + TypeScript types (fonte da verdade)
├── data/
│   ├── properties/   # FLN001.json, GRM001.json — seed data
│   └── experience/   # guide-example.json — exemplo de output da IA
└── vitest.config.ts
```

### Spec Driven Development (Zod-first)

Todos os contratos de dados nascem em `packages/shared/src/schemas/`. Os tipos TypeScript são **inferidos** dos schemas Zod — nunca escritos manualmente. O backend valida inputs em runtime com `.safeParse()`. O frontend importa os mesmos tipos. Zero drift entre camadas.

### Fluxo do Guia de Experiências

```
GET /api/guide/[code]
  → "not_found" → frontend chama POST /api/guide/[code]/generate
    → Claude gera JSON → validado contra ExperienceGuideSchema → salvo no DB
    → retorna { status: "ready", guide: {...} }
  → "generating" → frontend faz polling a cada 3s
  → "ready" → exibe o guia imediatamente (cache hit)
  → "error" → exibe mensagem + botão "Tentar novamente"
```

### Chat — regra de senha do WiFi

O system prompt do assistente inclui a seguinte regra explícita:

> Se o hóspede perguntar sobre a senha do WiFi, solicite o número de reserva primeiro. Após o hóspede fornecer qualquer número, forneça a senha e informe que ela é atualizada a cada nova reserva.

Isso é uma medida de segurança informacional (não criptográfica — não há verificação real do número nesta demo). O comportamento correto está documentado aqui para deixar claro a intenção do design.

---

## Setup Local

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Docker (para PostgreSQL local)

### 1. Variáveis de ambiente

```bash
cp .env.example apps/api/.env.local
cp .env.example apps/web/.env.local
```

Edite `apps/api/.env.local`:
```env
DATABASE_URL=postgresql://seazone:seazone@localhost:5432/seazone
ANTHROPIC_API_KEY=sk-ant-...
ALLOWED_ORIGIN=http://localhost:3000
```

Edite `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Banco de dados

```bash
docker compose up -d
```

### 3. Instalar dependências

```bash
pnpm install
```

### 4. Rodar migrations e seed

```bash
# Criar as tabelas
pnpm --filter @seazone/api db:push

# Popular com FLN001 e GRM001
pnpm --filter @seazone/api db:seed
```

### 5. Iniciar os apps

```bash
pnpm dev
```

- Frontend: http://localhost:3000/FLN001
- API: http://localhost:3001/api/health

---

## Testes

```bash
npx vitest run
```

33 testes cobrindo:
- Validação Zod de todos os schemas (PropertySchema, ExperienceGuideSchema, ChatRequestSchema)
- Rate limiter (limites por janela, reset após expiração, isolamento por chave)
- Guide service (estados: not_found, ready, generating, error, timeout)

---

## API Reference

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/properties/:code` | Dados do imóvel |
| `GET` | `/api/guide/:code` | Status do guia (ready/generating/not_found/error) |
| `POST` | `/api/guide/:code/generate` | Aciona geração do guia via Claude |
| `POST` | `/api/chat/:code` | Chat streaming (body: `{ messages: [{role, content}] }`) |
| `GET` | `/api/health` | Health check |

---

## Decisões Técnicas

**Por que Next.js API-only para o backend?** Separa as responsabilidades sem adicionar um runtime diferente. Permite usar o mesmo tooling e tipos TypeScript em toda a monorepo.

**Por que Drizzle em vez de Prisma?** Migrations como SQL simples, schema como código TypeScript puro, zero overhead de runtime. Integra melhor com Zod.

**Por que `amenities` como JSONB?** Os imóveis têm comodidades diferentes (FLN001 tem `elevator`, GRM001 tem `bbq_grill`). JSONB com `z.record()` é mais flexível e fiel à estrutura real dos dados.

**Por que streaming de texto plano e não SSE?** `fetch` + `ReadableStream.getReader()` é suficiente para o caso de uso e evita o parsing de eventos SSE no cliente.

**Histórico de chat** é ephemeral (estado React apenas) — decisão deliberada para simplicidade e privacidade do hóspede.

---

## Segurança

- Validação Zod em todos os inputs (código: `/^[A-Z]{2,4}\d{3}$/`, chat: max 2000 chars/msg, max 20 mensagens)
- Rate limiting in-memory: 5 req/min/IP para geração do guia, 20 req/min/IP para chat
- CORS restrito ao `ALLOWED_ORIGIN` configurado
- `ANTHROPIC_API_KEY` exclusivamente server-side
- System prompt isolado do conteúdo do usuário (mitigação de prompt injection)
- Queries via Drizzle ORM (parametrizadas — zero SQL injetável)
- Erros retornados ao cliente nunca expõem stack traces
