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
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert(`Bem-vindo, ${usuario.nome}!`);
            window.location.href = 'dashboard.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    }

    // ============================================
    // CADASTRO - COM LOADING E VOLTA
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

        // Email existe?
        if (this.usuarios.some(u => u.email === email)) {
            return alert('Email já cadastrado!');
        }

        // LOADING NO BOTÃO
        const btn = document.querySelector('#cadastroForm button');
        const textoOriginal = btn.textContent;
        btn.textContent = 'CADASTRANDO...';
        btn.disabled = true;

        // Cria usuário
        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            senha,
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        };

        this.usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

        // VOLTA PARA LOGIN após 2s
        setTimeout(() => {
            alert('✅ Conta criada!');
            window.location.href = 'index.html';
        }, 1500);
    }

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

    configurarNavegacao() {
        const btnVoltar = document.querySelector('.back-btn');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }

    logout() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    }
}

// INICIALIZA
document.addEventListener('DOMContentLoaded', () => {
    window.sistema = new SistemaEstudos();
});




// login.js
const fazerLogin = () => {
  const usuario = document.getElementById('usuario')?.value || '';
  const senha = document.getElementById('senha')?.value || '';
  
  const credenciaisValidas = [
    {user: 'admin', pass: '1234'},
    {user: 'aluno', pass: '1234'}
  ];
  
  const valido = credenciaisValidas.find(c => c.user === usuario && c.pass === senha);
  
  if (valido) {
    localStorage.setItem('logado', 'true');
    window.location.href = 'dashboard.html';
  } else {
    alert('Usuário ou senha inválidos!');
  }
};

// Auto redirect se já logado
if (localStorage.getItem('logado') === 'true') {
  window.location.href = 'telaprincipal.html';
}



function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  if (email === 'admin@escola.com' && senha === '123456') {
    localStorage.setItem('logado', 'true');
    window.location.href = 'dashboard.html'; // ← SEU ARQUIVO
  } else {
    alert('Email ou senha errados!');
  }
}
