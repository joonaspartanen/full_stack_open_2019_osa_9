import { Guid } from "guid-typescript";

import patients from '../../data/patients';

import { PatientPublicProperties, Patient, NewPatient } from '../types';

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

export default {
    getPatientsPublicProperties,
    addPatient
};