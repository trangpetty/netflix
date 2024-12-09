import React, { useEffect, useState } from "react"
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '@/assets/images/logo.png'
import avatar from '@/assets/images/avatar.jpg'
import banner from '@/assets/images/banner.webp'
import { useModal } from "../../context/ModalProvider.tsx";

const Navbar = () => {
    const { openModal } = useModal();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const banner = document.querySelector('.banner') as HTMLElement;
        const bannerHeight = banner ? banner.offsetHeight * 0.2 : 0;
        const scrollPosition = window.scrollY;

        setIsScrolled(scrollPosition > bannerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className='navbar-left'>
                <img src={logo} alt=""/>
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="icons"/>
                <div className="noti">
                    <FontAwesomeIcon icon="fa-solid fa-bell" className="icons"/>
                    <div className="dropdown">
                        <div className="dropdown-icon">
                            <FontAwesomeIcon icon="fa-solid fa-sort-up"/>
                        </div>
                        <div className="navbar-dropdown-menu">
                            <a href="" className="notification-item">
                                <img src={banner} alt=""/>
                                <p>Một cậu bé trốn lên tàu và đi đến Mỹ sau sự kiện Shinmiyangyo năm 1871</p>
                            </a>
                            <a href="" className="notification-item">
                                <img src={banner} alt=""/>
                                <p>Petty</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="navbar-profile">
                    <img src={avatar} alt="" className="profile"/>
                    <FontAwesomeIcon icon="fa-solid fa-caret-down" className="icon"/>
                    <div className="dropdown">
                        <div className="dropdown-icon">
                            <FontAwesomeIcon icon="fa-solid fa-sort-up"/>
                        </div>
                        <div className="navbar-dropdown-menu">
                            <div className="profile-list">
                                <div className="profile-item">
                                    <img src={avatar} alt=""/>
                                    <p>Petty</p>
                                </div>
                                <div className="profile-item">
                                    <img src={avatar} alt=""/>
                                    <p>Potter</p>
                                </div>
                                <div className="profile-item">
                                    <img src={avatar} alt=""/>
                                    <p>Kyoong</p>
                                </div>
                                <div className="profile-item">
                                    <img src={avatar} alt=""/>
                                    <p>Htd</p>
                                </div>
                                <div className="profile-item" onClick={openModal}>
                                    <FontAwesomeIcon icon="fa-solid fa-pencil"/>
                                    <p>Profile Management</p>
                                </div>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon="fa-brands fa-square-reddit"/>
                                    <p>Petty</p>
                                </div>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon="fa-solid fa-user"/>
                                    <p>Account</p>
                                </div>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon="fa-solid fa-circle-question"/>
                                    <p>Need help</p>
                                </div>
                            </div>
                            <div className="link-logout">
                                <a href="">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar