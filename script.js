// ============================================
// SISTEMA COMPLETO - LOGIN + CADASTRO
// ============================================

class SistemaEstudos {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.usuarioLogado = localStorage.getItem('usuarioLogado');
        this.init();
    }

    init() {
        this.configurarLogin();
        this.configurarCadastro();
        this.verificarUsuarioLogado();
        this.configurarNavegacao();
    }

    // ============================================
    // LOGIN
    // ============================================
    configurarLogin() {
        const formLogin = document.getElementById('loginForm');
        if (formLogin) {
            formLogin.addEventListener('submit', (e) => {
                e.preventDefault();
                this.fazerLogin();
            });
        }

        const btnCriarConta = document.getElementById('createAccount');
        if (btnCriarConta) {
            btnCriarConta.addEventListener('click', () => {
                window.location.href = 'cadastro.html';
            });
        }
    }

    fazerLogin() {
        const email = document.getElementById('email')?.value;
        const senha = document.getElementById('password')?.value;

        const usuario = this.usuarios.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            // ✅ LOGIN BEM-SUCEDIDO
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert(`Bem-vindo, ${usuario.nome}!`);
            window.location.href = 'dashboard.html'; // ou 'index.html'
        } else {
            // ❌ LOGIN FALHOU
            alert('Email ou senha incorretos!');
        }
    }

    // ============================================
    // CADASTRO
    // ============================================
    configurarCadastro() {
        const formCadastro = document.getElementById('cadastroForm');
        if (formCadastro) {
            formCadastro.addEventListener('submit', (e) => {
                e.preventDefault();
                this.criarConta();
            });
        }
    }

    criarConta() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirmaSenha').value;

        // Validações
        if (nome.length < 2) return alert('Nome inválido');
        if (!email.includes('@')) return alert('Email inválido');
        if (senha.length < 6) return alert('Senha fraca');
        if (senha !== confirmaSenha) return alert('Senhas diferentes');

        // Verifica se já existe
        if (this.usuarios.some(u => u.email === email)) {
            return alert('Email já cadastrado!');
        }

        // ✅ CRIA USUÁRIO
        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        };

        this.usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

        alert('✅ Conta criada! Faça login.');
        window.location.href = 'index.html'; // Volta pro login
    }

    // ============================================
    // USUÁRIO LOGADO
    // ============================================
    verificarUsuarioLogado() {
        if (this.usuarioLogado) {
            const usuario = JSON.parse(this.usuarioLogado);
            const status = document.getElementById('statusUser');
            if (status) {
                status.innerHTML = `👋 ${usuario.nome}`;
                status.style.background = '#28a745';
            }
        }
    }

    // ============================================
    // NAVEGAÇÃO
    // ============================================
    configurarNavegacao() {
        // Botão voltar do cadastro
        const btnVoltar = document.querySelector('.back-btn');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        // Toggle senha
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('password-toggle')) {
                const input = document.getElementById(e.target.dataset.input);
                if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                }
            }
        });
    }

    // Logout
    logout() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    }
}

// ============================================
// INICIALIZA AUTOMATICAMENTE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.sistema = new SistemaEstudos();
});

// Funções globais (para onclick direto)
function irParaCadastro() {
    window.location.href = 'cadastro.html';
}

function fazerLogin() {
    window.sistema.fazerLogin();
}

function logout() {
    window.sistema.logout();
}