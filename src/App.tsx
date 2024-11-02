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
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
