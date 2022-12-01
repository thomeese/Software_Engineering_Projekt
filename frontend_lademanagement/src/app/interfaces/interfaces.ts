export interface SlotJSON {
  startzeit: number;
  endzeit: number;
  fruehesterEinsteckzeitpunkt: number;
  spaetesterAbsteckzeitpunkt: number;
}


export interface SlotID {
  slotID: number;
}

export interface Reservierung{
  name: string;
  fruehesterEinsteckzeitpunkt: Date;
  spaetesterAussteckzeitpunkt: Date;
  slot: Zeitslot;
}

export interface Zeitslot{
  startzeit: Date;
  endzeit: Date;
}

export interface Slot {
  startzeit: Date;
  endzeit: Date;
  fruehesterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
}
