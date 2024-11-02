import {
  AdmissionRecords,
  AEAdmission,
  OperationRecord,
  SignOutRecord,
} from "./types";

// These should really be async
interface StorageAPI {
  saveAEAdmission: (admission: AEAdmission) => void;
  getSignOutRecord: () => SignOutRecord;
  setConsultant: (name: string) => void;
  setSHO: (name: string) => void;
  setRegistrar: (name: string) => void;
  saveHduOrIcuAdmission: (admission: AEAdmission) => void;
  saveAEDischarge: (discharge: AEAdmission) => void;
  saveAEConsult: (consult: AEAdmission) => void;
  saveReferral: (referral: AEAdmission) => void;
  saveInHouseConsult: (consult: AEAdmission) => void;
  saveFloorIssue: (issue: AEAdmission) => void;
  saveOperation: (operation: OperationRecord) => void;
}

const SIGN_OUT_RECORD_KEY = "signOutRecord";

export class StorageClient implements StorageAPI {
  private getCurrentRecord(): SignOutRecord {
    const record = localStorage.getItem(SIGN_OUT_RECORD_KEY);
    if (record) {
      return JSON.parse(record);
    } else {
      return {
        consultant: "",
        sho: "",
        registrar: "",
        AEAdmissions: [],
        HduOrIcuAdmissions: [],
        operations: [],
        AEDischarges: [],
        AEConsults: [],
        referrals: [],
        inHouseConsults: [],
        floorIssues: [],
      };
    }
  }

  saveHduOrIcuAdmission(admission: AEAdmission): void {
    this.saveRecord(
      { ...admission, plan: { ...admission.plan, isHduOrIcuAdmission: true } },
      "HduOrIcuAdmissions",
    );
  }

  saveAEDischarge(discharge: AEAdmission): void {
    this.saveRecord(discharge, "AEDischarges");
  }

  saveAEConsult(consult: AEAdmission): void {
    this.saveRecord(consult, "AEConsults");
  }

  saveReferral(referral: AEAdmission): void {
    this.saveRecord(referral, "referrals");
  }

  saveInHouseConsult(consult: AEAdmission): void {
    this.saveRecord(consult, "inHouseConsults");
  }

  saveFloorIssue(issue: AEAdmission): void {
    this.saveRecord(issue, "floorIssues");
  }

  saveAEAdmission(admission: AEAdmission): void {
    this.saveRecord(admission, "AEAdmissions");
  }

  private saveRecord(record: AEAdmission, type: keyof AdmissionRecords): void {
    const currentRecord = this.getCurrentRecord() as AdmissionRecords;
    // the ID field is the patient ID which I've used here for convenience but probably a uuid for each event is needed
    const existingIndex = currentRecord[type].findIndex(
      (it) => it.id === record.id,
    );
    if (existingIndex >= 0) {
      currentRecord[type][existingIndex] = record;
    } else {
      currentRecord[type].push(record);
    }
    localStorage.setItem(SIGN_OUT_RECORD_KEY, JSON.stringify(currentRecord));
  }

  saveOperation(operation: OperationRecord): void {
    const currentRecord = this.getCurrentRecord();
    // the ID field is the patient ID which I've used here for convenience but probably a uuid for each event is needed
    const existingIndex = currentRecord.operations.findIndex(
      (it) => it.id === operation.id,
    );
    if (existingIndex >= 0) {
      currentRecord.operations[existingIndex] = operation;
    } else {
      currentRecord.operations.push(operation);
    }
    localStorage.setItem(SIGN_OUT_RECORD_KEY, JSON.stringify(currentRecord));
  }

  getSignOutRecord(): SignOutRecord {
    return this.getCurrentRecord();
  }

  setConsultant(name: string) {
    const currentRecord = this.getCurrentRecord();
    currentRecord.consultant = name;
    localStorage.setItem(SIGN_OUT_RECORD_KEY, JSON.stringify(currentRecord));
  }

  setSHO(name: string) {
    const currentRecord = this.getCurrentRecord();
    currentRecord.sho = name;
    localStorage.setItem(SIGN_OUT_RECORD_KEY, JSON.stringify(currentRecord));
  }

  setRegistrar(name: string) {
    const currentRecord = this.getCurrentRecord();
    currentRecord.registrar = name;
    localStorage.setItem(SIGN_OUT_RECORD_KEY, JSON.stringify(currentRecord));
  }
}
