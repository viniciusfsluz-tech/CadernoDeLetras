
/*
 * CADERNO DE LETRAS
 * Banco centralizado de produções de Língua Portuguesa.
 */

const trabalhos = [

    {
        id: 1,
        titulo: "Os retalhos de uma alma quebrada",
        tipo: "conto",
        modalidade: "individual",
        autores: ["Vinícius Ferreira"],
        grupo: null,
        data: null,
        resumo: "Uma narrativa de terror sobre Eugene, uma presença paranormal e os acontecimentos que cercam o desaparecimento do protagonista.",
        imagem: {
            src: "imagens/contos/Os retalhos de uma alma quebrada.png",
            alt: "Ilustração de Os retalhos de uma alma quebrada"
        },
        pagina: "trabalho1.html",
        video: null,
        links: []
    },

    {
        id: 2,
        titulo: "O Mistério de Henri Pick",
        tipo: "resenha",
        modalidade: "individual",
        autores: ["Vinícius Ferreira"],
        grupo: null,
        data: null,
        resumo: "Uma avaliação pessoal do romance de David Foenkinos, com comentários sobre os personagens, as reviravoltas e os temas da leitura.",
        imagem: {
            src: "imagens/resenhas/O misterio de Henri Pick.jpeg",
            alt: "Capa do livro O Mistério de Henri Pick"
        },
        pagina: "trabalho2.html",
        video: null,
        links: []
    },

    {
        id: 3,
        titulo: "A Voz do Povo e o Artigo 19",
        tipo: "cordel",
        modalidade: "individual",
        autores: ["Vinícius Ferreira"],
        grupo: null,
        data: null,
        resumo: "Poema sobre liberdade de expressão, direito à informação e responsabilidade no uso da própria voz.",
        imagem: {
            src: "imagens/cordel/Cordel_Artigo19.jpg",
            alt: "Ilustração do cordel A Voz do Povo e o Artigo 19"
        },
        pagina: "trabalho3.html",
        video: null,
        links: []
    },

    {
        id: 4,
        titulo: "O Cinema Brasileiro em comparação ao resto do mundo",
        tipo: "apresentacao",
        modalidade: "grupo",
        autores: [
            "Vinícius Ferreira",
            "Luis Gustavo",
            "Ruan Silva",
            "Gabriel Mariano"
        ],
        grupo: "Grupo 148",
        data: null,
        resumo: "Uma análise da indústria cinematográfica brasileira, de seus filmes marcantes, do reconhecimento internacional e das opiniões sobre o cinema nacional.",
        imagem: {
            src: "imagens/cinema/O Cinema Brasileiro_ Nossa História.png",
            alt: "Banner sobre a história do cinema brasileiro"
        },
        pagina: "trabalho4.html",
        video: {
            tipo: "youtube",
            src: "https://www.youtube-nocookie.com/embed/v1ETeHi2QSU"
        },
        links: []
    },

    {
        id: 5,
        titulo: "Hibisco Roxo: a visão de Jaja",
        tipo: "conto",
        modalidade: "individual",
        autores: ["Luis Gustavo"],
        grupo: null,
        data: null,
        resumo: "Uma narrativa sobre a pressão familiar, o medo de fracassar e as consequências de viver sob expectativas extremas.",
        imagem: {
            src: "imagens/contos/Hibisco Roxo a visao de Jaja.jpeg",
            alt: "Ilustração de Hibisco Roxo: a visão de Jaja"
        },
        pagina: "trabalho5.html",
        video: null,
        links: []
    },

    {
        id: 6,
        titulo: "O direito de crer",
        tipo: "cordel",
        modalidade: "individual",
        autores: ["Luis Gustavo"],
        grupo: null,
        data: null,
        resumo: "Versos sobre pessoas que sofrem perseguição por sua fé e sobre o direito de cada um escolher suas próprias crenças.",
        imagem: {
            src: "imagens/cordel/Cordel_Artigo18.jpg",
            alt: "Cordel sobre o Artigo 18"
        },
        pagina: "trabalho6.html",
        video: null,
        links: []
    },

    {
        id: 7,
        titulo: "Hamlet",
        tipo: "resenha",
        modalidade: "individual",
        autores: ["Luis Gustavo"],
        grupo: null,
        data: null,
        resumo: "Uma resenha pessoal sobre a experiência de leitura, a história da tragédia e os trechos que mais chamaram a atenção.",
        imagem: {
            src: "imagens/resenhas/Hamlet.png",
            alt: "Capa da obra Hamlet, de William Shakespeare"
        },
        pagina: "trabalho7.html",
        video: null,
        links: []
    },

    {
        id: 8,
        titulo: "O Artigo Primeiro e a igualdade humana",
        tipo: "cordel",
        modalidade: "individual",
        autores: ["Ruan Silva"],
        grupo: null,
        data: null,
        resumo: "Um cordel inspirado no princípio de que todos os seres humanos nascem livres e iguais em dignidade e direitos.",
        imagem: {
            src: "imagens/cordel/Cordel_Artigo28.png",
            alt: "Ilustração do cordel sobre igualdade e direitos humanos"
        },
        pagina: "trabalho8.html",
        video: null,
        links: []
    },

    {
        id: 9,
        titulo: "O Diário de Anne Frank",
        tipo: "resenha",
        modalidade: "individual",
        autores: ["Ruan Silva"],
        grupo: null,
        data: null,
        resumo: "Uma resenha sobre a experiência de Anne Frank durante a Segunda Guerra Mundial e a importância de aprender com a história.",
        imagem: {
            src: "imagens/resenhas/O Diario de Anne Frank.png",
            alt: "Capa do livro O Diário de Anne Frank"
        },
        pagina: "trabalho9.html",
        video: null,
        links: []
    },

    {
        id: 10,
        titulo: "O Peso da Mão de Deus",
        tipo: "conto",
        modalidade: "individual",
        autores: ["Ruan Silva"],
        grupo: null,
        data: null,
        resumo: "Uma narrativa sobre fé, controle, culpa e a difícil possibilidade de reconstruir os laços familiares.",
        imagem: {
            src: "imagens/contos/O_Peso_da_Mao_de_Deus.jpeg",
            alt: "Ilustração de O Peso da Mão de Deus"
        },
        pagina: "trabalho10.html",
        video: null,
        links: []
    },

    {
        id: 11,
        titulo: "Insônia…",
        tipo: "conto",
        modalidade: "individual",
        autores: ["Gabriel Mariano"],
        grupo: null,
        data: null,
        resumo: "Uma narrativa sobre a exaustão de Eugene Achike, sua relação com a família e um encontro inesperado durante uma viagem.",
        imagem: {
            src: "imagens/contos/Insônia_ Fragmentos de um Viajante.png",
            alt: "Capa do conto Insônia"
        },
        pagina: "trabalho11.html",
        video: null,
        links: []
    },

    {
        id: 12,
        titulo: "Um Homem Azarado",
        tipo: "cordel",
        modalidade: "individual",
        autores: ["Gabriel Mariano"],
        grupo: null,
        data: null,
        resumo: "Uma sequência de desventuras contada em versos, com um final inesperado.",
        imagem: {
            src: "imagens/cordel/Um Homem Azarado_ Sobrevivendo à Tempestade.png",
            alt: "Ilustração do cordel Um Homem Azarado"
        },
        pagina: "trabalho12.html",
        video: null,
        links: []
    },

    {
        id: 13,
        titulo: "Os 5 Corpos do Ser Humano",
        tipo: "resenha",
        modalidade: "individual",
        autores: ["Gabriel Mariano"],
        grupo: null,
        data: null,
        resumo: "Uma análise sobre uma obra que aborda os corpos energéticos, o autoconhecimento e a relação entre o ser humano e a natureza.",
        imagem: {
            src: "imagens/resenhas/Os 5 Corpos Do Ser Humano.png",
            alt: "Capa ou ilustração do livro Os 5 Corpos do Ser Humano"
        },
        pagina: "trabalho13.html",
        video: null,
        links: []
    }

];
