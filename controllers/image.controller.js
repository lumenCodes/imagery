const {Image} = require ('../models/image') //model and schema
const {User} = require('../models/user')
const userController = require('./user.controller')
const cloudinary = require('../config/cloudinary')

class ImageController {
    async create(req, res){
        try {
            // validation file and body
            if (!('file' in req)) {
                return res.send('file no attached')
            }
            // multer have taken over and req.file exist

            // this is a response from cloudinary
            const response = await cloudinary.uploadImage(req.file.path)
            
            const { title, dimension,extension } = req.body
            const image = await new Image({
                title: req.file.originalname.split('.')[0],
                imageURL: response.secure_url,
                dimension: response.width,
                extension: response.format
            });   
            
            await image.save()
            res.status(201).send({
                success: true,
                message: 'Image created',
                data: image
            });
        } catch (error) {
            res.send(error)
        }

    };

    getAll = async (req, res) => {
        
        const images = await Image.find()
        res.status(200).send({message: 'this is all the images ' + images.length, data: images});    
    };

    async getOne(req, res){
        const image = await Image.findById(req.params.id)
        if(!image) return res.status(404).send({
            success: false,
            message: 'Image does not exist'
        })
        res.status(200).send({
            success: true,
            message: 'Image found',
            data: image            
        })
    }

    async update(req, res){
        // validate
        if(!(Object.entries(req.body).length)){
            return res.status(400).send({
                success: false,
                message: 'There is no update parameter'
            }
            )
        }
    
        const options = {
            new: true
        }

        await Image.findByIdAndUpdate(req.params.id, req.body, options, (error, image) => {
            // we have checked error
            if(error) {
                return res.status(400).send({ success: false, message: error.message });
            }
/**
 * I noticed there is no user.save method here.
 */
            if(!image) return res.status(404).send({ success: false, message: 'image not found or might have been deleted'})

            // the operation went succesful

            res.status(200).send({
            success: true,
            message: 'Image detail updated succesfully',
            data: image
            })

        })
        
    };

    async delete(req, res){

        const image = await Image.findByIdAndDelete(req.params.id)
        if (!image) return res.status(400).send({
            success: false,
            message: 'Image is not in the database or Incorrect image id'
        })
        await image.delete()
        res.status(200).send({
            success: true,
            message: 'Image deleted succesfully',
            data: image
        })
    };
};


module.exports = new  ImageController()