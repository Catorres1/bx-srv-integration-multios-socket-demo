export const enum EnumDestinyType {
  BLUEPOINT = 'blue-point',
  ADDRESS = 'address',
}

export const DestinyType = {
  BLUEPOINT: 'blue-point',
  ADDRESS: 'address',
} as const;

export const enum EnumEmissionStatus {
  CREATED = 'CREATED',
  OS_ASSIGNED = 'OS_ASSIGNED',
  EMITTED = 'EMITTED',
  CONTAINER = 'CONTAINER',
}

export const EmissionStatus = {
  CREATED: 'CREATED',
  OS_ASSIGNED: 'OS_ASSIGNED',
  EMITTED: 'EMITTED',
  CONTAINER: 'CONTAINER',
} as const;

export const enum EnumEmissionSource {
  UNITARY = 'UNITARY',
  MASSIVE = 'MASSIVE',
  UNKNOWN = 'UNKNOWN',
}

export const EmissionSource = {
  UNITARY: 'UNITARY',
  MASSIVE: 'MASSIVE',
  UNKNOWN: 'UNKNOWN',
} as const;

export interface IEmissionWebhook {
  status: boolean;
  idEmission: string;
  massiveUUID?: string;
  massiveReference?: string;
  osChild: string[];
  osParent: string | null;
}

export interface ISocketEmissionStatusEvent {
  status: boolean;
  identifier: string;
  massiveReference: string;
  data: {
    osParent: string;
    osChild: string[];
  };
}
