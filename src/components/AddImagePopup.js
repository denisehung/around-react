import React from "react";
import PopupWithForm from './PopupWithForm';

function AddImagePopup(props) {
    return(
        <PopupWithForm name="add-img" title="New Place" btnText="Create" isOpen={props.isOpen} onClose={props.onClose}>
            <label className="popup__form-field">
                <input type="text" className="popup__input popup__input_type_title" id="title-input" autoComplete="off" placeholder="Title" name="name" minLength="1" maxLength="30" required />
                <span id="title-input-error" className="popup__error"></span>
            </label>
            <label className="popup__form-field">
                <input type="url" className="popup__input popup__input_type_img" id="image-url-input" autoComplete="off" placeholder="Image URL" name="link" required />
                <span id="image-url-input-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddImagePopup;