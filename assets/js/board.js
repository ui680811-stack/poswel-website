// ===== 소통게시판 (익명·비밀번호) =====
const BOARD_KEY = 'anon_board_posts_v1';
const boardListEl = document.getElementById('boardList');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const postPw = document.getElementById('postPw');
const postCreate = document.getElementById('postCreate');
const detailBox = document.getElementById('boardDetail');
const dTitle = document.getElementById('detailTitle');
const dDate = document.getElementById('detailDate');
const dBody = document.getElementById('detailBody');
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');
const btnBack = document.getElementById('btnBack');

function getPosts(){ try{ return JSON.parse(localStorage.getItem(BOARD_KEY)||'[]'); }catch(e){ return []; } }
function setPosts(list){ localStorage.setItem(BOARD_KEY, JSON.stringify(list)); }
function fmtDate(ts){ const d=new Date(ts); const z=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`; }

async function sha256Hex(str){
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

function renderBoard(){
  const list = getPosts().sort((a,b)=>b.createdAt-a.createdAt);
  [...boardListEl.querySelectorAll('.board-row:not(.header)')].forEach(n=>n.remove());
  list.forEach(p=>{
    const row = document.createElement('div');
    row.className='board-row';
    row.innerHTML = `<div>${p.title}</div><div>${fmtDate(p.createdAt)}</div><div class="board-actions"><button class="btn-sm" data-act="view" data-id="${p.id}">보기</button></div>`;
    boardListEl.appendChild(row);
  });
  detailBox.style.display='none';
}

function viewPost(id){
  const p = getPosts().find(x=>x.id===id);
  if(!p) return;
  dTitle.textContent = p.title;
  dDate.textContent = fmtDate(p.createdAt);
  dBody.textContent = p.body;
  detailBox.dataset.id = id;
  detailBox.style.display='block';
  detailBox.scrollIntoView({behavior:'smooth',block:'center'});
}

async function createPost(){
  const title = postTitle.value.trim();
  const body = postBody.value.trim();
  const pw = postPw.value;
  if(!title || !body || !pw){ alert('제목, 본문, 비밀번호를 모두 입력하세요.'); return; }
  const hash = await sha256Hex(pw);
  const list = getPosts();
  const id = 'p'+Date.now();
  list.push({id, title, body, pwHash: hash, createdAt: Date.now()});
  setPosts(list);
  postTitle.value = ''; postBody.value=''; postPw.value='';
  renderBoard();
}

async function verifyAndEdit(){
  const id = detailBox.dataset.id; if(!id) return;
  const list = getPosts();
  const ix = list.findIndex(p=>p.id===id); if(ix<0) return;
  const inputPw = prompt('수정을 위해 비밀번호를 입력하세요.'); if(inputPw===null) return;
  const ok = (await sha256Hex(inputPw)) === list[ix].pwHash;
  if(!ok){ alert('비밀번호가 일치하지 않습니다.'); return; }
  const newTitle = prompt('새 제목을 입력하세요.', list[ix].title) ?? list[ix].title;
  const newBody = prompt('새 본문을 입력하세요.', list[ix].body) ?? list[ix].body;
  list[ix].title = newTitle.trim();
  list[ix].body = newBody.trim();
  setPosts(list);
  viewPost(id);
  renderBoard();
}

async function verifyAndDelete(){
  const id = detailBox.dataset.id; if(!id) return;
  const list = getPosts();
  const ix = list.findIndex(p=>p.id===id); if(ix<0) return;
  const inputPw = prompt('삭제를 위해 비밀번호를 입력하세요.'); if(inputPw===null) return;
  const ok = (await sha256Hex(inputPw)) === list[ix].pwHash;
  if(!ok){ alert('비밀번호가 일치하지 않습니다.'); return; }
  if(!confirm('정말 삭제하시겠습니까?')) return;
  list.splice(ix,1);
  setPosts(list);
  detailBox.style.display='none';
  renderBoard();
}

// 이벤트 바인딩
const toggleWriterBtn = document.getElementById('toggleWriter');
const boardForm = document.getElementById('boardForm');
if(toggleWriterBtn){
  toggleWriterBtn.addEventListener('click',()=>{
    const vis = boardForm.style.display==='none' || boardForm.style.display==='';
    boardForm.style.display = vis ? 'block' : 'none';
    toggleWriterBtn.textContent = vis ? '작성 창 닫기' : '글작성';
  });
}
if(postCreate) postCreate.addEventListener('click', createPost);
if(boardListEl) boardListEl.addEventListener('click', e=>{
  const btn = e.target.closest('button[data-act="view"]');
  if(btn){ viewPost(btn.dataset.id); }
});
if(btnEdit) btnEdit.addEventListener('click', verifyAndEdit);
if(btnDelete) btnDelete.addEventListener('click', verifyAndDelete);
if(btnBack) btnBack.addEventListener('click', ()=>{ detailBox.style.display='none'; });

// 초기 렌더
renderBoard();
