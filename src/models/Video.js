import mongoose,{Schema} from 'mongoose';

const videoSchema = new Schema({
    fileUrl : {
        type : String,
        required : 'File URL is required'
    },
    title : {
        type : String,
        required : 'Title is required'
    },
    description : String,
    views : {
        type: Number,
        default: 0
    },
    createdAt : {
        type:Date,
        default: Date.now
    }
});

export default mongoose.model('Video',videoSchema);