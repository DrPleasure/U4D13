
import express from "express"
import postsModel from "./model.js"

const postsRouter = express.Router()




postsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new postsModel(req.body)
    // here it happens validation (thanks to Mongoose) of req.body, if it is not ok Mongoose will throw an error
    // if it is ok the user is not saved yet
    const { _id } = await newPost.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await postsModel.find()
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/:postId/likes", async (req, res) => {
  try {
    const post = await postsModel.findOne({ title: req.params.title }).select("likes");
    if (!post) {
        throw createHttpError(404, "Post not found");
    }
    const likes = post.likes;
    res.json({ likes });
  } catch (err) {
    next(err);
  }
});


postsRouter.get("/:postId", async (req, res, next) => {
    try {
        const post = await postsModel.findById(req.params.postId).populate({
          path: "authors",
          select: "firstName lastName",
        })
        if (post) {
          res.send(post)
        } else {
          next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
        }
      } catch (error) {
        next(error)
      }
    })

    postsRouter.put("/:postId", async (req, res, next) => {
      try {
          const currentLikes = await postsModel.findById(req.params.postId).select("likes");
          let newLikes;
          if (action === "like") {
            await Post.findOneAndUpdate({ _id: postId }, { $addToSet: { likes: userId } });
        } else if (action === "unlike") {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } });
        }
          req.body.likes = newLikes;
          const updatedPost = await postsModel.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true, runValidators: true }
          );
      
          if (updatedPost) {
            res.send(updatedPost);
          } else {
            next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
          }
        } catch (error) {
          next(error);
        }
  });
  

postsRouter.delete("/:postId", async (req, res, next) => {
    try {
        const deletedPost = await postsModel.findByIdAndDelete(req.params.postId)
    
        if (deletedPost) {
          res.status(204).send()
        } else {
          next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
        }
      } catch (error) {
        next(error)
      }
    })

    postsRouter.post("/:id/likes", async (req, res) => {
      const post = await Post.findById(req.params.id);
      await post.addLike(req.body.userId);
      res.send("Like added!");
    });
    
    postsRouter.delete("/:id/likes", async (req, res) => {
      const post = await Post.findById(req.params.id);
      await post.removeLike(req.body.userId);
      res.send("Like removed!");
    });

export default postsRouter