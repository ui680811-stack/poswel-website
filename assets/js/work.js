// ===== 작업관리: 새 창(탭) 업로드/열람 뷰 =====
const workList = document.getElementById('workList');

function openWorkWindow(type){
  const w = window.open('', '_blank');
  if(!w){ alert('팝업이 차단되었습니다. 허용해 주세요.'); return; }
  w.document.write(`<!DOCTYPE html><html lang=ko><head><meta charset=utf-8>
    <meta name=viewport content="width=device-width,initial-scale=1"/>
    <title>${type}</title>
    <style>
      body{font-family:NanumGothic,'Malgun Gothic',Arial,sans-serif;margin:0;background:#f6f7fb;color:#111827}
      .wrap{max-width:960px;margin:24px auto;padding:16px}
      .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}
      .row{display:grid;gap:8px;margin:10px 0}
      input,textarea{padding:10px;border:1px solid #e5e7eb;border-radius:8px}
      .btn{padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb;background:#2f6ae0;color:#fff;cursor:pointer}
      table{width:100%;border-collapse:collapse;margin-top:12px}
      th,td{border:1px solid #e5e7eb;padding:8px;text-align:center}
      th{background:#f1f5f9}
    </style></head><body>
    <div class=wrap>
      <h2 style="margin:0 0 12px">${type} 문서 업로드/열람</h2>
      <div class=card>
        <div class=row>
          <input id=fileInput type=file accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.png,.csv,.txt" />
          <button id=btnUpload class=btn>업로드</button>
        </div>
        <table><thead><tr><th>번호</th><th>파일명</th><th>업로드일시</th><th>보기</th></tr></thead><tbody id=listBody></tbody></table>
      </div>
    </div>
    <script>
      const TYPE = ${'"'}${'${type}'}${'"'};
      const STORAGE_KEY = 'work_files_'+TYPE;
      function getList(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch(e){return []}}
      function setList(v){localStorage.setItem(STORAGE_KEY, JSON.stringify(v))}
      function z(n){return String(n).padStart(2,'0')}
      function fmt(ts){const d=new Date(ts);return \`${'${'}d.getFullYear()}-${'${'}z(d.getMonth()+1)}-${'${'}z(d.getDate())} ${'${'}z(d.getHours())}:${'${'}z(d.getMinutes())}\`}
      function render(){const tb=document.getElementById('listBody');tb.innerHTML='';getList().forEach((f,i)=>{const tr=document.createElement('tr');tr.innerHTML=\`<td>${'${'}i+1}</td><td>${'${'}f.name}</td><td>${'${'}fmt(f.ts)}</td><td><a href=\\\"${'${'}f.url}\\\" target=\\\"_blank\\\">열람</a></td>\`;tb.appendChild(tr)})}
      document.getElementById('btnUpload').addEventListener('click',()=>{
        const input=document.getElementById('fileInput');
        const file=input.files&&input.files[0]; if(!file){alert('파일을 선택하세요.'); return}
        const url=URL.createObjectURL(file);
        const list=getList(); list.unshift({name:file.name, url, ts:Date.now()}); setList(list); render(); input.value='';
      });
      render();
    <\/script></body></html>`);
  w.document.close();
}

if(workList){
  workList.addEventListener('click',(e)=>{
    const item = e.target.closest('.work-item');
    if(!item) return;
    const name = item.getAttribute('data-work');
    openWorkWindow(name);
  });
}
