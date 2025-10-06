// ===== 안전사고 통계 =====
const ACC_KEY='accidents_v1';
function getAcc(){ try{return JSON.parse(localStorage.getItem(ACC_KEY)||'[]')}catch(e){return[]} }
function setAcc(v){ localStorage.setItem(ACC_KEY, JSON.stringify(v)) }

function renderAcc(){
  const tb=document.getElementById('accBody'); if(!tb) return; tb.innerHTML='';
  getAcc().map((r,i)=>({...r,idx:i+1})).forEach(row=>{
    const tr=document.createElement('tr');
    const filesHtml=(row.files||[]).map((f,j)=>`<a href="${f.url}" target="_blank">파일${j+1}</a>`).join(' ');
    tr.innerHTML=`<td>${row.idx}</td><td>${row.date}</td><td>${row.region}</td><td>${row.biz}</td><td>${row.no}</td><td>${row.name}</td><td>${row.type}</td><td>${row.desc}</td><td>${row.action}</td><td>${row.days}</td><td>${filesHtml||'-'}</td>`;
    tb.appendChild(tr);
  });
}
const accAdd=document.getElementById('accAdd');
const accProofBtn=document.getElementById('accProofBtn');
const accProof=document.getElementById('accProof');
const pick=(id)=>document.getElementById(id).value.trim();
if(accProofBtn&&accProof){ accProofBtn.addEventListener('click',()=>accProof.click()); }
if(accAdd){
  accAdd.addEventListener('click',()=>{
    const date=pick('accDate'); const region=pick('accRegion'); const biz=pick('accBiz'); const no=pick('accNo'); const name=pick('accName'); const type=pick('accType'); const desc=pick('accDesc'); const action=pick('accAction'); const days=pick('accDays');
    if(!date||!region||!biz||!no||!name||!type||!desc){ alert('필수 항목을 입력하세요.'); return; }
    const files=[...accProof.files||[]].map(f=>({name:f.name,url:URL.createObjectURL(f)}));
    const list=getAcc(); list.unshift({date,region,biz,no,name,type,desc,action,days,files}); setAcc(list);
    ['accDate','accRegion','accBiz','accNo','accName','accType','accDesc','accAction','accDays'].forEach(i=>document.getElementById(i).value='');
    accProof.value='';
    renderAcc();
  });
}
renderAcc();
