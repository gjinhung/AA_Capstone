import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useLogSignIn } from "../../context/NavToggle"
import './Navigation.css';
import logo from '../../images/logo.png'
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
				<NavLink exact to="/" onClick={clickHome} className='home-button' >
					<img src={logo}
						className='logo'
						alt='logo'
						key='logo'
					/>
				</NavLink>
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