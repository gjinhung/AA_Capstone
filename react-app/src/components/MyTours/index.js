import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import adventure from '../../images/adventure.png'
import history from '../../images/history.png'
import food from '../../images/food.png'
import other from '../../images/other.png'
import './MyTours.css'
import OpenModalButton from "../OpenModalButton";
import EditTourModal from "../EditTourModal";
import DeleteTourModal from "../DeleteTourModal";
import { useHistory } from "react-router-dom";

export default function MyTours({ loaded }) {
    let hist = useHistory()
    const current_user = useSelector((state) => state.session.user)
    if (!current_user) {
        console.log('if statement fired')
        hist.push('/slider')

    }
    let current_user_id = current_user.id
    const user_tours_arr = useSelector((state) => state.users[current_user_id].tours_given_ids)
    const tours = useSelector((state) => state.tours)
    const cities = useSelector((state) => state.cities)
    const type = useSelector((state) => state.specialties)
    const languages = useSelector((state) => state.languages)

    function typeImg(img) {
        if (img === 2) {
            return adventure
        } else if (img === 3) {
            return food
        } else if (img === 4) {
            return history
        } else {
            return other
        }
    }

    if (!loaded) {
        return (
            <>
                Loading...
            </>
        )
    } else {
        return (
            <>
                {user_tours_arr.map((tour_id, idx) => {
                    return (
                        <div key={idx}>
                            <img
                                src={typeImg(type[tours[tour_id].specialties_id[0]])}
                                className='tourIcon'
                                alt={tour_id}
                                key={idx} />
                            <div>
                                {type[tours[tour_id].specialties_id[0]].specialty}
                            </div>
                            <div>
                                {cities[tours[tour_id].city_id].city}
                            </div>
                            <div>
                                ${tours[tour_id].price}/hr
                            </div>
                            <div>
                                Language: {languages[tours[tour_id].language_id].language}
                            </div>
                            <br />
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={
                                    <EditTourModal tour={tours[tour_id]} />
                                }
                                id={'tour-edit-button'}
                            />
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={
                                    <DeleteTourModal tour_id={tour_id} />
                                }
                                id={'tour-delete-button'}
                            />
                        </div>

                    )
                })}
            </>
        )
    }
}
