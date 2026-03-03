const leaves = {};
let current = new Date();
let selectedDate = new Date().toISOString().slice(0,10);

function loadEmployees(){
  fetch(API + "?type=employees")
    .then(r=>r.json())
    .then(list=>{
      const emp=document.getElementById("emp");
      emp.innerHTML="";
      list.forEach(e=>{
        const o=document.createElement("option");
        o.value=e.empId;
        o.textContent=e.name;
        o.dataset.name=e.name;
        emp.appendChild(o);
      });
    });
}

function loadLeaveData(){
  for(const k in leaves) delete leaves[k];
  fetch(API + "?type=leaves")
    .then(r=>r.json())
    .then(list=>{
      list.forEach(i=>{
        const d=String(i.date).slice(0,10);
        if(!leaves[d]) leaves[d]=[];
        leaves[d].push({
          name:i.name,
          reason:i.reason,
          fine:Number(i.fine)||0
        });
      });
      renderCalendar();
      renderDayLeave();
      renderMonthLeave();
      renderMonthFine();
    });
}
