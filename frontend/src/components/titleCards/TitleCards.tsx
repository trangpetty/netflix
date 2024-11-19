import React, { useEffect, useRef } from 'react';
import './title.css';
import card1 from '@/assets/images/banner2.webp';
import card2 from '@/assets/images/banner3.jpg';
import card3 from '@/assets/images/banner4.jpg';
import card4 from '@/assets/images/banner5.jpg';
import card5 from '@/assets/images/banner6.webp';
import card6 from '@/assets/images/banner7.jpg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TitleCards = ({ title, className }) => {
    const cardsRef = useRef();

    const cardWidth = 240;
    const visibleCards = 6.5;
    const scrollAmount = cardWidth * visibleCards;

    const data = [
        { img: card1, text: "" },
        { img: card2, text: "" },
        { img: card3, text: "" },
        { img: card4, text: "" },
        { img: card5, text: "" },
        { img: card6, text: "" },
        { img: card1, text: "" },
        { img: card2, text: "" },
        { img: card3, text: "" },
        { img: card4, text: "" },
        { img: card5, text: "" },
        { img: card6, text: "" },
        { img: card1, text: "" },
        { img: card2, text: "" },
        { img: card3, text: "" },
        { img: card4, text: "" },
        { img: card5, text: "" },
        { img: card6, text: "" },
        { img: card1, text: "" },
        { img: card2, text: "" },
        { img: card3, text: "" },
        { img: card4, text: "" },
        { img: card5, text: "" },
        { img: card6, text: "" },
    ];

    const loopData = [...data, ...data];

    const scrollLeft = () => {
        if (cardsRef.current.scrollLeft === 0) {
            cardsRef.current.scrollLeft = cardsRef.current.scrollWidth / 2;
        }
        cardsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (cardsRef.current.scrollLeft + cardsRef.current.offsetWidth >= cardsRef.current.scrollWidth) {
            cardsRef.current.scrollLeft = cardsRef.current.scrollWidth / 2 - cardsRef.current.offsetWidth;
        }
        cardsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (cardsRef.current.scrollLeft === 0) {
            cardsRef.current.scrollLeft = cardsRef.current.scrollWidth / 2 - cardsRef.current.offsetWidth;
        } else if (cardsRef.current.scrollLeft + cardsRef.current.offsetWidth >= cardsRef.current.scrollWidth) {
            cardsRef.current.scrollLeft = cardsRef.current.scrollWidth / 2;
        }
    };

    useEffect(() => {
        const scrollContainer = cardsRef.current;
        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="titleCards">
            <h2>
                <a href="">
                    <div className="row-header-title">
                        {title ? title : 'Popular on Netflix'}
                    </div>
                </a>
            </h2>
            <div className="carousel-container">
                <div className="carousel-control left" onClick={scrollLeft}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                </div>
                <div className={`card-list ${className}`} ref={cardsRef}>
                    {
                        loopData.map((card, index) => (
                            <div className="card" key={index}>
                                <div className="boxart">
                                    <img src={card.img} alt={`Card ${index + 1}`} />
                                </div>
                                {/*<div className="card-modal">*/}
                                {/*    <div className="modal-content">*/}
                                {/*        <img src={card.img} alt="" />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        ))
                    }
                </div>
                <div className="carousel-control right" onClick={scrollRight}>
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right"/>
                </div>
            </div>
        </div>
    );
};

export default TitleCards;
