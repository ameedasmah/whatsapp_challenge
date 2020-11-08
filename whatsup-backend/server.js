import express from "express"
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher"
import cors from "cors"



const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1103869",
    key: "ba0b397e412fe8de179d",
    secret: "3b6b53dd9b941280842b",
    cluster: "eu",
    useTLS: true
});

//for the middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


//for the databases
const connection_url = 'mongodb+srv://ameed:ameed1234@whatsapp.ikvgp.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change)
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
                pusher.trigger('messages', 'inserted', {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp:messageDetails.timestamp,
                    received :messageDetails.received

                });
            }else {
                console.log("error triggering pusher")
            }
    })
})




app.get('/', (req, res) => {
    res.status(200).send('heloo word')
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            console.log('err')
            res.status(404).send(err)
        }
        else {
            console.log(data)
            res.status(201).send(data)
        }

    })
})

app.post('/messages/new', (req, res) => {
    console.log(req.body)
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            console.log('asd')
            res.status(404).send(err)
        }
        else {
            res.status(200).send(`new message created: \n ${data}`)
        }
    })
})

app.listen(port, () => { console.log(`listening on localhost ${port}`) })