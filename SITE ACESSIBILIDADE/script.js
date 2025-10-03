document.addEventListener('DOMContentLoaded', function(){
    const body = document.body;
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');
    const fecharAcessibilidadeBotao = document.getElementById('fechar-acessibilidade');
    
    const botaoMenu = document.getElementById('botao-menu');
    const menuMobile = document.getElementById('menu-mobile');
    
    let tamanhoAtualFonte = 1;
    
    // --- 1A. ABRIR/FECHAR MENU PRINCIPAL (MOBILE) ---
    if (botaoMenu) {
        botaoMenu.addEventListener('click', function() {
            menuMobile.classList.toggle('d-none');
            
            const botaoSelecionado = botaoMenu.getAttribute('aria-expanded') === 'true';
            botaoMenu.setAttribute('aria-expanded', !botaoSelecionado);
        });
    }

    // --- FUNÇÃO DE ESCONDER OPÇÕES DE ACESSIBILIDADE COM ANIMAÇÃO ---
    const esconderOpcoesAcessibilidade = () => {
        // Inicia o fade-out (remove a classe mostra)
        opcoesDeAcessibilidade.classList.remove('mostra');
        
        // Espera a animação terminar (400ms - tempo da transição no CSS) antes de aplicar d-none
        setTimeout(() => {
            opcoesDeAcessibilidade.classList.add('d-none');
            
            // Reexibe o botão 'Acessibilidade' principal
            botaoDeAcessibilidade.classList.remove('d-none');
            
            // Atualiza o ARIA
            botaoDeAcessibilidade.setAttribute('aria-expanded', 'false');
        }, 400); 
    };


    // --- 1B. ABRIR MENU DE ACESSIBILIDADE COM ANIMAÇÃO ---
    botaoDeAcessibilidade.addEventListener('click', function (){
        
        // Oculta o botão 'Acessibilidade' principal
        botaoDeAcessibilidade.classList.add('d-none');
        
        // Remove 'd-none' imediatamente para começar a transição
        opcoesDeAcessibilidade.classList.remove('d-none');
        
        // Adiciona a classe 'mostra' após um pequeno delay para forçar a transição
        // (Isso é necessário porque o CSS não anima a transição de display: none para flex)
        setTimeout(() => {
            opcoesDeAcessibilidade.classList.add('mostra');
        }, 10); 
        
        // Atualiza o estado ARIA para acessibilidade
        botaoDeAcessibilidade.setAttribute('aria-expanded', 'true');
    });

    // --- 1C. FECHAR MENU DE ACESSIBILIDADE (BOTÃO X) ---
    fecharAcessibilidadeBotao.addEventListener('click', esconderOpcoesAcessibilidade);
    
    // --- 2. AUMENTAR E DIMINUIR FONTE (com limites) ---
    const ajustarFonte = (aumento) => {
        // Limites definidos: Mínimo 0.8rem, Máximo 1.5rem
        const novoTamanho = Math.min(Math.max(tamanhoAtualFonte + aumento, 0.8), 1.5);

        if (novoTamanho !== tamanhoAtualFonte) {
            tamanhoAtualFonte = novoTamanho;
            body.style.fontSize = `${tamanhoAtualFonte}rem`;
        }
    };
    
    aumentaFonteBotao.addEventListener('click', () => ajustarFonte(0.1));
    diminuiFonteBotao.addEventListener('click', () => ajustarFonte(-0.1));
    
    // --- 3. ALTERNAR CONTRASTE (com persistência usando localStorage) ---
    alternaContraste.addEventListener('click', function(){
        body.classList.toggle('alto-contraste');

        // Salva a preferência do usuário no armazenamento local
        const isAltoContraste = body.classList.contains('alto-contraste');
        localStorage.setItem('contraste', isAltoContraste ? 'ativado' : 'desativado');
    });

    // Carrega o estado de contraste ao carregar a página
    if (localStorage.getItem('contraste') === 'ativado') {
        body.classList.add('alto-contraste');
    }

    // --- 4. CONFIGURAÇÃO DO SCROLLREVEAL ---
    if (typeof ScrollReveal !== 'undefined') {
        
        // Animação para o Header e Nav (cabecalho)
        ScrollReveal().reveal('.cabecalho', {
            delay: 200,
            distance: '20px',
            origin: 'top',
        });
        
        // Animação para a seção Hero
        ScrollReveal().reveal('.hero-racionais', {
            delay: 400,
            duration: 1000,
            origin: 'bottom',
            distance: '50px'
        });

        // Animação da Seção História (imagem e texto)
        ScrollReveal().reveal('#historia > .container-historia > *', {
            delay: 300,
            distance: '50px',
            origin: 'bottom',
            interval: 150
        });

        // Animação dos Álbuns na Galeria
        ScrollReveal().reveal('.album-img', {
            delay: 200,
            distance: '30px',
            origin: 'bottom',
            interval: 150
        });

        // Animação do Formulário
        ScrollReveal().reveal('.formulario', {
            delay: 300,
            distance: '50px',
            origin: 'top'
        });
    }
});