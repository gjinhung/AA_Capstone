import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookings, newBooking } from "../../store/booking";
import { allUsers } from "../../store/users";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";

export default function PostBooking() {

    const history = useHistory()
    const dispatch = useDispatch()
    let dateRef = useRef('')
    let dayNumRef = useRef()
    const { id } = useParams()
    // const [date, setDate] = useState('');
    const [city, setCity] = useState('')
    const [tour_id, setTour_id] = useState('')
    const [error, setError] = useState('')
    const [duration, setDuration] = useState(0)
    const [startTime, setStartTime] = useState('')
    const [submit, setSubmit] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)
    const [price, setPrice] = useState(0)
    const current_user = useSelector((state) => state.session.user)
    const users = useSelector((state) => state.users)
    const tours = useSelector((state) => state.tours)
    const cities = useSelector((state) => state.cities)
    const type = useSelector((state) => state.specialties)
    const guide = users[+id]

    useEffect(() => {
        if (!startTime) {
            setSubmit(true)
        } else if (+duration === 0) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }

    }, [startTime, duration])

    // const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let available_days = new Set()
    let toursCityWithSelectedDate = []
    let tour_ids_arr = guide.tours_given_ids
    let final_tours = []

    tour_ids_arr.forEach((tour_id) => {
        let selectedTour = tours[tour_id]
        selectedTour.dates.forEach((date) => {
            available_days.add(date)
        })
        if (selectedTour.dates.includes(dayNumRef.current)) {
            toursCityWithSelectedDate.push(selectedTour.city_id)
            if (selectedTour.city_id === city) {
                final_tours.push(selectedTour)
            }
        }
    })

    let avail_days_array = Array.from(available_days)



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError();

        let booking = {
            'duration': +duration,
            'date': dateRef.current,
            'start_time': startTime
        }
        await dispatch(newBooking(booking, +tour_id,)).then((data) => {
            if (data.errors) {
                console.log(data.errors)
            } else {
                dispatch(getBookings())
                dispatch(allUsers())
                dispatch(authenticate())
                history.push('/dashboard')
            }
        })
    }


    const handleDate = (e) => {
        dateRef.current = e
        let year = dateRef.current.substring(0, 4);
        let month = dateRef.current.substring(5, 7);
        let day = dateRef.current.substring(8, 10);
        let newDate = new Date(`${year}/${month}/${+day}`);
        let currentDate = new Date()
        dayNumRef.current = newDate.getDay()

        if ((newDate - currentDate) < 0) {
            // setDate('')
            setError("Selected Date is Invalid")
            setStep2(false)
            setStep3(false)
            setStep4(false)
            setCity('')
        } else if (!avail_days_array.includes(dayNumRef.current)) {
            // setDate('')
            setError('No tours available that day')
            setStep2(false)
            setStep3(false)
            setStep4(false)
            setCity('')
        }
        else {
            setError('')
            setStep2(true)
        }

    };
    const handleCity = (e) => {
        let city_id
        Object.values(cities).forEach((city) => {
            if (city.city === e) {
                city_id = city.id
            }
        })
        setCity(city_id)
        setStep3(true)
    };

    const handleTour = (e, cost) => {
        if (e === tour_id) {
            setTour_id('')
            setStep4(false)
        } else {
            setTour_id(e)
            setStep4(true)
            setPrice(cost)
        }

    };

    let show
    if (!current_user) {
        show = (<>
        </>)
    } else if (+id === current_user.id) {
        show = (<>
        </>)
    } else {
        show = (
            < form onSubmit={handleSubmit} >
                <h3>Book A Tour Today</h3>
                <div className="date-button">
                    <label>Select a Date</label>
                    <input
                        type="date"
                        value={dateRef.current}
                        onChange={(e) => handleDate(e.target.value)}
                    />
                </div>
                <br />
                {
                    step2 &&
                    <>
                        <div className="location-selection">
                            <label className="city">Choose a City:</label>
                            <select
                                id="city"
                                name="city"
                                defaultValue={city}
                                onChange={(e) => handleCity(e.target.value)}>
                                <option value={city}></option>
                                {toursCityWithSelectedDate.map((city_id, idx) => {
                                    return (
                                        <option key={idx} value={cities[city_id].city}>{cities[city_id].city}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <br />
                    </>
                }
                {
                    step3 &&
                    <div className="tour-selection">
                        <label className="tour">Choose a Tour:</label>
                        {final_tours.map((tour, idx) => {
                            return (
                                <div key={idx}>
                                    < input
                                        type="checkbox"
                                        className="checkbox"
                                        name={tour.id}
                                        defaultChecked={false}
                                        value={tour.id}
                                        key={idx}
                                        onChange={(e) => handleTour(e.target.value, tour.price)} />
                                    <div>Type: {type[tour.specialties_id[0]].specialty}</div>
                                    <div>About: {tour.about}</div>
                                    <div>Price: {tour.price}/hr</div>
                                </div>
                            )
                        })}

                        <br />
                    </div>
                }
                {
                    step4 &&
                    <>
                        <label className="time">Start Time:</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <div>
                            <br />
                            <label className="duration">Number of Hours?</label>
                            <select
                                id="duration"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <p>*5 hours max</p>
                        </div>
                        <div>
                            {duration && (<>
                                Total: ${duration * price}
                            </>)}
                        </div>
                    </>
                }
                {error &&
                    <p style={{ color: "red" }}>{error}</p>
                }

                <div className='submit_booking_container'>
                    <button className="submit_booking_button "
                        disabled={submit}
                        type="submit">Book Tour</button>
                </div>
            </form >
        )
    }


    return (
        <>
            {show}
        </>
    );
}