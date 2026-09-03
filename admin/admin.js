const STORAGE_KEY = 'cherry-admin-state';
const seedUsers = [
  {id:'u1',name:'Invitado',email:'invitado@cherry.local'},
  {id:'u2',name:'Fernando Quezada',email:'fernando@cherry.local'},
  {id:'u3',name:'Kathy Rachell',email:'kathy@cherry.local'},
  {id:'u4',name:'Silvia Altamirano',email:'silvia@cherry.local'},
  {id:'u5',name:'Marcos Gaitán',email:'marcos@cherry.local'},
  {id:'u6',name:'Ana Belén Ruiz',email:'ana@cherry.local'}
];
const seedPosts = [
  {id:'p1',userId:'u1',title:'Jornada de limpieza comunitaria',description:'Encontré este lugar del cual creo que con ayuda de todos podemos mejorar.',time:'hace 2 horas'},
  {id:'p2',userId:'u6',title:'Cuidemos el cauce del barrio',description:'El cauce cerca de mi casa está lleno de plástico otra vez.',time:'hace 5 horas'},
  {id:'cp1',userId:'u3',title:'Limpieza en el Parque Las Madres',description:'Hoy realizamos una jornada de limpieza. Gracias a todos los que se unieron.',time:'hace 2 horas'},
  {id:'cp2',userId:'u2',title:'Reforestación este sábado',description:'¿Alguien quiere unirse para plantar árboles en la ribera del río?',time:'hace 5 horas'}
];
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"deletedPostIds":[],"userStatuses":{}}');
state.deletedPostIds ||= [];
state.userStatuses ||= {};
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const userById = id => seedUsers.find(user => user.id === id);
const postById = id => seedPosts.find(post => post.id === id);
const statusLabel = status => ({active:'Activo',suspended:'Suspendido',banned:'Baneado'})[status] || 'Activo';
const postStatus = post => state.deletedPostIds.includes(post.id) ? 'deleted' : 'visible';
const showToast = message => { const toast=document.getElementById('toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('show'),2400); };

function renderOverview(){
  const deleted=state.deletedPostIds.length;
  const restricted=Object.values(state.userStatuses).filter(status=>status !== 'active').length;
  document.getElementById('statGrid').innerHTML = [
    ['♧', seedPosts.length-deleted, 'Publicaciones visibles'], ['♙', seedUsers.length, 'Usuarios registrados'], ['!', restricted, 'Cuentas restringidas'], ['×', deleted, 'Publicaciones retiradas']
  ].map(item=>`<div class="stat-card"><div class="icon">${item[0]}</div><strong>${item[1]}</strong><span>${item[2]}</span></div>`).join('');
  document.getElementById('recentPosts').innerHTML=seedPosts.slice(0,3).map(post=>`<div class="recent-item"><div><strong>${post.title}</strong><p>${userById(post.userId).name} · ${post.time}</p></div><span class="status ${postStatus(post)==='deleted'?'deleted':'active'}">${postStatus(post)==='deleted'?'Retirada':'Visible'}</span></div>`).join('');
}
function renderPosts(){
  const query=document.getElementById('postSearch').value.toLowerCase(); const filter=document.getElementById('postFilter').value;
  const posts=seedPosts.filter(post=>{const user=userById(post.userId); return (!query || `${post.title} ${post.description} ${user.name}`.toLowerCase().includes(query)) && (filter==='all' || (filter==='deleted' ? postStatus(post)==='deleted' : postStatus(post)==='visible'));});
  document.getElementById('postCount').textContent=`${posts.length} resultado${posts.length===1?'':'s'}`;
  document.getElementById('postsList').innerHTML=posts.length ? posts.map(post=>{const user=userById(post.userId); const deleted=postStatus(post)==='deleted'; return `<article class="row"><div class="avatar">${user.name.charAt(0)}</div><div class="row-main"><div class="row-title">${post.title}</div><div class="row-meta">${user.name} · ${post.time}</div><div class="row-desc">${post.description}</div></div><span class="status ${deleted?'deleted':'active'}">${deleted?'Retirada':'Visible'}</span><div class="row-actions">${deleted?`<button class="action restore" data-restore-post="${post.id}">Restaurar</button>`:`<button class="action danger" data-delete-post="${post.id}">Eliminar</button>`}</div></article>`;}).join(''):'<div class="empty">No hay publicaciones con estos filtros.</div>';
}
function renderUsers(){
  const query=document.getElementById('userSearch').value.toLowerCase(); const filter=document.getElementById('userFilter').value;
  const users=seedUsers.filter(user=>{const status=state.userStatuses[user.id] || 'active'; return (!query || `${user.name} ${user.email}`.toLowerCase().includes(query)) && (filter==='all' || status===filter);});
  document.getElementById('userCount').textContent=`${users.length} usuario${users.length===1?'':'s'}`;
  document.getElementById('usersList').innerHTML=users.length ? users.map(user=>{const status=state.userStatuses[user.id] || 'active'; return `<article class="row"><div class="avatar">${user.name.charAt(0)}</div><div class="row-main"><div class="row-title">${user.name}</div><div class="row-meta">${user.email}</div></div><span class="status ${status}">${statusLabel(status)}</span><div class="row-actions">${status==='active'?`<button class="action warn" data-suspend-user="${user.id}">Suspender</button><button class="action danger" data-ban-user="${user.id}">Banear</button>`:`<button class="action restore" data-restore-user="${user.id}">Reactivar</button>`}</div></article>`;}).join(''):'<div class="empty">No hay usuarios con estos filtros.</div>';
}
function renderAll(){renderOverview();renderPosts();renderUsers();}
function switchSection(section){document.querySelectorAll('.section').forEach(item=>item.classList.toggle('active',item.id===`section-${section}`));document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.section===section));document.getElementById('pageTitle').textContent={overview:'Resumen general',posts:'Publicaciones',users:'Usuarios'}[section];}

document.querySelectorAll('.nav-item,[data-section-link]').forEach(button=>button.addEventListener('click',()=>switchSection(button.dataset.section || button.dataset.sectionLink)));
document.getElementById('postSearch').addEventListener('input',renderPosts); document.getElementById('postFilter').addEventListener('change',renderPosts); document.getElementById('userSearch').addEventListener('input',renderUsers); document.getElementById('userFilter').addEventListener('change',renderUsers);
document.addEventListener('click',event=>{
  const deleteButton=event.target.closest('[data-delete-post]'); const restorePost=event.target.closest('[data-restore-post]'); const suspend=event.target.closest('[data-suspend-user]'); const ban=event.target.closest('[data-ban-user]'); const restoreUser=event.target.closest('[data-restore-user]');
  if(deleteButton && confirm('¿Eliminar esta publicación del sitio?')){state.deletedPostIds=[...new Set([...state.deletedPostIds,deleteButton.dataset.deletePost])];save();renderAll();showToast('Publicación eliminada del sitio');}
  if(restorePost){state.deletedPostIds=state.deletedPostIds.filter(id=>id!==restorePost.dataset.restorePost);save();renderAll();showToast('Publicación restaurada');}
  if(suspend && confirm('¿Suspender a este usuario temporalmente?')){state.userStatuses[suspend.dataset.suspendUser]='suspended';save();renderAll();showToast('Usuario suspendido');}
  if(ban && confirm('¿Banear a este usuario de forma permanente?')){state.userStatuses[ban.dataset.banUser]='banned';save();renderAll();showToast('Usuario baneado');}
  if(restoreUser){delete state.userStatuses[restoreUser.dataset.restoreUser];save();renderAll();showToast('Usuario reactivado');}
});
renderAll();
