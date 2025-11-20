Documento de Padrões de Design para Interfaces Web
Base para projetos de Frontend, UX e Motion Design

1. Objetivo e Escopo
Este documento define os padrões visuais, de interação e implementação técnica para interfaces web.
 Ele serve como base para:
Guiar designers, desenvolvedores e times de produto.


Garantir consistência visual e comportamental entre páginas e componentes.


Servir de referência para geração de interfaces por IAs e por humanos.


Sempre que um novo layout, componente ou fluxo for criado, este documento deve ser consultado.

2. Princípios Gerais de Design
2.1. Hierarquia Visual
Todo layout deve deixar claro, em segundos, o que é:


Informação principal (nível 1)


Informação de apoio (nível 2)


Detalhes contextuais (nível 3)


A hierarquia é construída por:


Tamanho


Peso tipográfico


Cor e contraste


Espaçamento


Profundidade (sombras, elevação)


Posicionamento no layout


Regras práticas:
Um único elemento de foco principal por tela (CTA ou mensagem-chave).


Evitar múltiplos elementos com o mesmo peso visual competindo entre si.


Títulos maiores, com maior contraste e mais espaço ao redor do que o texto de corpo.


2.2. Clareza
Cada elemento deve ter função óbvia à primeira vista.


Ícones devem usar metáforas visuais já reconhecidas pelo público-alvo.


Nada deve depender de interpretação ambígua (símbolos pouco comuns, rótulos confusos etc.).


2.3. Escaneabilidade (Scanability)
O usuário deve conseguir “varrer” a tela rapidamente e entender:


Onde está


O que pode fazer


Qual é o próximo passo lógico


Técnicas:


Títulos e subtítulos claros


Quebra de texto em blocos curtos


Listas em vez de parágrafos longos quando possível


Espaçamento consistente entre grupos de informação


2.4. Motivação para Ação
Elementos de chamada à ação (CTAs) precisam:


Contraste visual alto em relação ao fundo


Texto de ação clara (“Começar agora”, “Finalizar compra”, “Agendar consulta”)


Estado de hover e feedback visual de clique


Interações devem mostrar recompensa clara:


Mensagens de confirmação, sucessos, estados de carregamento compreensíveis.


Transições suaves que reforçam que a ação foi realizada.



3. Sistema de Cores
3.1. Regra 60-30-10
60%: Cor primária (base visual da interface)


30%: Cor secundária (apoio e contraste moderado)


10%: Cor de acento (CTAs, alertas, elementos críticos)


Regras:
A cor de acento deve ser usada com parcimônia.


Não introduzir cores fora da paleta principal sem justificativa de uso (como estados de erro/sucesso).


3.2. Coesão Cromática
Todas as cores devem:


Ter relação harmoniosa (análogas, complementares, tríades ou outra lógica clara).


Reforçar a identidade da marca.


Evitar:


Cores que pareçam “intrusas” ou sem conexão com a paleta.


Uso de muitas cores diferentes em um mesmo contexto.


3.3. Acessibilidade e Contraste
Todos os textos devem atender no mínimo ao padrão WCAG AA de contraste.


Verificar contraste entre:


Texto e fundo


Ícones e fundo


Botões e fundo


Cores não podem ser o único sinalizador de estado (usar ícones, rótulos, padrões de borda, etc.).



4. Tipografia
4.1. Hierarquia Tipográfica
Definir no mínimo os seguintes estilos:
Título principal (H1)


Títulos de seção (H2, H3)


Texto de corpo


Destaques (negrito, subtítulos, legendas)


Regras:
Limitar a variação de famílias tipográficas (idealmente 1 ou 2 famílias).


Garantir legibilidade em tamanhos menores em dispositivos mobile.


Espaçamento entre linhas (line-height) generoso para textos de leitura contínua.


4.2. Uso de Destaques
Negrito para termos importantes, nunca para preencher espaço.


Subtítulos para introduzir seções de texto mais longas.


Itálico apenas quando necessário (termos estrangeiros, ênfase pontual).



5. Layout, Grid e Espaçamento
5.1. Grid
Adotar um sistema de grid responsivo (por exemplo, 12 colunas para desktop, colunas reduzidas em mobile).


Manter margens consistentes nas laterais.


Alinhamento deve ser previsível: colunas bem estabelecidas e repetidas ao longo do projeto.


5.2. Espaçamento Modular
Usar uma unidade base de 4px ou 8px.


Espaços entre elementos devem seguir múltiplos dessa unidade (ex.: 8, 16, 24, 32 px).


Princípio de proximidade:
Elementos relacionados: menos espaço entre si.


Elementos não relacionados: mais espaço, criando blocos visuais distintos.


5.3. Respiração Visual
Espaço ao redor de elementos importantes comunica relevância.


Evitar compressão excessiva de elementos críticos (CTAs, títulos, campos de formulário importantes).



6. Componentes de Interação
6.1. Botões
Botão Primário
Maior contraste com o fundo.


Preenchimento sólido (sem ghost button como ação principal).


Texto curto, claro e imperativo.


Estados obrigatórios:


Normal


Hover


Active


Disabled


Loading (quando aplicável)


Botão Secundário
Menor contraste, mas ainda claramente interativo.


Pode usar contorno ou cor mais neutra.


Também deve ter estados de hover e active bem definidos.


Ghost Buttons
Permitidos apenas como ação secundária, quando:


A hierarquia visual já deixa claro que é um elemento interativo.


Não conflitam com o botão primário da tela.


6.2. Campos de Formulário
Padrões mínimos:
Labels sempre visíveis (evitar apenas placeholder como label).


Estados:


Normal


Focado


Preenchido


Erro (mensagem clara e específica)


Sucesso (quando fizer sentido)


Erros devem ser informativos, não genéricos.



7. Fundos, Gradientes e Profundidade
7.1. Fundos e Gradientes
Gradientes devem:


Dar profundidade e sofisticação sem prejudicar legibilidade.


Não competir com o conteúdo principal.


Quando houver texto sobre gradiente:


Garantir contraste suficiente.


Usar overlays semi-transparentes, se necessário, para manter legibilidade.


7.2. Profundidade e Sombras
Usar sombras e elevação para:


Comunicar hierarquia (elementos mais importantes “mais próximos”).


Destacar elementos clicáveis.


Regras:


Sombras discretas e consistentes em todo o sistema.


Não misturar estilos de sombra muito diferentes sem critério (por exemplo, sombras muito difusas em um lugar e muito duras em outro).



8. Motion e Animações
8.1. Princípios Gerais
Toda animação deve ter propósito claro:


Guiar atenção


Confirmar ação


Demonstrar relação entre elementos


Evitar:


Animações gratuitas, “decorativas” que não agregam valor.


Excesso de elementos animados simultaneamente.


8.2. Scroll Suave
Utilizar bibliotecas (ex.: Lenis, Locomotive) apenas quando:


A página se beneficia de sensação de fluidez (portfolios, landing pages premium).


A performance é garantida (objetivo: 60fps desktop, mínimo 45fps mobile).


Sempre respeitar:


Preferência do usuário por movimento reduzido (prefers-reduced-motion).


8.3. Animações Baseadas em Viewport
Usar Intersection Observer, GSAP ou Framer Motion para disparar animações ao entrar no viewport.


Exemplos:


Cards aparecendo com fade-in leve.


Números contadores animando ao se tornarem visíveis.


Benefícios:


Economia de processamento.


Foco em elementos no momento certo da jornada.


8.4. Sticky Positioning
Usar de forma estratégica:


Cabeçalhos que reduzem tamanho ao rolar.


Painéis de contexto que acompanham o scroll.


Nunca usar apenas “porque é moderno”. Sticky deve melhorar navegação ou compreensão.


8.5. Easing
Definir de duas a três curvas de easing padrão e manter consistência:


Linear: para ações utilitárias e rápidas.


Ease-out: para ações de confirmação (por exemplo, clique em CTA).


Ease-in-out fluido: para experiências mais sofisticadas (agências, marcas premium).


Evitar múltiplas curvas diferentes sem propósito, pois causam sensação de incoerência.


8.6. Text Splitting (Animação Tipográfica)
Uso restrito a:


Títulos de destaque em hero sections.


Transições entre seções principais.


Momentos de impacto visual alto.


Riscos e cuidados:


Manter semântica HTML correta para screen readers.


Garantir fallback para quando o splitting não for suportado.


Evitar em textos longos ou conteúdos que usuários desejam copiar.


8.7. Shaders e Efeitos Avançados
Usar shaders (Three.js, Babylon.js, GLSL) apenas em:


Seções heróicas.


Transições especiais.


Backdrops de alto impacto visual (ex.: portfólios).


Cuidados:


Monitorar carga de GPU, principalmente em mobile.


Fornecer fallback estático quando WebGL não for suportado ou quando a performance for insuficiente.


Não usar shaders em contextos com leitura densa ou dados críticos.



9. Acessibilidade
Padrões obrigatórios:
Contraste de texto mínimo WCAG AA.


Respeito à preferência prefers-reduced-motion.


Focus visível e claro para elementos interativos navegáveis via teclado.


Componentes devem ser navegáveis por teclado (tabulação lógica).


Textos alternativos em imagens com função informativa.


Evitar text splitting ou efeitos que prejudiquem leitura por leitores de tela, sem fallback.



10. Performance
Objetivos:
Scroll e animações suaves (60fps desktop, mínimo 45fps mobile).


Animações curtas (idealmente até 300–500ms).


Uso moderado de bibliotecas pesadas (webGL, motion complexo).


Diretrizes:
Desativar efeitos pesados em dispositivos com hardware limitado, quando possível.


Otimizar imagens (formato, compressão, lazy load).


Limitar o número de elementos animados simultaneamente.



11. Requisitos Técnicos de Implementação
Sempre especificar, para cada projeto:
Framework principal (ex.: React, Vue, Next, etc.).


Abordagem de styling (Tailwind CSS, CSS Modules, Styled Components, etc.).


Biblioteca de motion (GSAP, Framer Motion, outra).


Browsers suportados (nomes e versões mínimas).


Breakpoints de responsividade.


Tokens recomendados (definir em design system):
Cores (hex ou HSL): primária, secundária, acento, neutros, estados (erro, sucesso, alerta).


Tipografia: tamanhos, pesos, line-heights.


Espaçamento: escala modular (4 ou 8 px).


Radius: padrões de borda (ex.: 4, 8, 12 px).


Sombras: níveis de elevação (ex.: base, elevada, overlay).


Motion: duração padrão, easing padrão, atraso máximo aceitável.



12. Processo de Entrega e Validação
Para cada nova página ou componente, a entrega deve incluir:
Descrição do conceito visual (qual problema resolve, qual mensagem transmite).


Hierarquia visual e informacional (o que é nível 1, 2, 3).


Wireframe textual ou esquemático por seção.


Aplicação da paleta 60-30-10 indicada.


Uso dos tokens do design system (tipografia, cores, espaçamento, sombras).


Especificação de estados de interação (hover, active, disabled, loading, error).


Especificação de animações (o que anima, quando, com qual easing e duração).


Código implementável ou pseudocódigo de referência.


Checklist de acessibilidade:


Contraste


Navegação por teclado


prefers-reduced-motion


Uso de labels e textos alternativos


Observações de performance:


Bibliotecas adicionais usadas


Potenciais pontos críticos em mobile


Fallbacks previstos



13. Uso deste Documento em Projetos e com IA
Este documento deve ser tratado como referência principal de padrões de design.


Em qualquer nova tarefa (humana ou via IA), deve-se:


Especificar o objetivo da tela ou componente.


Indicar que as soluções devem seguir este documento.


Exigir outputs estruturados conforme a seção 12 (processo de entrega).


Exemplo de instrução para uso com IA (conceitual, fora do escopo visual-do-documento):
“Crie o layout da página X seguindo integralmente o Documento de Padrões de Design do projeto. Entregue hierarquia, wireframe textual, aplicação de paleta, componentes e recomendações de motion.”

