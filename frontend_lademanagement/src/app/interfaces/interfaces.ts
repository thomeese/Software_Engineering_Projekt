
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
