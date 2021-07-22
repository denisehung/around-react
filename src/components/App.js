import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
    const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState();
    const[currentUser, setCurrentUser] = React.useState({});
    const[cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo().then((res) => {
            setCurrentUser(res);

          console.log('DATA',res);
        })
        .catch((err) => {
          console.log(err); // Log error to console
        })
    }, []);

    React.useEffect(() => {
        api.getInitialCards().then((res) => {
          setCards(res)
          console.log('CARDS', res)
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);


    function handleCardClick(clickedCard) {
        setSelectedCard(clickedCard);
    }

    function handleCardLike(card) {
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
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
    <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main 
            onCardClick={handleCardClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onClose={closeAllPopups}
            onCardLike={handleCardLike}
            cards={cards}
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

        <DeleteCardPopup />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <Footer />
    
    </CurrentUserContext.Provider>

  );
}

export default App;
