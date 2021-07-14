import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`}>
        <div className="popup__container">
            <button className="popup__close-button popup__close-button_type_form" type="button"
                aria-label="Close popup" onClick={props.onClose}></button>
            <div className="popup__form">
                <h2 className="popup__container-title">{props.title}</h2>
                {props.children}
                <button className="popup__submit-button" type="submit" aria-label="Save changes">{props.btnText}</button>
            </div>
        </div>
    </div>
    );
}

export default PopupWithForm;