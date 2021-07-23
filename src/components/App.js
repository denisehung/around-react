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
    

    React.useEffect(() => {
        api.getUserInfo().then((res) => {
            setCurrentUser(res);

          console.log('DATA',res);
        })
        .catch((err) => {
          console.log(err); // Log error to console
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

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard();
    }

    const[cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards().then((res) => {
          setCards(res)
          console.log('CARDS', res)
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Send a request to the API and getting the updated card data
        if(isLiked){
            api.removeLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
              });
        } else {
            api.addLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
              });
        }
    } 

    function handleCardDelete(card){
        api.removeCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        });
    }

    function handleUpdateUser(userData){
        api.setUserInfo(userData)
        .then((res) => {
            setCurrentUser(res)
        })
        .catch((err) => {console.log(err)});
    }

    function handleUpdateAvatar(avatar){
        api.setUserAvatar(avatar)
        .then((res) => {
            setCurrentUser(res)
        })
        .catch((err) => {console.log(err)});
    }

    function handleAddPlaceSubmit(cardData){
        api.addCard(cardData)
        .then((newCard) => {
            setCards([newCard, ...cards]);
        })
        .catch((err) => {console.log(err)});
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
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups}
            cards={cards}
        />

        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />

        <DeleteCardPopup />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <Footer />
    
    </CurrentUserContext.Provider>

  );
}

export default App;
