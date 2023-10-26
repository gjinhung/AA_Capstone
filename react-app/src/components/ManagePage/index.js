import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import PostTourModal from "../PostTourModal";

export default function ManagementPage() {
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        if (!ulRef.current || !ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    return (
        <>
            My Tours
            <div className="view-post-container">
                <OpenModalButton
                    buttonText="Post a New Tour"
                    onItemClick={closeMenu}
                    modalComponent={<PostTourModal />}
                    id={'post-tour-button'}
                />
            </div>
            Post Tour
        </>
    )
}