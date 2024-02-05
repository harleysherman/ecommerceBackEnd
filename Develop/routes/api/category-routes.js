const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(  
    {include: [
    {  
      // be sure to include its associated Products
      model: "product",
      required: true //test if there isn't a product attached to category
    },
  ]})
  .then((data) => {
    res.json(data);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
    Category.findOne(  
      {
        where: {
          id: req.params.id
        },
        include: [
          {  // be sure to include its associated Products
            model: "product",
            required: true //test if there isn't a product attached to category
          }
        ]}
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({ category_name: req.body }, {
    where: {
      id: req.params.id
    }
  })    
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
