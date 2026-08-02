const express = require("express");
const router = express.Router();
const GameReview = require("../modules/GameReview");
const { requireAuth } = require("../middleware/auth");
const { User, WishList, Likes , Dislikes} = require("../modules/index");

router.get("/", async (req, res, next) => {
  try {
    const allReviews = await GameReview.findAll();

    return res.json(allReviews);
  } catch (err) {
    next(err);
  }
});
router.get("/wishlist", requireAuth, async (req, res, next)=>{
  try {
    const wishlist = await WishList.findAll({
      where: {
        userId: req.user.id,
      },
      include: GameReview,
    });

    res.json(wishlist);
  } catch (err) {
    next(err);
  }
})
// router.get("/:id/like", requireAuth, async (req, res, next)=>{
//   try {
//     const like= await WishList.findAll({
//       where: {
//         userId: req.user.id,
//       },
//       include: GameReview,
//     });

//     res.json(like);
//   } catch (err) {
//     next(err);
//   }
// })

router.get("/:id", async (req, res, next) => {
  try {
    const review = await GameReview.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: WishList
        },
        {
          model: Likes
        },
        {
          model: Dislikes
        }
      ]
    });
    if (!review) {
      return res.sendStatus(404);
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
});

router.post("/create", requireAuth, async (req, res, next) => {
  try {
    const { title, description, duration, rating, genre } = req.body;

    const createReview = await GameReview.create({
      title,
      description,
      duration,
      rating,
      genre,
      userId: req.user.id
    });

    return res.status(201).json(createReview)
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/edit", requireAuth, async (req, res, next) => {
  try {
    const fixReview = await GameReview.findByPk(req.params.id);

    if (!fixReview) {
      return res.sendStatus(404);
    }

    if (fixReview.userId !== req.user.id) {
      return res.sendStatus(403);
    }

    await fixReview.update(req.body);
    res.status(200).json(fixReview);

  } catch (err) {
    next(err);
  }
});

router.post("/wishlist", requireAuth, async(req,res, next)=>{
    try {

    const { gameReviewId } = req.body;


    const wishlist = await WishList.create({
      userId: req.user.id,
      gameReviewId
    });


    res.status(201).json(wishlist);


  } catch (err) {

    next(err);

  }
} )

router.post("/:id/dislike", requireAuth, async(req,res, next)=>{
    try {
const alreadyDisLiked = await Dislikes.findOne({
      where: {
        userId: req.user.id,
        gameReviewId: req.params.id,
      },
    });

    if (alreadyDisLiked) {
      return res.status(400).json({ message: "You already disliked this review." });
    }
    const newDislike = await Dislikes.create({
      userId: req.user.id,
      gameReviewId: req.params.id
    });

const disliked = await Dislikes.findOne({
      where: { gameReviewId: req.params.id },
    });

    res.status(201).json(disliked);


  } catch (err) {

    next(err);

  }
} )
router.post("/:id/like", requireAuth, async(req,res, next)=>{
    try {
  const alreadyLiked = await Likes.findOne({
      where: {
        userId: req.user.id,
        gameReviewId: req.params.id,
      },
    });

    if (alreadyLiked) {
      return res.status(400).json({ message: "You already liked this review." });
    }
    const NewLike = await Likes.create({
      userId: req.user.id,
      gameReviewId: req.params.id
    });
const liked = await Likes.findOne({
      where: { gameReviewId: req.params.id },
    });

    res.status(201).json(liked);


  } catch (err) {

    next(err);

  }
} )

router.delete("/:id/delete",requireAuth, async (req, res, next) => {
  try {
    const deleteReview = await GameReview.findByPk(req.params.id);

    if (!deleteReview) {
      return res.sendStatus(404);
    }

    if (deleteReview.userId !== req.user.id) {
      return res.sendStatus(403);
    }

    await deleteReview.destroy();
    res.sendStatus(204);

  } catch (err) {
    next(err);
  }
});

router.delete("/:id/wishlist/delete",requireAuth, async (req, res, next) => {
  try {
      const wishlist = await WishList.findOne({
      where: {
        userId: req.user.id,
        gameReviewId: req.params.id,
      },
    });

    if (!wishlist) {
      return res.sendStatus(404);
    }

    await wishlist.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});



router.use((err, req, res, nex) => {
  console.error(err);
  res.sendStatus(500);
});

module.exports = router;