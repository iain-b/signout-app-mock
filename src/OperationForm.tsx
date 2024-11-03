import React, { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import { OperationRecord } from "./types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStorageClient } from "./App";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function valueOrFreeText(
  newValue: string | string[] | null,
): string | string[] | null {
  const otherOptionValue = "Other (freetext)";
  if (Array.isArray(newValue)) {
    return newValue.filter((it) => it !== otherOptionValue);
  }
  return newValue === otherOptionValue ? "" : newValue;
}

export const OperationForm = ({
  onSave,
  reloadData,
}: {
  onSave: (operation: OperationRecord) => void;
  reloadData: () => void;
}) => {
  const { register, handleSubmit, control, reset } = useForm<OperationRecord>({
    defaultValues: {
      name: "",
      id: "",
      location: "",
      dateOfBirth: new Date().toString(),
      plan: "",
      procedure: "",
      findings: "",
    },
    mode: "onBlur",
  });
  const [patientId] = useWatch({
    control,
    name: ["id"],
  });
  const navigate = useNavigate();
  const client = useStorageClient();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const patientIdFromURL = searchParams.get("patientId");
    if (patientIdFromURL && patientIdFromURL !== patientId) {
      reset(
        client
          .getSignOutRecord()
          .operations.find((it) => it.id === patientIdFromURL),
      );
    }
  }, [searchParams, client, patientId, reset]);

  const onSubmit: SubmitHandler<OperationRecord> = (data) => {
    console.log(data);
    onSave(data);
    navigate("/");
  };

  const onDelete = useCallback(() => {
    const idToDelete = searchParams.get("patientId");
    if (idToDelete) {
      const value = client.getSignOutRecord();
      const filteredList = value.operations.filter(
        (it) => it.id !== idToDelete,
      );
      client.setSignOutRecord({ ...value, operations: filteredList });
    }
    reloadData();
    navigate("/");
  }, [searchParams, navigate, client, reloadData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-gray-700 pt-4 pb-4">Add Operation</h3>
      <div className="grid grid-cols-12 gap-y-3">
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="patient-name">Name</label>
        </div>
        <div className="lg:col-span-3 col-span-12 lg:pr-4">
          <TextField
            className="w-full"
            id="patient-name"
            size="small"
            variant="outlined"
            {...register("name", { required: true })}
          />
        </div>

        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Patient ID</label>
        </div>
        <div className="lg:col-span-3 col-span-12">
          <TextField
            className="w-full"
            size="small"
            variant="outlined"
            {...register("id", { required: true })}
          />
        </div>

        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Date of Birth</label>
        </div>
        <div className="lg:col-span-3 col-span-12 lg:pr-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      className: "w-full",
                      size: "small",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Location</label>
        </div>
        <div className="lg:col-span-3 col-span-12">
          <TextField
            size="small"
            variant="outlined"
            className="w-full"
            {...register("location")}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="admitting-diagnosis">Procedure</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <Controller
            name="procedure"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={[
                  "Laparosopic Appendectomy",
                  "Abscess - incision & drainage",
                  "Laparotomy",
                  "Acute hernia - repair",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type procedure"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">findings</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <TextField
            className="w-full"
            size="small"
            variant="outlined"
            {...register("findings")}
          />
        </div>

        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Plan</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <TextField
            className="w-full"
            size="small"
            variant="outlined"
            {...register("plan")}
          />
        </div>

        <div className="col-span-12 w-full">
          <span>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </span>
          <span className="ml-2">
            <Button
              type="button"
              variant="outlined"
              color="info"
              onClick={onDelete}
            >
              Delete
            </Button>
          </span>
        </div>
      </div>
    </form>
  );
};
