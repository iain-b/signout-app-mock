import React, { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Autocomplete, Button, Switch, TextField } from "@mui/material";
import { AdmissionRecords, AEAdmission } from "./types";
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

export const AEAdmissionForm = ({
  onSave,
  title = "Add A&E Admission",
  type = "AEAdmissions",
  reloadData,
}: {
  onSave: (admission: AEAdmission) => void;
  title?: string;
  type: keyof AdmissionRecords;
  reloadData: () => void;
}) => {
  const { register, handleSubmit, control, reset } = useForm<AEAdmission>({
    defaultValues: {
      admittingDiagnosis: "",
      name: "",
      id: "",
      location: "",
      dateOfBirth: new Date().toString(),
      background: [],
      imaging: "",
      imagingSummary: "",
      isImagingFinalised: false,
      oe: "",
      hasAnticoagulant: false,
      hasAntiplatelet: false,
      anticoagulantUsed: "",
      antiplateletUsed: "",
      anticipatedComplexDischarge: false,
      plan: {
        antibiotics: [],
        isIRPlanned: false,
        comments: "",
        fasting: false,
        isHduOrIcuAdmission: false,
        isSurgicalInterventionPlanned: false,
      },
      labs: { wcc: 0, crp: 0, amylase: 0 },
      labsPerformed: [],
    },
    mode: "onBlur",
  });
  const [hasAnticoagulant, hasAntiplatelet, patientId, labsPerformed] =
    useWatch({
      control,
      name: ["hasAnticoagulant", "hasAntiplatelet", "id", "labsPerformed"],
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
          [type].find((it) => it.id === patientIdFromURL),
      );
    }
  }, [searchParams, client, patientId, reset, type]);
  const onDelete = useCallback(() => {
    const idToDelete = searchParams.get("patientId");
    if (idToDelete) {
      const value = client.getSignOutRecord();
      const filteredList = value[type].filter((it) => it.id !== idToDelete);
      client.setSignOutRecord({ ...value, [type]: filteredList });
    }
    reloadData();
    navigate("/");
  }, [searchParams, navigate, client, type, reloadData]);

  const onSubmit: SubmitHandler<AEAdmission> = (data) => {
    console.log(data);
    onSave(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-gray-700 pt-4 pb-4">{title}</h3>
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
          <label htmlFor="admitting-diagnosis">Admitting Diagnosis</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <Controller
            name="admittingDiagnosis"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={[
                  "Appendicitis",
                  "Head injury",
                  "Pancreatitis",
                  "Cholecystitis",
                  "Abscess",
                  "Diverticulitis",
                  "Small bowel obstruction",
                  "Acute hernia",
                  "Obstructive jaundice_Cholangitis",
                  "Gastrointestinal perforation",
                  "Polytrauma",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type conditions"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Background</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <Controller
            name="background"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[
                  "DM",
                  "COPD",
                  "IHD",
                  "Atrial fibrillation",
                  "Smoker",
                  "C2H5OH excess",
                  "CVA",
                  "Cognitive impairment",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type conditions"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Anticoagulant</label>
        </div>
        <div className="col-span-3">
          <Switch {...register("hasAnticoagulant")} />
        </div>
        <div className="lg:col-span-6 col-span-9 col-start-4">
          <Controller
            name="anticoagulantUsed"
            control={control}
            disabled={!hasAnticoagulant}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!hasAnticoagulant}
                freeSolo
                options={[
                  "Apixaban",
                  "Rivaroxaban",
                  "Edoxaban",
                  "Dabigatran",
                  "Warfarin",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>

        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Antiplatelet</label>
        </div>
        <div className="col-span-3">
          <Switch {...register("hasAntiplatelet")} />
        </div>
        <div className="lg:col-span-6 col-span-9 col-start-4">
          <Controller
            name="antiplateletUsed"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={[
                  "Aspirin",
                  "Clopidogrel",
                  "Prasugrel",
                  "Ticagrelor",
                  "Other (freetext)",
                ]}
                value={value}
                disabled={!hasAntiplatelet}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">O/E</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <TextField
            className="w-full"
            size="small"
            variant="outlined"
            {...register("oe")}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label htmlFor="location">Imaging</label>
        </div>
        <div className="lg:col-span-3 col-span-12 pr-4">
          <Controller
            name="imaging"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={[
                  "CT",
                  "US",
                  "Awaited",
                  "None planned",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-3 col-span-6">
          <label className="pl-1" htmlFor="isImagingFinalised">
            Finalised Report
          </label>
        </div>
        <div className="lg:col-span-3 col-span-6">
          <Switch {...register("isImagingFinalised")} />
        </div>

        <div className="lg:col-span-9 lg:col-start-4 col-span-12 pr-4">
          <TextField
            id="imaging-summary"
            size="small"
            variant="outlined"
            className="w-full"
            placeholder="Imaging report summary"
            {...register("imagingSummary")}
          />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <label>Labs</label>
        </div>
        <div className="lg:col-span-1 col-span-3">
          <label>WCC</label>
        </div>
        <div className="lg:col-span-3 col-span-9 lg:pr-4">
          <TextField
            id="lab-wcc"
            size="small"
            variant="outlined"
            placeholder="WCC"
            className="w-full"
            inputProps={{ step: "0.01" }}
            type="number"
            {...register("labs.wcc")}
          />
        </div>
        <div className="lg:col-span-1 col-span-3">
          <label>CRP</label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <TextField
            id="lab-wcc"
            size="small"
            variant="outlined"
            placeholder="CRP"
            className="w-full"
            type="number"
            inputProps={{ step: "0.1" }}
            {...register("labs.crp")}
          />
        </div>
        <div className="lg:col-start-4 lg:col-span-9 col-span-12">
          <Controller
            name="labsPerformed"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                options={[
                  "Amylase",
                  "INR",
                  "Hb",
                  "Na",
                  "K",
                  "Lactate",
                  "RenalFx",
                  "LFT",
                  "HCG",
                ]}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select tests performed"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-start-4 lg:col-span-9 col-span-12">
          <div className="grid md:grid-cols-6 gap-1 grid-cols-3">
            {labsPerformed?.includes("Amylase") && (
              <>
                <div className="col-span-1">
                  <label>Amylase</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-amylase"
                    size="small"
                    variant="outlined"
                    placeholder="Amylase"
                    type="number"
                    {...register("labs.amylase")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("INR") && (
              <>
                <div className="col-span-1">
                  <label>INR</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-INR"
                    size="small"
                    variant="outlined"
                    placeholder="INR"
                    type="number"
                    {...register("labs.INR")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("Hb") && (
              <>
                <div className="col-span-1">
                  <label>hb</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-hb"
                    size="small"
                    variant="outlined"
                    placeholder="hb"
                    inputProps={{ step: "0.1" }}
                    type="number"
                    {...register("labs.hb")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("Na") && (
              <>
                <div className="col-span-1">
                  <label>Na</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-Na"
                    size="small"
                    variant="outlined"
                    placeholder="Na"
                    type="number"
                    {...register("labs.Na")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("K") && (
              <>
                <div className="col-span-1">
                  <label>K</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-K"
                    size="small"
                    variant="outlined"
                    placeholder="K"
                    type="number"
                    {...register("labs.K")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("Lactate") && (
              <>
                <div className="col-span-1">
                  <label>lactate</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-lactate"
                    size="small"
                    variant="outlined"
                    placeholder="lactate"
                    inputProps={{ step: "0.1" }}
                    type="number"
                    {...register("labs.lactate")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("RenalFx") && (
              <>
                <div className="col-span-1">
                  <label>Creatinine</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-creatinine"
                    size="small"
                    variant="outlined"
                    placeholder="Creatinine"
                    type="number"
                    {...register("labs.creatinine")}
                  />
                </div>
                <div className="col-span-1">
                  <label>Urea</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-urea"
                    size="small"
                    variant="outlined"
                    placeholder="Urea"
                    type="number"
                    {...register("labs.urea")}
                  />
                </div>
              </>
            )}

            {labsPerformed?.includes("LFT") && (
              <>
                <div className="col-span-1">
                  <label>Bilirubin</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-bilirubin"
                    size="small"
                    variant="outlined"
                    placeholder="Bilirubin"
                    type="number"
                    {...register("labs.bilirubin")}
                  />
                </div>
                <div className="col-span-1">
                  <label>ALT</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-alt"
                    size="small"
                    variant="outlined"
                    placeholder="ALT"
                    type="number"
                    {...register("labs.ALT")}
                  />
                </div>
                <div className="col-span-1">
                  <label>ALP</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-alp"
                    size="small"
                    variant="outlined"
                    placeholder="ALP"
                    type="number"
                    {...register("labs.ALP")}
                  />
                </div>
                <div className="col-span-1">
                  <label>GGT</label>
                </div>
                <div className="col-span-2">
                  <TextField
                    id="lab-ggt"
                    size="small"
                    variant="outlined"
                    placeholder="GGT"
                    type="number"
                    {...register("labs.GGT")}
                  />
                </div>
              </>
            )}
            {labsPerformed?.includes("HCG") && (
              <>
                <div className="col-span-1">
                  <label>HCG</label>
                </div>

                <div className="col-span-2">
                  <Switch {...register("labs.HCG")} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-12 lg:row-span-3 lg:col-span-3">
          <label htmlFor="location">Plan</label>
        </div>
        <div className="lg:col-span-9 col-span-12">
          <Controller
            name="plan.antibiotics"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                multiple
                options={[
                  "augmentin",
                  "tazocin",
                  "cipro",
                  "metro",
                  "cef",
                  "Other (freetext)",
                ]}
                value={value}
                onChange={(event, newValue) =>
                  onChange(valueOrFreeText(newValue))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select or type antibiotics"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            )}
          />
        </div>
        <div className="lg:col-span-1 col-span-6">
          <label htmlFor="location">Fasting</label>
        </div>
        <div className="lg:col-span-1 col-span-3">
          <Switch {...register("plan.fasting")} />
        </div>
        <div className="lg:col-span-2 col-span-6">
          <label htmlFor="location">IR Planned</label>
        </div>
        <div className="lg:col-span-1 col-span-3">
          <Switch {...register("plan.isIRPlanned")} />
        </div>
        <div className="lg:col-span-3 col-span-6">
          <label htmlFor="location">Surgical Intervention Planned</label>
        </div>
        <div className="lg:col-span-1 col-span-3">
          <Switch {...register("plan.isSurgicalInterventionPlanned")} />
        </div>
        <div className="lg:col-span-9 col-span-12">
          <TextField
            id="plan-comments"
            size="small"
            variant="outlined"
            className="w-full"
            placeholder="Comments"
            {...register("plan.comments")}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="location">ICU/HDU</label>
        </div>
        <div className="col-span-9">
          <Switch {...register("plan.isHduOrIcuAdmission")} />
        </div>
        <div className="col-span-3">
          <label htmlFor="location">Anticipated Complex Discharge</label>
        </div>
        <div className="col-span-9">
          <Switch {...register("anticipatedComplexDischarge")} />
        </div>
        <div className="col-span-12 w-full pb-4">
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
