const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')

// INDEX
// .then().catch()
// breads.get('/', (_req, res, next) => {
//   Baker.find()
//     .then(foundBakers => {
//       Bread.find().then(foundBreads => {
//         res.render('index', {
//           breads: foundBreads,
//           bakers: foundBakers,
//           title: 'Index Page',
//         })
//       })
//     })
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.get('/', async (_req, res, next) => {
  try {
    const foundBakers = await Baker.find()
    const foundBreads = await Bread.find()
    res.render('index', {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page',
    })
  } catch (err) {
    next(err)
  }
})

// NEW
// .then().catch()
// breads.get('/new', (_req, res, next) => {
//   Baker.find()
//     .then(foundBakers => {
//       res.render('new', {
//         bakers: foundBakers,
//       })
//     })
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.get('/new', async (_req, res, next) => {
  try {
    const foundBakers = await Baker.find()
    res.render('new', {
      bakers: foundBakers,
    })
  } catch (err) {
    next(err)
  }
})

// SHOW
// .then().catch()
// breads.get('/:id', (req, res, next) => {
//   Bread.findById(req.params.id)
//     .populate('baker')
//     .then(foundBread => {
//       res.render('show', {
//         bread: foundBread,
//       })
//     })
//     .catch(err => {
//       next(err)
//     })
// })

// async/await with try/catch
breads.get('/:id', async (req, res, next) => {
  try {
    const foundBread = await Bread.findById(req.params.id).populate('baker')
    res.render('show', {
      bread: foundBread,
    })
  } catch (err) {
    next(err)
  }
})

// EDIT
// .then().catch()
// breads.get('/:id/edit', (req, res, next) => {
//   Baker.find()
//     .then(foundBakers => {
//       Bread.findById(req.params.id)
//         .then(foundBread => {
//           res.render('edit', {
//             bread: foundBread,
//             bakers: foundBakers,
//           })
//         })
//         .catch(err => next(err))
//     })
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.get('/:id/edit', async (req, res, next) => {
  try {
    const foundBakers = await Baker.find()
    const foundBread = await Bread.findById(req.params.id)
    res.render('edit', {
      bread: foundBread,
      bakers: foundBakers,
    })
  } catch (err) {
    next(err)
  }
})

// UPDATE
// .then().catch()
// breads.put('/:id', (req, res, next) => {
//   if (req.body.hasGluten === 'on') {
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(() => {
//       res.redirect(`/breads/${req.params.id}`)
//     })
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.put('/:id', async (req, res, next) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  try {
    await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.redirect(`/breads/${req.params.id}`)
  } catch (err) {
    next(err)
  }
})

// CREATE
// .then().catch()
// breads.post('/', (req, res, next) => {
//   if (!req.body.image) {
//     req.body.image = undefined
//   }
//   if (req.body.hasGluten === 'on') {
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   Bread.create(req.body)
//     .then(() => res.redirect('/breads'))
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.post('/', async (req, res, next) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  try {
    await Bread.create(req.body)
    res.redirect('/breads')
  } catch (err) {
    next(err)
  }
})

// DELETE
// .then().catch()
// breads.delete('/:id', (req, res, next) => {
//   Bread.findByIdAndDelete(req.params.id)
//     .then(() => res.status(303).redirect('/breads'))
//     .catch(err => next(err))
// })

// async/await with try/catch
breads.delete('/:id', async (req, res, next) => {
  try {
    await Bread.findByIdAndDelete(req.params.id)
    res.status(303).redirect('/breads')
  } catch (err) {
    next(err)
  }
})

module.exports = breads
