import mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({ // create schema
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
    {timestamps:true}
);
const Note = mongoose.model("Note", NoteSchema); // create model using schema

export default Note;