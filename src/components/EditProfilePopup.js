import React from "react";
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const[name, setName] = React.useState(currentUser.name);
    const[description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name: name,
          about: description
        });
      } 

    return(
    <PopupWithForm name="edit" title="Edit profile" btnText={props.isLoading ? 'Saving...' : 'Save changes'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
        <label className="popup__form-field">
            <input type="text" className="popup__input popup__input_type_name" id="name-input" autoComplete="off" placeholder="Name" name="username" minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} required/>
            <span id="name-input-error" className="popup__error"></span>
        </label>
        <label className="popup__form-field">
            <input type="text" className="popup__input popup__input_type_about" id="about-input" autoComplete="off" placeholder="About me" name="userjob" minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} required />
            <span id="about-input-error" className="popup__error"></span>
        </label>
    </PopupWithForm>
    );
}

export default EditProfilePopup;