
import express from 'express';
import {getShoes,getWatch,getScale} from './ButterCMS-api'
const router = express.Router(); // eslint-disable-line
router.get('/shoes', function (req, res) {
    getShoes().then(shoes => res.send(shoes)    )
  .catch((error) => next(error));
  })

  router.get('/watch', function (req, res) {
    getWatch().then(shoes => res.send(shoes)    )
  .catch((error) => next(error));
  })

  router.get('/scale', function (req, res) {
    getScale().then(shoes => res.send(shoes)    )
  .catch((error) => next(error));
  })

export default router;