import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
};

const getDiagnosis = async (code:string) => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    const diagnosis = data.find(diagnosis => diagnosis.code === code);
    return diagnosis;
};

export default {getAll, getDiagnosis};