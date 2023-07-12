import React from "react";

class ImagePopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`popup popup_type_place-popup ${this.props.card ? "popup_opened" : ""}`}>
                <div className="popup__image-container">
                    <img className="popup__image" src={this.props.card ? this.props.card.link : null} alt={this.props.card ? this.props.card.name : null} />
                    <h2 className="popup__image-subtitle">{this.props.card ? this.props.card.name : null}</h2>
                    <button className="popup__close-button" onClick={this.props.onClose}></button>
                </div>
            </div>
        );
    }
}

export default ImagePopup;