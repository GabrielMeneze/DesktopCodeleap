import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

export function ModalPath(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // This function sends a patch request to the server to update the post's title and content
    async function handlePatch(event) {
        event.preventDefault();
    
        try {
          await axios.patch(`https://dev.codeleap.co.uk/careers/${props.cardid}/`, {
            title,
            content,
          });
          window.location.reload(true);
        } catch (error) {
          console.error(error);
        }
      }

    // This useEffect hook updates the title and content state variables whenever the corresponding props change
    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props.title, props.content])

    // This component renders a modal with a form that allows the user to edit a post's title and content
    return (
        <Modal
            {...props}
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
                            {/* This textarea allows the user to edit the post's title */}
                            <textarea
                                className="input1"
                                type="text"
                                value={title}
                                placeholder="enter the new title"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            {/* This textarea allows the user to edit the post's content */}
                            <textarea
                                className="input2"
                                type="text"
                                value={content}
                                placeholder="insert the new content"
                                onChange={event => setContent(event.target.value)}
                            />
                        </div>
                        {/* This button submits the form and updates the post's title and content */}
                        <div className="form-btn">
                            <Button disabled={!content || !title} type="submit">Edit</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            {/* This button closes the modal */}
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}