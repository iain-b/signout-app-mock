import React from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Autocomplete, Button, Switch, TextField } from "@mui/material";
import { AEAdmission } from "./types";
import { useNavigate } from "react-router-dom";

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
}: {
  onSave: (admission: AEAdmission) => void;
}) => {
  const { register, handleSubmit, control } = useForm<AEAdmission>({
    defaultValues: {
      admittingDiagnosis: "",
      name: "",
      id: "",
      location: "",
      dateOfBirth: "",
      background: [],
      imaging: "",
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
      labs: { wcc: 0, crp: 0 },
    },
    mode: "onBlur",
  });
  const [hasAnticoagulant, hasAntiplatelet] = useWatch({
    control,
    name: ["hasAnticoagulant", "hasAntiplatelet"],
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AEAdmission> = (data) => {
    console.log(data);
    onSave(data);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-gray-700">Add A&E Admission</h3>
      <div className="grid grid-cols-12 gap-y-3">
        <div className="lg:col-span-3 col-span-3">
          <label htmlFor="patient-name">Name</label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <TextField
            id="patient-name"
            size="small"
            variant="outlined"
            {...register("name")}
          />
        </div>

        <div className="lg:col-span-3 col-span-3">
          <label htmlFor="location">Patient ID</label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <TextField size="small" variant="outlined" {...register("id")} />
        </div>

        <div className="lg:col-span-3 col-span-3">
          <label htmlFor="location">Date of Birth</label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <TextField
            size="small"
            variant="outlined"
            {...register("dateOfBirth")}
          />
        </div>

        <div className="lg:col-span-3 col-span-3">
          <label htmlFor="location">Location</label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <TextField
            size="small"
            variant="outlined"
            {...register("location")}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="admitting-diagnosis">Admitting Diagnosis</label>
        </div>
        <div className="col-span-9">
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
        <div className="col-span-3">
          <label htmlFor="location">Background</label>
        </div>
        <div className="col-span-9">
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
        <div className="col-span-3">
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

        <div className="col-span-3">
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
        <div className="col-span-3">
          <label htmlFor="location">O/E</label>
        </div>
        <div className="col-span-9">
          <TextField
            className="w-full"
            size="small"
            variant="outlined"
            {...register("oe")}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="location">Imaging</label>
        </div>
        <div className="lg:col-span-3 col-span-9 pr-4">
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
        <div className="col-span-3">
          <label className="pl-1" htmlFor="isImagingFinalised">
            Finalised Report
          </label>
        </div>
        <div className="lg:col-span-3 col-span-9">
          <Switch {...register("isImagingFinalised")} />
        </div>
        <div className="lg:col-span-3 col-span-3">
          <label>Labs</label>
        </div>
        <div className="lg:col-span-1 col-span-3">
          <label>WCC</label>
        </div>
        <div className="lg:col-span-3 col-span-6">
          <TextField
            id="lab-wcc"
            size="small"
            variant="outlined"
            placeholder="WCC"
            inputProps={{ step: "0.01" }}
            type="number"
            {...register("labs.wcc")}
          />
        </div>
        <div className="lg:col-span-1 col-span-3 col-start-4">
          <label>CRP</label>
        </div>
        <div className="lg:col-span-3 col-span-6">
          <TextField
            id="lab-wcc"
            size="small"
            variant="outlined"
            placeholder="CRP"
            type="number"
            inputProps={{ step: "0.1" }}
            {...register("labs.crp")}
          />
        </div>
        <div className="col-span-3 lg:row-span-3 row-span-5">
          <label htmlFor="location">Plan</label>
        </div>
        <div className="col-span-9">
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
        <div className="col-span-9">
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
        <div className="col-span-12 w-full">
          <Button type="submit" variant="contained" color="primary">
            Save Admission
          </Button>
        </div>
      </div>
    </form>
  );
};
