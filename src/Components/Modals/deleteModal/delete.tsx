// Importing the necessary dependencies
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// Interface for prop types of the ModalDelete component
interface ModalDeleteProps {
    cardid: number;              // The ID of the card to be deleted
    onHide: () => void;         // Function to close the modal
    attGetList: (value: boolean) => void; // Function to trigger an update in the parent component
    show: boolean;              // Controls the visibility of the modal
}

// ModalDelete component definition
export function ModalDelete({ cardid, onHide, attGetList, show }: ModalDeleteProps) {

    // Function to handle the deletion of a card by its ID
    const handleDelete = async (cardId: number) => {
        try {
            // Sending a DELETE request to the API endpoint with the card's ID
            await axios.delete(`https://dev.codeleap.co.uk/careers/${cardId}/`);
        } catch (error) {
            // Logging any errors to the console
            console.error(error);
        } finally {
            // After the delete operation, update the parent component's list and close the modal
            attGetList(true);
            onHide();
        }
    }

    // Rendering the modal component
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ fontFamily: "Questrial" }}
        >
            <Modal.Body>
                <p>Are you sure you want to delete this item?</p>
                <Button onClick={() => handleDelete(cardid)}>Yes</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
