import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import RateLimitAlert from "../components/RateLimitAlert.jsx";
import {axiosInstance} from "../utils/axiosInstance.js";
import NoteCard from "../components/NoteCard.jsx";
import EmptyNotes from "../components/EmptyNotes.jsx";
import {Link} from "react-router";

const HomePage = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false)

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async ()=>{
        setLoading(true)
        await axiosInstance.get("/notes").then(res=>{
            console.log(res.data.data)
            setNotes(res.data.data)
            setLoading(false)
        }).catch(err=>{
            if(err.response.status === 429){
                setIsRateLimited(true);
            }
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <div>
            <Navbar />

            {isRateLimited && <RateLimitAlert />}

            <div className="max-w-6xl mx-auto p-6">
                {notes.length === 0 && !isRateLimited && <EmptyNotes />}
            </div>


            <div className="max-w-6xl mx-auto p-6">
                { notes &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes?.map((note) => (

                        <NoteCard note={note} setNotes={setNotes} />


                    ))}
                </div>
                }
            </div>
        </div>
    );
};

export default HomePage;