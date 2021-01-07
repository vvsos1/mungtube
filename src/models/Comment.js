import mongoose,{Schema} from 'mongoose';

const CommentSchema = new Schema({
    text : {
        type : String,
        required : 'Text is required'
    },
    createdAt : {
        type:Date,
        default: Date.now
    }
});

export default mongoose.model('Comment',CommentSchema);