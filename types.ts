
export enum TribeId {
  ASHER = 'asher',
  NAPHTALI = 'naphtali',
  ZEBULUN = 'zebulun',
  ISSACHAR = 'issachar',
  MANASSEH = 'manasseh',
  GAD = 'gad',
  REUBEN = 'reuben',
  EPHRAIM = 'ephraim',
  DAN = 'dan',
  BENJAMIN = 'benjamin',
  JUDAH = 'judah',
  SIMEON = 'simeon'
}

export type Language = 'he' | 'en';

export interface LocalizedString {
  he: string;
  en: string;
}

export interface TribeData {
  id: TribeId;
  name: LocalizedString;
  color: string;
  judge: LocalizedString; 
  judgeDescription?: LocalizedString;
  biblicalSource: {
    text: LocalizedString;
    source: LocalizedString;
  };
  hint: LocalizedString;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface RegionData {
  id: string;
  tribeId: TribeId;
  coords: LatLng[];
  center: LatLng;
}

export interface BiblicalCity {
  name: LocalizedString;
  coords: LatLng;
  tribeId?: TribeId;
}

export type Difficulty = 'EASY' | 'HARD';

export interface GameState {
  score: number;
  matchedTribes: TribeId[];
  mistakes: number;
  currentFact: string | null;
  loadingFact: boolean;
  gameCompleted: boolean;
}

export type SelectionType = 'NAME' | 'REGION';

export interface Selection {
  type: SelectionType;
  value: string; // TribeId or RegionId
}
