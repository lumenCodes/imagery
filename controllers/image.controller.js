const {Image} = require ('../models/image') //model and schema


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

    async update(req, res){
        const image = await Image.findByIdAndUpdate()
        res.status(200).send({
            success: true,
            message: 'Image detail updated succesfully',
            data: image
        })
    };

    async delete(req, res){
        const image = await Image.findByIdAndDelete()
        res.status(201).send({
            success: true,
            message: 'Image deleted succesfully',
            data: image
        })
    };
};


module.exports = new  ImageController()