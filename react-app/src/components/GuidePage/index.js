import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTours } from "../../store/tour";
import { getBookings } from "../../store/booking";
import { allUsers } from "../../store/users";
import { getDates } from "../../store/date";
import { getCities } from "../../store/city";
import { getSpecialties } from "../../store/specialty";
import { getReviews } from "../../store/reviews";
import { getLanguages } from "../../store/language";
import './GuidePage.css'

export default function GuidePage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const users = useSelector((state) => state.users)
    const user = users[id]
    const languages = useSelector((state) => state.languages)
    const bookings = useSelector((state) => state.bookings)
    const reviews = useSelector((state) => state.reviews)
    const tours = useSelector((state) => state.tours)

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


    if (!loaded) {
        return (
            <>
                Loading...
            </>
        )
    } else {

        let language_set = new Set()
        let num_tours_given = user.reviews.length
        let review_list = Object.values(user.reviews)
        let booking_list = bookings
        let review_lists = [] //get the reviewers with this guide_id

        let guide_tours = []

        let normalized_tours = Object.values(user.tours_given)
        normalized_tours.forEach((tour) => {
            language_set.add(tour.language_id)
            guide_tours.push(tour.id)
        })

        let normalized_reviews = Object.values(reviews)
        normalized_reviews.forEach((review) => {
            if (review.tour_id === +id) {
                review_lists.push(review)
            }
        })


        console.log(review_lists)


        let editOption = (
            <>
                <div>
                    edit</div>
                <div>
                    delete
                </div>
            </>
        )

        const language_arr = Array.from(language_set)

        return (
            <div className="guide-page">
                <div className="left-side">
                    <div className="user-info">
                        <h4>HOSTED BY</h4>
                        <img src={user.profile_pic}
                            className='userImg'
                            alt={user.id}
                            key={user.id}
                        />
                        <p> {user.first_name} {user.last_name}</p>
                        <>
                            {user.rating} <i className="fa-solid fa-star"></i> {`(${num_tours_given} ${num_tours_given = 1 ? 'tour' : "tours"} given)`}

                        </>
                        <div> <i className="fa-solid fa-language"></i> Languages I speak:</div>
                        {language_arr.map((language_id, idx) => {
                            return (<li key={idx}>{languages[language_id].language}</li>)
                        })}
                        <h4>Reviews</h4>
                        {review_lists.map((review, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="profile_pic">
                                        <img src={users[review.reviewer_id].profile_pic}
                                            className='reviewImg'
                                            alt={user.id}
                                            key={user.id}
                                        />
                                    </div>
                                    <div className="review_body">{review.review_body}</div>
                                    <div>Communications Rating: {review.communication_rating}</div>
                                    <div>Knowledgeability Rating: {review.knowledgeability_rating}</div>
                                    <div>Professionalism Rating: {review.Professionalism}</div>
                                </div >
                            )
                        })}
                    </div>
                </div>
                <div className="right-side">

                </div>
            </div >
        )
    }
}