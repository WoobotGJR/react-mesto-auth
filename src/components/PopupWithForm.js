import React from "react";

class PopupWithForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={`popup popup_type_${this.props.name} ${this.props.isOpened ? "popup_opened" : ""}`}>
                <div className="popup__container popup__container_type_edit">
                    <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
                    <h2 className="popup__title">{this.props.title}</h2>
                    <form className="popup__form" action="#" name={`${this.props.name}-popup-form`} onSubmit={this.props.onSubmit} noValidate>
                        {this.props.children}
                        <button className="popup__submit-button" type="submit">{this.props.buttonText}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PopupWithForm