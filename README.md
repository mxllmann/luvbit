# 🌌 Luvbit – Frontend

**Luvbit** é uma interface web feita em **Next.js 15**, com estilo **retrô pixelado dark**, criada para permitir o envio de mensagens anônimas — os **Whispers**.  
Os usuários podem criar, visualizar e compartilhar essas mensagens únicas com imagens personalizadas, animações suaves e uma proposta emocional e silenciosa.

🔗 Acesse em produção: [https://luvbit.vercel.app](https://luvbit.vercel.app)

---

## 🚀 Tecnologias

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion (animações)
- Embla Carousel (carrossel de imagens)
- React Icons
- Copy to Clipboard

---

## 🛠️ Como rodar localmente

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/luvbit.git
cd luvbit
```

### 2. Instalar Dependências 

```bash
npm install
```
### 3. Criar .env.local

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```markdown
app/
├── _components/         # Componentes reutilizáveis
│   ├── AboutCard.js
│   ├── DefaultImageCarousel.js
│   └── ...
├── whisper/
│   ├── [id]/page.js     # Página de visualização do whisper
│   └── create/page.js   # Página de criação do whisper
├── about/page.js        # Sobre o projeto
├── page.js              # Página home
├── layout.js            # Layout principal
├── globals.css          # Estilos globais
public/
└── icons/               # Imagens e ícones usados no app
```

## 👨‍💻 Autor

Projeto criado por **Arthur Mallmann**  
🔗 [linkedin.com/in/arthurmallmann](https://www.linkedin.com/in/arthurmallmann/)
