
export interface SlotID {
  slotID: number;
}

export interface Reservierung{
  name: string;
  fruehesterEinsteckzeitpunkt: Date;
  spaetesterAussteckzeitpunkt: Date;
  slot: Slot;
}

export interface Slot {
  startzeit: Date;
  endzeit: Date;
}

export interface LadestatusDTO{
  geladeneEnergieKwH: number;
  ladestandProzent: number;
  ladedauerStundenMinuten: string;
}

export interface Ladestatus{
  geladeneEnergieKwH: number;
  ladestandProzent: number;
  ladedauerStundenMinuten: VerbleibendeZeit;
}

export interface VerbleibendeZeit{
  stunden: number;
  minuten: number;
}

export interface Punktekonto{
  punktestand: number;
}

export interface KonfigurationsKonstanten {
  konstantenLadedauer: KonstantenLadedauer;
  konstantenSteckzeiten: KonstantenSteckzeiten;
  konstantenLogin: KonstantenLogin;
}

export interface KonstantenLadedauer {
  minimale_ladedauer_minuten: number;
  maximale_ladedauer_minuten: number;
}

export interface KonstantenSteckzeiten {
  einsteckzeit_minuten: number;
  aussteckzeit_minuten: number;
}

export interface KonstantenLogin{
  emailRegex: string;
}
