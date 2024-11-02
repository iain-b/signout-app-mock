import { StaffTable } from "./StaffTable";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React from "react";
import { AEAdmission, SignOutRecord } from "./types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AdmissionTable = function AdmissionTable({
  records,
  title = "A&E Admissions",
  newItemPath = "new-admission",
}: {
  records: AEAdmission[] | undefined;
  title?: string;
  newItemPath?: string;
}) {
  const navigate = useNavigate();
  const today = dayjs();
  return (
    <TableContainer component={Paper} className="w-full border" elevation={0}>
      <Typography variant="h6" component="div" className="text-grey-700 p-4">
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%" }}>
              <b className="text-gray-700">Name</b>
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
              <b className="text-gray-700">D.O.B</b>
            </TableCell>
            <TableCell sx={{ width: "50%" }}>
              <b className="text-gray-700">Diagnosis</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records?.map((admission, index) => (
            <TableRow
              key={admission.id}
              className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
              onClick={() =>
                navigate(`/${newItemPath}?patientId=${admission.id}`)
              }
            >
              <TableCell>{admission.name}</TableCell>
              <TableCell>
                {today.diff(dayjs(admission.dateOfBirth), "year").toString()}
              </TableCell>
              <TableCell>{admission.admittingDiagnosis}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OperationsTable = function OperationsTable({
  record,
}: {
  record: SignOutRecord | null;
}) {
  const navigate = useNavigate();
  const today = dayjs();
  return (
    <TableContainer component={Paper} className="w-full border" elevation={0}>
      <Typography variant="h6" component="div" className="text-grey-700 p-4">
        Operations
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%" }}>
              <b className="text-gray-700">Name</b>
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
              <b className="text-gray-700">D.O.B</b>
            </TableCell>
            <TableCell sx={{ width: "50%" }}>
              <b className="text-gray-700">Procedure</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record?.operations?.map((operation, index) => (
            <TableRow
              key={operation.id}
              className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
              onClick={() =>
                navigate(`/new-operation?patientId=${operation.id}`)
              }
            >
              <TableCell>{operation.name}</TableCell>
              <TableCell>
                {today.diff(dayjs(operation.dateOfBirth), "year").toString()}
              </TableCell>
              <TableCell>{operation.procedure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-operation")}
                  >
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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-discharge")}
                  >
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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-consult")}
                  >
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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-referral")}
                  >
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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-in-house-consult")}
                  >
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
                  <IconButton
                    color="default"
                    aria-label="add"
                    size="small"
                    onClick={() => navigate("/new-floor-issue")}
                  >
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-1 col-span-2">
        <OperationsTable record={record} />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable records={record?.AEAdmissions} />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable
          records={record?.AEDischarges}
          title="A&E Discharges"
          newItemPath="new-discharge"
        />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable
          records={record?.AEConsults}
          title="A&E Consults"
          newItemPath="new-consult"
        />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable
          records={record?.referrals}
          title="Referrals to Medical Team"
          newItemPath="new-referral"
        />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable
          records={record?.inHouseConsults}
          title="In House Consults"
          newItemPath="new-in-house-consult"
        />
      </div>
      <div className="p-1 col-span-2">
        <AdmissionTable
          records={record?.floorIssues}
          title="Floor Issues"
          newItemPath="new-floor-issues"
        />
      </div>
    </div>
  );
};
