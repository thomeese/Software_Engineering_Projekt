export interface SlotJSON {
  startzeit: number;
  endzeit: number;
  fruehsterEinsteckzeitpunkt: number;
  spaetesterAbsteckzeitpunkt: number;
}


export interface SlotID {
  slotID: number;
}

export interface Reservierung{
  name: string;
  fruehsterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
  slot: Zeitslot;
}
export interface ReservierungOld {
  mitarbeiterID: string;
  startzeit: string;
  endzeit: string;
}

export interface Zeitslot{
  startzeit: Date;
  endzeit: Date;
}
export interface Slot {
  startzeit: Date;
  endzeit: Date;
  fruehsterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
}
