import React, {useEffect, useState} from 'react';
import axios from "axios";
import RateLimitAlert from "../components/RateLimitAlert.jsx";
import {ArrowLeft}  from "lucide-react";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";
import {axiosInstance} from "../utils/axiosInstance.js";

const CreatePage = () => {

    const [title, setTitle] = useState("");
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [description, setDescription] = useState("");

    const [count, setCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (count <= 0) {
            setIsRateLimited(false)
            return
        } // stop when 0

        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // cleanup on unmount or re-render
    }, [count]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            toast.error("All Fields Required")
            return;
        }
        setLoading(true)

        await axiosInstance.post("/notes", {title, description}).then((res)=>{
            console.log(res)
            toast.success("Note Created Successfully")
            setTitle("")
            setDescription("")
            setLoading(false)
        }).catch(err=>{
            if(err.response.status === 429){
                setIsRateLimited(true)
                setLoading(false)
                console.log(err)
            }
            toast.error("Failed to create the note")
            console.log(err)
            setLoading(false)
        })

    };
    return (
        <>
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
                    Create a Note
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
                        {isRateLimited ? "Please wait "+count+" seconds" : loading ? "Creating" : "Create Note"}

                    </button>

                </form>
            </div>
        </div>
        </>
    );
};

export default CreatePage;