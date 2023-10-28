import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editBooking, getBookings } from "../../store/booking";
import { allUsers } from "../../store/users";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export default function EditBookingModal({ booking }) {

    const history = useHistory()
    const dispatch = useDispatch()
    let dateRef = useRef(booking.date)
    let dayNumRef = useRef()
    const [date, setDate] = useState(dateRef.current);
    const [error, setError] = useState({})
    const [duration, setDuration] = useState(booking.duration)
    const [startTime, setStartTime] = useState(booking.start_time)
    const [submit, setSubmit] = useState(false)
    const [price, setPrice] = useState(booking.tour.price)
    const bookings = useSelector((state) => state.bookings)
    const users = useSelector((state) => state.users)
    const tours = useSelector((state) => state.tours)
    const cities = useSelector((state) => state.cities)
    const type = useSelector((state) => state.specialties)
    const city = cities[booking.tour.city_id].city
    const { closeModal } = useModal();
    const id = bookings[booking.id].tour.guide_id
    const guide = users[+id]

    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let available_days = new Set()
    let tour_ids_arr = guide.tours_given_ids

    let toursCityWithSelectedDate = []
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
        let [hours, mins] = startTime.split(":");
        let newStartTime = `${hours}:${mins}`

        let booking_data = {
            'duration': +duration,
            'date': date,
            'start_time': newStartTime
        }

        console.log(booking_data)
        await dispatch(editBooking(booking.id, booking_data)).then((data) => {
            if (data.errors) {
                setError(data.errors)
            } else {

                dispatch(getBookings()).then(() =>
                    dispatch(allUsers())).then(() =>
                        closeModal())
            }
        })
    }

    const handleDate = (e) => {
        let tour_dates = tours[bookings[booking.id].tour.id].dates
        dateRef.current = e
        let year = dateRef.current.substring(0, 4);
        let month = dateRef.current.substring(5, 7);
        let day = dateRef.current.substring(8, 10);
        let newDate = new Date(`${year}/${month}/${+day}`);
        let currentDate = new Date()
        dayNumRef.current = newDate.getDay()
        if ((newDate - currentDate) < 0) {
            setError({ "date": "Selected Date is Invalid" })
            setSubmit(true)
        } else if (!tour_dates.includes(dayNumRef.current)) {
            setError({ "date": 'No tours available that day' })
            setSubmit(true)
        }
        else {
            setError('')
            setDate(dateRef.current)
            setSubmit(false)
        }

    };


    let show = (
        < form onSubmit={handleSubmit} >
            <h3>Update Your Tour with {users[bookings[booking.id].tour.guide_id].first_name}</h3>
            <div className="tour-selection">
                <div>Type: {type[tours[bookings[booking.id].tour.id].specialties_id[0]].specialty}</div>
                <div>About: {booking.tour.about}</div>
                <div>Price: {booking.tour.price}/hr</div>
            </div>
            <br />
            <div className="location-selection">
                City: {cities[booking.tour.city_id].city}
            </div>
            <br />
            <div className="date-button">
                <label>Update the Date of Your Tour</label>
                <input
                    type="date"
                    value={dateRef.current}
                    onChange={(e) => handleDate(e.target.value)}
                />
            </div>
            {error && error['date'] && <p style={{ color: "red" }}>{error["date"]}</p>}
            <br />
            <label className="time">Update Your Start Time:</label>
            <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            {error && error['start_time'] && <p style={{ color: "red" }}>{error["start_time"]}</p>}
            <div>
                <br />
                <label className="duration">Update the Duration of Your Tour</label>
                <select
                    id="duration"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}>
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

            <div className='submit_booking_container'>
                <button className="submit_booking_button "
                    disabled={submit}
                    type="submit">Update Your Tour</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </form >
    )



    return (
        <>
            {show}
        </>
    );
}