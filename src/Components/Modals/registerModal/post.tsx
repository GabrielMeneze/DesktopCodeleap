import axios from 'axios';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { increment } from '../../../models/features/redux-slice';
import "./post.css";

// Define the properties expected for the component
interface PostModalProps {
    show: boolean;
    onHide: () => void;
    attGetList: (value: boolean) => void;
}

// Define the format of the Redux state slice this component accesses
interface RootState {
    username: string;
}

export const PostMethod: React.FC<PostModalProps> = ({ show, onHide, attGetList }) => {
    // Local state to manage post's title and content
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // Redux hooks
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.username);

    // Generic function to handle state changes based on events
    const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setState(event.target.value);
        };

    // Function to handle post submission
    async function handlePost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // Make a POST request to add a new post
            const response = await axios.post('https://dev.codeleap.co.uk/careers/', {
                username,
                title,
                content
            });

            // Update Redux state with the ID of the new post
            dispatch(increment(response.data.id));
        } catch (error) {
            console.error(error);
        } finally {
            // Refresh the post list and close the modal
            attGetList(true);
            onHide();
        }
    }

    // Render the post modal
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ fontFamily: "Questrial", color: "#FFF" }}>
            <Modal.Header className='text-center'>
                <h2>Make a post!</h2>
            </Modal.Header>
            <form onSubmit={handlePost} className="post-form">
                <Modal.Body style={{ backgroundColor: "#181818", color: "#FFF" }}>
                    <div className="control">
                        <div className="field">
                            <textarea className="input-title dark-input" value={title} placeholder="Title" onChange={handleChange(setTitle)} />
                        </div>
                        <div className="field">
                            <textarea className="input-content dark-input" value={content} placeholder="What is on your mind?" onChange={handleChange(setContent)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#181818", borderTop: "1px solid #333" }}>
                    <Button onClick={onHide}>Close</Button>
                    <Button
                        disabled={!content || !title}
                        type="submit"
                        className={!content || !title ? "btn-secondary" : "btn-success"}>
                        POST
                    </Button>
                
                </Modal.Footer>
            </form>
        </Modal>
    );
}
