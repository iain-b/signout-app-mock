export type PatientDetails = {
  name: string;
  id: string;
  location: string;
  dateOfBirth: string;
};

export type AEAdmission = PatientDetails & {
  admittingDiagnosis: string;
  background: string[];
  hasAnticoagulant: boolean;
  anticoagulantUsed?: string;
  hasAntiplatelet: boolean;
  antiplateletUsed?: string;
  oe: string;
  imaging: string;
  imagingSummary: string;
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

export type OperationRecord = PatientDetails & {
  procedure: string;
  findings: string;
  plan: string;
};

export type SignOutRecord = {
  consultant: string;
  sho: string;
  registrar: string;
  AEAdmissions: AEAdmission[];
  HduOrIcuAdmissions: AEAdmission[];
  operations: OperationRecord[];
  AEDischarges: object[];
  AEConsults: object[];
  referrals: object[];
  inHouseConsults: object[];
  floorIssues: object[];
};
