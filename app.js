/* ========= SPA ========= */
function show(id){
document.querySelectorAll(".section")
.forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* ========= PLAYERS ========= */
const players=[
{name:"H7modi77",photo:"h7modi77.png",pos:"Midfield"},
{name:"M---_11_11",photo:"m1111.png",pos:"Midfield"},
{name:"Almousa3M",photo:"almousa3m.png",pos:"Attack"},
{name:"H2ssain_28",photo:"h2ssain28.png",pos:"Attack"},
{name:"Yo0ousef25",photo:"yo0ousef25.png",pos:"Attack"},
{name:"Basabeso2",photo:"basabeso2.png",pos:"Attack"}
];

/* ========= ALL STATS ========= */

const stats={
H7modi77:{
October:{m:45,g:14,a:36,p:79,s:33,w:62},
November:{m:77,g:52,a:54,p:76,s:43,w:51},
January:{m:116,g:44,a:85,p:75,s:38,w:47}
},

"M---_11_11":{
October:{m:68,g:38,a:43,p:81,s:27,w:57},
November:{m:86,g:48,a:58,p:74,s:29,w:54},
January:{m:158,g:112,a:113,p:75,s:34,w:46}
},

Almousa3M:{
October:{m:58,g:65,a:61,p:78,s:33,w:60},
November:{m:57,g:67,a:72,p:77,s:33,w:53},
January:{m:126,g:161,a:146,p:77,s:40,w:49}
},

H2ssain_28:{
October:{m:44,g:36,a:15,p:76,s:23,w:56},
November:{m:64,g:59,a:48,p:77,s:25,w:51},
January:{m:146,g:144,a:72,p:73,s:28,w:44}
},

Yo0ousef25:{
October:{m:28,g:23,a:5,p:78,s:46,w:67},
November:{m:26,g:21,a:8,p:78,s:52,w:58},
January:{m:99,g:57,a:17,p:74,s:47,w:43}
},

Basabeso2:{
October:{m:48,g:36,a:17,p:84,s:40,w:62},
November:{m:75,g:54,a:22,p:86,s:39,w:57},
January:{m:91,g:84,a:43,p:85,s:41,w:49}
}
};

/* ========= AI ========= */

function calcAI(d){
return Math.round(
(d.g*2.1)+(d.a*2.1)+(d.p*1.5)+(d.s*2.5)+(d.w*1.5)
);
}

/* ========= TOTAL ========= */

function totalStats(name){
let months=stats[name];
let t={m:0,g:0,a:0,p:0,s:0,w:0};
let c=0;

for(let m in months){
let d=months[m];
t.m+=d.m;
t.g+=d.g;
t.a+=d.a;
t.p+=d.p;
t.s+=d.s;
t.w+=d.w;
c++;
}

t.p=Math.round(t.p/c);
t.s=Math.round(t.s/c);
t.w=Math.round(t.w/c);
return t;
}

/* ========= TEAM ========= */

function renderTeam(){
playersContainer.innerHTML="";
players.forEach(p=>{
let ai=calcAI(totalStats(p.name));

playersContainer.innerHTML+=`
<div class="card" onclick="openPlayer('${p.name}')">
<img src="images/${p.photo}">
<h3>${p.name}</h3>
<p>${p.pos}</p>
<h2>AI ${ai}</h2>
</div>`;
});
}
renderTeam();

/* ========= PLAYER MODAL ========= */

function openPlayer(name){

let t=totalStats(name);
let ai=calcAI(t);

modal.style.display="block";

modalContent.innerHTML=`
<h2>${name}</h2>
<p>Goals ${t.g}</p>
<p>Assist ${t.a}</p>
<p>Pass ${t.p}%</p>
<p>Shot ${t.s}%</p>
<p>Win ${t.w}%</p>
<h1>AI ${ai}</h1>
`;
}

modal.onclick=e=>{
if(e.target.id==="modal")
modal.style.display="none";
};

/* ========= AWARDS ========= */

const awards={
player:{name:"Almousa3M",img:"award-player.png",month:"January"},
goal:{player:"Yo0ousef25",img:"award-goal.png",video:"goal.mp4"}
};

awardsBox.innerHTML=`
<div class="card">
<h3>🏆 لاعب الشهر</h3>
<img src="images/${awards.player.img}">
<h2>${awards.player.name}</h2>
<p>${awards.player.month}</p>
</div>

<div class="card">
<h3>⚽ هدف الشهر</h3>
<img src="images/${awards.goal.img}">
<p>${awards.goal.player}</p>
<video controls>
<source src="images/${awards.goal.video}">
</video>
</div>
`;

/* ========= NEWS ========= */

const news=[
{title:"فوز نادي التوحيد 4-2",img:"news1.png",date:"2026-02-20"},
{title:"هاتريك Almousa3M",img:"news2.png",date:"2026-02-28"}
];

news.forEach(n=>{
newsBox.innerHTML+=`
<div class="card">
<img src="images/${n.img}">
<h3>${n.title}</h3>
<p>${n.date}</p>
</div>`;
});

/* ========= STATS TABLE ========= */

for(let name in stats){

let months=stats[name];
let html=`<div class="card"><h3>${name}</h3>
<table>
<tr><th>Month</th><th>M</th><th>G</th><th>A</th><th>P%</th><th>S%</th><th>W%</th></tr>`;

for(let m in months){
let d=months[m];
html+=`<tr>
<td>${m}</td>
<td>${d.m}</td>
<td>${d.g}</td>
<td>${d.a}</td>
<td>${d.p}</td>
<td>${d.s}</td>
<td>${d.w}</td>
</tr>`;
}

let t=totalStats(name);

html+=`<tr>
<th>Total</th>
<th>${t.m}</th>
<th>${t.g}</th>
<th>${t.a}</th>
<th>${t.p}</th>
<th>${t.s}</th>
<th>${t.w}</th>
</tr></table></div>`;

statsBox.innerHTML+=html;
}
