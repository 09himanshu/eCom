// This file contains signup validation

const authValidator = (req, res, next) => {

    // check for user name
    if(req.body.name) {
        let name = req.body.name;
        if(name.length < 3 || name.length > 30) {
            res.status(400).send({message: `Name must be greater than ${3} || smaller than ${30} characters`});
            return;
        } else {
            res.status(400).send({message: `Name is not provided`});
        }
    }

    next();
}

module.exports = {
    authValidator: authValidator,
}