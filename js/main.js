/*
 * CADERNO DE LETRAS — ROYAL CODE
 * Interações e renderização do conteúdo de Língua Portuguesa.
 */

const tipoLabel = {
    conto: 'Conto',
    resenha: 'Resenha',
    cordel: 'Cordel',
    apresentacao: 'Apresentação'
};

const normalizar = (valor = '') => valor
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function escaparHTML(valor = '') {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[caractere]);
}

// Converte "2026-03-26" (ano-mês-dia) em "26/03/2026"
function formatarData(data = null) {
    if (!data) return 'Não informada';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Link da página de detalhe de um trabalho, a partir do id
function urlDoTrabalho(trabalho) {
    return `pagina.html?id=${encodeURIComponent(trabalho.id)}`;
}

// Número do trabalho (01, 02...) conforme a posição no array
function numeroDoTrabalho(trabalho) {
    return String(trabalhos.indexOf(trabalho) + 1).padStart(2, '0');
}

/* ---------- Texto do trabalho: array de blocos -> HTML ---------- */
/*
 * Convenções dos blocos (veja o cabeçalho de dados.js):
 *   "## Título", "### Título"  subtítulos        "- item"  itens seguidos viram <ul>
 *   "> citação"                 citação           "![alt](src) legenda"  imagem
 *   texto com "\n"              versos (mantém as quebras de linha)
 *   **negrito**, *itálico*      dentro do texto; "\*" é um asterisco literal
 */
function formatarInline(texto) {
    return escaparHTML(texto)
        .replace(/\\\*/g, '\u0000')                       // \* -> asterisco literal (guardado)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\u0000/g, '*');
}

function renderizarTexto(blocos) {
    let html = '';
    let lista = [];

    const fecharLista = () => {
        if (lista.length) html += `<ul>${lista.map(item => `<li>${formatarInline(item)}</li>`).join('')}</ul>`;
        lista = [];
    };

    blocos.forEach(bloco => {
        const imagem = bloco.match(/^!\[(.*?)\]\((.+?)\)\s*(.*)$/);

        if (bloco.startsWith('- ')) {
            lista.push(bloco.slice(2));
            return;
        }
        fecharLista();

        if (imagem) {
            const [, alt, src, legenda] = imagem;
            html += `<figure><img src="${escaparHTML(src)}" alt="${escaparHTML(alt)}" loading="lazy">${legenda ? `<figcaption>${formatarInline(legenda)}</figcaption>` : ''}</figure>`;
        } else if (bloco.startsWith('## ')) {
            html += `<h2>${formatarInline(bloco.slice(3))}</h2>`;
        } else if (bloco.startsWith('### ')) {
            html += `<h3>${formatarInline(bloco.slice(4))}</h3>`;
        } else if (bloco.startsWith('> ')) {
            html += `<blockquote>${formatarInline(bloco.slice(2))}</blockquote>`;
        } else if (bloco.includes('\n')) {
            html += `<p class="verso">${formatarInline(bloco)}</p>`;
        } else {
            html += `<p>${formatarInline(bloco)}</p>`;
        }
    });
    fecharLista();
    return html;
}

// Texto sem marcadores, usado na busca (assim "strong" ou "br" não encontram nada)
const textoPuro = trabalho => trabalho.texto
    .map(bloco => bloco
        .replace(/^!\[(.*?)\]\(.*?\)/, '$1')
        .replace(/^(#{2,3}|>|-)\s+/, '')
        .replace(/\*/g, ''))
    .join(' ');


// Monta o menu a partir do array itensMenu (config.js) e destaca a página atual.
// A página de detalhe (data-page="trabalho") destaca o item "Acervo".
function criarMenu(paginaAtual = '') {
    const nav = document.querySelector('#menu-principal');
    if (!nav) return;

    const destaque = paginaAtual === 'trabalho' ? 'acervo' : paginaAtual;

    nav.innerHTML = itensMenu.map(item => `
        <a href="${item.href}" ${item.pagina === destaque ? 'aria-current="page"' : ''}>
            ${item.texto}
        </a>
    `).join('');
}


function configurarNavegacao() {
    const botao = document.querySelector('#menu-toggle');
    const nav = document.querySelector('#menu-principal');

    if (!botao || !nav) return;

    const icone = botao.querySelector('span');

    function abrirMenu() {
        nav.classList.add('is-open');
        botao.setAttribute('aria-expanded', 'true');
        botao.setAttribute('aria-label', 'Fechar menu');

        if (icone) icone.textContent = '×';
    }

    function fecharMenu(devolverFoco = false) {
        nav.classList.remove('is-open');
        botao.setAttribute('aria-expanded', 'false');
        botao.setAttribute('aria-label', 'Abrir menu');

        if (icone) icone.textContent = '☰';

        if (devolverFoco) botao.focus();
    }

    // Abrir e fechar pelo botão
    botao.addEventListener('click', () => {
        const aberto = botao.getAttribute('aria-expanded') === 'true';

        if (aberto) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });

    // Fechar ao selecionar uma página
    nav.addEventListener('click', evento => {
        if (evento.target.closest('a')) {
            fecharMenu();
        }
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', evento => {
        if (
            evento.key === 'Escape' &&
            botao.getAttribute('aria-expanded') === 'true'
        ) {
            fecharMenu(true);
        }
    });

    // Fechar o menu ao voltar para a versão desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            fecharMenu();
        }
    });
}


// Tema claro/escuro. A escolha fica salva no navegador (se ele permitir).
function configurarTema() {
    const botao = document.querySelector('#theme-toggle');
    if (!botao) return;

    let temaSalvo = null;
    try { temaSalvo = localStorage.getItem('caderno-tema'); } catch (erro) { /* sem armazenamento: usa o padrão */ }
    if (temaSalvo === 'claro') document.documentElement.dataset.theme = 'claro';

    const atualizarRotulo = () => {
        const claro = document.documentElement.dataset.theme === 'claro';
        botao.textContent = claro ? 'Tema escuro' : 'Tema claro';
        botao.setAttribute('aria-pressed', String(claro));
    };

    const salvar = valor => {
        try { localStorage.setItem('caderno-tema', valor); } catch (erro) { /* ignora */ }
    };

    atualizarRotulo();
    botao.addEventListener('click', () => {
        const vaiFicarClaro = document.documentElement.dataset.theme !== 'claro';
        if (vaiFicarClaro) {
            document.documentElement.dataset.theme = 'claro';
            salvar('claro');
        } else {
            delete document.documentElement.dataset.theme;
            salvar('escuro');
        }
        atualizarRotulo();
    });
}

function criarCard(trabalho) {
    const autores = trabalho.autores.length
        ? trabalho.autores.join(', ')
        : 'Autoria não informada';
    const modalidade = trabalho.modo === 'grupo' ? 'Em grupo' : 'Individual';

    return `
        <article class="work-card">
            <a class="work-card__image" href="${urlDoTrabalho(trabalho)}" aria-label="Abrir ${escaparHTML(trabalho.titulo)}">
                <img src="${escaparHTML(trabalho.imagem.src)}" alt="${escaparHTML(trabalho.imagem.alt)}" loading="lazy">
            </a>
            <div class="work-card__body">
                <div class="work-card__eyebrow">Trabalho ${numeroDoTrabalho(trabalho)} · ${tipoLabel[trabalho.tipo] || escaparHTML(trabalho.tipo)}</div>
                <h3><a href="${urlDoTrabalho(trabalho)}">${escaparHTML(trabalho.titulo)}</a></h3>
                <p>${escaparHTML(trabalho.resumo)}</p>
                <dl class="work-card__meta">
                    <div><dt>Autoria</dt><dd>${escaparHTML(autores)}</dd></div>
                    <div><dt>Modalidade</dt><dd>${modalidade}</dd></div>
                </dl>
                <a class="text-link" href="${urlDoTrabalho(trabalho)}">Ler produção <span aria-hidden="true">→</span></a>
            </div>
        </article>
    `;
}

function preencherFiltroAutores(select) {
    if (!select) return;
    const autores = [...new Set(trabalhos.flatMap(item => item.autores))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    select.innerHTML = '<option value="todos">Todos os autores</option>' + autores
        .map(autor => `<option value="${escaparHTML(autor)}">${escaparHTML(autor)}</option>`).join('');
}

function iniciarAcervo() {
    const lista = document.querySelector('#lista-trabalhos');
    if (!lista) return;

    const busca = document.querySelector('#busca-trabalhos');
    const tipo = document.querySelector('#filtro-tipo');
    const autor = document.querySelector('#filtro-autor');
    const modalidade = document.querySelector('#filtro-modalidade');
    const contador = document.querySelector('#total-trabalhos');
    const vazio = document.querySelector('#mensagem-vazia');

    preencherFiltroAutores(autor);

    const parametros = new URLSearchParams(window.location.search);
    const tipoInicial = parametros.get('tipo');
    if (tipoInicial && tipo && [...tipo.options].some(opcao => opcao.value === tipoInicial)) {
        tipo.value = tipoInicial;
    }

    function filtrar() {
        const termo = normalizar(busca?.value.trim() || '');
        const tipoEscolhido = tipo?.value || 'todos';
        const autorEscolhido = autor?.value || 'todos';
        const modalidadeEscolhida = modalidade?.value || 'todos';

        const resultados = trabalhos.filter(trabalho => {
            const textoCompleto = normalizar([
                trabalho.titulo, trabalho.resumo, textoPuro(trabalho),
                trabalho.tipo, trabalho.grupo, ...trabalho.autores
            ].join(' '));
            const combinaBusca = textoCompleto.includes(termo);
            const combinaTipo = tipoEscolhido === 'todos' || trabalho.tipo === tipoEscolhido;
            const combinaAutor = autorEscolhido === 'todos' || trabalho.autores.includes(autorEscolhido);
            const combinaModalidade = modalidadeEscolhida === 'todos' || trabalho.modo === modalidadeEscolhida;
            return combinaBusca && combinaTipo && combinaAutor && combinaModalidade;
        });

        lista.innerHTML = resultados.map(criarCard).join('');
        if (contador) contador.textContent = `${resultados.length} ${resultados.length === 1 ? 'produção encontrada' : 'produções encontradas'}`;
        if (vazio) vazio.hidden = resultados.length !== 0;
    }

    [busca, tipo, autor, modalidade].forEach(controle => {
        if (controle) controle.addEventListener(controle === busca ? 'input' : 'change', filtrar);
    });
    filtrar();
}

function iniciarDestaques() {
    const lista = document.querySelector('#trabalhos-destaque');
    if (!lista) return;
    lista.innerHTML = trabalhos.slice(0, 3).map(criarCard).join('');
}

function iniciarCategorias() {
    const lista = document.querySelector('#categorias-lista');
    if (!lista) return;
    const categorias = [
        { tipo: 'conto', nome: 'Contos', descricao: 'Narrativas autorais e histórias de ficção.', imagem: 'img/gerais/espreitador.jpg' },
        { tipo: 'resenha', nome: 'Resenhas', descricao: 'Leituras, análises e opiniões sobre livros.', imagem: 'img/gerais/resenha_l.jpg' },
        { tipo: 'cordel', nome: 'Cordéis', descricao: 'Versos, cultura popular e reflexão social.', imagem: 'img/gerais/cordel.jpg' },
        { tipo: 'apresentacao', nome: 'Apresentações', descricao: 'Trabalhos orais, entrevistas e materiais audiovisuais.', imagem: 'img/cinema/o_cinema_brasileiro_nossa_historia.jpg' }
    ];
    lista.innerHTML = categorias.map(categoria => {
        const quantidade = trabalhos.filter(item => item.tipo === categoria.tipo).length;
        return `<a class="category-tile" href="acervo.html?tipo=${categoria.tipo}">
            <img src="${categoria.imagem}" alt="" loading="lazy">
            <span class="category-tile__content"><strong>${categoria.nome}</strong><small>${categoria.descricao}</small><em>${quantidade} ${quantidade === 1 ? 'produção' : 'produções'} →</em></span>
        </a>`;
    }).join('');
}

function iniciarDetalhe() {
    const destino = document.querySelector('#detalhe-trabalho');
    if (!destino) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const trabalho = trabalhos.find(item => item.id === id);

    if (!trabalho) {
        destino.innerHTML = `<section class="empty-panel"><h1>Produção não encontrada</h1><p>Confira o endereço ou volte ao acervo para escolher outro trabalho.</p><a class="button" href="acervo.html">Voltar ao acervo</a></section>`;
        document.title = 'Produção não encontrada | Caderno de Letras';
        return;
    }

    const autores = trabalho.autores.join(', ') || 'Autoria não informada';
    const modalidade = trabalho.modo === 'grupo' ? 'Produção em grupo' : 'Produção individual';
const creditosPorTipo = {
    conto: 'Capa gerada por inteligência artificial.',
    cordel: 'Capa gerada por inteligência artificial.',
    apresentacao: 'Capa gerada por inteligência artificial.',
    resenha: 'Foto da capa do livro, tirada pelos alunos de exemplar próprio.'
};
const creditoImagem = creditosPorTipo[trabalho.tipo] || '';
const imagemPrincipal = `<figure class="detail-cover"><img src="${escaparHTML(trabalho.imagem.src)}" alt="${escaparHTML(trabalho.imagem.alt)}"><figcaption>${escaparHTML(trabalho.imagem.legenda || '')}${creditoImagem ? ` <span class="credito-imagem">${escaparHTML(creditoImagem)}</span>` : ''}</figcaption></figure>`;
    const video = trabalho.video?.src ? `
        <section class="detail-video" aria-labelledby="video-titulo">
            <div class="eyebrow">Material audiovisual</div>
            <h2 id="video-titulo">Assista à apresentação</h2>
            <div class="video-frame"><iframe src="${escaparHTML(trabalho.video.src)}" title="${escaparHTML(trabalho.video.titulo || trabalho.titulo)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        </section>` : '';
    const links = trabalho.links.length ? `
        <section class="detail-links" aria-labelledby="links-titulo"><h2 id="links-titulo">Materiais complementares</h2><ul>${trabalho.links.map(link => `<li><a href="${escaparHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escaparHTML(link.texto)}</a></li>`).join('')}</ul></section>` : '';

    destino.innerHTML = `
        <a class="back-link" href="acervo.html">← Voltar ao acervo</a>
        <header class="detail-heading">
            <div class="eyebrow">Trabalho ${numeroDoTrabalho(trabalho)} · ${tipoLabel[trabalho.tipo] || escaparHTML(trabalho.tipo)}</div>
            <h1>${escaparHTML(trabalho.titulo)}</h1>
            <div class="detail-meta">
                <p><strong>Autoria:</strong> ${escaparHTML(autores)}</p>
                <p><strong>Grupo produtor:</strong> ${escaparHTML(trabalho.grupo || 'Não informado')}</p>
                <p><strong>Modalidade:</strong> ${modalidade}</p>
                <p><strong>Data:</strong> ${escaparHTML(formatarData(trabalho.data))}</p>
            </div>
            <p class="detail-summary">${escaparHTML(trabalho.resumo)}</p>
        </header>
        ${imagemPrincipal}
        <article class="article-body" aria-label="Texto completo da produção">${renderizarTexto(trabalho.texto)}</article>
        ${video}
        ${links}
    `;
    document.title = `${trabalho.titulo} | Caderno de Letras`;
}

function configurarVoltarTopo() {
    const botao = document.querySelector('#voltar-topo');
    if (!botao) return;
    const atualizar = () => { botao.hidden = window.scrollY < 280; };
    window.addEventListener('scroll', atualizar, { passive: true });
    atualizar();
    botao.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', () => {
    const pagina = document.body.dataset.page || '';

    // Configura primeiro o botão do menu
    configurarNavegacao();

    // Depois cria os links
    criarMenu(pagina);

    configurarTema();
    iniciarDestaques();
    iniciarCategorias();
    iniciarAcervo();
    iniciarDetalhe();
    configurarVoltarTopo();
});
