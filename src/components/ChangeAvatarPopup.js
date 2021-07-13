import React from "react";
import PopupWithForm from './PopupWithForm';

function ChangeAvatarPopup(props) {
    return(
        <PopupWithForm name="avatar" title="Change profile picture" btnText="Save" isOpen={props.isOpen} onClose={props.onClose}>
            <label className="popup__form-field">
                <input type="url" className="popup__input popup__input_type_img" id="avatar-url-input" autoComplete="off" placeholder="Image URL" name="link" required />
                <span id="avatar-url-input-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default ChangeAvatarPopup;