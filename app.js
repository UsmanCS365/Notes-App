const express =require("express")
const path =require("path")
const notesModel =require("./models/notesModel")
const cookieParser =require("cookie-parser")
const dotenv =require("dotenv")
const connectToDb =require("./config/db")
const app =express()
const port =3000
dotenv.config()
connectToDb()
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/notes", async  (req, res)=>{
    const notes =await notesModel.find()
    res.render("all_notes", {notes})
})
app.post("/notes", async  (req, res)=>{
    const {title, content} =req.body
    const newNote =await notesModel.create({
        title: title,
        content: content
    })
    res.redirect("/notes")
})
app.get("/update/:noteid", async (req, res)=>{
    const note =await notesModel.findOne({_id: req.params.noteid})
    res.render("update", {note})

})
app.post("/update/:noteid", async (req, res)=>{
    const {newtitle, newcontent} =req.body
    const noteToUpdate =await notesModel.findOneAndUpdate({_id: req.params.noteid}, {title: newtitle, content: newcontent})
    res.redirect("/notes")

})
app.post("/delete/:noteid", async (req, res)=>{
    const noteToDelete =await notesModel.findOneAndDelete({_id: req.params.noteid})
    res.redirect("/notes")
})
app.listen(port, ()=>{
    console.log("Server is running")
})