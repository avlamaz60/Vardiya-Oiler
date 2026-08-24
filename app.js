const APP_DATA = {"DG": {"equipment": ["DG1", "DG2", "DG3", "DG4", "DG5", "DG6", "DG7", "DG8", "DG9", "DG10", "DG11", "DG12", "DG13", "DG14", "DG15", "DG16", "DG17", "DG18", "DG19"], "actions": ["HT su alındı", "HT/Kulerden hava alındı", "HT basıncı takip edildi", "LT su basıldı / tamamlandı", "Start edildi", "Stop edildi", "Çakıldı / devreye alındı", "Fine filtre değiştirildi", "Fine filtre yedeklendi", "Filtre drain açıldı", "Karter kapakları açıldı", "Karter kapakları kapatıldı", "Karter kontrolü yapıldı", "OMD High Shutdown", "Yağ basıncı alarmı", "Yağ iskandili alındı", "Liner drain kütükleri söküldü", "Yakıt sıcaklığı ayarlandı", "HT bypass / valf ayarı", "EVA devreden çıkarıldı", "Indexe yol verildi", "SW devresi işi", "Ustaya yardım", "Diğer"]}, "2 Ambar": {"actions": ["Ofis temizliği", "Sintine iskandili", "Temizlik", "Hat / hortum kontrolü", "Valf işlemi", "Ustaya yardım", "Diğer"]}, "3 Ambar": {"actions": ["AC pompası filtre case temizliği", "SW PP case mahali temizliği", "Alabanda yağ lekesi temizliği", "Devre temizliği", "Kontrol odası / kapı işi", "Sintine iskandili", "Hotwell işlemi", "Temizlik", "Ustaya yardım", "Diğer"]}, "4 Ambar": {"actions": ["Hotwell su alındı", "Hidrofordan hotwell dolduruldu", "Maintenance tanktan su alındı", "Hotwell devre kaçak kontrolü", "PVC devre kaçağı kontrol / onarım", "Valf açıldı / kapatıldı", "Devre test edildi", "Sintine iskandili", "Temizlik", "Ustaya yardım", "Diğer"]}, "5 Ambar": {"actions": ["Sintine iskandili", "Hotwell işlemi", "Temizlik", "Hat / hortum kontrolü", "Valf işlemi", "Ustaya yardım", "Diğer"]}, "6 Ambar": {"actions": ["Hotwell su alındı", "Maintenance tanktan su alındı", "Hidrofordan hotwell dolduruldu", "Maintenance tank iskandili", "Sintine iskandili", "Temizlik", "Hat / hortum kontrolü", "Valf işlemi", "Diğer"]}, "7 Ambar": {"actions": ["Sludge devresi kontrolü", "Sludge hortumu / jak işi", "Sintine / sludge temizliği", "Servis hava iştirakı açıldı", "Hava devresi gösterildi", "Sintine iskandili", "Temizlik", "Ustaya yardım", "Diğer"]}, "Separatör / Sludge": {"actions": ["Separatör dairesi kontrol", "Separatör alarm reset / devreye alma", "Sludge Pump kontrol", "Separatör Sludge tank basma", "3-4 Separatör Sludge tank basıldı", "Sludge tank basmıyor", "Sludge devresi kontrolü", "Diğer"]}, "İskandiller / Tanklar": {"actions": ["Ambar sintine iskandilleri", "Sump tank iskandilleri", "Leakage tank iskandilleri", "Sludge tank iskandilleri", "Güverte yağ iskandilleri", "Kıç L/O storage tank iskandili", "Maintenance tank iskandili", "Diğer"]}, "Erensan / Yardımcılar": {"actions": ["Erensan alarm reset", "Erensan devreye alındı", "Alarm devam ediyor / devreye girmedi", "Diğer"]}, "Genel / Plant": {"actions": ["Plant kontrol", "Lokallere iş yönlendirme", "Bez / malzeme ayarlama", "Temizlik", "Ustaya yardım", "Rıhtım / çevre kontrolü", "Deniz kirliliği kontrolü / cleaner", "Diğer"]}};

let state = {
  section: "DG",
  dg: "DG1",
  action: "",
  logs: loadLogs()
};

function shiftLabel(){
  const d=new Date(), h=d.getHours();
  const shift = h<8 ? "00-08" : h<16 ? "08-16" : "16-24";
  return `${d.toLocaleDateString("tr-TR")}<br>${shift} vardiyası`;
}

function brand(dg){
  const n=parseInt(dg.replace("DG",""),10);
  return n<=16 ? "Sulzer" : "MAN";
}

function loadLogs(){
  try { return JSON.parse(localStorage.getItem("yagci_pwa_logs") || "[]"); }
  catch(e) { return []; }
}
function saveLogs(){
  localStorage.setItem("yagci_pwa_logs", JSON.stringify(state.logs));
}

function renderSections(){
  const el=document.getElementById("sections");
  el.innerHTML="";
  Object.keys(APP_DATA).forEach(sec=>{
    const b=document.createElement("button");
    b.className="choice"+(state.section===sec?" active":"");
    b.textContent=sec;
    b.onclick=()=>{state.section=sec;state.action="";render();};
    el.appendChild(b);
  });
}

function renderDG(){
  const card=document.getElementById("dgCard");
  card.classList.toggle("hidden", state.section!=="DG");
  const grid=document.getElementById("dgGrid");
  grid.innerHTML="";
  if(state.section!=="DG") return;
  APP_DATA.DG.equipment.forEach(dg=>{
    const b=document.createElement("button");
    b.className="dg"+(state.dg===dg?" active":"");
    b.textContent=dg;
    b.onclick=()=>{state.dg=dg;renderDG();};
    grid.appendChild(b);
  });
  document.getElementById("brand").textContent=`${state.dg} • ${brand(state.dg)}`;
}

function renderActions(){
  const el=document.getElementById("actions");
  el.innerHTML="";
  const acts=APP_DATA[state.section].actions;
  acts.forEach(a=>{
    const b=document.createElement("button");
    b.className="action"+(state.action===a?" active":"");
    b.textContent=a;
    b.onclick=()=>{state.action=a;renderActions();};
    el.appendChild(b);
  });
  document.getElementById("actionLabel").textContent=state.section==="DG" ? "3. Yapılan İş" : "2. Yapılan İş";
}

function currentShiftKey(ts=new Date()){
  const d=new Date(ts), h=d.getHours();
  let start=new Date(d), shift;
  if(h<8){start.setHours(0,0,0,0);shift="00-08";}
  else if(h<16){start.setHours(8,0,0,0);shift="08-16";}
  else {start.setHours(16,0,0,0);shift="16-24";}
  return `${start.toISOString().slice(0,10)}_${shift}`;
}

function addLog(){
  if(!state.action){
    toast("Önce yapılan işi seç");
    return;
  }
  const value=document.getElementById("value").value.trim();
  const note=document.getElementById("note").value.trim();
  const manual=document.getElementById("manualTime").value.trim();
  const now=new Date();
  const item={
    id:Date.now(),
    ts:now.toISOString(),
    shift:currentShiftKey(now),
    section:state.section,
    equipment:state.section==="DG" ? `${state.dg} (${brand(state.dg)})` : state.section,
    action:state.action,
    value,
    note,
    time: manual || now.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})
  };
  state.logs.unshift(item);
  saveLogs();
  document.getElementById("value").value="";
  document.getElementById("note").value="";
  document.getElementById("manualTime").value="";
  state.action="";
  renderActions();
  renderLogs();
  toast("Kaydedildi");
}

function activeLogs(){
  const key=currentShiftKey();
  return state.logs.filter(x=>x.shift===key);
}

function renderLogs(){
  const list=activeLogs();
  document.getElementById("count").textContent=`${list.length} kayıt`;
  const el=document.getElementById("logs");
  if(!list.length){el.innerHTML='<div class="empty">Bu vardiyada henüz kayıt yok.</div>';return;}
  el.innerHTML=list.map(x=>{
    const bits=[x.action,x.value,x.note].filter(Boolean).join(" • ");
    return `<div class="log"><div class="logtop"><span class="pill">${x.equipment}</span><span class="time">${x.time}</span></div><div class="detail">${bits}</div></div>`;
  }).join("");
}

function exportText(){
  const list=[...activeLogs()].reverse();
  if(!list.length){toast("Kayıt yok");return;}
  const text=list.map(x=>`-${x.equipment} ${x.action}${x.value?" "+x.value:""}${x.note?" - "+x.note:""} ${x.time}`).join("\n");
  if(navigator.share){
    navigator.share({title:"Vardiya Yapılan İşler",text}).catch(()=>copyText(text));
  } else copyText(text);
}
async function copyText(text){
  try{await navigator.clipboard.writeText(text);toast("Panoya kopyalandı");}
  catch(e){prompt("Kopyala:",text);}
}

function exportCSV(){
  const list=[...activeLogs()].reverse();
  if(!list.length){toast("Kayıt yok");return;}
  const rows=[["Saat","Bölüm","Ekipman","Yapılan İş","Değer","Not"]];
  list.forEach(x=>rows.push([x.time,x.section,x.equipment,x.action,x.value,x.note]));
  const esc=v=>`"${String(v??"").replaceAll('"','""')}"`;
  const csv="\ufeff"+rows.map(r=>r.map(esc).join(";")).join("\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="vardiya-kayit.csv";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

function clearShift(){
  if(!confirm("Sadece bu vardiyanın kayıtları silinsin mi?")) return;
  const key=currentShiftKey();
  state.logs=state.logs.filter(x=>x.shift!==key);
  saveLogs();renderLogs();toast("Vardiya temizlendi");
}

function toast(msg){
  const el=document.getElementById("toast");
  el.textContent=msg;el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),1300);
}

function render(){
  document.getElementById("shiftInfo").innerHTML=shiftLabel();
  renderSections();renderDG();renderActions();renderLogs();
}

document.getElementById("saveBtn").onclick=addLog;
document.getElementById("shareBtn").onclick=exportText;
document.getElementById("csvBtn").onclick=exportCSV;
document.getElementById("clearBtn").onclick=clearShift;

if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
