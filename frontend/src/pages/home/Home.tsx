import React from "react"
import './Home.css'
import Navbar from "@/components/layout/navbar/Navbar"
import TitleCards from "@/components/titleCards/TitleCards"
import banner from  '@/assets/images/banner.webp'
import titleBanner from  '@/assets/images/title_banner.webp'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Footer from "@/components/layout/footer/Footer"
import ProfileModal from "../../components/user/profileModal/profile.tsx";

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <main>
                <div className="banner">
                    <img src={banner} alt="" className="banner-img" />
                    <div>
                        <div className="banner-caption">
                            <div className="banner-caption_title">
                                <div className="title">
                                    <div className="title-img">
                                        <img src={titleBanner} alt="" className="caption-img"/>
                                    </div>
                                    <p>Một cậu bé trốn lên tàu và đi đến Mỹ sau sự kiện Shinmiyangyo năm 1871 và trở về Đại Hàn vào
                                        đúng thời khắc bước ngoặt lịch sử, rồi phải lòng một tiểu thư quý tộc.</p>
                                </div>
                                <div className="banner-btn_group">
                                    <button className='banner-btn'>
                                        <FontAwesomeIcon icon="fa-solid fa-play" className="icon"/>
                                        Play
                                    </button>
                                    <button className='banner-btn color-secondary'>
                                        <FontAwesomeIcon icon="fa-solid fa-circle-info" className="icon"/>
                                        More Info
                                    </button>
                                </div>
                            </div>
                            <TitleCards title={"Blockbuster Movie"}/>
                        </div>
                        <div className="embedded-components">
                            <button className="btn-play">
                                <FontAwesomeIcon icon="fa-solid fa-rotate-left" className="icon" />
                            </button>
                            <span className="maturity-rating">
                                <span className="maturity-number">
                                    T18
                                </span>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="more-cards">
                    <TitleCards className={"have-before"} title={"Blockbuster Movie"}/>
                    <TitleCards className={"have-before"} title={"Only on Netflix"}/>
                    <TitleCards className={"have-before"} title={"Upcoming"}/>
                    <TitleCards className={"have-before"} title={"Top Pics for you"}/>
                </div>

                <ProfileModal />
            </main>
            <Footer />

        </div>
    )
}

export default Home