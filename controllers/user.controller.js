class UserController{
    async delete(req, res){
        res.send('User deleted')
    };

    async update(req, res){
        res.send('user details updated succesfully')
    };
};


module.exports = new UserController()