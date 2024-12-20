import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AEAdmissionForm } from "./AEAdmissionForm";
import { StorageClient } from "./storage";
import { AEAdmission, OperationRecord, SignOutRecord } from "./types";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ActivitySummary } from "./ActivitySummary";
import { OperationForm } from "./OperationForm";

export const useStorageClient = () => new StorageClient();

function App() {
  const client = useStorageClient();
  const [record, setRecord] = useState<SignOutRecord | null>(null);
  const reloadData = useCallback(() => {
    setRecord(client.getSignOutRecord());
  }, [client, setRecord]);
  useEffect(() => {
    reloadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const saveAdmission = useCallback(
    (admission: AEAdmission) => {
      client.saveAEAdmission(admission);
      reloadData();
    },
    [reloadData, client],
  );

  const saveOperation = useCallback(
    (operation: OperationRecord) => {
      client.saveOperation(operation);
      reloadData();
    },
    [reloadData, client],
  );

  const saveDischarge = useCallback(
    (consult: AEAdmission) => {
      client.saveAEDischarge(consult);
      reloadData();
    },
    [reloadData, client],
  );

  const saveConsult = useCallback(
    (consult: AEAdmission) => {
      client.saveAEConsult(consult);
      reloadData();
    },
    [reloadData, client],
  );

  const saveReferral = useCallback(
    (referral: AEAdmission) => {
      client.saveReferral(referral);
      reloadData();
    },
    [reloadData, client],
  );

  const saveInHouseConsult = useCallback(
    (inHouseConsult: AEAdmission) => {
      client.saveInHouseConsult(inHouseConsult);
      reloadData();
    },
    [reloadData, client],
  );

  const saveFloorIssue = useCallback(
    (floorIssue: AEAdmission) => {
      client.saveFloorIssue(floorIssue);
      reloadData();
    },
    [reloadData, client],
  );

  return (
    <div className="bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 bg-white">
        <h2 className="text-2xl text-gray-700 p-1 pt-8 pb-2">
          {" "}
          Electronic Surgical Signout Entry
        </h2>
        <hr />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ActivitySummary record={record} reloadData={reloadData} />
              }
            />
            <Route
              path="/new-admission"
              element={
                <AEAdmissionForm
                  onSave={saveAdmission}
                  type={"AEAdmissions"}
                  reloadData={reloadData}
                />
              }
            ></Route>
            <Route
              path="/new-operation"
              element={
                <OperationForm onSave={saveOperation} reloadData={reloadData} />
              }
            ></Route>

            <Route
              path="/new-discharge"
              element={
                <AEAdmissionForm
                  onSave={saveDischarge}
                  title={"Add A&E Discharge"}
                  type="AEDischarges"
                  reloadData={reloadData}
                />
              }
            ></Route>

            <Route
              path="/new-consult"
              element={
                <AEAdmissionForm
                  onSave={saveConsult}
                  title={"Add A&E Consult"}
                  type="AEConsults"
                  reloadData={reloadData}
                />
              }
            ></Route>

            <Route
              path="/new-referral"
              element={
                <AEAdmissionForm
                  onSave={saveReferral}
                  title={"Add Referral to Medical Team"}
                  type="referrals"
                  reloadData={reloadData}
                />
              }
            ></Route>

            <Route
              path="/new-in-house-consult"
              element={
                <AEAdmissionForm
                  onSave={saveInHouseConsult}
                  title={"Add In-House Consult"}
                  type="inHouseConsults"
                  reloadData={reloadData}
                />
              }
            ></Route>

            <Route
              path="/new-floor-issue"
              element={
                <AEAdmissionForm
                  onSave={saveFloorIssue}
                  title={"Add Floor Issuse"}
                  type="floorIssues"
                  reloadData={reloadData}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
