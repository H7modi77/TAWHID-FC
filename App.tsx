import React, { useState, useEffect } from 'react';
import { clubStatsData, playersData, matchesData, i18n } from './data';
import { Player, SectionType, Language } from './types';

export default function App() {
  const [curLang, setCurLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const t = i18n[curLang];

  useEffect(() => {
    const html = document.getElementById('app-html') || document.documentElement;
    html.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', curLang);
  }, [curLang]);

  const toggleLang = () => {
    setCurLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== `${window.location.origin}/logo.png`) {
      target.src = '/logo.png';
    }
  };

  // Sortings for AI Hub and Ballon d'Or
  const powerRankings = [...playersData].sort((a, b) => b.ai.pwr - a.ai.pwr);
  const carryRankings = [...playersData].sort((a, b) => b.ai.carry - a.ai.carry);
  const ballonRankings = [...playersData].sort((a, b) => b.ai.bpts - a.ai.bpts);

  return (
    <div id="app-root" className="min-h-screen bg-[#0a0e14] text-[#e1e4e8]">
      {/* Bento Header */}
      <header id="main-header" className="border-b border-[#c5a059]/30 bg-[#0f141c]/95 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3 flex flex-wrap justify-between items-center gap-3">
        <div className="logo-box flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')} id="logo-button">
          <div className="w-11 h-11 bg-[#c5a059] rounded-xl flex items-center justify-center text-[#0a0e14] font-black text-lg font-mono shadow-md shadow-[#c5a059]/20">
            T2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#c5a059] leading-none" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                TAWHID2 FC
              </h1>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#94a3b8] mt-1 font-semibold">
              {curLang === 'ar' ? 'مركز وحش البيانات • النخبة' : 'Data Monster Hub • Elite Division'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="bg-[#161c24] border border-[#c5a059]/30 px-3 py-1.5 rounded-full text-xs font-bold text-[#c5a059] hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
            {t.div} {clubStatsData.div}
          </div>
          <div className="bg-[#c5a059] px-3.5 py-1.5 rounded-full text-xs font-black text-[#0a0e14] hidden sm:block tracking-wide">
            {curLang === 'ar' ? 'الحالة: نشط' : 'LIVE STATUS: ACTIVE'}
          </div>
          <button className="lang-btn" onClick={toggleLang} id="lang-toggle-btn">
            {curLang === 'ar' ? 'EN / عربي' : 'عربي / EN'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* 1. DASHBOARD: BENTO GRID OVERVIEW */}
        {activeSection === 'home' && (
          <section id="sec-home" className="active-section p-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Bento Card 1: Skill Rating Hero */}
              <div className="md:col-span-5 bg-[#161c24] border border-[#ffffff0f] hover:border-[#c5a059]/40 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl" id="card-skill-rating">
                <div className="bento-watermark">SR</div>
                <div>
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-2">
                    <i className="fas fa-signal"></i> <span>{t.sr_title}</span>
                  </div>
                  <div className="huge-stat text-6xl lg:text-7xl font-bold tracking-tighter text-[#c5a059] my-3">
                    {clubStatsData.skillRating}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#ffffff0f] mt-4 text-center">
                  <div className="bg-[#0a0e14]/50 p-2.5 rounded-xl border border-[#ffffff08]">
                    <span className="text-[10px] text-[#94a3b8] uppercase font-bold block">{t.div}</span>
                    <b className="text-lg font-black text-white">{clubStatsData.div}</b>
                  </div>
                  <div className="bg-[#0a0e14]/50 p-2.5 rounded-xl border border-[#c5a059]/20">
                    <span className="text-[10px] text-[#c5a059] uppercase font-bold block">{t.best}</span>
                    <b className="text-lg font-black text-[#c5a059]">{clubStatsData.bestDiv}</b>
                  </div>
                  <div className="bg-[#0a0e14]/50 p-2.5 rounded-xl border border-[#ffffff08]">
                    <span className="text-[10px] text-[#94a3b8] uppercase font-bold block">{t.rank}</span>
                    <b className="text-lg font-black text-white">{clubStatsData.rank}</b>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: Matches & Win Rate & Form */}
              <div className="md:col-span-7 bg-[#161c24] border border-[#ffffff0f] hover:border-[#ffffff18] rounded-2xl p-6 flex flex-col justify-between shadow-xl" id="grid-match-stats">
                <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2">
                  <i className="fas fa-chart-pie"></i> <span>{t.win_rate} & {t.total_m}</span>
                </div>

                <div className="grid grid-cols-3 items-center gap-4 my-auto py-3">
                  <div className="text-center md:text-start" id="card-total-played">
                    <p className="text-[#94a3b8] text-[11px] uppercase font-bold mb-1">{t.total_m}</p>
                    <p className="text-3xl lg:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron' }}>
                      {clubStatsData.totalPlayed}
                    </p>
                  </div>

                  <div className="text-center border-x border-[#ffffff0f] px-2" id="card-win-rate">
                    <p className="text-[#94a3b8] text-[11px] uppercase font-bold mb-1">{t.win_rate}</p>
                    <p className="text-3xl lg:text-4xl font-black text-[#48a97b] tracking-tight" style={{ fontFamily: 'Orbitron' }}>
                      {clubStatsData.winRate}
                    </p>
                  </div>

                  <div className="text-center md:text-end">
                    <p className="text-[#94a3b8] text-[11px] uppercase font-bold mb-2">{curLang === 'ar' ? 'الفورمة الأخيرة' : 'Recent Form'}</p>
                    <div className="flex items-center justify-center md:justify-end gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#48a97b] shadow-sm shadow-[#48a97b]/50" title="Win"></div>
                      <div className="w-3 h-3 rounded-full bg-[#48a97b] shadow-sm shadow-[#48a97b]/50" title="Win"></div>
                      <div className="w-3 h-3 rounded-full bg-[#48a97b] shadow-sm shadow-[#48a97b]/50" title="Win"></div>
                      <div className="w-3 h-3 rounded-full bg-[#707a8a]" title="Draw"></div>
                      <div className="w-3 h-3 rounded-full bg-[#c95d5d]" title="Loss"></div>
                    </div>
                    <span className="text-[10px] text-[#94a3b8] mt-1 block">{clubStatsData.seasonRecord}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#ffffff0f] text-xs text-[#94a3b8]">
                  <span>{curLang === 'ar' ? 'أداء آخر 10 مباريات' : 'Last 10 matches overview'}</span>
                  <span className="tag tag-win font-bold">{clubStatsData.statusStreak}</span>
                </div>
              </div>

              {/* Bento Card 3: 30-Day Performance Tracker Highlight Banner */}
              <div className="md:col-span-12 bg-[#c5a059] text-[#0a0e14] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4" id="card-season-tracker">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-[#0a0e14] rounded-2xl flex items-center justify-center text-[#c5a059] shrink-0 shadow-lg">
                    <i className="fas fa-bolt text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-75 tracking-wider">{t.season_title}</p>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {curLang === 'ar' ? 'متتبع أداء 30 يوماً' : '30 DAYS PERFORMANCE TRACKER'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-[#0a0e14]/15 pt-3 md:pt-0">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase opacity-75">{t.record}</p>
                    <p className="text-xl md:text-2xl font-black font-mono">{clubStatsData.seasonRecord}</p>
                  </div>
                  <div className="h-8 w-px bg-[#0a0e14]/20 hidden sm:block"></div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase opacity-75">{t.gd}</p>
                    <p className="text-xl md:text-2xl font-black font-mono">{clubStatsData.goalDifference}</p>
                  </div>
                  <div className="h-8 w-px bg-[#0a0e14]/20 hidden sm:block"></div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase opacity-75">{t.streak}</p>
                    <span className="bg-[#0a0e14] text-[#c5a059] px-3 py-1 rounded-full text-xs font-black inline-block mt-0.5">
                      {clubStatsData.statusStreak}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Card 4: Lifetime League Stats */}
              <div className="md:col-span-6 bg-[#161c24] border border-[#ffffff0f] hover:border-[#ffffff18] rounded-2xl p-6 shadow-xl" id="card-lifetime-stats">
                <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-4">
                  <i className="fas fa-history"></i> <span>{t.lifetime}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0a0e14]/60 border border-[#ffffff08] p-4 rounded-xl">
                    <span className="text-[11px] text-[#94a3b8] uppercase font-bold block mb-1">{t.wins}</span>
                    <b className="text-2xl font-black text-[#48a97b] font-mono">{clubStatsData.wins}</b>
                  </div>
                  <div className="bg-[#0a0e14]/60 border border-[#ffffff08] p-4 rounded-xl">
                    <span className="text-[11px] text-[#94a3b8] uppercase font-bold block mb-1">{t.draws}</span>
                    <b className="text-2xl font-black text-white font-mono">{clubStatsData.draws}</b>
                  </div>
                  <div className="bg-[#0a0e14]/60 border border-[#ffffff08] p-4 rounded-xl">
                    <span className="text-[11px] text-[#94a3b8] uppercase font-bold block mb-1">{t.losses}</span>
                    <b className="text-2xl font-black text-[#c95d5d] font-mono">{clubStatsData.losses}</b>
                  </div>
                  <div className="bg-[#0a0e14]/60 border border-[#c5a059]/20 p-4 rounded-xl">
                    <span className="text-[11px] text-[#c5a059] uppercase font-bold block mb-1">{t.goals}</span>
                    <b className="text-2xl font-black text-[#c5a059] font-mono">{clubStatsData.goals}</b>
                  </div>
                </div>
              </div>

              {/* Bento Card 5: Ballon d'Or 2026 Race Spotlight */}
              <div className="md:col-span-6 bg-[#161c24] border border-[#c5a059]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between" id="card-ballon-spotlight">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#c5a059_0%,_transparent_70%)] pointer-events-none"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 m-0 border-0 p-0">
                    <i className="fas fa-trophy"></i> <span>{t.ballon_main}</span>
                  </div>
                  <button
                    onClick={() => setActiveSection('ballon')}
                    className="text-xs text-[#c5a059] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.ballon_full}</span>
                    <i className="fas fa-chevron-right text-[10px]"></i>
                  </button>
                </div>

                <div className="flex items-end justify-center gap-2 h-44 my-auto">
                  {/* Step 2 (Silver) */}
                  <div
                    className="flex-1 bg-[#1e242d] rounded-t-xl h-[75%] flex flex-col items-center justify-end pb-3 border-t-2 border-[#94a3b8] cursor-pointer hover:bg-[#252e3a] transition-all"
                    onClick={() => setSelectedPlayer(ballonRankings[1])}
                  >
                    <img
                      src={ballonRankings[1]?.img || '/logo.png'}
                      alt={ballonRankings[1]?.name}
                      className="w-10 h-10 rounded-full border border-[#94a3b8] mb-2 object-cover"
                      onError={handleImageError}
                    />
                    <p className="text-[11px] font-bold text-center truncate px-1 w-full">{ballonRankings[1]?.name}</p>
                    <p className="text-[9px] text-[#94a3b8] font-mono">{ballonRankings[1]?.ai.bpts} PTS</p>
                  </div>

                  {/* Step 1 (Gold) */}
                  <div
                    className="flex-1 bg-[#282216] rounded-t-xl h-[100%] flex flex-col items-center justify-end pb-4 border-t-2 border-[#c5a059] cursor-pointer hover:bg-[#342c1d] transition-all relative"
                    onClick={() => setSelectedPlayer(ballonRankings[0])}
                  >
                    <div className="absolute -top-3 text-xs">👑</div>
                    <img
                      src={ballonRankings[0]?.img || '/logo.png'}
                      alt={ballonRankings[0]?.name}
                      className="w-14 h-14 rounded-full border-2 border-[#c5a059] mb-2 object-cover"
                      onError={handleImageError}
                    />
                    <p className="text-xs font-black text-[#c5a059] text-center truncate px-1 w-full">{ballonRankings[0]?.name}</p>
                    <p className="text-[10px] font-bold text-white font-mono">{ballonRankings[0]?.ai.bpts} PTS</p>
                  </div>

                  {/* Step 3 (Bronze) */}
                  <div
                    className="flex-1 bg-[#1e242d] rounded-t-xl h-[60%] flex flex-col items-center justify-end pb-3 border-t-2 border-[#cd7f32] cursor-pointer hover:bg-[#252e3a] transition-all"
                    onClick={() => setSelectedPlayer(ballonRankings[2])}
                  >
                    <img
                      src={ballonRankings[2]?.img || '/logo.png'}
                      alt={ballonRankings[2]?.name}
                      className="w-10 h-10 rounded-full border border-[#cd7f32] mb-2 object-cover"
                      onError={handleImageError}
                    />
                    <p className="text-[11px] font-bold text-center truncate px-1 w-full">{ballonRankings[2]?.name}</p>
                    <p className="text-[9px] text-[#cd7f32] font-mono">{ballonRankings[2]?.ai.bpts} PTS</p>
                  </div>
                </div>

                <div className="text-center text-[11px] text-[#94a3b8] pt-2 border-t border-[#ffffff0f]">
                  {curLang === 'ar' ? 'انقر على أي لاعب لعرض ملف الإحصائيات الكامل' : 'Click on any player to open deep metrics'}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 2. SQUAD HUB (BENTO GRID) */}
        {activeSection === 'squad' && (
          <section id="sec-squad" className="active-section p-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#c5a059] flex items-center gap-2 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <i className="fas fa-users text-lg"></i> <span>{t.squad_title}</span>
                </h2>
                <p className="text-xs text-[#94a3b8] mt-1">{curLang === 'ar' ? 'قائمة النجوم وإحصائياتهم الشاملة' : 'Squad roster and individual breakdown'}</p>
              </div>
              <div className="bg-[#161c24] border border-[#c5a059]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#c5a059]">
                7 {curLang === 'ar' ? 'لاعبين' : 'PLAYERS'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="player-list-main">
              {playersData.map((p) => (
                <div
                  key={p.name}
                  id={`player-strip-${p.name}`}
                  className="bg-[#161c24] border border-[#ffffff0f] hover:border-[#c5a059]/50 rounded-2xl p-5 cursor-pointer hover:-translate-y-1 transition-all shadow-lg flex flex-col justify-between"
                  onClick={() => setSelectedPlayer(p)}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl border border-[#c5a059]/40 object-cover bg-[#0a0e14]"
                        onError={handleImageError}
                      />
                      <div>
                        <b className="text-base text-[#c5a059] block leading-snug">{p.name}</b>
                        <span className="text-xs text-[#94a3b8] block">{p.pro}</span>
                        <span className="inline-block mt-1 text-[10px] bg-[#0a0e14] border border-[#ffffff15] px-2 py-0.5 rounded font-mono font-bold text-white">
                          {p.pos} • {p.h}
                        </span>
                      </div>
                    </div>
                    <div className="p-ovr text-center font-mono">
                      {p.ovr}
                    </div>
                  </div>

                  {/* Player Quick Mini-Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#ffffff0a] text-center my-1 bg-[#0a0e14]/40 rounded-xl px-2">
                    <div>
                      <span className="text-[10px] text-[#94a3b8] uppercase block">{t.games}</span>
                      <b className="text-sm font-mono text-white">{p.gen.games}</b>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#94a3b8] uppercase block">{t.goals_stat}</span>
                      <b className="text-sm font-mono text-[#c5a059]">{p.atk.goals}</b>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#94a3b8] uppercase block">{t.rating}</span>
                      <b className="text-sm font-mono text-[#48a97b]">{p.gen.rat}★</b>
                    </div>
                  </div>

                  {/* Bottom info strip */}
                  <div className="flex items-center justify-between mt-3 text-xs pt-2">
                    <span className="text-[11px] text-[#94a3b8] truncate max-w-[170px]">
                      {p.ai.cL}
                    </span>
                    <span className="font-mono font-bold text-[#c5a059] text-[11px] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/20">
                      {p.ai.pwr} PWR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. AI HUB (BENTO GRID) */}
        {activeSection === 'ai' && (
          <section id="sec-ai" className="active-section p-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#c5a059] flex items-center gap-2 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <i className="fas fa-brain text-lg"></i> <span>AI HUB INTELLIGENCE</span>
                </h2>
                <p className="text-xs text-[#94a3b8] mt-1">{curLang === 'ar' ? 'التحليلات الذكية ومؤشرات القوة والحسم' : 'Advanced AI telemetry & squad impact analytics'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Bento Card: Power Rankings */}
              <div className="md:col-span-12 lg:col-span-5 bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-6 shadow-xl" id="card-pwr-rank">
                <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-4">
                  <i className="fas fa-chart-line"></i> <span>{t.pwr_rank}</span>
                </div>
                <div className="space-y-2.5" id="pwr-list">
                  {powerRankings.map((p, i) => (
                    <div
                      className="flex items-center justify-between p-3 bg-[#0a0e14]/60 hover:bg-[#0a0e14] rounded-xl border border-[#ffffff08] transition-all cursor-pointer"
                      key={p.name}
                      id={`pwr-row-${i}`}
                      onClick={() => setSelectedPlayer(p)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-40 w-5">0{i + 1}</span>
                        <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-[#ffffff10]" onError={handleImageError} />
                        <div>
                          <span className="font-bold text-sm block">{p.name}</span>
                          <span className="text-[10px] text-[#94a3b8]">{p.pos} • {p.ovr} OVR</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-lg border border-[#c5a059]/20">
                        {p.ai.pwr} {t.pwr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Card: Carry Index */}
              <div className="md:col-span-12 lg:col-span-4 bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-6 shadow-xl flex flex-col justify-between" id="card-carry-rank">
                <div>
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-4">
                    <i className="fas fa-backpack"></i> <span>{t.carry}</span>
                  </div>

                  {/* Top Carry Featured Box */}
                  <div className="bg-[#0a0e14]/70 border border-[#c5a059]/30 rounded-xl p-4 text-center mb-5">
                    <div className="text-4xl font-black text-white font-mono mb-1">{carryRankings[0]?.ai.carry}%</div>
                    <p className="text-xs text-[#c5a059] font-bold">{carryRankings[0]?.name} {curLang === 'ar' ? 'معدل الحمل' : 'Carry Rate'}</p>
                    <div className="bento-progress-track mt-3">
                      <div className="bento-progress-bar" style={{ width: `${carryRankings[0]?.ai.carry}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-3" id="carry-list">
                    {carryRankings.slice(1).map((p, i) => (
                      <div key={p.name} id={`carry-row-${i}`} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#94a3b8]">{p.name}</span>
                          <span className="font-mono text-white">{p.ai.carry}%</span>
                        </div>
                        <div className="bento-progress-track">
                          <div className="bento-progress-bar bg-[#94a3b8]/70" style={{ width: `${p.ai.carry}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ffffff0f] text-[11px] text-[#94a3b8] mt-4">
                  💡 {curLang === 'ar' ? 'مؤشر النقل يعكس نسبة مساهمة اللاعب في نقاط الفوز' : 'Carry rate measures direct impact on match-winning moments'}
                </div>
              </div>

              {/* Bento Card: Stat Padder Detector */}
              <div className="md:col-span-12 lg:col-span-3 bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-6 shadow-xl" id="card-padder-detector">
                <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-4">
                  <i className="fas fa-mask"></i> <span>{t.padder}</span>
                </div>
                <div className="space-y-2.5" id="padder-list">
                  {playersData.map((p, i) => (
                    <div
                      key={p.name}
                      id={`padder-row-${i}`}
                      className="flex items-center justify-between p-2.5 bg-[#0a0e14]/50 rounded-xl border border-[#ffffff08] text-xs"
                    >
                      <span className="font-semibold">{p.name}</span>
                      <b
                        className="font-bold px-2 py-0.5 rounded text-[11px]"
                        style={{
                          background: p.ai.pad.includes('✅') ? 'rgba(72,169,123,0.15)' : (p.ai.pad.includes('🤔') ? 'rgba(234,179,8,0.15)' : 'rgba(201,93,93,0.15)'),
                          color: p.ai.pad.includes('✅') ? 'var(--win)' : (p.ai.pad.includes('🤔') ? '#eab308' : 'var(--loss)')
                        }}
                      >
                        {p.ai.pad}
                      </b>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 4. BALLON D'OR (BENTO GRID) */}
        {activeSection === 'ballon' && (
          <section id="sec-ballon" className="active-section p-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#c5a059] flex items-center gap-2 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <i className="fas fa-award text-lg"></i> <span>{t.ballon_main}</span>
                </h2>
                <p className="text-xs text-[#94a3b8] mt-1">{curLang === 'ar' ? 'سباق الكرة الذهبية لنادي TAWHID2 لعام 2026' : 'Official 2026 TAWHID2 Ballon d\'Or race standings'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Podium Bento Card */}
              <div className="lg:col-span-7 bg-[#161c24] border border-[#c5a059]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden" id="card-ballon-podium">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#c5a059_0%,_transparent_75%)] pointer-events-none"></div>

                <div className="text-center mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#c5a059] block">{curLang === 'ar' ? 'منصة التتويج' : 'OFFICIAL PODIUM'}</span>
                  <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Orbitron' }}>BALLON D'OR 2026</h3>
                </div>

                <div className="podium-hub" id="ballon-podium">
                  {/* Step 2: Silver */}
                  <div
                    className="pod-step step-2 cursor-pointer hover:brightness-110"
                    id="pod-step-silver"
                    onClick={() => setSelectedPlayer(ballonRankings[1])}
                  >
                    <img
                      src={ballonRankings[1]?.img || '/logo.png'}
                      alt={ballonRankings[1]?.name}
                      className="pod-img border-[#94a3b8]"
                      onError={handleImageError}
                    />
                    <div className="mt-5 font-black text-sm text-white">{ballonRankings[1]?.name}</div>
                    <span className="text-[10px] text-[#cbd5e1] font-bold block mt-0.5 font-mono">{ballonRankings[1]?.ai.bpts} {t.pts}</span>
                    <small className="text-[#cbd5e1] font-black uppercase text-[10px] tracking-wider mt-1 block">🥈 {t.silver}</small>
                  </div>

                  {/* Step 1: Gold */}
                  <div
                    className="pod-step step-1 cursor-pointer hover:brightness-110"
                    id="pod-step-gold"
                    onClick={() => setSelectedPlayer(ballonRankings[0])}
                  >
                    <img
                      src={ballonRankings[0]?.img || '/logo.png'}
                      alt={ballonRankings[0]?.name}
                      className="pod-img border-[#c5a059]"
                      style={{ width: '64px', height: '64px', top: '-32px' }}
                      onError={handleImageError}
                    />
                    <div className="mt-6 font-black text-base text-[#c5a059]">{ballonRankings[0]?.name}</div>
                    <span className="text-xs text-white font-black block mt-0.5 font-mono">{ballonRankings[0]?.ai.bpts} {t.pts}</span>
                    <small className="text-[#c5a059] font-black uppercase text-xs tracking-wider mt-1 block">🏆 {t.gold}</small>
                  </div>

                  {/* Step 3: Bronze */}
                  <div
                    className="pod-step step-3 cursor-pointer hover:brightness-110"
                    id="pod-step-bronze"
                    onClick={() => setSelectedPlayer(ballonRankings[2])}
                  >
                    <img
                      src={ballonRankings[2]?.img || '/logo.png'}
                      alt={ballonRankings[2]?.name}
                      className="pod-img border-[#cd7f32]"
                      onError={handleImageError}
                    />
                    <div className="mt-4 font-black text-sm text-white">{ballonRankings[2]?.name}</div>
                    <span className="text-[10px] text-[#cd7f32] font-bold block mt-0.5 font-mono">{ballonRankings[2]?.ai.bpts} {t.pts}</span>
                    <small className="text-[#cd7f32] font-black uppercase text-[10px] tracking-wider mt-1 block">🥉 {t.bronze}</small>
                  </div>
                </div>
              </div>

              {/* Full Ranking Bento Card */}
              <div className="lg:col-span-5 bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-6 shadow-xl flex flex-col justify-between" id="card-ballon-full">
                <div>
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase flex items-center gap-2 mb-4">
                    <i className="fas fa-list-ol"></i> <span>{t.ballon_full}</span>
                  </div>

                  <div className="space-y-2" id="ballon-table">
                    {ballonRankings.map((p, i) => (
                      <div
                        className="flex items-center justify-between p-3 bg-[#0a0e14]/60 hover:bg-[#0a0e14] rounded-xl border border-[#ffffff08] transition-all cursor-pointer"
                        key={p.name}
                        id={`ballon-row-${i}`}
                        onClick={() => setSelectedPlayer(p)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#94a3b8] w-6">
                            {i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `#${i + 1}`))}
                          </span>
                          <span className="font-bold text-sm text-white">{p.name}</span>
                        </div>
                        <span
                          className="font-mono font-bold text-sm px-2.5 py-1 rounded-lg"
                          style={{
                            color: i === 0 ? '#c5a059' : (i === 1 ? '#cbd5e1' : (i === 2 ? '#cd7f32' : '#94a3b8')),
                            background: i === 0 ? 'rgba(197,160,89,0.1)' : 'rgba(255,255,255,0.05)'
                          }}
                        >
                          {p.ai.bpts} {t.pts}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-[#94a3b8] text-center pt-4 border-t border-[#ffffff0f] mt-4">
                  {curLang === 'ar' ? 'النقاط تُحسب بمعادلة الذكاء الاصطناعي بناءً على الأهداف والصناعة ورجل المباراة ومعدل الفوز' : 'Points calculated via AI formula based on Goals, Assists, MOTM & Win %'}
                </p>
              </div>

            </div>
          </section>
        )}

        {/* 5. MATCHES (BENTO GRID) */}
        {activeSection === 'matches' && (
          <section id="sec-matches" className="active-section p-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#c5a059] flex items-center gap-2 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <i className="fas fa-futbol text-lg"></i> <span>{t.matches_history}</span>
                </h2>
                <p className="text-xs text-[#94a3b8] mt-1">{curLang === 'ar' ? 'سجل آخر 10 مباريات رسمية للنادي' : 'Archive of last 10 official league matches'}</p>
              </div>
              <span className="tag tag-win text-xs px-3 py-1 font-mono">
                {clubStatsData.seasonRecord}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="match-archive">
              {matchesData.map((m, idx) => {
                const borderAccent = m.res === 'W' ? '#48a97b' : (m.res === 'L' ? '#c95d5d' : '#707a8a');

                return (
                  <div
                    className="bg-[#161c24] border border-[#ffffff0f] hover:border-[#ffffff20] rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden transition-all"
                    key={idx}
                    id={`match-card-${idx}`}
                    style={{ borderLeft: curLang === 'ltr' ? `4px solid ${borderAccent}` : '1px solid rgba(255,255,255,0.06)', borderRight: curLang === 'ar' ? `4px solid ${borderAccent}` : '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`tag ${m.res === 'W' ? 'tag-win' : (m.res === 'L' ? 'tag-loss' : 'tag-draw')}`}>
                          {m.res === 'W' ? (curLang === 'ar' ? 'فوز' : 'WIN') : (m.res === 'L' ? (curLang === 'ar' ? 'خسارة' : 'LOSS') : (curLang === 'ar' ? 'تعادل' : 'DRAW'))}
                        </span>
                        <span className="text-xs font-bold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/20 flex items-center gap-1">
                          <i className="fas fa-star text-[10px]"></i> MOTM: {m.motm}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline my-2">
                        <span className="text-lg md:text-xl font-black text-white font-mono tracking-tight">
                          TAWHID2 <span className="text-[#c5a059]">{m.score}</span>
                        </span>
                        <span className="font-bold text-sm text-[#94a3b8] truncate max-w-[150px]">{m.opp}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#94a3b8] pt-3 border-t border-[#ffffff0a] mt-3 flex items-start gap-1.5">
                      <span>⚽</span>
                      <span className="leading-relaxed">{m.scorers}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      {/* --- DRILL-DOWN OVERLAY (BENTO MODAL) --- */}
      {selectedPlayer && (
        <div id="detail-overlay" className="overlay" style={{ display: 'block' }}>
          <div className="max-w-4xl mx-auto">
            <div className="overlay-header pb-4 border-b border-[#ffffff15] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#c5a059] rounded-xl flex items-center justify-center text-[#0a0e14] font-black font-mono">
                  {selectedPlayer.ovr}
                </div>
                <div>
                  <h2 id="ov-name" className="text-xl md:text-2xl font-black text-[#c5a059] tracking-tight leading-none" style={{ fontFamily: 'Orbitron' }}>
                    {selectedPlayer.name}
                  </h2>
                  <span className="text-xs text-[#94a3b8]">{selectedPlayer.pro} • {selectedPlayer.pos}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedPlayer(null)} id="close-overlay-btn">
                {t.close}
              </button>
            </div>

            <div id="ov-content" className="mt-6 space-y-4">
              {/* Header spotlight */}
              <div className="bg-[#161c24] border border-[#c5a059]/30 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#c5a059_0%,_transparent_70%)] pointer-events-none"></div>
                <img
                  src={selectedPlayer.img}
                  alt={selectedPlayer.name}
                  className="w-28 h-28 rounded-2xl border-2 border-[#c5a059] object-cover mx-auto shadow-2xl bg-[#0a0e14]"
                  onError={handleImageError}
                />
                <h3 className="text-xl font-black mt-3 mb-1 text-white">{selectedPlayer.pos} | {selectedPlayer.h}</h3>
                <p className="text-xs text-[#94a3b8]">{curLang === 'ar' ? 'التقييم الشامل' : 'Overall Player Rating'}: <span className="font-mono text-[#c5a059] font-bold">{selectedPlayer.ovr} OVR</span></p>
              </div>

              {/* AI Coach Tip Card */}
              <div className="bg-[#c5a059]/10 border border-[#c5a059]/40 rounded-2xl p-5">
                <div className="text-xs font-black text-[#c5a059] uppercase tracking-wider mb-1 flex items-center gap-2">
                  <i className="fas fa-lightbulb"></i> <span>{curLang === 'ar' ? 'تقرير الذكاء الاصطناعي التكتيكي' : 'Tactical AI Intelligence Report'}</span>
                </div>
                <p className="text-sm text-white leading-relaxed m-0 font-medium">
                  {selectedPlayer.ai.tip}
                </p>
              </div>

              {/* 4 Stats Bento Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* General Stats */}
                <div className="bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-5">
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase mb-3 pb-2 border-b border-[#ffffff0f]">
                    <i className="fas fa-user"></i> <span>{t.gen_t}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.games}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.gen.games}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.win_rate}</span>
                    <b className="font-mono text-[#48a97b] text-base">{selectedPlayer.gen.winP}%</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.rating}</span>
                    <b className="font-mono text-[#c5a059] text-base">{selectedPlayer.gen.rat}★</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.motm}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.gen.motm}</b>
                  </div>
                </div>

                {/* Attacking Stats */}
                <div className="bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-5">
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase mb-3 pb-2 border-b border-[#ffffff0f]">
                    <i className="fas fa-crosshairs"></i> <span>{t.atk_t}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.goals_stat}</span>
                    <b className="font-mono text-[#c5a059] text-base">{selectedPlayer.atk.goals}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.assists}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.atk.ast}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.gpm}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.atk.gpm}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{curLang === 'ar' ? 'دقة التسديد' : 'Shot Success'}</span>
                    <b className="font-mono text-[#48a97b] text-base">{selectedPlayer.atk.shotS}%</b>
                  </div>
                </div>

                {/* Teamplay Stats */}
                <div className="bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-5">
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase mb-3 pb-2 border-b border-[#ffffff0f]">
                    <i className="fas fa-exchange-alt"></i> <span>{t.team_t}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{curLang === 'ar' ? 'التمريرات' : 'Passes'}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.team.passes}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{curLang === 'ar' ? 'دقة التمرير' : 'Pass Accuracy'}</span>
                    <b className="font-mono text-[#48a97b] text-base">{selectedPlayer.team.passS}%</b>
                  </div>
                </div>

                {/* Defending Stats */}
                <div className="bg-[#161c24] border border-[#ffffff0f] rounded-2xl p-5">
                  <div className="card-title text-xs text-[#c5a059] font-black uppercase mb-3 pb-2 border-b border-[#ffffff0f]">
                    <i className="fas fa-shield-alt"></i> <span>{t.def_t}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.red_cards}</span>
                    <b className="font-mono text-[#c95d5d] text-base">{selectedPlayer.def.red}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.tackles}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.def.tack}</b>
                  </div>
                  <div className="stat-row">
                    <span className="text-[#94a3b8]">{t.clean_sheets}</span>
                    <b className="font-mono text-white text-base">{selectedPlayer.def.gk}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bento Bottom Navigation Bar */}
      <nav className="bottom-nav" id="main-bottom-nav">
        <div
          className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => { setActiveSection('home'); setSelectedPlayer(null); }}
          id="nav-btn-home"
        >
          <i className="fas fa-th-large"></i>
          <span>{t.nav_home}</span>
        </div>
        <div
          className={`nav-item ${activeSection === 'squad' ? 'active' : ''}`}
          onClick={() => { setActiveSection('squad'); setSelectedPlayer(null); }}
          id="nav-btn-squad"
        >
          <i className="fas fa-users"></i>
          <span>{t.nav_squad}</span>
        </div>
        <div
          className={`nav-item ${activeSection === 'ai' ? 'active' : ''}`}
          onClick={() => { setActiveSection('ai'); setSelectedPlayer(null); }}
          id="nav-btn-ai"
        >
          <i className="fas fa-brain"></i>
          <span>{t.nav_ai}</span>
        </div>
        <div
          className={`nav-item ${activeSection === 'ballon' ? 'active' : ''}`}
          onClick={() => { setActiveSection('ballon'); setSelectedPlayer(null); }}
          id="nav-btn-ballon"
        >
          <i className="fas fa-award"></i>
          <span>{t.nav_ballon}</span>
        </div>
        <div
          className={`nav-item ${activeSection === 'matches' ? 'active' : ''}`}
          onClick={() => { setActiveSection('matches'); setSelectedPlayer(null); }}
          id="nav-btn-matches"
        >
          <i className="fas fa-history"></i>
          <span>{t.nav_matches}</span>
        </div>
      </nav>
    </div>
  );
}
