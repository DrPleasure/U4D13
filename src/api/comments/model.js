import mongoose from "mongoose";

const { Schema, model } = mongoose


const commentsSchema = new Schema(
    {
        blogPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost'
        },
        content: {type: String, required: true},
        author: {type: String, required: true},
     
        	    

    },
    {
        timestamps: true,   // this option automatically handles the createdAt and updatedAt fields
    })   


    export const Comment = model("Comment", commentsSchema)
