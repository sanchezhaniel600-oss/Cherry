const loginForm = document.getElementById('loginForm');
const indexUrl = window.location.pathname.includes('/CHERRY/auth/')
  ? '../Index/index.html'
  : '../index.html';

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!email || !password) {
    alert('Debes completar correo y contraseña.');
    return;
  }

  sessionStorage.setItem('cherrySession', 'logged-in');
  sessionStorage.setItem('cherryUserName', 'Invitado');
  window.location.href = indexUrl;
});
