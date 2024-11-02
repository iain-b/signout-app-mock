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
  operations: OperationRecord[];
} & AdmissionRecords;

// The semantics around "admission" are wrong but rolling with it for now
export type AdmissionRecords = {
  AEAdmissions: AEAdmission[];
  HduOrIcuAdmissions: AEAdmission[];
  AEDischarges: AEAdmission[];
  AEConsults: AEAdmission[];
  referrals: AEAdmission[];
  inHouseConsults: AEAdmission[];
  floorIssues: AEAdmission[];
};
