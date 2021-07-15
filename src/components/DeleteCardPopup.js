import React from "react";
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    return(
    <PopupWithForm name="delete" title="Are you sure?" btnText="Yes" isOpen={props.isOpen} onClose={props.onClose}>
       
    </PopupWithForm>
    );
}

export default DeleteCardPopup;