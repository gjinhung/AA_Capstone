import React, { useEffect, useState } from "react";
import { getTours } from "../../store/tour";
import { getBookings } from "../../store/booking";
import { getDates } from "../../store/date"
import { getCities } from "../../store/city"
import { getLanguages } from "../../store/language";
import { allUsers } from '../../store/users'
import { getSpecialties } from "../../store/specialty";
import { getReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";


function MainPage() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(false)
        dispatch(allUsers()).then(
            dispatch(getTours())).then(
                dispatch(getBookings())).then(
                    dispatch(getDates())).then(
                        dispatch(getCities())).then(
                            dispatch(getSpecialties())).then(
                                dispatch(getReviews())).then(
                                    dispatch(getLanguages())).then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <Tours />
        </>

    )
}

export default MainPage;
