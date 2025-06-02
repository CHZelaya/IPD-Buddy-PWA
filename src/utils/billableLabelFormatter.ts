//Todo: Map out each billable in the response and make a human friendly label for the Summary page and PDF.

const BILLABLE_TYPE_MAP: Record<string, string> = {
  INSULATION: 'Insulation',
  DRYWALL: 'Dry wall',
  FIRE_CAULKING: 'Fire Caulking',
  SCAFFOLDING: 'Scaffolding',
  HIGH_GARAGE_BULKHEAD: 'High Garage Bulkhead',
  PINCH_POINT_STRIPS_SINGLE_FAMILY_HOME: 'Pinch Point Strips (Single Family Home)',
  PINCH_POINT_STRIPS_DUPLEX: 'Pinch Point Strips (Duplex)',
  POLY_ONLY_SMALL: 'Poly Only (Small)',
  POLY_ONLY_LARGE: 'Poly Only (Large)',
  FIRE_CAULKING_MATTAMY_HOUSE: 'Fire Caulking (Mattamy House)',
  SCRAP_OUT: 'Scrap Out',
  SUITED_MECH_ROOM_RES_BAR: 'Suited Mech Room Res Bar Install',
  STEEL_FRAMING_AND_BOARD: 'Suited Mech Room (Steel Framing and Board)',
  BOARD_ONLY: 'Suited Mech Room (Board Only)',
  SECOND_MECH_ROOM: 'Second Suited Mech Room',
  FIRE_TAPING_MECH_ROOM_CEILING: 'Fire Taping (Mech Room Ceiling)',
  FIRE_TAPING_SECOND_MECH_ROOM: 'Fire Taping (Second Mech Room)',
};

export function formatBillableLabel (billable: string) {
  return BILLABLE_TYPE_MAP[billable]
}
