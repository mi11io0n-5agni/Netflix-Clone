import React from 'react'
import './header.css'
import NetflixLogo from '../../assets/images/NetflixLogo.png'
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Header = () => {
	return (
		<div className='header_outer_container'>
			<div className='header_container'>
                <div className='header_left'>
                    <ul>
                        <li><img src={NetflixLogo} alt="Netflix logo" width="100"/></li>
                        <li>Home</li>
                        <li>TvShows</li>
                        <li>Movies</li>
                        <li>Latest</li>
                        <li>My List</li>
                        <li>Browse by Languages</li>
                    </ul>
                </div>
                <div className='header_right'>
                    <ul>
                        <li><SearchIcon /></li>
                        <li><NotificationsIcon /></li>
                        <li><PersonIcon /></li>
                        <li><ArrowDropDownIcon /></li>
                    </ul>
                </div>

            </div>
		</div>
	)
}

export default Header

