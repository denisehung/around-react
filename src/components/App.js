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
    const[isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const[isLoading, setIsLoading] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState(null);
    const[cards, setCards] = React.useState([]);
    const[selectedCardDelete, setSelectedCardDelete] = React.useState(null);
    const[currentUser, setCurrentUser] = React.useState({});
    
    
    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

    document.addEventListener('keyup', handleEscClose);

    
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

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true);
        setSelectedCardDelete(card);
        setIsLoading(false);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCardDelete(null);
        setSelectedCard(null);
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Send a request to the API and getting the updated card data
        if(isLiked){
            api.removeLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {console.log(err)});
        } else {
            api.addLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {console.log(err)});
        }
    } 

    function handleCardDeleteSubmit(card){
        setIsLoading(true);
        api.removeCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopups();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            setIsLoading(false);
          });
    }

    function handleUpdateUser(userData){
        setIsLoading(true);
        api.setUserInfo(userData)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            setIsLoading(false);
          });
    }

    function handleUpdateAvatar(avatar){
        setIsLoading(true);
        api.setUserAvatar(avatar)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            setIsLoading(false);
          });
    }

    function handleAddPlaceSubmit(cardData){
        setIsLoading(true);
        api.addCard(cardData)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            setIsLoading(false);
          });
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main 
            onCardClick={handleCardClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            onClose={closeAllPopups}
            cards={cards}
        />

        <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />

        <DeleteCardPopup
            isLoading={isLoading}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDeleteSubmit}
            card={selectedCardDelete}
         />
        
        <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
        />

        <Footer />
    
    </CurrentUserContext.Provider>

  );
}

export default App;
