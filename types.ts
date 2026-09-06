export interface PlayerGenStats {
  games: number;
  winP: number;
  rat: number;
  motm: number;
}

export interface PlayerAtkStats {
  goals: number;
  gpm: number;
  shotS: number;
  ast: number;
}

export interface PlayerTeamStats {
  passes: number;
  passS: number;
}

export interface PlayerDefStats {
  red: number;
  tack: number;
  gk: number;
}

export interface PlayerAiStats {
  carry: number;
  cL: string;
  pwr: number;
  clu: number;
  pad: string;
  bpts: number;
  tip: string;
}

export interface Player {
  name: string;
  pro: string;
  img: string;
  ovr: number;
  pos: string;
  h: string;
  gen: PlayerGenStats;
  atk: PlayerAtkStats;
  team: PlayerTeamStats;
  def: PlayerDefStats;
  ai: PlayerAiStats;
}

export interface MatchRecord {
  res: 'W' | 'L' | 'D';
  score: string;
  opp: string;
  scorers: string;
  motm: string;
}

export interface ClubStats {
  skillRating: number;
  div: number;
  bestDiv: number;
  rank: string;
  totalPlayed: number;
  winRate: string;
  seasonRecord: string;
  goalDifference: string;
  statusStreak: string;
  wins: number;
  draws: number;
  losses: number;
  goals: number;
}

export type Language = 'ar' | 'en';
export type SectionType = 'home' | 'squad' | 'ai' | 'ballon' | 'matches';
