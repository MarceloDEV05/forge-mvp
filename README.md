# FORGE Supplements • Protótipo React + TypeScript

## Rodar localmente

Requer Node.js 20.19+ ou 22+.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://localhost:5173).

## Testar build

```bash
npm run build
npm run preview
```

## Páginas

- `/` Home
- `/catalogo` Catálogo com busca, categorias e ordenação
- `/produto/whey` Detalhe do produto
- `/admin` Painel demonstrativo com cadastro, edição, exclusão e estoque

## Dados

Persistência local via `localStorage`, sem backend. Os dados não sincronizam entre navegadores. O botão **Restaurar demo** reinicia os dados.

## WhatsApp

Número fictício configurado em `src/components/CartDrawer.tsx`: `5511999999999`. Substitua antes de publicar. A compra não é efetivada e não reserva estoque.

## Atenção

Não usar em produção comercial sem autenticação administrativa, API e banco de dados, validação de estoque no servidor e medidas de segurança.

## Imagens

Ilustrações SVG locais e originais de embalagens demonstrativas, em `public/products`. Para trocar, atualize o campo `image` no painel.
