// Importing necessary packages and components
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import { Card } from "../../Components/Card/card"
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { PostMethod } from "../../Components/Modals/registerModal/post"
import "./mainscreen.css"

interface CardProps {
    key: number;
    content: string;
    username: string;
    title: string;
    cardid: number;
    id: number;
}

interface RootState {
    username: string;
}

// Defining Mainscreen component
export const Mainscreen = () => {

    // Initializing state variables
    const [datapost, setDatapost] = useState<CardProps[]>([]);
    const [postmodal, setPostmodal] = useState<boolean>(false);
    const [attGetList, setAttGetList] = useState<boolean>(false);

    const username = useSelector((state: RootState) => state.username);

    useEffect(() => {
        fetchData();
    }, [attGetList === true]);

    // GET request to fetch data
    const fetchData = async () => {
        try {
            const res = await axios.get("https://dev.codeleap.co.uk/careers/");
            setDatapost(res.data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setAttGetList(false);
        }
    };

    // Rendering the component
    return (
        <div className="corpo col-12">
            <video className="video-bg" src="../src/assets/videos/message.mp4" autoPlay muted loop></video>
            <header className="col-8 mx-auto d-flex align-items-center">
                <a className='text-decoration-none' href="/">
                    <h3 className="h">HOME</h3>
                </a>
            </header>
            <section className="col-8 tweet mx-auto d-flex flex-column">
                <article className="row justify-content-center">
                    <div className="card p-4 login col-lg-6 col-12">
                        <h4 className="card-title text-center h">Hello! {username}</h4>
                        <button className="btn btn-dark w-100 mt-2" type="submit" onClick={() => { setPostmodal(true) }}>Share your ideas on CodeleapChat!</button>
                        <PostMethod show={postmodal} onHide={() => setPostmodal(false)} attGetList={setAttGetList} />
                    </div>
                </article>
                <div className="article-container">
                    {/* Rendering Card components for each item in datapost */}
                    {datapost !== undefined && datapost.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                content={item.content}
                                username={item.username}
                                title={item.title}
                                cardid={item.id}
                                attGetList={setAttGetList}
                            />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}