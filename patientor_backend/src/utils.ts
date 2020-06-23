/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender, Entry, Discharge, NewEntry, HealthCheckRating, SickLeaveDates, Diagnosis } from './types';
import diagnoses from '../data/diagnoses';

export const toNewPatient = (object: { name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string; }): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };

    return newPatient;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export const toNewEntry = (object: {
    type: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>,
    discharge?: Discharge,
    healthCheckRating?: HealthCheckRating,
    sickLeave?: SickLeaveDates,
    employerName?: string;
}): NewEntry => {
    const type: Entry["type"] = parseEntryType(object.type);
    const description: string = parseDescription(object.description);
    const date: string = parseDate(object.date);
    const specialist: string = parseSpecialist(object.specialist);
    let diagnosisCodes: Array<Diagnosis['code']>;
    if (object.diagnosisCodes) {
        diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    } else {
        diagnosisCodes = [];
    }

    switch (type) {
        case "Hospital":
            if (!object.discharge) {
                throw new Error('Missing entry discharge data');
            }
            const discharge: Discharge = parseDischarge(object.discharge);
            return { type, description, date, specialist, diagnosisCodes, discharge };
        case "HealthCheck":
            if (object.healthCheckRating === undefined) {
                throw new Error('Missing entry health check rating data');
            }
            const healthCheckRating: HealthCheckRating = parseHealthCheckRating(object.healthCheckRating);
            return { type, description, date, specialist, diagnosisCodes, healthCheckRating };
        case "OccupationalHealthcare":
            if (!object.employerName) {
                throw new Error('Missing entry employer name');
            }

            if (!object.sickLeave) {
                throw new Error('Missing entry sick leave dates');
            }

            const employerName: string = parseName(object.employerName);
            const sickLeave: SickLeaveDates = parseSickLeaveDates(object.sickLeave);
            return { type, description, date, specialist, diagnosisCodes, employerName, sickLeave };
        default:
            throw new Error('Invalid entry type');
    }
};

const parseEntryType = (type: any): Entry["type"] => {
    if (!type || !isString(type) || !(type === 'Hospital' || type === 'OccupationalHealthcare' || type === 'HealthCheck')) {
        throw new Error('Incorrect or missing entry type');
    }
    return type;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseDiagnosisCodes = (diagnosisCodes: any[]): Array<Diagnosis['code']> => {
    const availableCodes = diagnoses.map((d: Diagnosis) => d.code);

    if (!diagnosisCodes) {
        throw new Error('Incorrect or missing diagnosis codes');
    }

    diagnosisCodes.forEach((code: any) => {
        if (!isString(code)) {
            throw new Error('Incorrect or missing diagnosis codes');
        }
        if (!availableCodes.includes(code)) {
            throw new Error('Incorrect or missing diagnosis codes');
        }
    });
    return diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSpecialist = (specialistName: any): string => {
    if (!specialistName || !isString(specialistName)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialistName;
};

const parseDischarge = (discharge: { date: string, criteria: string; }): Discharge => {
    if (!discharge.date || !isDate(discharge.date)) {
        throw new Error('Incorrect or missing discharge date');
    }
    if (!discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge criteria');
    }
    return discharge;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (rating === undefined) {
        throw new Error('Incorrect or missing health check rating');
    }
    try {
        const healthCheckRating = Number(rating);
        if (!isHealthCheckRating(healthCheckRating)) {
            throw new Error('Incorrect or missing health check rating');
        }
        return healthCheckRating;
    } catch (error) {
        throw new Error('Incorrect or missing health check rating');
    }
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseSickLeaveDates = (dates: { startDate: string, endDate: string; }): SickLeaveDates => {
    if (!dates.startDate || !isDate(dates.startDate) || !dates.endDate || !isDate(dates.endDate)) {
        throw new Error('Incorrect or missing entry sick leave dates');
    }
    return dates;
};