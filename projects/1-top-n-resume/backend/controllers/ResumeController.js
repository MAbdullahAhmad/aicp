const { connection } = require('../database/connection');
const { Resume } = require('../database/schema/Resume');

class ResumeController{
    hello(req, res){
        res.send('hello');
    }
};

module.exports = ResumeController;