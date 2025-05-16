export interface BillableRateInfo {
  rate: number
  description: string
}

export const BILLABLE_RATES: Record<string, BillableRateInfo> = {
  INSULATION: { rate: 30.0, description: 'Bag of Insulation' },
  DRYWALL: { rate: 20.0, description: 'A sheet of Dry Wall' },
  FIRE_CAULKING: { rate: 5.0, description: 'Fire Caulking, max payout of $75' },
  SCAFFOLDING: { rate: 25.0, description: 'Scaffolding work per section' },
  HIGH_GARAGE_BULKHEAD: { rate: 35.0, description: 'High Garage Bulkhead per side' },
  PINCH_POINT_STRIPS_SINGLE_FAMILY_HOME: { rate: 40.0, description: 'Pinch Point Strips Single Family' },
  PINCH_POINT_STRIPS_DUPLEX: { rate: 50.0, description: 'Pinch Point Strips Duplex' },
  POLY_ONLY_SMALL: { rate: 25.0, description: 'Poly Only Small' },
  POLY_ONLY_LARGE: { rate: 50.0, description: 'Poly Only Large' },
  FIRE_CAULKING_MATTAMY_HOUSE: { rate: 25.0, description: 'Fire Caulking Mattamy House' },
  SCRAP_OUT: { rate: 25.0, description: 'Scrap Out per House' },
  SUITED_MECH_ROOM_RES_BAR: { rate: 65.0, description: 'Suited Mech Room, Res Bar install' },
  STEEL_FRAMING_AND_BOARD: { rate: 500.0, description: 'Steel Framing and Board' },
  BOARD_ONLY: { rate: 300.0, description: 'Board Only' },
  SECOND_MECH_ROOM: { rate: 150.0, description: 'Second Mech Room' },
  FIRE_TAPING_MECH_ROOM_CEILING: { rate: 225.0, description: 'Fire Taping Mech Room, ceiling' },
  FIRE_TAPING_SECOND_MECH_ROOM: { rate: 100.0, description: 'Fire Taping Second Mech Room' },
}
