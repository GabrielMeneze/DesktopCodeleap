// This code is importing necessary dependencies
import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

interface ModalDeleteProps {
    cardid: number;
    onHide: () => void;
    attGetList: (value: boolean) => void;
    show: boolean;
}


// This component creates a modal that asks the user if they want to delete an item and handles the deletion
export function ModalDelete(props: ModalDeleteProps) {

    // This function is created to handle the deletion of a card
    const handleDelete = async (cardId: number) => {
        try {
            await axios.delete(`https://dev.codeleap.co.uk/careers/${cardId}/`);
        } catch (error) {
            console.error(error);
        } finally {
            props.attGetList(true);
            props.onHide();
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
                    <Button onClick={() => handleDelete(props.cardid)}>Yes</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
