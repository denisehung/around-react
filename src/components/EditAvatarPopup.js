import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const[avatar, setAvatar] = React.useState('');

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value /* The value of the input which we got using the ref */
        })
        setAvatar('');
      } 

    return(
        <PopupWithForm name="avatar" title="Change profile picture" btnText={props.isLoading ? 'Saving...' : 'Save'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <label className="popup__form-field">
                <input type="url" className="popup__input popup__input_type_img" id="avatar-url-input" autoComplete="off" placeholder="Image URL" name="link" value={avatar} onChange={handleChangeAvatar} ref={avatarRef} required />
                <span id="avatar-url-input-error" className="popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;