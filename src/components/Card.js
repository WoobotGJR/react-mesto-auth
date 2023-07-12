import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(listId => listId._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-button ${isLiked && 'element__like-button_active'}` 
      );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    return (  
        <div id="card-element" key={props.card._id}>
                <article className="element">
                    {isOwn && <button className="element__delete-button" onClick={handleCardDelete}></button>}
                    <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
                    <div className="element__bottom-panel"> 
                        <h2 className="element__subtitle">{props.card.name}</h2>
                        <div className="element__like-container">
                            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                            <div className="element__like-counter">{props.card.likes.length}</div>
                        </div>
                    </div>
                </article>
        </div>    
    )
}

// class Cards extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             cards: []
//         }
//     }

//     componentDidMount() {
//         api.getInitialCards()
//             .then(initialCards => {
//                 this.state.cards = [...initialCards];
//             })
//             .catch(error => {
//                 console.log(`Initial cards loading error - ${error}`)
//             })
//     }

//     render() {
//         return (
//             this.state.cards.map((card) => {
//                 return (
//                     <div id="card-element" key={card._id}>
//                         <article className="element">
//                             <button className="element__delete-button"></button>
//                             <img className="element__image" src={card.link} alt="Изображение места" />
//                             <div className="element__bottom-panel">
//                                 <h2 className="element__subtitle">{card.name}</h2>
//                                 <div className="element__like-container">
//                                     <button className="element__like-button" type="button"></button>
//                                     <div className="element__like-counter"></div>
//                                 </div>
//                             </div>
//                         </article>
//                 </div>
//                 )
//             })
//         );
//     }
// }

export default Card;