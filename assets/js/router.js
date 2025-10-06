// assets/js/router.js

const PAGES = {
  home: 'page-home',
  biz: 'page-biz',
  work: 'page-work',
  law: 'page-law',
  counsel: 'page-counsel',
  report: 'page-report',
  data: 'page-data',
};

function show(pageKey) {
  const key = PAGES[pageKey] ? pageKey : 'home';
  const targetId = PAGES[key];

  // 섹션 표시/숨김
  Object.values(PAGES).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');

  // 좌측 네비 활성화
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-page="${key}"]`);
  if (nav) nav.classList.add('active');

  // 주소 해시 동기화
  if (location.hash.replace('#', '') !== key) {
    history.replaceState(null, '', '#' + key);
  }
}

export function initRouter() {
  // 좌측 네비 클릭 연결
  document.querySelectorAll('.nav-item').forEach(n => {
    n.addEventListener('click', () => show(n.dataset.page));
  });

  // 해시 이동
  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    show(PAGES[h] ? h : 'home');
  });

  // 첫 진입
  const h = location.hash.replace('#', '');
  show(PAGES[h] ? h : 'home');
}

// 외부에서 이동이 필요할 때 사용 가능
export { show as go };
