import React  from 'react';
import {formatDateAndTime} from "../utils/Utils.js";
import {PencilIcon, Trash2Icon} from "lucide-react";
import {axiosInstance} from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import {Link} from "react-router";

const NoteCard = ({note, setNotes}) => {

    const maxDescLength = 100;
    const truncateText = (text) => {
        if (text.length <= maxDescLength) return text;
        return text.slice(0, maxDescLength) + "...";
    };

    const deleteNote = async (id) =>{
        await axiosInstance.delete(`/notes/${id}`).then(res=>{
            toast.success("Note Deleted Success")
            document.getElementById("my_modal_2").close();
            setNotes((prev)=> prev.filter(note=> note._id !== id)) // update ui after delete
        }).catch(err=>{
            if(err.response.status === 429){
                toast.error("Too many requests. Try later");
            }
            toast.error("Failed to delete")
            console.log(err)
        })
    }
    return (
        <>
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box flex items-center justify-between">
                <h3 className="font-bold text-lg">Delete Note?</h3>
                <div className="flex items-center gap-6">
                    <button onClick={()=>{
                        document.getElementById("my_modal_2").close();
                    }} className="btn btn-outline">close</button>
                    <button className="btn btn-error text-white "  onClick={()=>{
                        deleteNote(note?._id)
                    }}>delete</button>
                </div>
            </div>



        </dialog>
            <Link to={`/note/${note?._id}`}>
        <div className="flex flex-col justify-between p-4 rounded-lg shadow-md border-b-8  bg-base-300">
            <h2 className="text-lg font-bold mb-2 line-clamp-1">{note.title}</h2>

            <p className="text-sm text-gray-100 flex-1">
                {truncateText(note.description)}
                {note.description.length > maxDescLength && (
                    <a href={`/note/${note._id}`} className="text-primary ml-1 hover:underline">
                        See more
                    </a>
                )}
            </p>

            <div className="flex items-center justify-between mt-4">
                <span className="text-md text-gray-500">{formatDateAndTime(note?.createdAt)}</span>
                <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                        <PencilIcon className="h-5 w-5" />
                    </button>


                    <button onClick={(e)=>{
                        e.preventDefault() // to prevent going to note detail page instead of opening delete modal
                        document.getElementById('my_modal_2').showModal()
                    }} className="text-red-600 hover:text-red-800">
                        <Trash2Icon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
            </Link>
        </>
    );
};

export default NoteCard;