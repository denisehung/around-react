import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
      }  

    return(
        <div className="card">
            <button className="card__delete"></button>
            <img className="card__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
            <div className="card__textblock">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__likes-container">
                    <button className="card__heart-icon"></button>
                    <p className="card__likes-counter">{props.card.likes}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;