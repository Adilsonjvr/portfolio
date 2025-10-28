# 🤖 Agent Memory - Portfolio Project

> Este arquivo serve como memória persistente para o agente IA, contendo todo o histórico, decisões técnicas e contexto do projeto.

---

## 📋 Informações do Projeto

### Identificação
- **Projeto**: Portfólio Pessoal Artístico
- **Desenvolvedor**: Adilson Rodrigues (@Adilsonjvr)
- **Localização**: Porto, Portugal
- **Repositório**: https://github.com/Adilsonjvr/portfolio
- **Deploy**: https://portfolio-adilsonjvr.vercel.app
- **Início do Desenvolvimento**: 2025-01-28

### Stack Tecnológica
- **Frontend**: HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **Ícones**: Devicon CDN (SVG images)
- **Deploy**: Vercel com auto-deploy via GitHub
- **Versionamento**: Git + GitHub

---

## 🎨 Conceito Visual

### Filosofia de Design
**"CÓDIGO É ARTE"** - Portfólio artístico que foge dos padrões convencionais.

### Paleta de Cores
```css
--black: #000000           /* Background principal */
--black-soft: #0a0a0a      /* Background secundário */
--black-light: #141414     /* Cards e elementos */
--orange: #ff6b00          /* Accent principal */
--orange-bright: #ff8c00   /* Accent hover */
--orange-light: #ffa500    /* Accent highlight */
```

### Elementos Visuais Únicos
1. **Canvas Criativo** - Partículas laranjas interativas que fogem do mouse
2. **Paralaxe em 3 Camadas** - Scroll + mouse parallax
3. **Números Gigantes em Outline** - Usados como elementos decorativos
4. **Formas Orgânicas Animadas** - Nos cards de projetos
5. **Glow Animado** - Na frase de impacto da hero section

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos
```
portfolio/
├── index.html              # Estrutura HTML semântica
├── styles.css              # ~1500 linhas de CSS com variáveis
├── script.js               # Interatividade e animações
├── images/
│   └── perfil.png          # 512x512px foto de perfil
├── README.md               # Documentação completa
├── .agent.md               # Este arquivo (memória do agente)
└── index.html.backup       # Backup automático (não versionado)
```

### Seções do HTML (em ordem)
1. `<nav>` - Navegação minimalista com logo `<DEV/>`
2. `#home` - Hero section com manifesto
3. `#about` - About com estatísticas animadas
4. `.parallax-divider` - Citação inspiradora
5. `#projects` - Grid de projetos em destaque
6. `#skills` - Grid de tecnologias (17 ícones)
7. `<footer>` - Footer minimalista
8. `.social-sidebar` - Barra lateral de redes sociais

---

## 🎯 Funcionalidades Implementadas

### Desktop (> 768px)
- ✅ Sidebar social lateral fixa (esquerda)
- ✅ Canvas com partículas interativas
- ✅ Paralaxe em 3 camadas (background, middleground, foreground)
- ✅ Cursor customizado laranja
- ✅ Navegação que some ao scroll down, volta no scroll up
- ✅ Hover effects em todos os elementos interativos

### Mobile (< 768px)
- ✅ Sidebar → Bottom bar fixa (transform lateral para horizontal)
- ✅ Canvas desabilitado (economia de performance)
- ✅ Menu hamburger para navegação
- ✅ Touch targets mínimo 45x45px
- ✅ Tipografia fluida com `clamp()`

### Interatividade
- ✅ Smooth scroll para navegação interna
- ✅ Contadores animados nas estatísticas (0 → valor final)
- ✅ Fade in up animations com Intersection Observer
- ✅ Parallax mouse tracking
- ✅ Canvas particle system

---

## 🚀 Projetos Incluídos

### 1. Transcribe App
- **URL**: https://transcribe-app-phi.vercel.app
- **GitHub**: https://github.com/Adilsonjvr/transcribe-app
- **Stack**: React, Supabase, AssemblyAI, Tailwind CSS, Vite
- **Features**:
  - Transcrição de áudio com IA
  - Identificação automática de speakers
  - 6+ idiomas suportados
  - Exports: TXT, JSON, PDF, DOCX
  - Sincronização multi-dispositivo
- **Posição**: Projeto #1

### 2. Crypto Dashboard Realtime
- **URL**: https://dashboard-realtime.vercel.app
- **GitHub**: https://github.com/Adilsonjvr/dashboard-realtime
- **Stack**: React, TypeScript, Chart.js, Framer Motion, Vite
- **Features**:
  - Cotações em tempo real (WebSocket Binance)
  - 6 criptomoedas: BTC, ETH, BNB, SOL, ADA, XRP
  - Gráficos dinâmicos com Chart.js
  - Estatísticas globais
  - Auto-reconexão WebSocket
- **Posição**: Projeto #2

### 3. App Mobile Colaborativo (Placeholder)
- **Status**: Placeholder para projeto futuro
- **Stack Planejada**: React Native, Firebase, WebSocket, Redux
- **Posição**: Projeto #3

---

## 🛠️ Skills & Tecnologias (17 no total)

### Frontend (4)
1. **HTML5** - `html5-original.svg`
2. **CSS3** - `css3-original.svg`
3. **JavaScript** - `javascript-original.svg`
4. **React** - `react-original.svg`

### Backend (3)
5. **Node.js** - `nodejs-original.svg`
6. **Python** - `python-original.svg`
7. **Java** - `java-original.svg`

### Database (2)
8. **PostgreSQL** - `postgresql-original.svg`
9. **Supabase** - `supabase-original.svg`

### DevOps & Tools (3)
10. **Git** - `git-original.svg`
11. **Docker** - `docker-original.svg`
12. **Vite** - `vitejs-original.svg`

### Styling & UI (3)
13. **TypeScript** - `typescript-original.svg`
14. **Tailwind CSS** - `tailwindcss-original.svg`
15. **Chart.js** - `chartjs-original.svg`
16. **Framer Motion** - `framermotion-original.svg`

### Nota sobre Ícones
- **Migração**: De `<i class="devicon-*-plain colored">` para `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/*/original.svg">`
- **Razão**: Cores oficiais garantidas (problema do Vite amarelo resolvido)
- **Variante**: Sempre usar `original` para garantir cores corretas

---

## 🐛 Problemas Resolvidos

### 1. Ícone do Vite Todo Amarelo
**Problema**: Vite aparecia com cor sólida amarela ao invés do gradiente roxo/amarelo oficial.
**Solução**: Migração de font icons (`devicon-vitejs-plain colored`) para SVG images (`vitejs-original.svg`).
**Commit**: `bf81fd9`

### 2. Ícone de Email Não Clicável
**Problema**: Canvas criativo bloqueava cliques na sidebar social.
**Solução**: Adicionar `pointer-events: none` ao `#creative-canvas`.
**Commit**: `82a85d1`

### 3. Scroll Hint "EXPLORAR" Escondido
**Problema**: Z-index não funcionava porque `scroll-hint` estava dentro de `home-container` (stacking context).
**Solução**: Mover `scroll-hint` para fora do `home-container` no HTML.
**Commit**: `a9b97ec`

### 4. Sidebar Desaparece no Mobile
**Problema**: CSS tinha `display: none` para `.social-sidebar` em `@media (max-width: 768px)`.
**Solução**: Transformar sidebar lateral em bottom bar fixa com layout horizontal.
**Commit**: `6757353`

---

## 📊 Estatísticas do Perfil

```html
<div class="about-stats">
    <div class="stat-box">
        <span class="stat-value" data-count="5">0</span>
        <span class="stat-plus">+</span>
        <span class="stat-label">Projetos</span>
    </div>
    <div class="stat-box">
        <span class="stat-value" data-count="2">0</span>
        <span class="stat-plus">+</span>
        <span class="stat-label">Anos</span>
    </div>
    <div class="stat-box">
        <span class="stat-value" data-count="100">0</span>
        <span class="stat-plus">%</span>
        <span class="stat-label">Dedicação</span>
    </div>
</div>
```

---

## 🎭 Animações e Efeitos

### CSS Animations
```css
@keyframes fadeInUp - Fade in com movimento para cima
@keyframes slideInLeft - Slide da esquerda
@keyframes slideInRight - Slide da direita
@keyframes glow - Efeito de brilho pulsante
@keyframes rotate - Rotação contínua (360deg)
@keyframes scrollMove - Movimento do scroll hint
@keyframes gradientRotate - Gradiente rotativo
```

### JavaScript Animations
- **Canvas Particles**: RequestAnimationFrame a ~60fps
- **Parallax Layers**: Mouse tracking com `clientX/clientY`
- **Counter Animation**: Easing com `t * t * (3 - 2 * t)`
- **Scroll Progress**: IntersectionObserver para lazy animations

### Performance Optimizations
```javascript
// Debounce para resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 150);
});

// RequestAnimationFrame para animações
function animate() {
    // ... atualizar partículas
    requestAnimationFrame(animate);
}
```

---

## 🔧 Decisões Técnicas

### Por que Vanilla JS ao invés de Framework?
1. **Performance**: Sem overhead de framework
2. **Controle Total**: Acesso direto ao DOM e Canvas API
3. **Simplicidade**: Projeto pequeno não justifica React/Vue
4. **SEO**: HTML estático é melhor para SEO
5. **Learning**: Demonstra conhecimento de fundamentos

### Por que Devicon CDN?
1. **Qualidade**: Ícones oficiais das tecnologias
2. **Performance**: CDN é mais rápido que hospedar localmente
3. **Manutenção**: Atualizações automáticas dos ícones
4. **Consistência**: Todos os ícones seguem o mesmo padrão

### Por que Vercel?
1. **Integração GitHub**: Auto-deploy a cada push
2. **Performance**: Edge network global
3. **SSL Grátis**: HTTPS automático
4. **Custom Domains**: Fácil configurar domínios
5. **Analytics**: Insights de performance inclusos

---

## 📝 Histórico de Commits

### Commits Principais (ordem cronológica)
1. `feat: Redesign completo com arte e paralaxe` - Design inicial
2. `feat: Add skills section with technology icons` - Seção de skills
3. `feat: Migrar todos os ícones para Devicon em alta qualidade` - Devicon
4. `feat: Adicionar projeto Crypto Dashboard Realtime` - Projeto #2
5. `da788fb` - Adiciona Chart.js e Framer Motion
6. `bf81fd9` - Migra para SVG images (fix Vite)
7. `82a85d1` - Fix email clicável (pointer-events)
8. `6757353` - Responsividade mobile + bottom bar
9. `a9b97ec` - Fix scroll hint z-index + atualizações

### Padrão de Commit
```
<type>: <subject>

<body detalhado>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `perf`

---

## 🌐 Redes Sociais e Links

### Links Ativos
- **Portfolio**: https://portfolio-adilsonjvr.vercel.app
- **GitHub**: https://github.com/Adilsonjvr
- **LinkedIn**: https://linkedin.com/in/adilsonjvr
- **Instagram**: https://instagram.com/adilsonjvr
- **Email**: mailto:adilsonjvr@gmail.com

### Sidebar Social
```html
<aside class="social-sidebar">
    <!-- 4 ícones SVG com links -->
    <!-- Desktop: lateral esquerda, vertical -->
    <!-- Mobile: bottom bar, horizontal -->
</aside>
```

---

## 💡 Ideias para Futuras Melhorias

### Features Planejadas
- [ ] Seção de blog/artigos técnicos
- [ ] Formulário de contato funcional (EmailJS?)
- [ ] Dark/Light mode toggle (atualmente só dark)
- [ ] Idioma PT/EN toggle
- [ ] Mais projetos (mínimo 6 idealmente)
- [ ] Certificações/educação section
- [ ] Timeline de experiência profissional

### Otimizações Futuras
- [ ] Lazy load para imagens (se adicionar mais)
- [ ] Service Worker para PWA
- [ ] WebP images com fallback
- [ ] Minificação de CSS/JS
- [ ] Critical CSS inline

### Experimentos
- [ ] Three.js para background 3D
- [ ] GSAP para animações complexas
- [ ] Particles.js ao invés de canvas custom
- [ ] Scroll-triggered animations (ScrollTrigger)

---

## 🎓 Aprendizados e Insights

### Técnicas CSS Aprendidas
1. **Stacking Context**: `z-index` só funciona dentro do mesmo contexto de empilhamento
2. **Clamp Typography**: `clamp(min, preferred, max)` para tipografia fluida
3. **CSS Variables**: Reutilização e theme consistency
4. **Grid Auto-fit**: `repeat(auto-fit, minmax(150px, 1fr))` para responsividade
5. **Backdrop Filter**: `backdrop-filter: blur(10px)` para glassmorphism

### JavaScript Patterns
1. **Debounce**: Otimizar eventos de resize/scroll
2. **RequestAnimationFrame**: Animações sincronizadas com refresh rate
3. **Intersection Observer**: Lazy animations quando elemento entra na viewport
4. **Event Delegation**: Melhor performance em listas grandes
5. **Canvas API**: Particle systems e animações customizadas

### Git Workflow
1. **Conventional Commits**: Facilita changelogs automáticos
2. **Co-Authoring**: Creditar Claude nas mensagens de commit
3. **Descriptive Bodies**: Explicar o "porquê", não só o "o que"
4. **Atomic Commits**: Um commit = uma mudança lógica

---

## 🔍 SEO e Acessibilidade

### Meta Tags Presentes
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Portfólio artístico de desenvolvimento de software">
<title>Portfólio | Desenvolvedor Criativo</title>
```

### Melhorias SEO Futuras
- [ ] Open Graph tags para redes sociais
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Sitemap.xml
- [ ] Robots.txt

### Acessibilidade
- ✅ Alt texts em todas as imagens
- ✅ Semantic HTML (header, nav, section, aside, footer)
- ✅ ARIA labels onde necessário
- ✅ Contraste de cores adequado (WCAG AA)
- ❌ Keyboard navigation (precisa melhorar)
- ❌ Screen reader testing (não testado ainda)

---

## 📞 Contato do Desenvolvedor

**Adilson Rodrigues**
- **Título**: Desenvolvedor FullStack
- **Localização**: Porto, Portugal
- **Email**: adilsonjvr@gmail.com
- **Disponibilidade**: Aberto a oportunidades

### Preferências de Trabalho
- Remote-first
- Full-stack positions
- Tech stack: React, Node.js, TypeScript
- Interesse em: Web3, AI/ML, Cloud

---

## 🤖 Instruções para Próximas Sessões

### Ao Retomar este Projeto
1. Ler este arquivo `.agent.md` completamente
2. Verificar último commit para entender estado atual
3. Consultar seção "Problemas Resolvidos" para não repetir erros
4. Seguir padrão de commits estabelecido
5. Atualizar este arquivo ao fazer mudanças significativas

### Padrões a Manter
- **Variante de ícones**: Sempre `original.svg` do Devicon
- **Paleta de cores**: Preto + gradiente laranja (#ff6b00 → #ffa500)
- **Breakpoints**: 1024px, 768px, 480px
- **Z-index**: Nav=100, Sidebar=999-1000, Layers=0, Content=10-20
- **Convenção de commits**: Conventional Commits com co-authoring

### Arquivos Importantes
- `index.html` - Estrutura (390 linhas)
- `styles.css` - Estilos (~1500 linhas com media queries)
- `script.js` - Interatividade e animações
- `README.md` - Documentação para usuários
- `.agent.md` - Este arquivo (memória para IA)

---

## 📚 Referências e Recursos

### Documentação Consultada
- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JS
- [Devicon](https://devicon.dev/) - Ícones de tecnologias
- [Vercel Docs](https://vercel.com/docs) - Deploy e configuração
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Particle system

### Inspirações de Design
- Dribbble - Portfolio designs artísticos
- Awwwards - Websites premiados
- Codepen - Animações e efeitos CSS

---

**Última Atualização**: 2025-01-28
**Versão do Projeto**: 1.0.0
**Status**: ✅ Em produção (https://portfolio-adilsonjvr.vercel.app)
