import { DiaryEntry } from "../types"

interface DiaryProps {
    diaries: DiaryEntry[];
  }

const DiaryParent = (props: DiaryProps): JSX.Element => {
    return ( 
        <div>
            <h2>Diary entries</h2>
            {props.diaries.map((diary) => (
                <DiarySingle key={diary.id} {...diary} />
            ))}
        </div>
        )
    }


const DiarySingle = (props: DiaryEntry): JSX.Element => {
    return (
        <div>
            <h3>{props.date}</h3>
            <p>visibility: {props.visibility} <br/>
            weather: {props.weather}
            </p>
        </div>
    )
}

export default DiaryParent;