# Vaclog - Catalogo de Vacinas Acessivel

## Bem-vindo ao Vaclog

Vaclog eh um catalogo educativo de vacinas com linguagem simples, criado para ajudar pessoas leigas a entender beneficios e riscos de forma calma, clara e transparente.

## Objetivo

O Vaclog existe para:
- Explicar o que sao vacinas e como funcionam
- Apresentar informacoes baseadas em diretrizes de saude reconhecidas
- Esclarecer duvidas comuns e combater desinformacao
- Oferecer uma plataforma acessivel a todos

## Acessibilidade em Primeiro Lugar

O Vaclog foi desenvolvido com foco em **acessibilidade universal**:

### Padroes WCAG 2.1 (Nivel AA+)
- Estrutura HTML5 semantica
- ARIA labels e landmarks claros
- Contraste de cores adequado (minimo 7:1)
- Tipografia legivel e clara
- Link "Pular para conteudo principal" para navegacao por teclado

### Recursos de Acessibilidade

**Leitores de Tela**
- Todos os elementos com role e aria-label apropriados
- main com id conteudo-principal para facil localizacao
- Secoes com aria-labelledby vinculadas aos titulos
- aria-live para atualizacoes dinamicas de busca

**Navegacao por Teclado**
- Skip link no topo da pagina
- Foco viavel em todos os elementos interativos
- Botoes e inputs com labels explicitamente associados
- Navegador de search com combobox ARIA

## Deploy e Hospedagem

O Vaclog esta deployado automaticamente via **GitHub Pages**:

- URL: https://talvezz.github.io/Vaclog/
- Hospedagem: GitHub Pages (atualiza automaticamente a cada push em main)
- Protocolo: HTTPS (obrigatorio)
- CDN: Distribuido globalmente

## Como Usar

### Abrir o Site
1. Visite https://talvezz.github.io/Vaclog/
2. Use a busca para procurar uma vacina ou doenca
3. Explore as categorias rapidas
4. Leia as informacoes com atencao

### Navegar pelo Teclado
- Tab: Mover para o proximo elemento
- Shift+Tab: Mover para o elemento anterior
- Enter/Espaco: Ativar botoes
- Setas: Navegar em listas

### Usar um Leitor de Tela
- NVDA (Windows): Gratuito
- JAWS (Windows): Pago
- VoiceOver (macOS/iOS): Integrado
- TalkBack (Android): Integrado

## Estrutura do Projeto

```
Vaclog/
index.html              # Pagina principal com estrutura semantica
styles.css              # Estilos com bom contraste e legibilidade
search.js               # Funcionalidade de busca com autocomplete
vacina-template.html    # Template para paginas de vacinas individuais
README.md               # Este arquivo
```

## Desenvolvido com

- HTML5 - Estrutura semantica
- CSS3 - Estilos responsivos e acessiveis
- JavaScript - Busca e interatividade
- GitHub Pages - Hospedagem e deploy automatico
- WCAG 2.1 - Padroes de acessibilidade

## Contribuindo

Quer ajudar a melhorar o Vaclog?

1. Faca um fork do repositorio
2. Crie uma branch para sua feature
3. Commit suas mudancas
4. Push para a branch
5. Abra um Pull Request

### Areas para Contribuir
- Adicionar mais vacinas ao catalogo
- Melhorar a acessibilidade
- Corrigir bugs
- Traduzir para outros idiomas
- Melhorar o design e UX

## Licenca

Este projeto esta sob a licenca MIT.

## Aviso Importante

**O Vaclog eh um site informativo e nao substitui consulta medica.**

Para decisoes sobre sua saude e de sua familia, sempre converse com profissionais de saude de confianca.

---

**Vaclog** - Informacao clara, calma e acessivel sobre vacinas.
