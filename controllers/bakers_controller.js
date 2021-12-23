const express = require('express');
const baker = express.Router();
const Baker = require('../models/baker');
const bakerSeedData = require('../models/baker_seed');

// INDEX
// .then().catch()
// baker.get('/', (_req, res, next) => {
//   Baker.find()
//     .populate('breads')
//     .then(foundBakers => res.send(foundBakers))
//     .catch(err => next(err))
// })

// async/await with try/catch
baker.get('/', async (_req, res, next) => {
  try {
    const foundBakers = await Baker.find().populate('breads');
    res.send(foundBakers);
  } catch (err) {
    next(err);
  }
});

// SHOW
// .then().catch()
// baker.get('/:id', (req, res, next) => {
//   Baker.findById(req.params.id)
//     .populate('breads')
//     .then(foundBaker => {
//       res.render('bakerShow', {
//         baker: foundBaker,
//       })
//     })
//     .catch(err => next(err))
// })

// async/await with try/catch
baker.get('/:id', async (req, res, next) => {
  try {
    const foundBaker = await Baker.findById(req.params.id).populate('breads');
    res.render('bakerShow', {
      baker: foundBaker,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE
// .then().catch()
// baker.delete('/:id', (req, res, next) => {
//   Baker.findByIdAndDelete(req.params.id)
//     .then(() => res.status(303).redirect('/breads'))
//     .catch(err => next(err))
// })

// async/await with try/catch
baker.delete('/:id', async (req, res, next) => {
  try {
    await Baker.findByIdAndDelete(req.params.id);
    res.status(303).redirect('/breads');
  } catch (err) {
    next(err);
  }
});

// SEED
baker.get('/data/seed', (_req, res) => {
  Baker.insertMany(bakerSeedData).then(res.redirect('/breads'));
});

module.exports = baker;
