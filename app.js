const APP_DATA = {"DG": {"equipment": ["DG1", "DG2", "DG3", "DG4", "DG5", "DG6", "DG7", "DG8", "DG9", "DG10", "DG11", "DG12", "DG13", "DG14", "DG15", "DG16", "DG17", "DG18", "DG19"], "frequent": ["HT suyu hidrofordan dolduruldu", "HT suyu Maintenance tanktan dolduruldu", "HT suyu çektirildi", "LT suyu hidrofordan dolduruldu", "LT suyu Maintenance tanktan dolduruldu", "LT suyu çektirildi", "Sump tanka yağ alındı", "Sump tank çektirildi", "Fine filtre değiştirildi", "Fine filtre yedeklendi", "Karter kapakları açıldı", "Karter kapakları kapatıldı", "Çakıldı / devreye alındı"], "all": ["HT suyu hidrofordan dolduruldu", "HT suyu Maintenance tanktan dolduruldu", "HT suyu çektirildi", "LT suyu hidrofordan dolduruldu", "LT suyu Maintenance tanktan dolduruldu", "LT suyu çektirildi", "Yakıt sıcaklığı artırıldı", "Yakıt sıcaklığı düşürüldü", "Sump tanka yağ alındı", "Sump tank çektirildi", "Fine filtre değiştirildi", "Fine filtre yedeklendi", "Fine filtre söküldü", "Filtre drain açıldı", "Karter kapakları açıldı", "Karter kapakları kapatıldı", "Karter kapağı yağ kaçağı", "Liner drain hortumu tamamlandı", "HT expansion tank hidrofor ile dolduruldu", "HT expansion tank Maintenance tanktan dolduruldu", "HT / kulerden hava alındı", "Start edildi", "Stop edildi", "Çakıldı / devreye alındı", "OMD High Shutdown", "Yağ basıncı alarmı", "EVA devreden çıkarıldı", "Indexe yol verildi", "SW devresi işi", "Ustaya yardım", "Diğer"]}, "Ambarlar": {"subsections": ["2 Ambar", "3 Ambar", "4 Ambar", "5 Ambar", "6 Ambar", "7 Ambar"], "frequent": ["Hotwell hidrofor ile dolduruldu", "Hotwell Maintenance tanktan dolduruldu", "Kaçak görüldü", "Temizlik yapıldı", "Sintine iskandili alındı", "Sludge devresi kontrol edildi"], "all": ["Hotwell hidrofor ile dolduruldu", "Hotwell Maintenance tanktan dolduruldu", "Hotwell su alındı", "Kaçak görüldü", "PVC devre kaçağı görüldü", "Valf açıldı / kapatıldı", "Devre test edildi", "Sintine iskandili alındı", "Temizlik yapıldı", "Ofis temizliği yapıldı", "Sludge devresi kontrol edildi", "Sludge hortumu / jak işi yapıldı", "Servis hava iştirakı açıldı", "Hava devresi gösterildi", "Ustaya yardım", "Diğer"]}, "Separatör / Sludge": {"frequent": ["Separatör alarm reset / devreye alma", "Separatör sludge tank basıldı", "Sludge Pump kontrol edildi", "Sludge barçına sludge verildi"], "all": ["Separatör dairesi kontrol edildi", "Separatör alarm reset / devreye alma", "Sludge Pump kontrol edildi", "Separatör sludge tank basıldı", "3/4 separatör sludge tankı basıldı", "3/4/5/6 separatör devrede", "Feed pump devrede", "Sludge tank basmıyor", "Sludge devresi kontrol edildi", "Sludge barçına sludge verildi", "Diğer"]}, "İskandiller / Tanklar": {"frequent": ["Ambar sintine iskandilleri", "Sump tank iskandilleri", "Leakage tank iskandilleri", "Maintenance tank iskandili"], "all": ["Ambar sintine iskandilleri", "Sump tank iskandilleri", "Leakage tank iskandilleri", "Sludge tank iskandilleri", "Güverte yağ iskandilleri", "Kıç L/O storage tank iskandili", "Maintenance tank iskandili", "Diğer"]}, "Yardımcı Makineler": {"frequent": ["Erensan alarm reset", "Erensan devreye alındı"], "all": ["Erensan alarm reset", "Erensan devreye alındı", "Alarm devam ediyor / devreye girmedi", "HFO separatör durumu kaydedildi", "Diğer"]}, "Sıvı Sistemleri": {"frequent": ["HFO separatör durumu kaydedildi", "Feed pump durumu kaydedildi", "Line çevrildi"], "all": ["HFO separatör durumu kaydedildi", "Feed pump durumu kaydedildi", "Line çevrildi", "Hidrofor işlemi yapıldı", "Storage tank transferi yapıldı", "Diğer"]}, "Elektrik / Alarm": {"frequent": ["Yağ basıncı alarmı", "OMD High Shutdown", "Alarm resetlendi"], "all": ["Yağ basıncı alarmı", "OMD High Shutdown", "Alarm resetlendi", "Devreye alındı", "Takip ediliyor", "Diğer"]}, "Genel / Plant": {"frequent": ["Plant kontrol", "Lokallere iş yönlendirme", "Bez / malzeme ayarlama", "Temizlik yapıldı"], "all": ["Plant kontrol", "Lokallere iş yönlendirme", "Bez / malzeme ayarlama", "Temizlik yapıldı", "Ustaya yardım", "Rıhtım / çevre kontrolü", "Deniz kirliliği kontrolü / cleaner", "Diğer"]}, "Kaçak": {"subsections": ["DG", "2 Ambar", "3 Ambar", "4 Ambar", "5 Ambar", "6 Ambar", "7 Ambar", "Separatör", "Diğer"], "frequent": ["Kaçak görüldü", "Kaçak takipte", "Kaçak müdahale edildi", "Kaçak giderildi"], "all": ["Kaçak görüldü", "Kaçak takipte", "Kaçak müdahale edildi", "Kaçak giderildi"]}};
const state = {
  category: "DG",
  subSection: "",
  dg: "DG1",
  action: "",
  view: "current",
  logs: loadLogs()
};

function loadLogs(){
  try{return JSON.parse(localStorage.getItem("vardiya_oiler_v2_logs")||"[]")}catch(e){return []}
}
function saveLogs(){
  localStorage.setItem("vardiya_oiler_v2_logs", JSON.stringify(state.logs));
}

function shiftInfo(ts=new Date()){
  const d = new Date(ts);
  const h = d.getHours();
  let shift;
  if(h<8) shift = "00-08";
  else if(h<16) shift = "08-16";
  else shift = "16-24";
  return {
    date: d.toLocaleDateString("tr-TR"),
    time: d.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}),
    shift,
    key: d.toLocaleDateString("sv-SE") + "_" + shift
  };
}

function previousShiftKey(){
  const now = new Date();
  const info = shiftInfo(now);
  const prev = new Date(now);
  if(info.shift==="00-08") prev.setHours(prev.getHours()-8);
  else if(info.shift==="08-16") prev.setHours(prev.getHours()-8);
  else prev.setHours(prev.getHours()-8);
  return shiftInfo(prev).key;
}

function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1300);
}

function renderHeader(){
  const info = shiftInfo();
  document.getElementById("shiftInfo").innerHTML = `${info.date}<br>${info.shift} vardiyası`;
}

function renderCategories(){
  const wrap=document.getElementById("categoryTabs");
  wrap.innerHTML="";
  Object.keys(APP_DATA).forEach(cat=>{
    const b=document.createElement("button");
    b.textContent=cat;
    b.className = state.category===cat ? "active" : "";
    b.onclick=()=>{state.category=cat; state.action=""; state.subSection=""; renderAll();};
    wrap.appendChild(b);
  });
}

function renderSubSections(){
  const block = document.getElementById("subSectionBlock");
  const wrap = document.getElementById("subSectionTabs");
  wrap.innerHTML="";
  const data = APP_DATA[state.category];
  if(data.subsections){
    block.classList.remove("hidden");
    if(!state.subSection) state.subSection = data.subsections[0];
    data.subsections.forEach(s=>{
      const b=document.createElement("button");
      b.textContent=s;
      b.className = state.subSection===s ? "active" : "";
      b.onclick=()=>{state.subSection=s; renderSubSections();};
      wrap.appendChild(b);
    });
  } else {
    block.classList.add("hidden");
    state.subSection="";
  }
}

function renderDGButtons(){
  const block=document.getElementById("dgBlock");
  const wrap=document.getElementById("dgButtons");
  wrap.innerHTML="";
  if(state.category==="DG"){
    block.classList.remove("hidden");
    APP_DATA.DG.equipment.forEach(dg=>{
      const b=document.createElement("button");
      b.textContent=dg;
      b.className="bigbtn" + (state.dg===dg?" active":"");
      b.onclick=()=>{state.dg=dg; renderDGButtons();};
      wrap.appendChild(b);
    });
  } else {
    block.classList.add("hidden");
  }
}

function actionButton(text, active){
  const b=document.createElement("button");
  b.textContent=text;
  b.className = active ? "active" : "";
  b.onclick=()=>{state.action=text; renderActions();};
  return b;
}

function renderActions(){
  const data = APP_DATA[state.category];
  const frequent = document.getElementById("frequentActions");
  const all = document.getElementById("allActions");
  frequent.innerHTML=""; all.innerHTML="";
  data.frequent.forEach(a=>frequent.appendChild(actionButton(a, state.action===a)));
  data.all.forEach(a=>all.appendChild(actionButton(a, state.action===a)));
}

function activeFilters(){
  if(state.view==="current") return state.logs.filter(x=>x.shiftKey===shiftInfo().key);
  if(state.view==="previous") return state.logs.filter(x=>x.shiftKey===previousShiftKey());
  return state.logs;
}

function renderLogs(){
  const list = activeFilters();
  const logs = document.getElementById("logs");
  const title = document.getElementById("listTitle");
  title.textContent = state.view==="current" ? "Bu Vardiya" : state.view==="previous" ? "Önceki Vardiya" : "Tüm Geçmiş";
  document.getElementById("countBadge").textContent = `${list.length} kayıt`;

  if(!list.length){
    logs.innerHTML='<div class="empty">Kayıt yok.</div>';
    return;
  }

  logs.innerHTML = list.map(item=>{
    const bits = [
      item.action,
      item.startValue || item.endValue ? `${item.startValue||""}${item.startValue && item.endValue ? " → " : ""}${item.endValue||""}` : "",
      item.sourceValue ? `Kaynak/Yer: ${item.sourceValue}` : "",
      item.countValue ? `Adet: ${item.countValue}` : "",
      item.note || ""
    ].filter(Boolean).join(" • ");
    return `<div class="log">
      <div class="logtop">
        <span class="pill">${item.categoryLabel}</span>
        <span class="time">${item.date} ${item.time}</span>
      </div>
      <div class="detail">${bits}</div>
    </div>`;
  }).join("");
}

function renderViewTabs(){
  document.querySelectorAll('#viewTabs button').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.view===state.view);
    btn.onclick=()=>{state.view=btn.dataset.view; renderViewTabs(); renderLogs();};
  });
}

function saveRecord(){
  if(!state.action){
    toast("Önce işlem seç");
    return;
  }
  const info = shiftInfo();
  const startValue = document.getElementById("startValue").value.trim();
  const endValue = document.getElementById("endValue").value.trim();
  const sourceValue = document.getElementById("sourceValue").value.trim();
  const countValue = document.getElementById("countValue").value.trim();
  const manualTime = document.getElementById("manualTime").value.trim();
  const note = document.getElementById("note").value.trim();

  let categoryLabel = state.category;
  if(state.category==="DG") categoryLabel = `${state.dg} (${
      parseInt(state.dg.replace("DG",""),10)<=16 ? "Sulzer" : "MAN"
  })`;
  if(state.category==="Ambarlar" || state.category==="Kaçak") categoryLabel = `${state.category} / ${state.subSection}`;

  state.logs.unshift({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    shiftKey: info.key,
    date: info.date,
    shift: info.shift,
    time: manualTime || info.time,
    category: state.category,
    categoryLabel,
    subSection: state.subSection,
    dg: state.dg,
    action: state.action,
    startValue,
    endValue,
    sourceValue,
    countValue,
    note
  });
  saveLogs();

  ["startValue","endValue","sourceValue","countValue","manualTime","note"].forEach(id=>document.getElementById(id).value="");
  state.action="";
  renderActions();
  renderLogs();
  toast("Kaydedildi");
}

function activeListForExport(){
  return activeFilters().slice().reverse();
}

function exportText(){
  const list = activeListForExport();
  if(!list.length){toast("Kayıt yok"); return;}
  const text = list.map(item=>{
    const bits = [
      item.action,
      item.startValue || item.endValue ? `${item.startValue||""}${item.startValue && item.endValue ? " → " : ""}${item.endValue||""}` : "",
      item.sourceValue ? `Kaynak/Yer: ${item.sourceValue}` : "",
      item.countValue ? `Adet: ${item.countValue}` : "",
      item.note || ""
    ].filter(Boolean).join(" - ");
    return `- ${item.date} ${item.time} | ${item.categoryLabel} | ${bits}`;
  }).join("\n");

  if(navigator.share){
    navigator.share({title:"Vardiya Kayıtları", text})
      .catch(()=>copyText(text));
  } else copyText(text);
}

async function copyText(text){
  try{await navigator.clipboard.writeText(text); toast("Panoya kopyalandı");}
  catch(e){prompt("Kopyala:", text);}
}

function exportCSV(){
  const list = activeListForExport();
  if(!list.length){toast("Kayıt yok"); return;}
  const rows = [["Tarih","Vardiya","Saat","Kategori","Alt Bölüm","DG","İşlem","Başlangıç","Bitiş","Kaynak/Yer","Adet","Not"]];
  list.forEach(i=>rows.push([
    i.date, i.shift, i.time, i.category, i.subSection||"", i.dg||"", i.action, i.startValue||"", i.endValue||"", i.sourceValue||"", i.countValue||"", i.note||""
  ]));
  const esc = v => `"${String(v).replaceAll('"','""')}"`;
  const csv = "\ufeff" + rows.map(r=>r.map(esc).join(";")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "vardiya-oiler-v2.csv";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}

function clearActiveList(){
  if(!confirm("Seçili görünümdeki kayıtlar silinsin mi?")) return;
  if(state.view==="current"){
    const key = shiftInfo().key;
    state.logs = state.logs.filter(x=>x.shiftKey!==key);
  } else if(state.view==="previous"){
    const key = previousShiftKey();
    state.logs = state.logs.filter(x=>x.shiftKey!==key);
  } else {
    state.logs = [];
  }
  saveLogs();
  renderLogs();
  toast("Temizlendi");
}

function renderAll(){
  renderHeader();
  renderCategories();
  renderSubSections();
  renderDGButtons();
  renderActions();
  renderViewTabs();
  renderLogs();
}

document.getElementById("saveBtn").onclick = saveRecord;
document.getElementById("shareBtn").onclick = exportText;
document.getElementById("csvBtn").onclick = exportCSV;
document.getElementById("clearBtn").onclick = clearActiveList;

if("serviceWorker" in navigator) {
  window.addEventListener("load", ()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}

renderAll();
