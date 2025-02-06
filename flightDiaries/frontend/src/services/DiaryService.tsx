import axios from 'axios';
import { NewDiaryEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { v1 as uuidv1 } from 'uuid';

const getAll = async () => {
    const diaries = await axios.get(`${apiBaseUrl}/diaries`)
    return diaries;
}

const addNew = async (entry: NewDiaryEntry) => {
    const newDiary = {
        id: uuidv1(),
        ...entry
    };
    await axios.post(`${apiBaseUrl}/diaries`, newDiary)
}

export default {
    getAll,
    addNew
}