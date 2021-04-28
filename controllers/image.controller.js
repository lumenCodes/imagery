const {Image} = require ('../models/image') //model and schema

const userController = require('./user.controller')

class ImageController {
    async create(req, res){
        try {
            const image = new Image(req.body);

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

    async getAll(req, res){
        const images = await Image.find()
        res.status(200).send({message: 'this is all the images', data: images});    
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