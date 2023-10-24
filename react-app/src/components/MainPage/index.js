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
import { useLogSignIn } from "../../context/NavToggle"
import SearchBar from '../SearchBar'
import LogInSignUp from "../LogInSignUp";
import './MainPage.css'

function MainPage() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const { logSignIn } = useLogSignIn()
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        setLoaded(false)
        dispatch(allUsers()).then(() =>
            dispatch(getTours())).then(() =>
                dispatch(getBookings())).then(() =>
                    dispatch(getDates())).then(() =>
                        dispatch(getCities())).then(() =>
                            dispatch(getSpecialties())).then(() =>
                                dispatch(getReviews())).then(() =>
                                    dispatch(getLanguages())).then(() => setLoaded(true));
    }, [dispatch]);
    let show
    if (!sessionUser) { //if not log in
        show = ( //show login/signup and search
            <>
                <div className={`SearchBar-${logSignIn}`}>
                    <SearchBar />
                </div>
                <div className={`LogInSignUp-${logSignIn}`}>
                    <LogInSignUp />
                </div>
            </>
        )
    } else {
        show = ( //just show regular search
            <>
                <div>
                    <SearchBar />
                </div>
            </>
        )
    }

    if (!loaded) {
        return <h2>Loading</h2>
    }

    else {
        return (
            <>
                {show}
            </>
        )
    }
}

export default MainPage;