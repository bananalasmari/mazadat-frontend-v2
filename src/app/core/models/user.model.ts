export interface UserDto {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  nin: string;
  firstName: string;
  familyName: string;
  fatherName: string;
  grandFatherName: string;
  gender: string;
  nationality: string;
  preferredLanguage: string;
  lang: string;
  avatar: string;
  accountBalance: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  roles: RoleDto[];
  organizations: OrganizationDto[];
  clients: ClientDto[];
}

export interface RoleDto {
  id: number;
  name: string;
  descAr: string;
  descEn: string;
}

export interface OrganizationDto {
  id: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
}

export interface ClientDto {
  id: number;
  clientMOINumber: number;
  crNumber: number;
  crName: string;
  displayNameAr: string;
  displayNameEn: string;
  organizationName: string;
  areCEO: boolean;
  telephone1: string;
  telephone2: string;
  active: boolean;
  type: string;
  moiNumber: string;
  crIssueDate: number[];
  crExpiryDate: number[];
  crStatusAr: string;
  crStatusEn: string;
  phoneNumber: string;
  faxNumber: string;
  businessType: string;
  location: string;
  taxRegistrationNumber: string;
  isTaxRegistered: boolean;
  bankCode: string;
  bankNameAr: string;
  bankNameEn: string;
  iban: string;
  buildingNumber: string;
  additionalNumber: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
  country: string;
  isBroker?: boolean;
  salesBrokerEnabledByAdmin?: boolean;
  authorizeReceiveFunds?: boolean;
  brokerAllowedToReceiveFunds?: boolean;
  hasBrokerageActivityInCr?: boolean;
  canShowBrokerageSelection?: boolean;
  hasActiveVehicles?: boolean;
  hasActivePrivateAgreement?: boolean;
}
