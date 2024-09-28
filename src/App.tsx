import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AEAdmissionForm } from "./AEAdmissionForm";
import { StorageClient } from "./storage";
import { AEAdmission, SignOutRecord } from "./types";
import { set } from "react-hook-form";

const useStorageClient = () => new StorageClient();

function App() {
  const client = useStorageClient();
  const [record, setRecord] = useState<SignOutRecord | null>(null);
  const reloadData = useCallback(() => {
    setRecord(client.getSignOutRecord());
  }, [client, setRecord]);
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
        <div className="grid grid-cols-2">
          <div className="p-1">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <tbody>
                <tr className="bg-blue-50 border-b">
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                    Consultant
                  </th>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {record?.consultant}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                    Registrar
                  </th>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {record?.registrar}
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                    SHO
                  </th>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {record?.sho}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-1">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <tbody>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      Operations
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.operations?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      A + E Admissions
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.AEAdmissions?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      ICU/HDU Admissions
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.AEAdmissions?.filter(
                        (it) => it.plan?.isHduOrIcuAdmission,
                      ).length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      A + E Discharges
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.AEDischarges?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      A + E Consults
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.AEConsults?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-blue-50 border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      Referrals to Medical Team
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.referrals?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      In House Consults
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.inHouseConsults?.length ?? 0}
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                      Floor Issues
                    </th>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {record?.floorIssues?.length ?? 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-2">
            <AEAdmissionForm onSave={saveAdmission} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
