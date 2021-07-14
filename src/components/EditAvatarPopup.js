import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    return(
        <PopupWithForm name="avatar" title="Change profile picture" btnText="Save" isOpen={props.isOpen} onClose={props.onClose}>
        <form className={`popup__form-main popup__form-main_type_${props.name}`} name={`form-${props.name}`}>
            <label className="popup__form-field">
                <input type="url" className="popup__input popup__input_type_img" id="avatar-url-input" autoComplete="off" placeholder="Image URL" name="link" required />
                <span id="avatar-url-input-error" className="popup__error"></span>
            </label>
        </form>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;