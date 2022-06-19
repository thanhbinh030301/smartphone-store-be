import { ProductModel } from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
    try {
        const products = await ProductModel.find();
        console.log(products);
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const getProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(slug);
        const product = await ProductModel.findOne({slug: `${slug}`});
        // console.log(product);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const updateProduct = async (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    await ProductModel.findByIdAndUpdate(id, req.body, {new: true})
        .then(data => {
            if(!data){
                res.status(404).send({ message: 'Cannot Update user with' + id + '. Maybe user not found!'})
            }else {
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error Update user information"})
        })
}
export const deleteProduct = async (req, res)=>{
    const id = req.params.id;

    await ProductModel.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({ message: 'Cannot Delete with id' + id + '. Maybe id is wrong'})
            }else{
                res.send({
                    message: "User was daleted successfully!",
                    id: id
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
export const addProduct = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty"});
        return;
    }
    //new user
    const product = new ProductModel({
        slug: req.body.name.replace(/\s/g, '-'),
        brand: req.body.brand,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    })

    //save user in the database
    product
        .save(product)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some err occurred while creating a create operation"
            });
        });
}

