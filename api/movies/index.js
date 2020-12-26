import express from 'express';
import {
  getMovies,
  getMovie,
  getMovieReviews
} from '../tmdb-api';
import movieModel from './movieModel';
import User from '../users/userModel';
import Rating from '../rating/ratingModel';
import Review from '../reviews/reviewModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});


router.post('/:id/rating', async (req, res, next) => {
  const userName = jwt.verify(process.env.TOKEN, process.env.SECRET);
  const newRating = req.params.id;
  const rate = req.body.value;
  const movie = await movieModel.findByMovieDBId(newRating).catch(next);
  if (!movie) return res.status(401).json({
    code: 401,
    msg: 'failed. movie not found.'
  });
  const user = await User.findByUserName(userName);
  const ratingId = await User.findByRatedId(movie._id).catch(next);
  if (!ratingId) {

    await Rating.create({
      "movieId": req.params.id,
      "username": userName,
      "ratedScore": rate
    }).catch(next);
    const rating = await Rating.findByid(newRating).catch(next);
    await user.ratings.push(rating._id);
    await movie.ratings.push(rating._id);
    await user.save();
    await movie.save();
  }
  res.status(201).json("successfully add rating");
});

router.delete('/:id/rating', async (req, res, next) => {
  const userName = jwt.verify(process.env.TOKEN, process.env.SECRET);
  const newRating = req.params.id;
  const movie = await movieModel.findByMovieDBId(newRating).catch(next);
  if (!movie) return res.status(401).json({
    code: 401,
    msg: 'failed. movie not found.'
  });
  // console.log(token);
  const user = await User.findByUserName(userName);
  const ratingId = await User.findByRatedId(movie._id).catch(next);
  if (ratingId) {
    await user.ratings.remove(movie._id);
    await movie.ratings.remove(movie._id);
    await Rating.deleteOne({
      "movieId": req.params.id
    }).catch(next);
    await user.save();
  }
  res.status(201).json("successfully delete");
});

router.put('/:id/rating', async (req, res, next) => {
  const userName = jwt.verify(process.env.TOKEN, process.env.SECRET);
  const newRating = req.params.id;
  const rate = req.body.value;
  const movie = await movieModel.findByMovieDBId(newRating).catch(next);
  if (!movie) return res.status(401).json({
    code: 401,
    msg: 'failed. movie not found.'
  });
  const user = await User.findByUserName(userName);
  const ratingId = await User.findByRatedId(movie._id).catch(next);
  if (ratingId) {
    await Rating.findOneAndUpdate({
      "ratedScore": rate
    }).catch(next);
    await user.save();
  }
  res.status(201).json("success");
})

router.get('/:id/reviews', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(577922);
  console.log(movie.reviews);
  // const movie = await movieModel.findByMovieDBId(id).catch(next);
  movieModel.findByMovieDBId(id).populate('reviews').then(
    movie => res.status(201).json(movie.reviews)
  ).catch(next);
});

router.post('/:id/reviews', async (req, res, next) => {
  const author = jwt.verify(process.env.TOKEN, process.env.SECRET);
  const Movieid = req.params.id;
  const content = req.body.content;
  const movie = await movieModel.findByMovieDBId(newRating).catch(next);
  if (!movie) return res.status(401).json({
    code: 401,
    msg: 'failed. movie not found.'
  });
  const user = await User.findByUserName(userName);
  const ratingId = await User.findByRatedId(movie._id).catch(next);
  if (!ratingId) {

    await Rating.create({
      "movieId": req.params.id,
      "username": userName,
      "ratedScore": rate
    }).catch(next);
    const rating = await Rating.findByid(newRating).catch(next);
    await user.ratings.push(rating._id);
    await movie.ratings.push(rating._id);
    await user.save();
    await movie.save();
  }
  res.status(201).json("successfully add rating");
});



export default router;