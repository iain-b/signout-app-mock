import React from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Autocomplete, Button, Input, Switch, TextField } from "@mui/material";

type Inputs = {
  admittingDiagnosis: string;
  name: string;
  id: string;
  location: string;
  dateOfBirth: string;
  background: string[];
  hasAnticoagulant: boolean;
  anticoagulantUsed?: string;
  hasAntiplatelet: boolean;
  antiplateletUsed?: string;
  oe: string;
  imaging: string;
  isImagingFinalised: boolean;
  plan: string;
};

export const AEAdmissionForm = () => {
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      admittingDiagnosis: "",
      name: "",
      id: "",
      location: "",
      dateOfBirth: "",
      background: [],
    },
  });
  const [hasAnticoagulant, hasAntiplatelet] = useWatch({
    control,
    name: ["hasAnticoagulant", "hasAntiplatelet"],
  });
  console.log("watches", hasAnticoagulant);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-gray-700">Add A&E Admission</h3>
      <div className="grid grid-cols-12 gap-y-2">
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
                ]}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
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
          <label htmlFor="patient-name">Name</label>
        </div>
        <div className="col-span-3">
          <TextField
            id="patient-name"
            size="small"
            variant="outlined"
            {...register("name")}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Patient ID</label>
        </div>
        <div className="col-span-3">
          <TextField size="small" variant="outlined" {...register("id")} />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Date of Birth</label>
        </div>
        <div className="col-span-3">
          <TextField
            size="small"
            variant="outlined"
            {...register("dateOfBirth")}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Location</label>
        </div>
        <div className="col-span-3">
          <TextField
            size="small"
            variant="outlined"
            {...register("location")}
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
                ]}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
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
        <div className="col-span-6">
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
        <div className="col-span-6">
          <Controller
            name="antiplateletUsed"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={["Aspirin", "Clopidogrel", "Prasugrel", "Ticagrelor"]}
                value={value}
                disabled={!hasAntiplatelet}
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
        <div className="col-span-3 pr-4">
          <Controller
            name="imaging"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={["CT", "US", "Other", "Awaited", "None planned"]}
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
          <label className="pl-1" htmlFor="isImagingFinalised">
            Finalised Report
          </label>
        </div>
        <div className="col-span-3">
          <Switch {...register("isImagingFinalised")} />
        </div>
        <div className="col-span-12">
          <Button type="submit" variant="contained" color="primary">
            Save Admission
          </Button>
        </div>
      </div>
    </form>
  );
};
