
import { useEffect, useState } from 'react';
import diaryService from './services/DiaryService'
import { DiaryEntry } from './types'

import Diary from './components/Diary';
import DiaryForm from './components/DiaryForm';

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const allDiaries = await diaryService.getAll();
      setDiaries(allDiaries.data);
    };
    void fetchPatientList();
  }, []);
  
  
  return (
    <div>
      <DiaryForm/>
      <Diary diaries={diaries}/>
    </div>
  )
}

export default App
