const mongo = require("mongoose");
const Datetime = require("Datetime");

const Schema = mongo.Schema

mongo.connect("mongodb+srv://Trids:trids@cluster0.6myshoc.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("mongodB connected");
})
.catch((error)=>{
    console.error("Error in connection: ", error);
})


const messageSchema = new Schema({
    id: {type: Number, required: true},
    receiver_id: {type: Number, required: true},
    sender_id: {type: Number, required: true},
    receiver_msg: {type: String, required: true},
    sender_msg: {type: String, required: true},
    timestamps: {type: Date, required: true},
});

const questionSchema = new Schema ({
    id: {type: Number, required: true},
    category: {type: String, required: true},
    sender_id: {type: Number, required: true},
    question: {type: String, required: true},
    timestamps: {type: Date, required: true}, 
});

const likeSchema = new Schema({
    questionId: {type: mongo.Schema.Types.ObjectId, ref: 'Message', required: true},
    upLikesCount: { type: Number, default: 0 },
    downLikesCount: { type: Number, default: 0 }
});

const commentSchema = new Schema({
    questionId: {type: mongo.Schema.Types.ObjectId, ref: 'Message', required: true},
    comment: { type: String }
});

const userSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    level: {type: String, required: true}
});



const Message = mongo.model('Message', messageSchema)

const Question = mongo.model('Question', questionSchema)

const Like = mongo.model('likeSchema', questionSchema)

const Comment = mongo.model('Comment', commentSchema)

const User = mongo.model('User', userSchema)

module.exports = Message