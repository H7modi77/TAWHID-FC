/* ========= SPA NAV ========= */

function show(id){
document.querySelectorAll(".section")
.forEach(s=>s.classList.remove("active"));

document.getElementById(id).classList.add("active");
}

/* ========= DATA ========= */

let players = JSON.parse(localStorage.getItem("players")) || [

{name:"H7modi77",photo:"h7modi77.png",pos:"Midfield"},
{name:"M---_11_11",photo:"m1111.png",pos:"Midfield"},
{name:"Almousa3M",photo:"almousa3m.png",pos:"Attack"},
{name:"H2ssain_28",photo:"h2ssain28.png",pos:"Attack"},
{name:"Yo0ousef25",photo:"yo0ousef25.png",pos:"Attack"},
{name:"Basabeso2",photo:"basabeso2.png",pos:"Attack"}

];

/* ========= STATS ========= */

const stats={
H7modi77:{g:44,a:85,p:75,s:38,w:47},
"M---_11_11":{g:112,a:113,p:75,s:34,w:46},
Almousa3M:{g:161,a:146,p:77,s:40,w:49},
H2ssain_28:{g:144,a:72,p:73,s:28,w:44},
Yo0ousef25:{g:57,a:17,p:74,s:47,w:43},
Basabeso2:{g:84,a:43,p:85,s:41,w:49}
};

/* ========= AI CALC ========= */

function calcAI(s){
return Math.round(
(s.g*2.1)+
(s.a*2.1)+
(s.p*1.5)+
(s.s*2.5)+
(s.w*1.5)
);
}

/* ========= RENDER TEAM ========= */

function renderTeam(){

let box=document.getElementById("playersContainer");
box.innerHTML="";

players.forEach(p=>{

let ai=calcAI(stats[p.name]);

box.innerHTML+=`
<div class="card" onclick="openPlayer('${p.name}')">
<img src="images/${p.photo}" width="80">
<h3>${p.name}</h3>
<p>${p.pos}</p>
<h2>AI ${ai}</h2>
</div>
`;
});
}

renderTeam();

/* ========= PLAYER MODAL ========= */

function openPlayer(name){

let s=stats[name];
let ai=calcAI(s);

modal.style.display="block";

modalContent.innerHTML=`
<h2>${name}</h2>
<p>Goals: ${s.g}</p>
<p>Assist: ${s.a}</p>
<p>Pass: ${s.p}%</p>
<p>Shot: ${s.s}%</p>
<p>Win: ${s.w}%</p>
<h1>AI ${ai}</h1>
`;
}

modal.onclick=e=>{
if(e.target.id==="modal")
modal.style.display="none";
};

/* ========= ADMIN LOGIN ========= */

function login(){
if(user.value==="TAWHID" && pass.value==="2"){
panel.style.display="block";
}else{
alert("بيانات خاطئة");
}
}

/* ========= ADD PLAYER ========= */

function addPlayer(){

players.push({
name:pname.value,
photo:pphoto.value,
pos:ppos.value
});

localStorage.setItem("players",JSON.stringify(players));
renderTeam();
}
