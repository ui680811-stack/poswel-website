export function initEmployees(){
  const openEmpPanel=document.getElementById('openEmpPanel');
  const empPanel=document.getElementById('empPanel');
  const empTbody=document.getElementById('empTbody');
  const addEmpBtn=document.getElementById('addEmpBtn');
  const selDeleteBtn=document.getElementById('selDeleteBtn');
  const checkAll=document.getElementById('checkAll');

  const EMP_KEY = 'employees_poswel';
  (function migrateEmployees(){
    try{
      const old = localStorage.getItem('employees');
      if(old && !localStorage.getItem(EMP_KEY)){
        localStorage.setItem(EMP_KEY, old);
      }
    }catch(e){}
  })();

  const getEmployees=()=>{ try { return JSON.parse(localStorage.getItem(EMP_KEY)||'[]'); } catch(e){ return []; } };
  const setEmployees=(list)=> localStorage.setItem(EMP_KEY, JSON.stringify(list));

  function renderEmp(){
    if(!empTbody) return;
    const list = getEmployees();
    empTbody.innerHTML = '';
    list.forEach((emp, idx)=>{
      const tr=document.createElement('tr');
      tr.innerHTML = `
        <td><input type="checkbox" class="emp-check" data-index="${idx}"></td>
        <td>${emp.no}</td>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>${emp.rank}</td>`;
      empTbody.appendChild(tr);
    });
    if(checkAll) checkAll.checked=false;
  }

  function togglePanel(){
    if(!empPanel) return;
    const isHidden = empPanel.style.display==='none' || empPanel.style.display==='';
    empPanel.style.display = isHidden ? 'block' : 'none';
    if(isHidden) renderEmp();
    if(openEmpPanel) openEmpPanel.textContent='부서 및 근로자 정보 보기 〉';
  }

  if(openEmpPanel) openEmpPanel.addEventListener('click', togglePanel);

  if(addEmpBtn){
    addEmpBtn.addEventListener('click', ()=>{
      const no=document.getElementById('empNo').value.trim();
      const name=document.getElementById('empName').value.trim();
      const dept=document.getElementById('empDept').value;
      const rank=document.getElementById('empRank').value.trim();

      if(!/^\d{6}$/.test(no)) { alert('직번은 6자리 숫자여야 합니다.'); return; }
      if(name.length<2 || name.length>4) { alert('이름은 2~4글자여야 합니다.'); return; }
      if(!dept) { alert('부서를 선택하세요.'); return; }
      if(!/^[가-힣]+$/.test(rank)) { alert('정확한 정보를 입력해주세요'); return; }

      const list=getEmployees();
      list.push({no,name,dept,rank});
      setEmployees(list);
      ['empNo','empName','empRank'].forEach(i=>document.getElementById(i).value='');
      document.getElementById('empDept').value='';
      renderEmp();
    });
  }

  if(selDeleteBtn){
    selDeleteBtn.addEventListener('click', ()=>{
      const checks=[...document.querySelectorAll('.emp-check:checked')];
      if(checks.length===0){ alert('삭제할 근로자를 선택하세요.'); return; }
      if(!confirm('선택한 근로자를 삭제할까요?')) return;
      const toDelIdx = new Set(checks.map(c=>parseInt(c.dataset.index)));
      const list=getEmployees().filter((_,i)=>!toDelIdx.has(i));
      setEmployees(list);
      renderEmp();
    });
  }

  if(checkAll){
    checkAll.addEventListener('change', ()=>{
      document.querySelectorAll('.emp-check').forEach(c=>c.checked = checkAll.checked);
    });
  }

  if(empTbody){
    empTbody.addEventListener('change', (e)=>{
      if(e.target && e.target.classList.contains('emp-check')){
        const boxes=[...document.querySelectorAll('.emp-check')];
        if(checkAll) checkAll.checked = boxes.length>0 && boxes.every(b=>b.checked);
      }
    });
  }
}
