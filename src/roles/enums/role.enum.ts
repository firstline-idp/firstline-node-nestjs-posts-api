export enum Role {
  ALL = 'all',
  FAN = 'fan',
  CREATOR = 'creator',
}

export const MIN_REQUIRED_ROLES: Role[] = [Role.FAN, Role.CREATOR];
