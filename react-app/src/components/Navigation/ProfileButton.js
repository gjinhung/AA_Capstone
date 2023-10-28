import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useLogSignIn } from "../../context/NavToggle"
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom/";
import './Navigation.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { logSignIn, setLogSignIn } = useLogSignIn()
  const ulRef = useRef();
  const navigate = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openLoginSignUp = () => {
    // console.log("clicked")
    // console.log(logSignIn)
    setLogSignIn(!logSignIn)
  }

  useEffect(() => {

    if (!showMenu) return;

    const closeMenu = (e) => {
      // console.log(ulRef)
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    setLogSignIn(false)
    setShowMenu(false)
    dispatch(logout());
    navigate.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  let show
  if (!user) {
    show = (
      <>
        <ul className={ulClassName} ref={ulRef}></ul>
        <button
          onClick={openLoginSignUp}>
          <>Log In / Sign Up</>
        </button>
      </>
    )
  } else {
    show = (
      <>
        <div onClick={openMenu}>
          <i className="fas fa-user-circle" />
          <ul className={ulClassName} ref={ulRef}></ul>
          <>
            <li>Welcome, {user.username}</li>
            <li>{user.first_name} {user.last_name}</li>
            <li>{user.email}</li>
            <li className="view-logout-container">
              <NavLink exact to="/dashboard" className="view-business-button">View Bookings</NavLink>
              <button onClick={handleLogout} className="logout-red-button">Log Out</button>
            </li>
          </>
        </div>
      </>
    )
  }

  return (
    <>
      {show}
      {/* <button onClick={openMenu}>
        {!user ? (<>Log In / Sign Up</>) : (<i className="fas fa-user-circle" />)}
      </button> */}
      {/* <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <div className='modals'>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul > */}
    </>
  );
}

export default ProfileButton;
