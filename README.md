# Etiqueta — Gerador de Código de Barras

PWA para gerar código de barras e QR Code direto no navegador, com exportação em PNG e SVG.

## Publicar no GitHub Pages

1. Suba estes arquivos ao repositório mantendo a estrutura de pastas:
   ```
   index.html
   manifest.json
   service-worker.js
   icons/icon-192.png
   icons/icon-512.png
   ```
2. **Settings → Pages → Source → Deploy from branch → main / (root)**.
3. Acesse o link gerado e, no celular, use "Adicionar à tela de início" para instalar como app.

## O que tem nesta versão

**Robustez**
- Cada formato agora sanitiza a digitação em tempo real (ex: EAN-13/UPC só aceitam números; CODE39 vira maiúsculo automaticamente).
- Validação de tamanho por formato antes de gerar, com mensagem específica ("faltam 3 dígitos", "2 a mais que o máximo").
- Contador de caracteres ao lado do campo, comparando com o tamanho esperado.

**Formato / Qualidade**
- Exportação em **SVG** além de PNG (nítido em qualquer resolução, ideal pra impressão de etiqueta).
- Opções avançadas: espessura da barra, altura, tamanho do texto e margem, ajustáveis pela interface.

**Formatos adicionais**
- Barras: CODE128, EAN-13, EAN-8, UPC, CODE39, ITF-14, Codabar, MSI.
- Novo modo **QR Code** (aba própria), com tamanho e nível de correção de erro configuráveis, também exportável em PNG e SVG.

**Visual**
- Identidade nova em estilo "etiqueta física": cartão com furo de pendurar, borda perfurada, tipografia monoespaçada para os dados e serifada geométrica para os títulos.

**Teclado numérico automático (Android/iOS)**
- Os campos "Valor do código" (Barras) e "Código selecionado" (Auditoria) abrem com o teclado numérico do celular por padrão (`inputmode="numeric"` + `pattern="[0-9]*"`, a combinação que funciona tanto no Android quanto no iPhone).
- Na aba Barras, ao trocar pra CODE39 ou Codabar (formatos que costumam usar letras/símbolos) o campo volta ao teclado padrão automaticamente, pois o teclado numérico do iPhone não tem alternância para letras.
- O campo de texto/link do QR Code continua com teclado normal, já que ali entram URLs e textos.

**Layout mobile**
- Sem "folga" de scroll ao arrastar quando não há conteúdo extra.
- Botões de PNG/SVG ficam no fim de cada aba (não empurram mais o código pra cima/baixo enquanto você digita).
- A área de saída (código de barras / QR) usa `position: sticky`: fica no fluxo normal da página, mas gruda no topo da tela automaticamente quando a rolagem for tirá-la de vista — por exemplo, com "Opções avançadas" ou um setor aberto empurrando o conteúdo pra baixo. Sem JavaScript de rolagem, sem ficar seguindo a tela quando não precisa.

## Nova aba AUDITORIA (uso operacional em loja)

- Atalhos de setor organizados em 3 seções: **Setor Perecíveis**, **Setor Mercearia** e **Hortifruti** — toque em um código pra jogá-lo direto no campo e gerar o código de barras (CODE128).
- Checkbox **"Mil Contra"** (sufixo `0001`) e checkbox **"Formato Etiqueta"** (`:p:CÓDIGO:vp:XX`) são mutuamente exclusivos — marcar um desmarca o outro automaticamente.
- No Formato Etiqueta, o `XX` final é sempre 2 dígitos aleatórios (00–99) e é resorteado automaticamente toda vez que o código digitado muda ou a opção é ativada. Um botão "🔀 Novo XX" permite sortear um novo par sem alterar o código.
- Um preview mostra o valor exato que foi codificado no código de barras antes do download.
- Exportação em PNG e SVG, igual às outras abas.
