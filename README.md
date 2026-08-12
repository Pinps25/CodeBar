# Gerador de Código de Barras Pro

PWA para gerar códigos de barras (CODE128, EAN-13, UPC, CODE39) direto no navegador, com exportação em PNG.

## Publicar no GitHub Pages

1. Crie um repositório novo (ex: `codigo-de-barras`) e suba estes 5 arquivos mantendo a estrutura de pastas:
   ```
   index.html
   manifest.json
   service-worker.js
   icons/icon-192.png
   icons/icon-512.png
   ```
2. No repositório: **Settings → Pages → Source → Deploy from branch → main / (root)**.
3. Aguarde alguns minutos e acesse o link gerado (ex: `https://seu-usuario.github.io/codigo-de-barras/`).
4. No celular, abra o link e use "Adicionar à tela de início" — o app abre como PWA, sem barra do navegador.

## O que foi ajustado nesta versão

- Layout travado como página estática: sem "folga" (rubber-band/bounce) ao arrastar para cima ou para baixo no mobile. O scroll só aparece se o conteúdo realmente crescer (ex: código de barras grande gerado).
- Ícones e `manifest.json` para instalação como app (Adicionar à tela de início).
- `service-worker.js` para funcionar offline após a primeira visita.
