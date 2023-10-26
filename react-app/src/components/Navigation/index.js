import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useLogSignIn } from "../../context/NavToggle"
import './Navigation.css';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const { logSignIn, setLogSignIn } = useLogSignIn()
	const history = useHistory()
	const location = useLocation()

	function clickHome() {
		if (logSignIn) {
			setLogSignIn(false)
			if (location.pathname === '/') {
				window.location.reload(true)
			} else {
				history.push(`/`)
			}

		} else {
			history.push('/')
		}


	}

	return (
		<div className='navigation-bar'>
			<div className='home'>
				<NavLink onClick={clickHome} exact to="/">Home</NavLink>
			</div>
			{
				isLoaded && (
					<div className='profile'>
						<ProfileButton user={sessionUser} />
					</div>
				)
			}
		</div >
	);
}

export default Navigation;