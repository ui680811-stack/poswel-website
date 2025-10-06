export function initAuth(){
  const L=document.getElementById('login-layer');
  const A=document.getElementById('app');
  const id=document.getElementById('id');
  const pw=document.getElementById('pw');
  const err=document.getElementById('err');

  function showApp(){L.style.display='none';A.style.display='grid';}
  function showLogin(){A.style.display='none';L.style.display='flex';id.value='';pw.value='';err.style.display='none';}
  function doLogin(){ if(id.value.trim()==='poswel'&&pw.value==='poswel'){sessionStorage.setItem('signed','1');showApp();} else {err.style.display='block';} }

  document.getElementById('login').addEventListener('click',doLogin);
  [id,pw].forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();}));

  if(sessionStorage.getItem('signed')==='1') showApp();

  const logout=document.getElementById('btn-logout');
  if(logout){
    logout.addEventListener('click',()=>{
      sessionStorage.removeItem('signed');
      history.replaceState(null,'',location.pathname);
      showLogin();
    });
  }
}
