const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Category.findAll(
    {include: [
      {  
        // be sure to include its associated Product data
        model: "product",
        required: true //test if there isn't a product attached to category
      },
    ]
    }
  )
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Category.findOne(  
    {
      where: {
        id: req.params.id
      },
      include: [
        {  
          // be sure to include its associated Product data
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
  // create a new tag
  Category.create(req.body)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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
  // delete on tag by its `id` value
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
