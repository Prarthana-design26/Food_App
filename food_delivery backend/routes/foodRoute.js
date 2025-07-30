import express from 'express';
import { addFood ,listFood,removeFood } from '../controllers/foodControllers.js';
import multer from 'multer';

const foodRouter = express.Router();

//Image storage engine//use to save uploaded data in disk storage 
// destination creates a folder named as uploads to save all uploaded file in this folder. eg,uploads/1721462879000cat.png
// file name is set to current time in seconds with its orignal name
const storage = multer.diskStorage({
    destination : "uploads",
    filename :(req,file,cb) =>
    {
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})
const upload = multer({storage:storage});




foodRouter.post('/add',upload.single("image"),addFood);

foodRouter.get('/list',listFood)

foodRouter.post('/remove/',removeFood)










export default foodRouter;
































