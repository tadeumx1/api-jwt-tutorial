const productsData = require('../products.json')

// ProductController

class ProductController {
  async index(req, res) {

    const { products } = productsData

    return res.json({ products })

  }
}

module.exports = new ProductController();
