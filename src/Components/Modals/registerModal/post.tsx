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
    attGetList: Dispatch<SetStateAction<boolean>>;
}

export const PostMethod: React.FC<PostModalProps> = (props) => {
    // Using React's 'useState' hook to manage the component's state
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // Using React-Redux's 'useDispatch' hook to get access to the Redux store's dispatch function
    const dispatch = useDispatch()

    const username = useSelector((state: any)=> state.username)

    // Defining a function called 'Post' that takes 'event' as a parameter
    async function HandlePost(event) {
        event.preventDefault();
        try {
          const response = await axios.post('https://dev.codeleap.co.uk/careers/', {
            username: username,
            title: title,
            content: content
          });
          dispatch(increment(response.data.id));
        } catch (error) {
          console.error(error);
        }finally{
            props.attGetList(true)
            props.onHide()
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
                 {/* Rendering a form with the 'onSubmit' attribute set to the 'Post' function */}
                <form onSubmit={HandlePost} className="form">
                    <div className="control">
                        <div className="field">
                            <h2>Make a post!</h2>
                            <textarea
                                className="input1"
                                value={title}
                                placeholder="Title"
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <textarea
                                className="input2"
                                value={content}
                                placeholder="What is on your mind?"
                                onChange={event => setContent(event.target.value)}
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