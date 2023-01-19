import mongoose from "mongoose";
const { Schema, model } = mongoose


const postsSchema = new Schema(
    {
        category: {type: String, required: true},
        title: {type: String, required: true},
        cover:{type: String, required: true},
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [],
        readTime: {
          value: {type: Number, required: true},
          unit: {type: String, required: true},

        },
        authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
        	    content:  {type: String, required: true},
              

    },
    {
        timestamps: true,   // this option automatically handles the createdAt and updatedAt fields
    })   

    postsSchema.method("addLike", async function (userId) {
      this.likes.addToSet(userId);
      await this.save();
    });
    
    postsSchema.method("removeLike", async function (userId) {
      this.likes.pull(userId);
      await this.save();
    });
      // ********************************************************* MONGOOSE CUSTOM METHOD **************************************************************

postsSchema.static("findBooksWithAuthors", async function (query) {
  const total = await this.countDocuments(query.criteria)

  const posts = await this.find(query.criteria, query.options.fields, 'likes')
    .skip(query.options.skip)
    .limit(query.options.limit)
    .sort(query.options.sort)
    .populate({
      path: "authors",
      select: "firstName lastName",
    })

  return { total, posts }
})

postsSchema.static("findPostsWithLikes", async function (query) {
  const total = await this.countDocuments(query.criteria);
  const posts = await this.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort)
      .populate({
          path: "likes",
          select: "username",
      });
  return { total, posts };
});


export default model("Post", postsSchema)  //  this model is now automatically linked to the "Blogposts" collection, if it's not there it will be created