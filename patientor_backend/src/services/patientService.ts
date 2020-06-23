import { Guid } from "guid-typescript";

import patients from '../../data/patients';

import { PatientPublicProperties, Patient, NewPatient, NewEntry, Entry } from '../types';

const getPatientsPublicProperties = (): PatientPublicProperties[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: Guid.raw(),
        ...entry
    };

    patients.push(newPatient);

    return newPatient;
};

const getPatientById = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);

    if (patient === undefined) {
        throw new Error(`The patient with id ${id} was not found`);
    }
    return patient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
    const newEntry = {
        id: Guid.raw(),
        ...entry
    };

    const patient: Patient = getPatientById(patientId);

    patient.entries?.push(newEntry);

    return newEntry;
};

export default {
    getPatientsPublicProperties,
    getPatientById,
    addPatient,
    addEntry
};