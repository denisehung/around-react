import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import DeleteImagePopup from "./DeleteImagePopup.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState();

    function handleCardClick(clickedCard) {
        setSelectedCard(clickedCard);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard();
    }

  return (
    <>
    <Header />

    <Main 
        onCardClick={handleCardClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onClose={closeAllPopups}
    />

    <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
    />

    <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
    />

    <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
    />

    <DeleteImagePopup />
    
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

    <Footer />
    
    </>

  );
}

export default App;
