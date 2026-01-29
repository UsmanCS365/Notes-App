const mongoose =require("mongoose")
const notesSchema =mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        maxlength: [20, "title cannot contain more than 18 characters"]
    },
    content: {
        type: String,
        
        unique: true,
        required: true,
        maxlength: [200, "content cannot contain more than 200 characters"]
    }
})
const notesModel =mongoose.model("notes", notesSchema)
module.exports =notesModel