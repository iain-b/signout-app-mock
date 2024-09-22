import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  admittingDiagnosis: string;
  name: string;
  location: string;
  dateOfBirth: string;
};

export const AEAdmissionForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-gray-700">Add A&E Admission</h3>
      <div className="grid grid-cols-12 gap-y-2">
        <div className="col-span-3">
          <label htmlFor="admitting-diagnosis">Admitting Diagnosis</label>
        </div>
        <div className="col-span-9">
          <input
            id="admitting-diagnosis"
            list="diagnoses"
            className="form-input w-full"
            {...register("admittingDiagnosis")}
          />
          <datalist id="diagnoses">
            <option value="Appendicitis" />
            <option value="Head injury" />
            <option value="Pancreatitis" />
            <option value="Cholecystitis" />
            <option value="Abscess" />
            <option value="Diverticulitis" />
            <option value="Small bowel obstruction" />
            <option value="Acute hernia" />
            <option value="Obstructive jaundice_Cholangitis" />
            <option value="Gastrointestinal perforation" />
            <option value="Polytrauma" />
          </datalist>
        </div>
        <div className="col-span-3">
          <label htmlFor="patient-name">Name</label>
        </div>
        <div className="col-span-3">
          <input
            id="patient-name"
            className="form-input"
            {...register("name")}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Patient ID</label>
        </div>
        <div className="col-span-3">
          <input
            id="location"
            className="form-input"
            {...register("dateOfBirth")}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Date of Birth</label>
        </div>
        <div className="col-span-3">
          <input
            id="location"
            className="form-input"
            {...register("dateOfBirth")}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="location">Location</label>
        </div>
        <div className="col-span-3">
          <input
            id="location"
            className="form-input"
            {...register("location")}
          />
        </div>
      </div>
    </form>
  );
};
