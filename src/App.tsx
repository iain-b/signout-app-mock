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
          MMUH Surgical Sign-Out
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
              element={<AEAdmissionForm onSave={saveAdmission} />}
            ></Route>
            <Route
              path="/new-operation"
              element={<OperationForm onSave={saveOperation} />}
            ></Route>

            <Route
              path="/new-discharge"
              element={
                <AEAdmissionForm
                  onSave={saveDischarge}
                  title={"Add A&E Discharge"}
                />
              }
            ></Route>

            <Route
              path="/new-consult"
              element={
                <AEAdmissionForm
                  onSave={saveConsult}
                  title={"Add A&E Consult"}
                />
              }
            ></Route>

            <Route
              path="/new-referral"
              element={
                <AEAdmissionForm
                  onSave={saveReferral}
                  title={"Add Referral to Medical Team"}
                />
              }
            ></Route>

            <Route
              path="/new-in-house-consult"
              element={
                <AEAdmissionForm
                  onSave={saveInHouseConsult}
                  title={"Add In-House Consult"}
                />
              }
            ></Route>

            <Route
              path="/new-floor-issue"
              element={
                <AEAdmissionForm
                  onSave={saveFloorIssue}
                  title={"Add Floor Issuse"}
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
