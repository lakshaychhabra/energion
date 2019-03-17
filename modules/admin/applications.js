const applications = require(__base + 'models/consumer.js');

const getApplications = (req, res) => {
    let filter = req.query.filter == 'accepted' ? 1 : req.query.filter == 'rejected' ? -1 : req.query.filter == 'completed' ? 2 : 0;

    applications.find({ 'status': filter }, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: 'Something has gone wrong. ',
                technical: err.message
            });
        }
        else {
            res.json({
                success: true,
                msg: 'Applications',
                data: data
            });
        }
    });
}

module.exports = getApplications;