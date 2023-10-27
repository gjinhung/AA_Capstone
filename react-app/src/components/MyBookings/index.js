import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export default function MyBookings() {
    const bookings = useSelector((state) => state.bookings)
    const booking_ids = useSelector((state) => state.session.user.booking_ids)
    const users = useSelector((state) => state.users)
    const history = useHistory()
    return (
        <>
            {booking_ids.length && booking_ids.map((booking_id, idx) => {
                return (
                    <div key={idx}>
                        <img
                            src={users[bookings[booking_id].tour_guide_id].profile_pic}
                            className='guide_img'
                            alt={booking_id}
                            key={idx}
                            onClick={() => history.push(`/guide/${bookings[booking_id].tour_guide_id}`)} />
                        <div>
                            {bookings[booking_id].date}
                        </div>
                        <div>
                            {bookings[booking_id].start_time}
                        </div>

                        <br />
                    </div>
                )
            })}
        </>
    )
}