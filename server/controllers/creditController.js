import { createRazorpayInstance } from "../configs/razorpayConfig.js"
import { Transaction } from "../models/transaction.model.js"
import crypto from 'crypto'


const razorpayInstance = createRazorpayInstance();

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]



// API controller for getting all plans
export const getPlans = async(req, res) => {
    try {
        res.json({success: true, plans})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// API controller for purchasing a plan
export const purchasePlan = async(req, res) => {
    try {
        const {planId} = req.body
        const userId = req.user._id
        const plan = plans.find(plan => plan._id === planId)

        if(!plan){
            return res.json({success: false, message: "Invalid Plan"}) 
        }

        // create new transaction
        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        })

        const options = {
            amount: plan.price,
            currency: "INR",
            receipt: 'receipt_order_1'
        }
        
        
        razorpayInstance.orders.create(options, (err, order) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
            return res.status(200).json({success: true, message: "Order Created"})
        })

        
            
       
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const verifyPayment = async(req, res) => {
    const {order_id, payment_id, signature} = req.body;

    const secret = process.env.RAZORPAY_SECRET_KEY;

    // create hmac object
    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id + "|" + payment_id);

    const generateSignature = hmac.digest("hex");

    if(generateSignature === signature){
        return res.status(200).json({
            success: true,
            message: "Payment verified"
        });
    }else{
        return res.status(400).json({
            success: false,
            message: "Payment not verified"
        })
    }
}