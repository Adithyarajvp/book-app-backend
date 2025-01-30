const Order = require("./order.model")

const createAOrder = async (req, res) => {
    try{
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        console.error("Error in creating a order", err);
        res.status(500).json({message: "Failed to create order"})
    }
}

const getOrderByEmail = async (req, res) => {
    try{
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});
        if(!orders){
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json(orders);
    }catch(err){
        console.error("Error in fetching  orders", err);
        res.status(500).json({message: "Failed to fetch orders"})
    }
}


module.exports = {
    createAOrder,
    getOrderByEmail
}