import { AEAdmission, SignOutRecord } from "./types";

// These should really be async
interface StorageAPI {
  saveAEAdmission: (admission: AEAdmission) => void;
  getSignOutRecord: () => SignOutRecord;
  setConsultant: (name: string) => void;
  setSHO: (name: string) => void;
  setRegistrar: (name: string) => void;
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

  saveAEAdmission(admission: AEAdmission): void {
    const currentRecord = this.getCurrentRecord();
    // the ID field is the patient ID which I've used here for convenience but probably a uuid for each event is needed
    const existingIndex = currentRecord.AEAdmissions.findIndex(
      (it) => it.id === admission.id,
    );
    if (existingIndex >= 0) {
      currentRecord.AEAdmissions[existingIndex] = admission;
    } else {
      currentRecord.AEAdmissions.push(admission);
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
