import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// Define the expected props for the ModalPath component
interface ModalPathProps {
    cardid: number;
    title: string;
    content: string;
    onHide: () => void;
    attGetList: (value: boolean) => void;
    show: boolean;
}

export function ModalPath({
    cardid,
    title: propTitle,
    content: propContent,
    onHide,
    attGetList,
    show
}: ModalPathProps) {
    // Local states to handle title and content of the post
    const [title, setTitle] = useState<string>(propTitle);
    const [content, setContent] = useState<string>(propContent);

    // Function to send a PATCH request to update the post details
    async function handlePatch(event: React.FormEvent) {
        event.preventDefault();
    
        try {
            await axios.patch(`https://dev.codeleap.co.uk/careers/${cardid}/`, {
                title,
                content,
            });
        } catch (error) {
            console.error(error);
        } finally {
            // Update the post list and close the modal
            attGetList(true);
            onHide();
        }
    }

    // Sync local state with props whenever they change
    useEffect(() => {
        setTitle(propTitle);
        setContent(propContent);
    }, [propTitle, propContent]);

    // Render a modal with fields to edit the post title and content
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
                <form onSubmit={handlePatch} className="form">
                    <div className="control">
                        <div className="field">
                            <h2>Edit your post</h2>
                            <textarea
                                className="input1"
                                value={title}
                                placeholder="enter the new title"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <textarea
                                className="input2"
                                value={content}
                                placeholder="insert the new content"
                                onChange={event => setContent(event.target.value)}
                            />
                        </div>
                        <div className="form-btn">
                            <Button disabled={!content || !title} type="submit">Edit</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
