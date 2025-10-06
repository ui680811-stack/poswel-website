// ===== 홈 화면 달력 =====
const calGrid = document.getElementById('cal-grid');
const calMonth = document.getElementById('cal-month');

function renderCalendar(d=new Date()){
  if(!calGrid) return;
  calGrid.innerHTML='';
  const y=d.getFullYear(), m=d.getMonth();
  calMonth.textContent = `${y}년 ${m+1}월`;
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const offset=first.getDay();
  for(let i=0;i<offset;i++){ calGrid.appendChild(document.createElement('div')); }
  for(let day=1; day<=last.getDate(); day++){
    const cell=document.createElement('div'); cell.textContent=day;
    const today=new Date();
    if(day===today.getDate() && m===today.getMonth() && y===today.getFullYear()) cell.classList.add('today');
    calGrid.appendChild(cell);
  }
}
renderCalendar();

const todayBtn=document.getElementById('btn-today');
const addBtn=document.getElementById('btn-add');
if(todayBtn) todayBtn.addEventListener('click', ()=>renderCalendar(new Date()));
if(addBtn) addBtn.addEventListener('click', ()=>alert('일정 등록 폼은 추후 연결'));
