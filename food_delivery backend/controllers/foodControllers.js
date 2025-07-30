import foodModel from '../models/foodModel.js';
import fs from 'fs';

// add food item

const addFood = async (req,res) =>
{
    let image_filename= `${req.file.filename}`
    const food = new foodModel({
        name:req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })
    try{
        await food.save();
        res.json({success : true , message : "food added"})
    }
    catch(err)
    {   
        console.log(err);
        res.json({success : false , message : "Error"})
    }


}

// add food list

const listFood = async (req,res) =>
{
    try{
        const foods = await foodModel.find({});
        res.json({
            success:true,
            data:
            {
                foods
            }
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            success:false,
            msg:"error"
        })
    }
}

// remove food items 

const removeFood = async (req,res) =>
{
    try{
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`,() =>{})

        await foodModel.findByIdAndDelete(req.body._id);
        res.json({
            success:true,
            msg:"Food removed"
        })
    }
    catch(err)
    {
        console.log(err);
        res.json({
            success:false,
            msg:"Error"
        })
    }
}




export {addFood ,listFood,removeFood};





























