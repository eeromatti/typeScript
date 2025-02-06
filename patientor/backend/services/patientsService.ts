import { NonSensitivePatients, NewPatientEntry, PatientEntry, Entry } from '../types';
import { v1 as uuidv1 } from 'uuid';
import patients from '../data/patients';

const getPatients = (): PatientEntry[] => {
    return patients;
  };

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
        id: uuidv1(),
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (object: Entry, id:string) => {
    const patient = patients.find((patient) => patient.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    patient?.entries?.push(object);
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    addEntry
};
