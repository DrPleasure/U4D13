import mongoose from "mongoose"

const { Schema, model } = mongoose

const authorsSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  },
  {
    timestamps: true,
  }
)

export default model("Author", authorsSchema)