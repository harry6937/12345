function switchTab(name,el){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById("tab"+name).classList.add("active");
  el.classList.add("active");
}

function openModal(){document.getElementById("modal").classList.add("active")}
function closeModal(){document.getElementById("modal").classList.remove("active");document.getElementById("reason").value=""}

function submitLeave(){
  const emp=document.getElementById("emp");
  const reason=document.getElementById("reason");
  const name=emp.options[emp.selectedIndex].dataset.name;
  const arr=leaves[selectedDate]||[];
  const fine=arr.length>=2?FINE:0;

  fetch(API,{method:"POST",body:JSON.stringify({
    date:selectedDate,
    empId:emp.value,
    name,
    reason:reason.value||"-",
    fine
  })});

  arr.push({name,reason:reason.value||"-",fine});
  leaves[selectedDate]=arr;

  closeModal();
  renderCalendar();
  renderDayLeave();
  renderMonthLeave();
  renderMonthFine();
}

loadEmployees();
loadLeaveData();
