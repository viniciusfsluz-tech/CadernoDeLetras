# Caderno de Letras — grupo Royal Code (Língua Portuguesa)

Conteúdo de Português do grupo **Royal Code** para o Projeto Final Integrador **Portal da Turma** (PL1).
Feito somente com HTML, CSS e JavaScript puro, sem frameworks nem bibliotecas.

## Integrantes e papéis

Autores dos trabalhos: Vinícius Ferreira, Luis Gustavo, Ruan Silva e Gabriel Mariano.

| Integrante | Papel | Grupo que representa |
|---|---|---|
| Vinícius Ferreira | Programação do site (HTML, JS e CSS) e representante do grupo na Equipe do Portal | Royal Code |
| Luis Gustavo | Imagens e confirmação das fontes | Royal Code |
| Ruan Silva | Parte visual (CSS) | Royal Code |
| Gabriel Mariano | Pesquisa geral dos temas e imagens | Royal Code |

## Turma e campus

IFSP, campus Cubatão · Turma 148 · ano letivo 2026 · Língua Portuguesa (profa. Fabiana) e Práticas de Laboratório (prof. Nelson)

## Link do portal publicado (GitHub Pages)

https://viniciusfsluz-tech.github.io/CadernoDeLetras/

## Como abrir

Dê um duplo clique em `index.html`. Não precisa de servidor.

## Estrutura de pastas

```
index.html  acervo.html  pagina.html  conto.html  resenha.html  cordel.html
apresentacoes.html  sobre.html  contato.html
css/style.css        estilos, paleta (variáveis, tema escuro e claro) e layout
js/config.js         configurações do site e itens do menu (array itensMenu)
js/dados.js          array com todos os trabalhos
js/main.js           menu, cartões, filtros, busca, página de detalhe e tema
img/                 imagens (contos, resenhas, cordel, cinema, gerais)
```

`pagina.html?id=...` mostra qualquer trabalho a partir do seu `id`.

## Como cadastrar um trabalho (`js/dados.js`)

```js
{
    id: "royal-conto-01",          // único, minúsculo, sem espaços
    titulo: "Título do trabalho",
    tipo: "conto",                 // conto, resenha, cordel ou apresentacao
    modo: "grupo",                 // "individual" ou "grupo"
    autores: ["Nome 1", "Nome 2"],
    grupo: "Royal Code",
    data: "2026-03-26",            // ano-mês-dia
    resumo: "Uma ou duas frases.",
    texto: ["Parágrafo 1", "Parágrafo 2"],
    imagem: { src: "img/contos/arquivo.jpg", alt: "Descrição da imagem", legenda: "Legenda da imagem" },
    video: null,                   // ou { src: "https://www.youtube.com/embed/CODIGO", titulo: "..." }
    links: [{ texto: "Fonte consultada", url: "https://..." }]
}
```

Convenções dentro de `texto` (cada item do array é um bloco):

| Bloco | Resultado |
|---|---|
| `"Texto"` | parágrafo |
| `"Verso 1\nVerso 2"` | versos (as quebras de linha são mantidas) |
| `"## Título"` / `"### Título"` | subtítulos |
| `"> citação"` | citação |
| `"- item"` | item de lista (itens seguidos formam uma lista) |
| `"![descrição](img/arquivo.jpg) legenda"` | imagem com texto alternativo e legenda |
| `**negrito**`, `*itálico*` | destaques (use `\*` para um asterisco literal) |

Nomes de arquivos de imagem: minúsculas, sem acentos e sem espaços (ex.: `poema_ana.jpg`), com cerca de até 1 MB.

## Trabalhos publicados

| id | Título | Tipo | Modo | Data |
|---|---|---|---|---|
| `royal-conto-01` | Os retalhos de uma alma quebrada | conto | individual | 2026-03-26 |
| `royal-resenha-01` | O Mistério de Henri Pick | resenha | individual | 2026-08-13 |
| `royal-cordel-01` | A Voz do Povo e o Artigo 19 | cordel | individual | 2026-09-11 |
| `royal-apresentacao-01` | O Cinema Brasileiro em comparação ao resto do mundo | apresentacao | grupo | 2026-06-25 |
| `royal-conto-02` | Hibisco Roxo: a visão de Jaja | conto | individual | 2026-03-26 |
| `royal-cordel-02` | O direito de crer | cordel | individual | 2026-09-10 |
| `royal-resenha-02` | Hamlet | resenha | individual | 2026-08-13 |
| `royal-cordel-03` | O Artigo Primeiro e a igualdade humana | cordel | individual | 2026-09-10 |
| `royal-resenha-03` | O Diário de Anne Frank | resenha | individual | 2026-08-13 |
| `royal-conto-03` | O Peso da Mão de Deus | conto | individual | 2026-03-26 |
| `royal-conto-04` | Insônia… | conto | individual | 2026-03-26 |
| `royal-cordel-04` | Um Homem Azarado | cordel | individual | 2026-09-10 |
| `royal-resenha-04` | Os 5 Corpos do Ser Humano | resenha | individual | 2026-08-13 |

## Fontes e licenças de imagens e textos de terceiros

**Imagens.** As capas dos contos, os cordéis e a capa da apresentação sobre cinema foram geradas por inteligência artificial. As capas de livros foram fotografadas pelos próprios alunos, de exemplares que eles têm em casa. Os cartazes dos filmes foram obtidos no Google Imagens e no Letterboxd. Os direitos das capas e dos cartazes pertencem aos seus autores, editoras e produtoras; as imagens são usadas apenas neste trabalho escolar, sem fins comerciais.

| Arquivo | Origem / autor | Licença |
|---|---|---|
| `img/contos/hibisco_roxo_a_visao_de_jaja.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/contos/insonia_fragmentos_de_um_viajante.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/contos/o_peso_da_mao_de_deus.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/contos/os_retalhos_de_uma_alma_quebrada.png` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/gerais/espreitador.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/cordel/cordel_artigo18.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/cordel/cordel_artigo19.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/cordel/cordel_artigo28.png` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/cordel/um_homem_azarado_sobrevivendo_a_tempestade.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/gerais/cordel.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/gerais/cordel_l.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/gerais/cordel_r.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/gerais/o_direito_de_crer.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/cinema/o_cinema_brasileiro_nossa_historia.jpg` | Imagem gerada por inteligência artificial (ferramenta: Gemini) | Gerada por IA; uso escolar |
| `img/resenhas/hamlet.png` | Foto da capa do livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/resenhas/o_diario_de_anne_frank.png` | Foto da capa do livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/resenhas/o_misterio_de_henri_pick.jpg` | Foto da capa do livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/resenhas/os_5_corpos_do_ser_humano.png` | Foto da capa do livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/gerais/resenha_l.jpg` | Foto de capa de livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/gerais/resenha_r.jpg` | Foto de capa de livro, tirada pelos alunos de exemplar próprio. Capa de autoria da editora/autor | Sem licença de reutilização; uso escolar, sem fins comerciais |
| `img/cinema/ainda_estou_aqui.jpg` | Cartaz de divulgação do filme, obtido no Google Imagens e no Letterboxd | Direitos da produtora/distribuidora; uso escolar, sem fins comerciais |
| `img/cinema/cidade_de_deus.jpg` | Cartaz de divulgação do filme, obtido no Google Imagens e no Letterboxd | Direitos da produtora/distribuidora; uso escolar, sem fins comerciais |
| `img/cinema/emergencia_radioativa.jpg` | Cartaz de divulgação do filme, obtido no Google Imagens e no Letterboxd | Direitos da produtora/distribuidora; uso escolar, sem fins comerciais |
| `img/cinema/o_auto_da_compadecida.jpg` | Cartaz de divulgação do filme, obtido no Google Imagens e no Letterboxd | Direitos da produtora/distribuidora; uso escolar, sem fins comerciais |
| `img/cinema/tropa_de_elite.jpg` | Cartaz de divulgação do filme, obtido no Google Imagens e no Letterboxd | Direitos da produtora/distribuidora; uso escolar, sem fins comerciais |

**Informações sobre os filmes** (trabalho "O Cinema Brasileiro"):

- Casa de Cinema de Porto Alegre, "A lista das listas de melhores filmes brasileiros", de Jorge Furtado, 15/05/2026: https://www.casacinepoa.com.br/blog/2026-05-15-a-lista-das-listas-de-melhores-filmes-brasileiros/
- Letterboxd: https://letterboxd.com

**Textos de terceiros citados nos cordéis:** Declaração Universal dos Direitos Humanos (ONU), em português: https://unric.org/pt/wp-content/uploads/sites/9/2023/10/PT-UDHR-v2023_web.pdf

## Pendências antes da entrega

- Os cartazes de filmes (Google Imagens e Letterboxd) e as capas de livros (fotos de exemplares dos alunos) não têm licença de reutilização: uso escolar, sem fins comerciais. As demais capas foram geradas por IA. A origem de cada imagem está na tabela acima e o crédito aparece na página de cada trabalho.
