import { Dayjs } from "dayjs";

export type AEAdmission = {
  admittingDiagnosis: string;
  name: string;
  id: string;
  location: string;
  dateOfBirth: string;
  background: string[];
  hasAnticoagulant: boolean;
  anticoagulantUsed?: string;
  hasAntiplatelet: boolean;
  antiplateletUsed?: string;
  oe: string;
  imaging: string;
  isImagingFinalised: boolean;
  labs: { wcc: number; crp: number };
  plan: {
    antibiotics: string[];
    fasting: boolean;
    isIRPlanned: boolean;
    isSurgicalInterventionPlanned: boolean;
    comments: string;
    isHduOrIcuAdmission: boolean;
  };
  anticipatedComplexDischarge: boolean;
};

export type SignOutRecord = {
  consultant: string;
  sho: string;
  registrar: string;
  AEAdmissions: AEAdmission[];
  HduOrIcuAdmissions: AEAdmission[];
  operations: object[];
  AEDischarges: object[];
  AEConsults: object[];
  referrals: object[];
  inHouseConsults: object[];
  floorIssues: object[];
};
