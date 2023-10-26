import React, { useRef, useState } from "react";
import LanguageSelection from './Language'
import CitySelection from './City'
import SpecialtySelection from "./Specialty";
import { useSearch } from "../../context/SearchBar";
import { cityByName } from "../../store/city";
import { langByName } from "../../store/language";
import { dateByName } from "../../store/date";
import { useDispatch, useSelector } from "react-redux";
import { typeByName } from "../../store/specialty";
import './index.css'
import DateSelection from "./Date";
import { NavLink } from "react-router-dom";

export default function SearchBar({ loaded }) {
    const filterRef = useRef()
    const users = useSelector((state) => state.users)
    const tours = useSelector((state) => (state.tours))
    const { searchTerms } = useSearch()
    const dispatch = useDispatch()
    let guideSet = new Set()
    let guide_array = []
    const [guide_ids, setGuide_Ids] = useState(Object.keys(users))

    async function onSubmit() {
        const { language, city, type, date } = searchTerms

        const tours_id = Object.keys(tours)

        const tour_ids = []
        tours_id.forEach((id) => {
            tour_ids.push(+id)
        })
        let city_tours = tour_ids
        let type_tours = tour_ids
        let language_tours = tour_ids
        let date_tours = tour_ids

        if (city) {
            const city_id = await dispatch(cityByName(city)).catch((response) => {
                const data = response.json()
                return data
            });
            city_tours = (Object.values(city_id)[0].tours_id)
        }

        if (language) {
            const language_id = await dispatch(langByName(language)).catch((response) => {
                const data = response.json()
                return data
            });
            language_tours = (Object.values(language_id)[0].tours_id)
        }

        if (type) {
            const type_id = await dispatch(typeByName(type)).catch((response) => {
                const data = response.json()
                return data
            });
            type_tours = (Object.values(type_id)[0].tours_id)
        }

        if (date) {
            const date_id = await dispatch(dateByName(date)).catch((response) => {
                const data = response.json()
                return data
            });

            date_tours = (Object.values(date_id)[0].tours_id)
        }

        const firstFilter = await city_tours.filter(value => language_tours.includes(value));
        const secondFilter = await firstFilter.filter(value => type_tours.includes(value))
        const thirdFilter = await secondFilter.filter(value => date_tours.includes(value))

        await thirdFilter.forEach((tour_id) => (
            guideSet.add(tours[tour_id].guide_id)
        ))

        guide_array = await Array.from(guideSet)

        setGuide_Ids(guide_array)
    }
    // console.log(loaded)
    if (!loaded) {
        return <h2>Loading</h2>
    } else {
        // console.log(users)
        return (
            <>
                <div className="searchBarContainer">
                    <div className="searchBar">
                        <DateSelection />
                        <LanguageSelection />
                        <CitySelection />
                        <SpecialtySelection />
                        <button
                            ref={filterRef}
                            onClick={onSubmit}
                            className="search-button">
                            Search
                        </button>
                    </div>
                </div>
                <div className="image_container">
                    {guide_ids.map((guide_id, idx) => (
                        <div className='tour-images-container'
                            key={idx}>
                            <NavLink exact to={`/guide/${guide_id}`}>
                                <img src={users[guide_id].profile_pic}
                                    className='tourImg'
                                    alt={users[guide_id].id}
                                    key={idx}
                                />
                            </NavLink>
                            <div>name: {users[guide_id].first_name} {users[guide_id].last_name}</div>
                            <div>rating: {users[guide_id].rating}</div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}