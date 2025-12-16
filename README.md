# MarieVault - Game Deals 🎮📺

Uma aplicação web para descoberta de promoções de videojogos, inspirada na estética vibrante de **Persona 4**. Desenvolvida como tarefa final do módulo M7.

Short Video:[MarieVault - video](https://www.youtube.com/shorts/wJ84vpMX0_o)

## 🌟 Funcionalidades

- **Pesquisa em Tempo Real**: Busca de jogos com debounce para otimização.
- **Filtros Avançados**: Filtragem por loja, intervalo de preços e ordenação múltipla.
- **Persistência de Dados**: Favoritos e preferências de filtro salvos automaticamente (localStorage).
- **Interface Temática**: Design "Marie UI" com feedback visual e animações inspiradas em Persona 4.
- **Robustez**: Tratamento de erros, cancelamento de requests (AbortController) e retries automáticos.

## 🛠️ Tecnologias

- **Frontend**: React 19, TypeScript, Vite
- **Estilos**: Tailwind CSS 4
- **Ícones**: Lucide React
- **API**: [CheapShark API](https://apidocs.cheapshark.com/)

## 🚀 Como Correr o Projeto

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/marievault.git
   cd marievault
   ```

2. **Instalar dependências**
   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

> **Nota sobre Proxy**: O projeto utiliza o proxy do Vite (configurado internamente se necessário) para evitar problemas de CORS durante o desenvolvimento, embora a CheapShark API suporte CORS nativamente.

## 📡 API e Integração

A aplicação consome a **CheapShark API** (v1.0).

### Endpoints Utilizados:
- `GET /deals`: Lista principal de promoções (suporta filtros e paginação).
- `GET /stores`: Lista de lojas e ícones.
- `GET /games`: Pesquisa de jogos por título.

### Campos Extraídos:
- `title`, `thumb` (imagem), `salePrice`, `normalPrice`, `savings` (desconto).
- `storeID` (para ícone da loja), `dealRating`, `metacriticScore`.
- `dealID` (para links de redirecionamento).

## 💾 Persistência

A aplicação utiliza `localStorage` para manter o estado entre sessões:
- `marievault_favorites`: Lista de jogos marcados como favoritos.
- `marievault_filters`: Últimos filtros e critérios de ordenação utilizados.
- `marievault_stores`: Cache da lista de lojas (validade de 24h).

Para testar a persistência:
1. Adicione um jogo aos favoritos.
2. Altere os filtros (ex: preço máximo).
3. Recarregue a página (F5).
4. Verifique se os favoritos e filtros se mantêm.

## 🎨 Identidade Visual (Marie UI)

O design segue o estilo "Pop Art / Broadcast" de Persona 4
