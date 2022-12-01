export interface SlotJSON {
  startzeit: number;
  endzeit: number;
  fruehsterEinsteckzeitpunkt: number;
  spaetesterAbsteckzeitpunkt: number;
}


export interface SlotID {
  slotID: number;
}

export interface ReservierungDTO{
  name: string;
  fruehsterEinsteckzeitpunkt: number;
  spaetesterAbsteckzeitpunkt: number;
  slot: ZeitslotDTO;
}
export interface Reservierung{
  name: string;
  fruehsterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
  slot: Zeitslot;
}

export interface Zeitslot{
  startzeit: Date;
  endzeit: Date;
}

export interface ZeitslotDTO{
  startzeit: number;
  endzeit: number;
}
export interface Slot {
  startzeit: Date;
  endzeit: Date;
  fruehsterEinsteckzeitpunkt: Date;
  spaetesterAbsteckzeitpunkt: Date;
}
