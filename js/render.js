function renderDayLeave(){
  document.getElementById("selectedDateText").innerText=selectedDate;
  const box=document.getElementById("dayLeaveList");
  box.innerHTML="";
  const list=leaves[selectedDate]||[];
  if(!list.length){box.innerHTML="<i>No leave</i>";return;}
  list.forEach(l=>{
    box.innerHTML+=`${l.name} – ${l.reason} ${l.fine?`<span style="color:red">(${l.fine} MMK)</span>`:""}<br>`;
  });
}

function renderMonthLeave(){
  const box=document.getElementById("monthLeave");
  box.innerHTML="";
  const y=current.getFullYear(), m=String(current.getMonth()+1).padStart(2,"0");
  Object.keys(leaves).filter(d=>d.startsWith(`${y}-${m}`)).sort().forEach(d=>{
    box.innerHTML+=`<div><b>${d}</b></div>`;
    leaves[d].forEach(l=>{
      box.innerHTML+=`<div>${l.name} – ${l.reason}</div>`;
    });
  });
}

function renderMonthFine(){
  const listBox=document.getElementById("monthFineList");
  const totalBox=document.getElementById("monthFineTotal");
  listBox.innerHTML="";
  let total=0;
  const y=current.getFullYear(), m=String(current.getMonth()+1).padStart(2,"0");
  Object.keys(leaves).filter(d=>d.startsWith(`${y}-${m}`)).forEach(d=>{
    leaves[d].forEach(l=>{
      if(l.fine){
        total+=l.fine;
        listBox.innerHTML+=`<div class="status-over">${d} – ${l.name} – ${l.fine} MMK</div>`;
      }
    });
  });
  totalBox.innerText=total+" MMK";
}
