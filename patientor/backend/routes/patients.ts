import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { Response } from 'express';
import { NonSensitivePatients } from '../types';
import { Entry } from '../types';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res:
    Response<NonSensitivePatients[]>) => {
        const patients = patientsService.getNonSensitivePatients();
        res.send(patients);
    });

router.get('/:id', (_req, res:
    Response<NonSensitivePatients>) => {
        const id = _req.params.id;
        const patients = patientsService.getPatients();
        const patient = patients.find(patient => patient.id === id);
        res.send(patient);
    }
);

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }});

router.post('/:id/entries', (req, res: Response<Entry>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry:Entry = req.body;
    const id = req.params.id;

    if (newEntry.type === "HealthCheck") {
        // console.log("HealthCheck"); 
        patientsService.addEntry(newEntry, id);  
    }
    if (newEntry.type === "OccupationalHealthcare") {
        // console.log("OccupationalHealthcare");
        patientsService.addEntry(newEntry, id);  
    }
    if (newEntry.type === "Hospital") {
        // console.log("Hospital");
        patientsService.addEntry(newEntry, id);  
    }
    res.send(newEntry);
});

export default router;