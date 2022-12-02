
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
