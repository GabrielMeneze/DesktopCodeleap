import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from "react"
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { increment } from '../../../models/features/redux-slice'
import "./post.css";

interface PostModalProps {
    show: boolean;
    onHide: () => void;
    attGetList: (value: boolean) => void;
}

interface RootState {
    username: string;
}

export const PostMethod: React.FC<PostModalProps> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.username);

    // Defining a function called 'Post' that takes 'event' as a parameter
    async function HandlePost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await axios.post('https://dev.codeleap.co.uk/careers/', {
                username: username,
                title: title,
                content: content
            });
            dispatch(increment(response.data.id)); // supondo que increment é uma ação do Redux que aceita um número
        } catch (error) {
            console.error(error);
        } finally {
            props.attGetList(true);
            props.onHide();
        }
    }

    // Rendering a Modal component from Bootstrap with the specified props and styling
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ fontFamily: "Questrial" }}
        >
            <Modal.Body>
                <form onSubmit={HandlePost} className="form">
                    <div className="control">
                        <div className="field">
                            <h2>Make a post!</h2>
                            <textarea
                                className="input1"
                                value={title}
                                placeholder="Title"
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <textarea
                                className="input2"
                                value={content}
                                placeholder="What is on your mind?"
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
                            />
                        </div>
                        <div className="form-btn">
                            <Button disabled={!content || !title} type="submit">POST</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}