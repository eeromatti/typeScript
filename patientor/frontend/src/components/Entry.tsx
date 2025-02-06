import { Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import "../../styles.css";

interface EntryProps {
    entry: Entry;
    diagnosesObjects: Diagnosis[]
}

interface HospitalProps {
    entry: HospitalEntry;
    diagnosesObjects: Diagnosis[]
}

interface OccuProps {
    entry: OccupationalHealthcareEntry
    diagnosesObjects: Diagnosis[]
}

interface HealthCheckProps {
    entry: HealthCheckEntry
    diagnosesObjects: Diagnosis[]
}


const Hospital = ({entry, diagnosesObjects}: HospitalProps): JSX.Element => {
    return (
            <div className="entryBorders">
                <br/>{entry.date} <br/>
                <i>{entry.description}</i> <br/>
                
                {entry.diagnosisCodes?.map((code:string) => 
                    <li key={code}>
                        {code} {diagnosesObjects.find((diagnosis) => diagnosis.code === code)?.name}
                    </li>
                )}

                diagnose by {entry.specialist}
            </div>
    );
};

const OccupationalHealthcare = ({entry, diagnosesObjects}: OccuProps): JSX.Element => {
    return (
        <div className="entryBorders">
            <br/>{entry.date} 
            <WorkIcon />
            {entry.employerName} <br/>
            <i>{entry.description}</i> <br/>
            
            {entry.diagnosisCodes?.map((code:string) => 
                    <li key={code}>
                        {code} {diagnosesObjects.find((diagnosis) => diagnosis.code === code)?.name}
                    </li>
                )}
            
            diagnose by {entry.specialist}
        </div>
    );
};


const HealthCheck = ({ entry, diagnosesObjects }: HealthCheckProps): JSX.Element => {
    return (
        <div className="entryBorders">
            <br/>{entry.date} <br/>
            <i>{entry.description}</i> <br/>
            
            {entry.diagnosisCodes?.map((code:string) => 
                    <li key={code}>
                        {code} {diagnosesObjects.find((diagnosis) => diagnosis.code === code)?.name}
                    </li>
                )}

            {entry.healthCheckRating === 0 ? <FavoriteIcon style={{ color: 'green' }}/> :
            entry.healthCheckRating === 1 ? <FavoriteIcon style={{ color: 'yellow' }}/> :
            entry.healthCheckRating === 2 ? <FavoriteIcon style={{ color: 'orange' }}/> :
            entry.healthCheckRating === 3 ? <FavoriteIcon style={{ color: 'red' }}/> :
            null
            }
            <br/>

            diagnose by {entry.specialist}
        </div>
    );
};


const Entries = ({ entry, diagnosesObjects}: EntryProps) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} diagnosesObjects={diagnosesObjects}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} diagnosesObjects={diagnosesObjects}/>;
        case "HealthCheck":
            return <HealthCheck entry={entry} diagnosesObjects={diagnosesObjects}/>;
        default:
            return assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Entries;