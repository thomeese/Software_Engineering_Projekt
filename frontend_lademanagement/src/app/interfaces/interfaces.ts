export interface SlotJSON {
  startzeit: number;
  endzeit: number;
  fruehsterEinsteckzeitpunkt: number;
  spaetesterAbsteckzeitpunkt: number;
}


export interface SlotID {
  slotID: number;
}

export interface Reservierung {
  mitarbeiterID: string;
  startzeit: string;
  endzeit: string;
}

export interface Slot {
  startzeit: Date;
  endzeit: Date;
  fruehsterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
}
