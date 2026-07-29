const express = require("express");
const router = express.Router();
const GameReview = require("../modules/Games");

router.get("/", async (req, res, next) => {
  try {
    const allReviews = await GameReview.findAll();

    return res.json(allReviews);
  } catch (err) {
    next();
  }
});

router.get("/id", async (req, res, next) => {
  try {
    const review = await GameReview.findByPk(req.params.id);
    if (!review) {
      return res.sendStatus(404);
    }
    res.json(review);
  } catch (err) {
    next();
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, description, duration, rating, genre } = req.body;
    const createReview = await GameReview.create({
      title,
      description,
      duration,
      rating,
      genre,
    });
    return res.status(201).json(createReview)
  } catch (err) {
    next();
  }
});
router.patch("/id", async (req, res, next) => {
  try {
    const fixReview= await GameReview.findByPk(req.params.id)
    if(!fixReview){
        return res.sendStatus(404)
    }
    await fixReview.update(req.body)
    res.status(200).json(fixReview)
  } catch (err) {
    next();
  }
});

router.delete("/id", async (req, res, next) => {
  try {
    const deleteReview= await GameReview.findByPk(req.params.id)

    if(!deleteReview){
        return res.sendStatus(404)
    }deleteReview.destroy()
    res.sendStatus(204)
  } catch (err) {
    next();
  }
});

router.use((err,req,res, nex)=>{
    console.error(err)
    res.sendStatus(500)
})

module.exports=router