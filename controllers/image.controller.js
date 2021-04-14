class ImageController {
async create(req, res){
    res.send('Image created')

};

async getAll(req, res){
res.send('this is all the images')    
}
};

module.exports = new  ImageController()