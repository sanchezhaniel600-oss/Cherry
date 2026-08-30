const form = document.getElementById('registerForm');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const confirmPassword = document.getElementById('confirmPassword')?.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert('Debes completar todos los campos.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  sessionStorage.setItem('cherrySession', 'logged-in');
  sessionStorage.setItem('cherryUserName', name || 'Nuevo usuario');
  window.location.href = './Index/index.html';
});
