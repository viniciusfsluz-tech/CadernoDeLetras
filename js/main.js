
/*
 * CADERNO DE LETRAS
 * Busca de trabalhos e botão Voltar ao topo.
 */

// ========================================
// 1. BUSCA DOS TRABALHOS
// ========================================

const campoBusca = document.querySelector("#busca-trabalhos");

if (campoBusca) {
    const cartoes = [
        ...document.querySelectorAll("[data-trabalho]")
    ];

    const mensagemVazia = document.querySelector("#sem-resultados");
    const contador = document.querySelector(".work-count");

    const totalTrabalhos = cartoes.length;

    campoBusca.addEventListener("input", () => {
        const termo = campoBusca.value
            .trim()
            .toLocaleLowerCase("pt-BR");

        let visiveis = 0;

        cartoes.forEach((cartao) => {
            const conteudo = cartao.textContent
                .toLocaleLowerCase("pt-BR");

            const corresponde = conteudo.includes(termo);

            cartao.hidden = !corresponde;

            if (corresponde) {
                visiveis++;
            }
        });

        if (mensagemVazia) {
            mensagemVazia.hidden = visiveis !== 0;
        }

        if (contador) {
            contador.textContent = termo === ""
                ? `${totalTrabalhos} trabalhos`
                : `${visiveis} de ${totalTrabalhos} trabalhos`;
        }
    });
}

// ========================================
// 2. BOTÃO VOLTAR AO TOPO
// ========================================

const botaoTopo = document.createElement("button");

botaoTopo.type = "button";
botaoTopo.className = "back-to-top";
botaoTopo.textContent = "↑ Voltar ao topo";
botaoTopo.setAttribute("aria-label", "Voltar ao topo da página");
botaoTopo.hidden = true;

document.body.appendChild(botaoTopo);

// Mostra o botão depois que a pessoa rolar a página.
function atualizarBotaoTopo() {
    const alturaDocumento = document.documentElement.scrollHeight;
    const alturaJanela = window.innerHeight;
    const podeRolar = alturaDocumento > alturaJanela + 50;

    botaoTopo.hidden = !podeRolar || window.scrollY < 150;
}

window.addEventListener("scroll", atualizarBotaoTopo, {
    passive: true
});

// Retorna ao início da página ao clicar.
botaoTopo.addEventListener("click", () => {
    const prefereMovimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: prefereMovimentoReduzido ? "auto" : "smooth"
    });
});

// Verifica a posição inicial da página.
atualizarBotaoTopo();

/*
 * 3. FORMULÁRIO DE CONTATO DEMONSTRATIVO
 * Não envia nem armazena dados.
 */

const formularioContato = document.querySelector("#form-contato");

if (formularioContato) {
    const resultadoContato = document.querySelector("#resultado-contato");

    formularioContato.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (resultadoContato) {
            resultadoContato.textContent =
                "Demonstração concluída! Nenhuma mensagem foi enviada " +
                "ou armazenada. Este formulário existe somente para fins acadêmicos.";

            resultadoContato.hidden = false;
        }

        formularioContato.reset();
    });
}

/* =========================================
   ACERVO DE PRODUÇÕES
========================================= */

const listaTrabalhos = document.getElementById("lista-trabalhos");

if (listaTrabalhos && typeof trabalhos !== "undefined") {

    const campoBusca = document.getElementById("busca-trabalhos");
    const filtroTipo = document.getElementById("filtro-tipo");
    const filtroAutor = document.getElementById("filtro-autor");
    const filtroModalidade = document.getElementById("filtro-modalidade");
    const totalTrabalhos = document.getElementById("total-trabalhos");
    const mensagemVazia = document.getElementById("mensagem-vazia");

    const normalizarTexto = (texto = "") => {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    function criarCard(trabalho) {

        const autores = trabalho.autores.length
            ? trabalho.autores.join(", ")
            : "Autoria não informada";

        const tipo = {
            conto: "Conto",
            resenha: "Resenha",
            cordel: "Cordel",
            apresentacao: "Apresentação"
        };

        return `
            <article class="card" data-trabalho="${trabalho.id}">

                <a href="${trabalho.pagina}" class="card-image-link">
                    <img
                        src="${trabalho.imagem.src}"
                        alt="${trabalho.imagem.alt}"
                        loading="lazy"
                    >
                </a>

                <div class="card-content">

                    <span class="card-number">
                        Trabalho ${String(trabalho.id).padStart(2, "0")}
                        · ${tipo[trabalho.tipo] || trabalho.tipo}
                    </span>

                    <h3>${trabalho.titulo}</h3>

                    <p>${trabalho.resumo}</p>

                    <p class="work-author">
                        <strong>Autoria:</strong> ${autores}
                    </p>

                    <p class="work-modality">
                        <strong>Modalidade:</strong>
                        ${trabalho.modalidade === "grupo" ? "Em grupo" : "Individual"}
                    </p>

                    <a href="${trabalho.pagina}" class="read-more">
                        Ler trabalho →
                    </a>

                </div>

            </article>
        `;
    }

    function filtrarTrabalhos() {

        const busca = normalizarTexto(campoBusca.value.trim());
        const tipoSelecionado = filtroTipo.value;
        const autorSelecionado = filtroAutor.value;
        const modalidadeSelecionada = filtroModalidade.value;

        const resultados = trabalhos.filter(trabalho => {

            const conteudo = normalizarTexto([
                trabalho.titulo,
                trabalho.resumo,
                trabalho.tipo,
                ...trabalho.autores
            ].join(" "));

            const correspondeBusca = conteudo.includes(busca);

            const correspondeTipo =
                tipoSelecionado === "todos" ||
                trabalho.tipo === tipoSelecionado;

            const correspondeAutor =
                autorSelecionado === "todos" ||
                trabalho.autores.includes(autorSelecionado);

            const correspondeModalidade =
                modalidadeSelecionada === "todos" ||
                trabalho.modalidade === modalidadeSelecionada;

            return (
                correspondeBusca &&
                correspondeTipo &&
                correspondeAutor &&
                correspondeModalidade
            );
        });

        listaTrabalhos.innerHTML = resultados
            .map(criarCard)
            .join("");

        totalTrabalhos.textContent =
            `${resultados.length} ${resultados.length === 1 ? "produção encontrada" : "produções encontradas"}`;

        mensagemVazia.hidden = resultados.length !== 0;
    }

    campoBusca.addEventListener("input", filtrarTrabalhos);
    filtroTipo.addEventListener("change", filtrarTrabalhos);
    filtroAutor.addEventListener("change", filtrarTrabalhos);
    filtroModalidade.addEventListener("change", filtrarTrabalhos);

    filtrarTrabalhos();
}
/* =========================================
   4. PÁGINAS DE CATEGORIAS
   Gera automaticamente os trabalhos de cada gênero.
========================================= */

const listaCategoria = document.getElementById(
    "lista-trabalhos-categoria"
);

if (listaCategoria && typeof trabalhos !== "undefined") {

    const campoBuscaCategoria = document.getElementById(
        "busca-trabalhos"
    );

    const contadorCategoria = document.getElementById(
        "total-trabalhos-categoria"
    );

    const mensagemVaziaCategoria = document.getElementById(
        "sem-resultados"
    );

    // Identifica a categoria pela página atual.
    const paginaAtual = window.location.pathname
        .split("/")
        .pop();

    const categoriasPagina = {
        "conto.html": "conto",
        "resenha.html": "resenha",
        "cordel.html": "cordel",
        "apresentacoes.html": "apresentacao"
    };

    const categoriaAtual = categoriasPagina[paginaAtual];

    const normalizarCategoria = (texto = "") => {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    function criarCardCategoria(trabalho) {

        const autores = trabalho.autores.length
            ? trabalho.autores.join(", ")
            : "Autoria não informada";

        const nomesTipos = {
            conto: "Conto",
            resenha: "Resenha",
            cordel: "Cordel",
            apresentacao: "Apresentação"
        };

        return `
            <article class="card" data-trabalho="${trabalho.id}">

                <a href="${trabalho.pagina}" class="card-image-link">
                    <img
                        class="work-thumbnail"
                        src="${trabalho.imagem.src}"
                        alt="${trabalho.imagem.alt}"
                        loading="lazy"
                    >
                </a>

                <div class="card-content">

                    <div class="card-number">
                        TRABALHO ${String(trabalho.id).padStart(2, "0")}
                        · ${nomesTipos[trabalho.tipo] || trabalho.tipo}
                    </div>

                    <h3>${trabalho.titulo}</h3>

                    <p>${trabalho.resumo}</p>

                    <p class="work-author">
                        <strong>Autoria:</strong> ${autores}
                    </p>

                    <a
                        class="read-more"
                        href="${trabalho.pagina}"
                    >
                        Ler trabalho completo →
                    </a>

                </div>

            </article>
        `;
    }

    function atualizarCategoria() {

        if (!categoriaAtual) return;

        const termo = normalizarCategoria(
            campoBuscaCategoria.value.trim()
        );

        const trabalhosCategoria = trabalhos.filter(trabalho => {

            if (trabalho.tipo !== categoriaAtual) {
                return false;
            }

            const conteudo = normalizarCategoria([
                trabalho.titulo,
                trabalho.resumo,
                ...trabalho.autores
            ].join(" "));

            return conteudo.includes(termo);
        });

        listaCategoria.innerHTML = trabalhosCategoria
            .map(criarCardCategoria)
            .join("");

        const quantidade = trabalhosCategoria.length;

        contadorCategoria.textContent =
            `${quantidade} ${quantidade === 1 ? "trabalho" : "trabalhos"}`;

        mensagemVaziaCategoria.hidden = quantidade !== 0;
    }

    if (categoriaAtual && campoBuscaCategoria) {
        campoBuscaCategoria.addEventListener(
            "input",
            atualizarCategoria
        );

        atualizarCategoria();
    }
}
/* =========================================
   5. PÁGINA DE APRESENTAÇÕES
   Carrega os trabalhos de apresentação
   diretamente do arquivo dados.js.
========================================= */

const listaApresentacoes = document.getElementById(
    "lista-apresentacoes"
);

if (listaApresentacoes && typeof trabalhos !== "undefined") {

    const contadorApresentacoes = document.getElementById(
        "total-apresentacoes"
    );

    const mensagemVaziaApresentacoes = document.getElementById(
        "sem-apresentacoes"
    );

    function criarApresentacao(trabalho) {

        const autores = trabalho.autores.length
            ? trabalho.autores.join(", ")
            : "Autoria não informada";

        return `
            <article class="featured-report-card">

                <div class="featured-report-visual">
                    <img
                        src="${trabalho.imagem.src}"
                        alt="${trabalho.imagem.alt}"
                        loading="lazy"
                    >
                </div>

                <div class="featured-report-content">

                    <div class="featured-report-tags">
                        <span>
                            TRABALHO ${String(trabalho.id).padStart(2, "0")}
                        </span>

                        <span>APRESENTAÇÃO E ENTREVISTA</span>
                    </div>

                    <h3 id="featured-title">
                        ${trabalho.titulo}
                    </h3>

                    <p class="featured-report-description">
                        ${trabalho.resumo}
                    </p>

                    <div class="featured-authors">
                        <span class="authors-label">REALIZADO POR</span>

                        <p>${autores}</p>
                    </div>

                    <a
                        class="featured-report-button"
                        href="${trabalho.pagina}"
                    >
                        <span>Ler a reportagem completa</span>
                        <span aria-hidden="true">→</span>
                    </a>

                </div>

            </article>
        `;
    }

    function carregarApresentacoes() {

        const apresentacoes = trabalhos.filter(
            trabalho => trabalho.tipo === "apresentacao"
        );

        listaApresentacoes.innerHTML = apresentacoes
            .map(criarApresentacao)
            .join("");

        const quantidade = apresentacoes.length;

        contadorApresentacoes.textContent =
            `${quantidade} ${quantidade === 1 ? "trabalho" : "trabalhos"}`;

        mensagemVaziaApresentacoes.hidden = quantidade !== 0;
    }

    carregarApresentacoes();
}