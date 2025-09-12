import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {axiosInstance} from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import RateLimitAlert from "../components/RateLimitAlert.jsx";
import {ArrowLeft} from "lucide-react";

const DetailPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState("")
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [description, setDescription] = useState("")
    const [count, setCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async()=>{
        await axiosInstance.get(`/notes/${id}`).then(res=>{
            setNote(res.data.data)
            setTitle(res.data.data.title)
            setDescription(res.data.data.description)
        }).catch(err=>{
            console.log(err)
            toast.error("Failed to fetch data")
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            toast.error("All Fields Required")
            return;
        }
        setLoading(true)

        await axiosInstance.put(`/notes/${id}`, {title, description}).then(()=>{
            toast.success("Note Updated Successfully")
            setTitle("")
            setDescription("")
            navigateTo("/")
            setLoading(false)
        }).catch(err=>{
            if(err.response.status === 429){
                setIsRateLimited(true)
                setLoading(false)
                console.log(err)
            }
            toast.error("Failed to update the note")
            console.log(err)
            setLoading(false)
        })

    };
    return (
        <div>
            {isRateLimited && <RateLimitAlert />}
            <div className="min-h-screen flex  items-center justify-center  p-4">

                <div className="w-full max-w-lg bg-base-300 rounded-2xl p-6">
                    <div className="flex gap-2 items-center text-blue-500 cursor-pointer hover:text-blue-400 transition-all" onClick={()=>{
                        navigateTo(-1);
                    }}>
                        <ArrowLeft size={20} />
                        Back
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-6 text-primary">
                        Note Details
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter note title"
                                className="w-full px-4 py-2 border-base-300 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter note description"
                                rows={4}
                                className="w-full px-4 py-2 border-base-300 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={isRateLimited || loading}
                            type="submit"
                            className="w-full bg-base-200 text-white py-2 rounded-lg font-medium hover:bg-base-100 transition"
                        >
                            {isRateLimited ? "Please wait "+count+" seconds" : loading ? "Updating" : "Update Note"}

                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;