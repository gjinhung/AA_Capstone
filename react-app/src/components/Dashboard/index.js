import React, { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import PostTourModal from "../PostTourModal";
import MyBookings from "../MyBookings";
import MyTours from "../MyTours";
import { useDispatch } from "react-redux";
import { getBookings } from "../../store/booking";
import { getTours } from "../../store/tour";

export default function Dashboard({ loaded }) {
    const ulRef = useRef();
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        if (!ulRef.current || !ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };
    if (!loaded) {
        return (
            <>
                Loading...
            </>
        )
    } else {
        return (
            <>
                <div className="view-post-container">
                    <OpenModalButton
                        buttonText="Post a New Tour"
                        onItemClick={closeMenu}
                        modalComponent={<PostTourModal />}
                        id={'post-tour-button'}
                    />
                </div>
                <MyTours loaded={loaded} />
                < br />
                <MyBookings loaded={loaded} />
            </>
        )
    }
}