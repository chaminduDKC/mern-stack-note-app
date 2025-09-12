import Note from "../models/Note.js";

export const createNote = async (req, res)=>{
  try {
    const {title, description} = req.body;
    if(!title || !description){
      res.status(400).json({message:"Invalid Request Body"});
      return
    }
    const newNote = await new Note({title, description});
    await newNote.save();
    res.status(201).json({message:"Note Created", data:{title, description, id:newNote.id}})
  } catch (e) {
    console.log(e)
    res.status(500).json({message:"Failed to Create"})
  }
};

export const getNotes = async (req, res)=>{
  const notes = await Note.find().sort({createdAt:-1}); // .sort({createdAt:-1} -> newest first -> desc order
  res.status(200).json({message:"All Notes Received", data:notes})
};

export const getNote = async (req, res)=>{
  if(!req.params.id) return res.status(401).json({message:"Empty id"});
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message:"Note does not exist"});
    res.status(200).json({message:"Not retrieved", data:note})
  } catch (e) {
    console.log(e)
    res.status(500).json({message:e.message})
  }



}

export const updateNote = async (req, res)=>{
  if(!req.params.id){
    res.status(400).json({message:"Id is empty"})
    return;
  }
  try {
    const {title, description} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, description}, {new:true});
    if(!updatedNote) return res.status(404).json({message:"Invalid Id"})
    res.status(200).json({message:"Note Updated", data:updatedNote});
  } catch (e) {
    console.log(e)
    res.status(500).json({message:"Failed to Update"})
  }

};

export const deleteNote = async (req, res)=>{
  if(!req.params.id) return res.status(401).json({message:"Empty id"})

  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if(!deletedNote) return res.status(404).json({message:"Id does not exist"})

  res.status(200).json({message:"deleted Success"});
};