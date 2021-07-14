import React from "react";
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    return(
    <PopupWithForm name="edit" title="Edit profile" btnText="Save changes" isOpen={props.isOpen} onClose={props.onClose}>
    <form className={`popup__form-main popup__form-main_type_${props.name}`} name={`form-${props.name}`}>
        <label className="popup__form-field">
            <input type="text" className="popup__input popup__input_type_name" id="name-input" autoComplete="off" placeholder="Name" name="username" minLength="2" maxLength="40" required />
            <span id="name-input-error" className="popup__error"></span>
        </label>
        <label className="popup__form-field">
            <input type="text" className="popup__input popup__input_type_about" id="about-input" autoComplete="off" placeholder="About me" name="userjob" minLength="2" maxLength="200" required />
            <span id="about-input-error" className="popup__error"></span>
        </label>
    </form>
    </PopupWithForm>
    );
}

export default EditProfilePopup;