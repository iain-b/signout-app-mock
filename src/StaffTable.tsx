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
              <MenuItem value="Augustus Caesar">Augustus Caesar</MenuItem>
              <MenuItem value="Marcus Aurelius">Marcus Aurelius</MenuItem>
              <MenuItem value="Trajan">Trajan</MenuItem>
              <MenuItem value="Justinian">Justinian</MenuItem>
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
              label="Registrar"
            >
              <MenuItem value="Caligula">Caligula</MenuItem>
              <MenuItem value="Nero">Nero</MenuItem>
              <MenuItem value="Tiberius">Tiberius</MenuItem>
              <MenuItem value="Agrippina">Agrippina</MenuItem>
              <MenuItem value="Claudius">Claudius</MenuItem>
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
              label="SHO"
            >
              <MenuItem value="Civis 1">Civis 1</MenuItem>
              <MenuItem value="Civis 2">Civis 2</MenuItem>
              <MenuItem value="Civis 3">Civis 3</MenuItem>
              <MenuItem value="Civis 4">Civis 4</MenuItem>
              <MenuItem value="Civis 5">Civis 5</MenuItem>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
