import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`}>
        <div className="popup__container">
            <button className="popup__close-button popup__close-button_type_form" type="button"
                aria-label="Close popup" onClick={props.onClose}></button>
            <div className="popup__form">
                <h2 className="popup__container-title">{props.title}</h2>
                <form className={`popup__form-main popup__form-main_type_${props.name}`} name={`form-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__submit-button" type="submit" aria-label="Save changes">{props.btnText}</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default PopupWithForm;