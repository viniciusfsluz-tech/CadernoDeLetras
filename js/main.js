
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
