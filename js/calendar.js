function renderCalendar(){
  const daysBox=document.getElementById("days");
  const monthTitle=document.getElementById("monthTitle");
  daysBox.innerHTML="";
  const y=current.getFullYear(), m=current.getMonth();
  monthTitle.innerText=current.toLocaleString("en",{month:"long",year:"numeric"});
  const first=new Date(y,m,1).getDay();
  const total=new Date(y,m+1,0).getDate();
  const today=new Date();

  for(let i=0;i<first;i++) daysBox.innerHTML+='<div class="day empty"></div>';

  for(let d=1;d<=total;d++){
    const key=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const div=document.createElement("div");
    div.className="day";
    div.innerHTML=`<span>${d}</span>`;

    if(d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear())
      div.classList.add("today");
    if(key===selectedDate) div.classList.add("selected");

    if(leaves[key]){
      const dot=document.createElement("div");
      dot.className="dot "+(leaves[key].length>2?"red":"green");
      div.appendChild(dot);
    }

    div.onclick=()=>{
      selectedDate=key;
      renderCalendar();
      renderDayLeave();
    };

    daysBox.appendChild(div);
  }
}

function changeMonth(step){
  current.setMonth(current.getMonth()+step);
  loadLeaveData();
}
