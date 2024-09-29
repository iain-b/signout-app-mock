import { StaffTable } from "./StaffTable";
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React from "react";
import { SignOutRecord } from "./types";
import { useNavigate } from "react-router-dom";

export const ActivitySummary = ({
  record,
  reloadData,
}: {
  record: SignOutRecord | null;
  reloadData: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2">
      <div className="p-1 col-span-2 lg:col-span-1">
        <StaffTable record={record} onChange={reloadData} />
      </div>
      <div className="p-1 col-span-2 lg:col-span-1">
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <tbody>
              <tr className="bg-blue-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Operations
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.operations?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  A + E Admissions
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.AEAdmissions?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-admission")}
                  >
                    <AddIcon />
                  </IconButton>
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
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-blue-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  A + E Discharges
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.AEDischarges?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  A + E Consults
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.AEConsults?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-blue-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Referrals to Medical Team
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.referrals?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  In House Consults
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.inHouseConsults?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              <tr className="bg-blue-50">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Floor Issues
                </th>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {record?.floorIssues?.length ?? 0}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 text-right">
                  <IconButton color="default" aria-label="add" size="small">
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
