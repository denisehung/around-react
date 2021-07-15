import React from "react";
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
    const[userAvatar, setUserAvatar] = React.useState('');
    const[userDescription, setUserDescription] = React.useState('');
    const[userName, setUserName] = React.useState('');
    const[cards, setCards] = React.useState([]);
    
    React.useEffect(() => {
          api.getUserInfo().then((res) => {
              setUserAvatar(res.avatar);
              setUserDescription(res.about);
              setUserName(res.name);

            console.log('DATA',res);
          })
          .catch((err) => {
            console.log(err); // Log error to console
          })
      }, []);

      React.useEffect(() => {
          api.getInitialCards().then((res) => {
            setCards(res.map(card => ({
                link: card.link,
                name: card.name,
                likes: card.likes.length,
                _id: card._id
            })))
            console.log('CARDS', res)
          })
          .catch((err) => {
            console.log(err);
          })
      }, []);

    return(
        <main className="content">
        <section className="profile">
            <div className="profile__details">
                <div className="profile__image-container">
                    <div className="profile__image-overlay" onClick={props.onEditAvatarClick}></div>
                    <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }}   alt="avatar" ></div>
                </div>
                <div className="profile__description">
                    <div className="profile__name-wrapper">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" aria-label="Edit profile" onClick={props.onEditProfileClick}></button>
                    </div>
                    <p className="profile__about">{userDescription}</p>
                </div>
            </div>
            <button className="profile__add-button" type="button" aria-label="Add image" onClick={props.onAddPlaceClick}></button>
        </section>

       
        <section className="image-grid">
        {cards.map(card => (
               <Card 
                    card={card}
                    key={card._id}
                    link={card.link}
                    name={card.name}
                    likes={card.likes}
                    onCardClick={props.onCardClick}
                />
        ))}
        </section>

    </main>
    );
}

export default Main;