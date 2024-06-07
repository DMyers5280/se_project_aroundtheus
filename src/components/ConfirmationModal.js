import Modal from './Modal';

class ConfirmationModal extends Modal { 
    constructor(modalSelector) {
        super({ modalSelector });
    }

    open(id) {
        super.open();
        this._handleDelete(id);
    }
    setSubmitAction(action) {
        this._handleConfirmation = action;
    }
    setEventListeners() {
        this._modalElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleConfirmation();
        });

        super.setEventListeners();
    }
    
}
/*
1. provide handleDelete function inside card which should
be called when pressed on trash icon. Id should be set inside.

2. handleDelete function should be provided when the the card instance is
created via new card.

3. inside the above described function we need to call the 
open() method with the modalWithConfirmation and provide the id inside.

4. inside the modalWithConfirmation we need to provide the handleDeleteConfirm.
*/


export default ConfirmationModal;