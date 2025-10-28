<div align="center">

# 🎨 Portfólio Artístico - Adilson Rodrigues

### CÓDIGO É ARTE

<p align="center">
  <a href="https://portfolio-adilsonjvr.vercel.app"><img src="https://img.shields.io/badge/🌐_Ver_Portfolio-Live-orange?style=for-the-badge" alt="Ver Portfolio Live"/></a>
  <a href="#-tecnologias"><img src="https://img.shields.io/badge/Stack-HTML%20|%20CSS%20|%20JS-blue?style=for-the-badge" alt="Stack"/></a>
  <a href="https://github.com/Adilsonjvr/portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/></a>
</p>

<p align="center">
  <strong>Portfólio pessoal com design artístico e inovador</strong><br>
  Paleta preta e gradiente laranja • Animações em paralaxe • 100% Responsivo
</p>

[🚀 Ver Demo](https://portfolio-adilsonjvr.vercel.app) • [📧 Contato](mailto:adilsonjvr@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/adilsonjvr)

</div>

---

## ✨ Sobre o Projeto

Portfólio pessoal desenvolvido com foco em **arte visual** e **experiência do usuário**. Fugindo dos designs convencionais, este projeto explora:

- 🎨 **Design Artístico** - Paleta de cores preta (#000) + gradiente laranja (#ff6b00 → #ffa500)
- 🌊 **Efeitos Paralaxe** - Sistema em 3 camadas (scroll + mouse)
- ✨ **Canvas Interativo** - Partículas que reagem ao movimento do cursor
- 📱 **Mobile First** - Sidebar lateral → Bottom bar no mobile
- 🎭 **Animações Suaves** - RequestAnimationFrame para 60fps

## 🎯 Funcionalidades

### Desktop
- **Sidebar Social Lateral** - Links para GitHub, LinkedIn, Instagram e Email
- **Cursor Customizado** - Aumenta no hover sobre elementos interativos
- **Paralaxe em 3 Camadas** - Efeito de profundidade no scroll
- **Canvas com Partículas** - Partículas laranjas que fogem do cursor
- **Navegação Dinâmica** - Some ao rolar para baixo, reaparece ao subir

### Mobile (< 768px)
- **Bottom Bar Fixa** - Ícones sociais sempre acessíveis na parte inferior
- **Layout Otimizado** - Tipografia e espaçamentos ajustados
- **Touch Friendly** - Elementos com tamanho adequado para toque
- **Performance** - Canvas desabilitado para economia de recursos

## 🏗️ Estrutura do Projeto

```
portfolio/
├── index.html          # Estrutura HTML semântica
├── styles.css          # Estilos com variáveis CSS e media queries
├── script.js           # Interatividade e animações
├── images/
│   └── perfil.png      # Imagem de perfil
└── README.md           # Esta documentação
```

## 🎨 Seções

### 1. Hero - Manifesto
```
TRANSFORMANDO
IDEIAS
EM CÓDIGO
```
Frase de impacto gigante com glow animado e canvas criativo ao fundo.

### 2. About - Estatísticas
- **5+ Projetos** desenvolvidos
- **2+ Anos** de experiência
- **100% Dedicação** ao código

### 3. Parallax Divider
> "Inovação não é sobre ideias, é sobre execução"

Citação inspiradora com gradiente rotativo.

### 4. Projetos em Destaque

#### 🎙️ Transcribe App
Plataforma de transcrição de áudio com IA que identifica speakers automaticamente.
- **Stack**: React, Supabase, AssemblyAI, Tailwind CSS
- **Features**: 6+ idiomas, exports múltiplos (TXT, JSON, PDF, DOCX)
- **Link**: [transcribe-app-phi.vercel.app](https://transcribe-app-phi.vercel.app)

#### 📊 Crypto Dashboard Realtime
Dashboard interativo de criptomoedas com cotações em tempo real via WebSocket.
- **Stack**: React, TypeScript, Chart.js, Framer Motion
- **Features**: BTC, ETH, BNB, SOL, ADA, XRP com gráficos dinâmicos
- **Link**: [dashboard-realtime.vercel.app](https://dashboard-realtime.vercel.app)

### 5. Skills & Tecnologias
17 tecnologias com ícones SVG oficiais do [Devicon](https://devicon.dev):

**Frontend**: HTML5, CSS3, JavaScript, React, TypeScript
**Backend**: Node.js, Python, Java
**Database**: PostgreSQL, Supabase
**Tools**: Git, Docker, Vite, Tailwind CSS
**Libraries**: Chart.js, Framer Motion

## 🚀 Tecnologias Utilizadas

<div align="center">

| Frontend | Styling | Animation | Deploy |
|----------|---------|-----------|--------|
| HTML5 | CSS3 Variables | Canvas API | Vercel |
| JavaScript ES6+ | Media Queries | RequestAnimationFrame | GitHub |
| Semantic HTML | Flexbox/Grid | Intersection Observer | - |

</div>

### Técnicas Avançadas
- **CSS Custom Properties** - Variáveis para cores e easing
- **Stacking Context** - Z-index hierárquico correto
- **Performance** - Debounce, lazy loading, pointer-events
- **Accessibility** - Alt texts, semantic tags, ARIA labels

## 📦 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/Adilsonjvr/portfolio.git

# Entre na pasta
cd portfolio

# Abra o index.html no navegador
open index.html
# ou
npx serve .
```

Não há dependências! É HTML, CSS e JavaScript puro.

## 🎨 Paleta de Cores

```css
--black: #000000           /* Background principal */
--black-soft: #0a0a0a      /* Background secundário */
--black-light: #141414     /* Cards e elementos */
--orange: #ff6b00          /* Accent principal */
--orange-bright: #ff8c00   /* Accent hover */
--orange-light: #ffa500    /* Accent highlight */
--white: #f5f5f5           /* Texto principal */
--gray: #a0a0a0            /* Texto secundário */
--gray-dark: #666666       /* Texto terciário */
```

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1024px (Sidebar lateral, canvas ativo)
- **Tablet**: 768px - 1024px (Sidebar menor, canvas otimizado)
- **Mobile**: < 768px (Bottom bar, canvas desabilitado)
- **Small Mobile**: < 480px (Elementos compactos)

### Estratégias Mobile
1. **Sidebar → Bottom Bar** - Melhora acessibilidade em telas pequenas
2. **Tipografia Fluida** - `clamp()` para escalabilidade
3. **Grid Responsivo** - `auto-fit` e `minmax()`
4. **Touch Targets** - Mínimo 45x45px para elementos clicáveis

## ⚡ Performance

### Otimizações Implementadas
- ✅ **Lazy Loading** - Iframes dos projetos carregam sob demanda
- ✅ **RequestAnimationFrame** - Animações sincronizadas com refresh rate
- ✅ **Debounce** - Eventos de resize otimizados (150ms)
- ✅ **CSS Transforms** - GPU acceleration para animações
- ✅ **Pointer Events None** - Canvas não bloqueia interações
- ✅ **Intersection Observer** - Animações apenas quando visível

### Lighthouse Score (estimado)
- 🟢 Performance: 95+
- 🟢 Accessibility: 90+
- 🟢 Best Practices: 95+
- 🟢 SEO: 100

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Adilson Rodrigues**

- 🌐 Website: [portfolio-adilsonjvr.vercel.app](https://portfolio-adilsonjvr.vercel.app)
- 💼 LinkedIn: [@adilsonjvr](https://linkedin.com/in/adilsonjvr)
- 🐙 GitHub: [@Adilsonjvr](https://github.com/Adilsonjvr)
- 📷 Instagram: [@adilsonjvr](https://instagram.com/adilsonjvr)
- 📧 Email: adilsonjvr@gmail.com

---

<div align="center">

### ⭐ Se você gostou deste projeto, considere dar uma estrela!

**Desenvolvido com 💛 e muito ☕ em Porto, Portugal**

</div>
