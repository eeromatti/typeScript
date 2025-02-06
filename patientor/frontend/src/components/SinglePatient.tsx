import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Entry, PatientEntry, Diagnosis, SickLeave, Discharge } from "../types";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import EntryBox from "./Entry";
import "../../styles.css";
import { v1 as uuidv1 } from 'uuid';

import { Button, TextField, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, SelectChangeEvent, Checkbox } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";


const SinglePatient = (): JSX.Element => {

    const [patient, setPatient] = useState<PatientEntry>();
    const [patientId, setPatientId] = useState<string>();
    const [diagnosesArray, setDiagnosesArray] = useState<string[]>([]);
    const [diagnosesObjects, setDiagnosesObjects] = useState<Diagnosis[]>([]);
    const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
    const [selectedDiagnosesCodes, setSelectedDiagnosesCodes] = useState<Array<string>>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [healthRating, setHealthRating] = useState<number>();
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("");
    

    //find id of the patient
    const { id } = useParams<{ id: string }>();
    if (!id) {
        throw new Error("Patient ID is missing");
    }


    // fetch patients and diagnoses
    useEffect(() => {
        if (!id) return;

        const fetchPatientAndDiagnosis = async () => {
            const data = await patientService.getOne(id);
            setPatientId(id)
            setPatient(data);
            const allDiagnoses: Diagnosis[] = await diagnosisService.getAll();
            setDiagnosesObjects(allDiagnoses)
            setDiagnosesArray(allDiagnoses.map((diagnosis) => diagnosis.name));
        };
        void fetchPatientAndDiagnosis();
    }, [id]);

    useEffect(() => {
        const object = diagnosesObjects.filter(diagnosis => selectedDiagnoses.includes(diagnosis.name))
        // console.log("object:", object)
        const array = object.map((diagnosis) => diagnosis.code)
        // console.log("array:", array)
        setSelectedDiagnosesCodes(array)
        
        }, [selectedDiagnoses])


    // handle diagnoses change
    const handleDiagnosesChange = (event: SelectChangeEvent<typeof selectedDiagnoses>) => {
        const {
          target: { value },
        } = event;
        setSelectedDiagnoses(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    // save entry
    const saveEntry = async () => {
        if (!patientId || !patient) return;
    
        let newEntry: Entry | null = null;
    
        if (formType === "HealthCheck") {
            newEntry = {
                id: uuidv1(),
                description,
                date: date || "",
                specialist,
                diagnosisCodes: selectedDiagnosesCodes,
                type: "HealthCheck",
                healthCheckRating: healthRating ?? 0
            };
        } else if (formType === "Occupational Healthcare") {
            newEntry = {
                id: uuidv1(),
                description,
                date: date || "",
                specialist,
                diagnosisCodes: selectedDiagnosesCodes,
                type: "OccupationalHealthcare",
                employerName,
                sickLeave: {
                    startDate: sickLeaveStart,
                    endDate: sickLeaveEnd
                }
            };
        } else if (formType === "Hospital") {
            newEntry = {
                id: uuidv1(),
                description,
                date: date || "",
                specialist,
                diagnosisCodes: selectedDiagnosesCodes,
                type: "Hospital",
                discharge: {
                    date: dischargeDate,
                    criteria
                }
            };
        }
    
        if (newEntry) {
            try {
                const addedEntry = await patientService.addEntry(newEntry, patientId);
                
                setPatient({
                    ...patient,
                    entries: patient.entries ? [...patient.entries, addedEntry] : [addedEntry]
                });
    
                setShowForm(false);
            } catch (error) {
                console.error("Error adding entry:", error);
            }
        }
    };
    
    
    return (
        <div>       
            {/* gender icons */}
            <div className="App">
                {patient?.gender === "male" ? (
                    <h2>{patient?.name} <Male /></h2>
                ):
                patient?.gender === "female" ? (
                    <h2>{patient?.name} <Female /></h2>
                ):
                patient?.gender === "other" ? (
                    <h2>{patient?.name} <Transgender /></h2>
                ):null}
            </div>

            {/* ssh and occupation */}
            <div>
                ssh: {patient?.ssn}<br/>
                occupation: {patient?.occupation}
                <br/>
            </div>
            
        {/* entry form starts*/}
            <div>

                {showForm ? (
                <div className="entries">
            {/* radio buttons */}
                    <div className="elementsWithinBox">
                        <h3>New {formType} entry</h3>
                        <input
                            type="radio"
                            name="form"
                            onClick={() => setFormType("HealthCheck")}/>
                        <label>Healthcheck</label>

                        <input
                            type="radio"
                            name="form"
                            onClick={() => setFormType("Occupational Healthcare")}/>
                        <label>Occupational healthcare</label>

                        <input
                            type="radio"
                            name="form"
                            onClick={() => setFormType("Hospital")}/>
                        <label>Hospital</label>
                    </div> 
                    
            {/* text fields */}
                    <TextField fullWidth id="description" label="Description" variant="outlined" onChange={(event) => setDescription(event.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                label="Basic date picker" 
                                onChange={(date: Dayjs | null) => setDate(date ? date.format('YYYY-MM-DD') : "")} 
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField fullWidth id="outlined-basic" label="Specialist" variant="outlined" onChange={(event) => setSpecialist(event.target.value)} />

            {/* diagnoses */}
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedDiagnoses}
                            onChange={handleDiagnosesChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                        >
                        {diagnosesArray.map((diagnosis) => (
                            <MenuItem key={diagnosis} value={diagnosis}>
                            <Checkbox checked={selectedDiagnoses.includes(diagnosis)} />
                            <ListItemText primary={diagnosis} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                
            {/* Health Check */}
                <div>
                   {formType === "HealthCheck" ? (
                        <FormControl fullWidth>
                            <InputLabel id="label-id">Health rating</InputLabel>
                            <Select
                                labelId="label-id"
                                value={healthRating ?? ""}
                                label="Health Rating"
                                onChange={(event: SelectChangeEvent<number | string>) => setHealthRating(event.target.value === "" ? undefined : Number(event.target.value))}
                            >
                                <MenuItem value={0}>Healthy</MenuItem>
                                <MenuItem value={1}>LowRisk</MenuItem>
                                <MenuItem value={2}>HighRisk</MenuItem>
                                <MenuItem value={3}>CriticalRisk</MenuItem>
                            </Select>
                        </FormControl>
                    ) :
                        null
                    }
                </div>
                
            {/* Occupational healthcare */}
                <div>
                    {formType === "Occupational Healthcare" ? (
                        <div>
                {/* Employer name */}
                            <TextField fullWidth id="employer" label="Employer name" variant="outlined" onChange={(event) => setEmployerName(event.target.value)}/>
                {/* Sickleave start */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Sickleave start date" 
                                        onChange={(date:Dayjs|null) => setSickLeaveStart(date ? date.format('YYYY-MM-DD') : "")} 
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                {/* Sickleave end */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Sickleave end date" 
                                        onChange={(date:Dayjs|null) => setSickLeaveEnd(date ? date.format('YYYY-MM-DD') : "")} 
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    ) :
                        null
                    }
                </div>

            {/* Hospital */}
                <div>
                    {formType === "Hospital" ? (
                        <div>
                {/* discharge date */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Discharge date" 
                                        onChange={(date:Dayjs|null) => setDischargeDate(date ? date.format('YYYY-MM-DD') : "")} 
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField fullWidth id="outlined-basic" label="Criteria" variant="outlined" onChange={(event) => setCriteria(event.target.value)} />   
                        </div>
                        
            
                    
                        

                    ): null}
                </div>

            {/* add button */}
                <Button variant="contained" color="primary" onClick={() => saveEntry()}>
                    Add
                </Button>

            </div>
            ):null}
            
        {/* entry form ends*/}

            {/* entries */}
                <div className="entries">
                    <h3>Entries</h3>
                        {patient?.entries?.map((entry: Entry) => (
                        <EntryBox key={entry.id} entry={entry} diagnosesObjects={diagnosesObjects}/>
                        ))}<br/>
                </div>

            {/* add new entry -button */}
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                Add new entry
            </Button>
        </div>
        </div>
    )};
 

    export default SinglePatient;