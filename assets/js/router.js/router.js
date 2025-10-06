export function initRouter(){
  const pages={home:'page-home',biz:'page-biz',work:'page-work',law:'page-law',counsel:'page-counsel',report:'page-report',data:'page-data'};

  function go(page){
    Object.values(pages).forEach(id=>document.getElementById(id).classList.remove('active'));
    document.getElementById(pages[page]).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    const nav=document.querySelector(`.nav-item[data-page="${page}"]`);
    if(nav) nav.classList.add('active');
    window.location.hash=page;
  }

  document.querySelectorAll('.nav-item').forEach(n=>n.addEventListener('click',()=>go(n.dataset.page)));
  window.addEventListener('load',()=>{ const h=location.hash.replace('#',''); go(pages[h]?h:'home'); });
}
