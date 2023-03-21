// This code is importing necessary dependencies
import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

// This component creates a modal that asks the user if they want to delete an item and handles the deletion
export function ModalDelete(props) {

    // This function is created to handle the deletion of a card
    const handleDelete = async (cardId) => {
        try {
            await axios.delete(`https://dev.codeleap.co.uk/careers/${cardId}/`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ fontFamily: "Questrial" }}
            >
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this item?
                    </p>
                    <Button onClick={() => {
                        handleDelete (props.cardid)
                    }}>Yes</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
        // The above code creates a modal component that prompts the user to confirm
        // deletion and upon confirmation, it sends a delete request to the server using axios.
        // Once the request is successful, it reloads the page to show the updated data.
    );
}