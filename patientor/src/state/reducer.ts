import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "SET_CURRENT_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      if (state.currentPatient === null) {
        return state;
      }

      return {
        ...state,
        currentPatient: {
          ...state.currentPatient,
          entries: [...state.currentPatient.entries, action.payload]
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const setCurrentPatient = (currentPatient: Patient): Action => {
  return {
    type: "SET_CURRENT_PATIENT",
    payload: currentPatient,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const addEntry = (entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry
  };
};