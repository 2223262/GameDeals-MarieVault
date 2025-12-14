# 🎮 MarieVault - Guia de Instalação e Execução Local

## 📋 Pré-requisitos

Antes de começar, certifique-se de que tem instalado:

- **Node.js** (versão 18 ou superior): [Download aqui](https://nodejs.org/)
- **pnpm** (gestor de pacotes): Instale com `npm install -g pnpm`
- **Git**: [Download aqui](https://git-scm.com/)

Para verificar se tem tudo instalado:
```bash
node --version
pnpm --version
git --version
```

---

## 🚀 Passos de Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/2223262/marievault.git
cd marievault
```

### 2. Instalar Dependências

```bash
pnpm install
```

Este comando irá:
- Descarregar todas as dependências do projeto
- Configurar o ambiente de desenvolvimento
- Preparar o Vite para execução local

### 3. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

Verá uma saída similar a:

```
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://169.254.0.21:3000/
```

### 4. Abrir no Navegador

Abra o seu navegador e aceda a:
```
http://localhost:3000
```

---

## 🎯 Funcionalidades Disponíveis

Uma vez a aplicação em execução, poderá:

✅ **Pesquisar Jogos**: Utilize a barra de pesquisa com a Marie sentada em cima  
✅ **Filtrar por Loja**: Selecione lojas específicas no dropdown  
✅ **Ordenar Resultados**: Por rating, preço, desconto, etc.  
✅ **Ajustar Intervalo de Preço**: Use o slider para definir o preço máximo  
✅ **Marcar Favoritos**: Clique no ícone de coração para guardar jogos  
✅ **Ver Relatório**: Clique em "REPORT" para ver a página de apresentação  

---

## 💾 Dados Persistidos

A aplicação guarda automaticamente em `localStorage`:

- **Favoritos**: Lista de jogos marcados como favoritos
- **Filtros**: Últimos filtros e critérios de ordenação utilizados
- **Cache de Lojas**: Lista de lojas (atualizada a cada 24 horas)

Estes dados persistem mesmo após fechar e reabrir a aplicação.

---

## 🔧 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Compila para produção |
| `pnpm preview` | Pré-visualiza build de produção |
| `pnpm check` | Verifica erros TypeScript |
| `pnpm format` | Formata código com Prettier |

---

## 🌐 Aceder à Aplicação

- **Página Principal (Game Deals)**: `http://localhost:3000/`
- **Página de Relatório**: `http://localhost:3000/presentation`

---

## 🐛 Resolução de Problemas

### "Port 3000 is already in use"

Se a porta 3000 já está em uso, pode especificar outra porta:

```bash
pnpm dev -- --port 3001
```

### "Cannot find module" ou erros de dependências

Limpe o cache e reinstale:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Problemas com CORS

A aplicação utiliza a CheapShark API que suporta CORS nativamente. Se encontrar problemas:

1. Verifique a sua ligação à internet
2. Certifique-se de que não está atrás de um proxy corporativo
3. Tente em modo incógnito (sem extensões do navegador)

---

## 📡 API Utilizada

A aplicação consome a **CheapShark API** (v1.0):
- **Base URL**: `https://www.cheapshark.com/api/1.0`
- **Sem autenticação**: Não requer API Key
- **CORS**: Totalmente suportado

---

## 🎨 Estrutura do Projeto

```
marievault/
├── client/
│   ├── public/
│   │   └── images/          # Imagens estáticas (Marie, etc.)
│   └── src/
│       ├── components/      # Componentes React reutilizáveis
│       ├── contexts/        # Context API (StoreProvider)
│       ├── hooks/           # Custom hooks (useDebounce, useLocalStorage)
│       ├── lib/             # Utilitários (API service, etc.)
│       ├── pages/           # Páginas (Home, Presentation)
│       ├── types/           # Definições TypeScript
│       └── App.tsx          # Componente raiz
├── README.md                # Documentação principal
├── SETUP.md                 # Este ficheiro
└── package.json             # Dependências do projeto
```

---

## 💡 Dicas de Desenvolvimento

### Hot Module Replacement (HMR)

O Vite suporta HMR automático. Qualquer alteração a ficheiros `.tsx` ou `.css` será refletida instantaneamente no navegador sem necessidade de recarregar.

### TypeScript

O projeto utiliza TypeScript para segurança de tipos. Execute `pnpm check` para verificar erros de tipo antes de fazer commit.

### Tailwind CSS

O projeto utiliza Tailwind CSS 4 com tema personalizado. Consulte `client/src/index.css` para ver as variáveis de cores e estilos globais.

---

## 📞 Suporte

Se encontrar problemas:

1. Consulte o [README.md](./README.md) para documentação técnica
2. Verifique o [GitHub Issues](https://github.com/2223262/marievault/issues)
3. Revise a documentação da [CheapShark API](https://apidocs.cheapshark.com/)

---

**Desenvolvido com ❤️ por Manus AI**
