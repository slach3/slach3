// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do modo escuro (mantido para funcionalidade básica)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
        });
    }

    // Verificar modo escuro salvo
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode');
    }

    // Função básica para inicialização da página
    function inicializarPagina() {
        console.log('Página inicializada');
    }

    inicializarPagina();
});