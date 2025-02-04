import { SignOutRecord } from "./types";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import { useStorageClient } from "./App";

export const StaffTable = ({
  record,
  onChange,
}: {
  record: SignOutRecord | null;
  onChange: () => void;
}) => {
  const client = useStorageClient();

  return (
    <Table className="min-w-full border-collapse border border-gray-300">
      <TableBody>
        <TableRow className="bg-blue-50 border-b">
          <TableCell className="px-6 py-3 text-left text-sm font-bold text-gray-700 w-1/3">
            Consultant
          </TableCell>
          <TableCell className="px-6 py-3 text-sm text-gray-900 w-2/3">
            <Select
              className="w-full"
              size="small"
              value={record?.consultant || ""}
              onChange={(e) => {
                client.setConsultant(e.target.value);
                onChange();
              }}
            >
              <MenuItem value="Mr Jurgen Mulsow">Mr Jurgen Mulsow</MenuItem>
              <MenuItem value="Prof Conor Shields">Prof Conor Shields</MenuItem>
              <MenuItem value="Prof Ann Brannigan">Prof Ann Brannigan</MenuItem>
              <MenuItem value="Ms Ailin Rogers">Ms Ailin Rogers</MenuItem>
              <MenuItem value="Prof Ronan Cahill">Prof Ronan Cahill</MenuItem>
              <MenuItem value="Mr Gerry McEntee">Mr Gerry McEntee</MenuItem>
              <MenuItem value="Mr John Conneelly">Mr John Conneelly</MenuItem>
            </Select>
          </TableCell>
        </TableRow>
        <TableRow className="bg-white border-b">
          <TableCell className="px-6 py-3 text-left text-sm font-bold text-gray-700">
            Registrar
          </TableCell>
          <TableCell className="px-6 py-3 text-sm text-gray-900">
            <Select
              className="w-full"
              size="small"
              value={record?.registrar || ""}
              onChange={(e) => {
                client.setRegistrar(e.target.value);
                onChange();
              }}
            >
              <MenuItem value="Lauren O'Connell">Lauren O'Connell</MenuItem>
              <MenuItem value="Eanna Ryan">Eanna Ryan</MenuItem>
              <MenuItem value="Tim Harding">Tim Harding</MenuItem>
              <MenuItem value="Niall Hardy">Niall Hardy</MenuItem>
              <MenuItem value="Paddy Jordan">Paddy Jordan</MenuItem>
              <MenuItem value="Toby Pring">Toby Pring</MenuItem>
            </Select>
          </TableCell>
        </TableRow>
        <TableRow className="bg-blue-50">
          <TableCell className="px-6 py-3 text-left text-sm font-bold text-gray-700">
            SHO
          </TableCell>
          <TableCell className="px-6 py-3 text-sm text-gray-900">
            <Select
              className="w-full"
              size="small"
              value={record?.sho || ""}
              onChange={(e) => {
                client.setSHO(e.target.value);
                onChange();
              }}
            >
              <MenuItem value="Elaine Kelly">Elaine Kelly</MenuItem>
              <MenuItem value="Conor Aylward">Conor Aylward</MenuItem>
              <MenuItem value="Alexa O'Regan">Alexa O'Regan</MenuItem>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
