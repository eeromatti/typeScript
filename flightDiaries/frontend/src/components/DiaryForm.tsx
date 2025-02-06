import { Weather, Visibility } from "../types"
import DiaryService from "../services/DiaryService";
import { useState, SyntheticEvent } from "react";


const DiaryForm = (): JSX.Element => {

    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility|null>(null);
    const [weather, setWeather] = useState<Weather|null>(null);
    const [comment, setComment] = useState('');


    const handleSubmit = (event:SyntheticEvent) => {
        event.preventDefault();
        if (visibility && weather) {
        DiaryService.addNew({
            date,
            visibility,
            weather,
            comment
        })
        setDate('')
        setVisibility(null)
        setWeather(null)
        setComment('')
        }}

    return (
        <div>
            <h2>Add new entry</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    date
                    <input 
                        name = "date"
                        type = "date"
                        onChange = {({ target }) => setDate(target.value)}
                    /><br/>
                </div>

                <div>
                    visibility
                    <input id="great" 
                            type="radio" 
                            name="visibility"
                            value="great" 
                            onChange = {({ target }) => setVisibility(target.value as Visibility)}/>
                    <label htmlFor="great">great</label>
                    <input id="good" 
                            type="radio"
                            name="visibility" 
                            value="good" 
                            onChange = {({ target }) => setVisibility(target.value as Visibility)}/>
                    <label id="good">good</label>
                    <input id="ok" 
                            type="radio"
                            name="visibility" 
                            value="ok" 
                            onChange = {({ target }) => setVisibility(target.value as Visibility)}/>
                    <label id="ok">ok</label>
                    <input id="poor" 
                            type="radio"
                            name="visibility" 
                            value="poor" 
                            onChange = {({ target }) => setVisibility(target.value as Visibility)}/>
                    <label id="poor">poor</label>
                </div>
                <div>

                    weather
                    <input id="sunny"
                        type="radio"
                        name="weather"
                        value="sunny"
                        onChange={({ target }) => setWeather(target.value as Weather)} />
                    <label id="sunny">sunny</label>
                    <input id="rainy"
                        type="radio"
                        name="weather"
                        value="rainy"
                        onChange={({ target }) => setWeather(target.value as Weather)} />
                    <label id="rainy">rainy</label>
                    <input id="cloudy"
                        type="radio"
                        name="weather"
                        value="cloudy"
                        onChange={({ target }) => setWeather(target.value as Weather)} />
                    <label id="cloudy">cloudy</label>
                    <input id="stormy"
                        type="radio"
                        name="weather"
                        value="stormy"
                        onChange={({ target }) => setWeather(target.value as Weather)} />
                    <label id="stormy">stormy</label>
                    <input id="windy"
                        type="radio"
                        name="weather"
                        value="windy"
                        onChange={({ target }) => setWeather(target.value as Weather)} />
                    <label id="windy">windy</label>   
                </div>

                <div>
                    comment
                    <input
                    name="comment"
                    onChange={({ target }) => setComment(target.value)}
                    />
                </div>
                <button name="submit">add</button>
            </form>
        </div>
    )}
              

export default DiaryForm;