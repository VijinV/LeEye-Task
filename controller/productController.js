const Product = require("../model/model");

const loadProductList = async (req, res) => {
  try {
    const product = await Product.find().sort({ _id: -1 });

    res.render("productList", { product });
  } catch (error) {
    console.error(error);
  }
};

const loadAddProduct = async (req, res) => {
  try {
    if (req.query.id) {
      const product = await Product.findOne({ _id: req.query.id });

      res.render("addProduct", { product });
    } else {
      res.render("addProduct");
    }
  } catch (error) {
    console.error(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, mrp, shipping, total, discount, description } = req.body;
    console.log(total);

    const image = req.files;

    if (req.body.id) {
      if (image.length == 0) {
        await Product.findByIdAndUpdate(
            { _id: req.body.id },
            {
              $set: {
                name: name,
                mrp: mrp,
                discount: discount,
                ShippingCharge: shipping,
                TotalAmount: total,
                description: description,
              },
            }
          ).then(()=> res.redirect("/"))
      } else {

        await Product.findByIdAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              name: name,
              mrp: mrp,
              discount: discount,
              ShippingCharge: shipping,
              TotalAmount: total,
              description: description,
              image: image.map((x) => x.filename),
            },
          }
        ).then(()=> res.redirect("/"))
        
      }
    } else {
      const product = new Product({
        name: name,
        mrp: mrp,
        discount: discount,
        ShippingCharge: shipping,
        TotalAmount: total,
        description: description,
        image: image.map((x) => x.filename),
      });

      await product.save().then(() => {
        res.redirect("/");
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {

try {
       if (req.query.id) {
         await Product.findByIdAndDelete({_id: req.query.id}).then(() => {
            res.redirect("/");
         });
       } else {
        
        const product = await Product.find().sort({ _id: -1 });

        res.render("productList", { product,error:"the Product is not found" });
       }
} catch (error) {
    
}

}

module.exports = {
    deleteProduct,
  loadProductList,
  loadAddProduct,
  addProduct,
};
