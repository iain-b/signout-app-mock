import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AEAdmissionForm } from "./AEAdmissionForm";
import { StorageClient } from "./storage";
import { AEAdmission, SignOutRecord } from "./types";
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { StaffTable } from "./StaffTable";
import { ActivitySummary } from "./ActivitySummary";

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
  return (
    <div className="bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 bg-white">
        <h2 className="text-2xl text-gray-700 p-1 pt-8 pb-2">
          {" "}
          MMUH Sugical Sign-Out
        </h2>
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
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
