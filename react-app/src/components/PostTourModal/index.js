import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { newTour } from "../../store/tour";

export default function PostTourModal() {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState("");
    const [monday, setMon] = useState(false)
    const [tuesday, setTue] = useState(false)
    const [wednesday, setWed] = useState(false)
    const [thursday, setThur] = useState(false)
    const [friday, setFri] = useState(false)
    const [saturday, setSat] = useState(false)
    const [sunday, setSun] = useState(false)
    const [city, setCity] = useState(false)
    const [history, setHistory] = useState(false)
    const [food, setFood] = useState(false)
    const [adventure, setAdventure] = useState(false)
    const [other, setOther] = useState(false)
    const [price, setPrice] = useState('')
    const [about, setAbout] = useState('')
    const [errors, setErrors] = useState({});
    const languages = useSelector((state) => state.languages)
    const normalizedLanguages = Object.values(languages)
    const cities = useSelector((state) => state.cities)
    const normalizedCities = Object.values(cities)
    const types = useSelector((state) => state.specialties)
    const normalizedTypes = Object.values(types)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tour_data = {
            'language': language,
            "price": price,
            "about": about,
            "city": city,
            'monday': monday,
            "tuesday": tuesday,
            "wednesday": wednesday,
            "thursday": thursday,
            "friday": friday,
            "saturday": saturday,
            'sunday': sunday,
            'history': history,
            'food': food,
            'adventure': adventure,
            'other': other
        }
        const data = await dispatch(newTour(tour_data));
        if (data) {
            setErrors(data.errors);
        } else {
            closeModal()
        }
    };

    function handleChange(e) {
        const result = e.target.value.replace(/\D/g, '');
        setPrice(result);
    };

    return (
        <>
            <h1>Create a Tour</h1>
            <form onSubmit={handleSubmit}>
                <label className="language"></label>
                Language
                <select
                    id='language'
                    name='language'
                    defaultValue={language}
                    onChange={(e) => setLanguage(e.target.value)}>
                    <option></option>
                    {normalizedLanguages.map((language, idx) => {
                        return (
                            <option key={idx} value={language.language}> {language.language}</option>
                        )
                    })}
                </select>
                {errors['language'] ? <div style={{ color: "red" }}>{errors['language']}</div> : <br />}
                <label>Price</label>
                <input
                    type="text"
                    placeholder="Price per Hour"
                    value={price}
                    onChange={(e) => handleChange(e)}
                />
                {errors['price'] ? <div style={{ color: "red" }}>{errors['price']}</div> : <br />}
                <label>Description of the Tour</label>
                <div className='text-container'>
                    <textarea
                        style={{ resize: "none" }}
                        name="text"
                        rows={2}
                        cols={40}
                        placeholder="Leave a description about your tour..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    >
                    </textarea>
                </div>
                {errors['about'] ? <div style={{ color: "red" }}>{errors['about']}</div> : <br />}
                <label className="city"></label>
                City
                <select
                    id='city'
                    name='city'
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}>
                    <option></option>
                    {normalizedCities.map((city, idx) => {
                        return (
                            <option key={idx} value={city.city}> {city.city}</option>
                        )
                    })}
                </select>
                {errors['city'] ? <div style={{ color: "red" }}>{errors['city']}</div> : <br />}
                <div className="type-selection">
                    <label className="dates">Choose Type of Tour You Want to Host:</label>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`history`}
                            checked={history}
                            onChange={() => {
                                setHistory(!history)
                                setFood(false)
                                setAdventure(false)
                                setOther(false)
                            }} /> History
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`food`}
                            checked={food}
                            onChange={() => {
                                setHistory(false)
                                setFood(!false)
                                setAdventure(false)
                                setOther(false)
                            }} /> Food
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`adventure`}
                            checked={adventure}
                            onChange={() => {
                                setHistory(false)
                                setFood(false)
                                setAdventure(!adventure)
                                setOther(false)
                            }} /> Adventure
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`other`}
                            checked={other}
                            onChange={(e) => {
                                setHistory(false)
                                setFood(false)
                                setAdventure(false)
                                setOther(!other)
                            }} /> Others
                    </div>
                </div>
                <div className="day-selection">
                    <label className="dates">Choose Dates to Host Your Tour:</label>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`monday`}
                            checked={monday}
                            onChange={() => {
                                setMon(!monday)
                            }} /> Mondays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`tuesday`}
                            checked={tuesday}
                            onChange={(e) => setTue(!tuesday)} /> Tuesdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`wednesday`}
                            checked={wednesday}
                            onChange={(e) => setWed(!wednesday)} /> Wednesdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`thursday`}
                            checked={thursday}
                            onChange={(e) => setThur(!thursday)} /> Thursdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`friday`}
                            checked={friday}
                            onChange={(e) => setFri(!friday)} /> Fridays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`saturday`}
                            checked={saturday}
                            onChange={(e) => setSat(!saturday)} /> Saturdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`sunday`}
                            checked={sunday}
                            onChange={(e) => setSun(!sunday)} /> Sundays
                    </div>
                    <br />
                </div>


                <button type="submit">Post Tour</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </form >
        </>
    );
}

