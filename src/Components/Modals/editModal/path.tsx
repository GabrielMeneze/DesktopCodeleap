import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

interface ModalPathProps {
    cardid: number;
    title: string;
    content: string;
    onHide: () => void;
    attGetList: (value: boolean) => void;
    show: boolean;
}

export function ModalPath(props: any) {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    // This function sends a patch request to the server to update the post's title and content
    async function handlePatch(event: React.FormEvent) {
        event.preventDefault();
    
        try {
          await axios.patch(`https://dev.codeleap.co.uk/careers/${props.cardid}/`, {
            title,
            content,
          });
        } catch (error) {
          console.error(error);
        } finally {
            props.attGetList(true);
            props.onHide();
        }
    }

    // This useEffect hook updates the title and content state variables whenever the corresponding props change
    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props.title, props.content]);

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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}