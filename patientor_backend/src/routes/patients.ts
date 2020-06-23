import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsPublicProperties());
});

router.get('/:id', (req, res) => {
    res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});

export default router;