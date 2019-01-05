var express = require('express');
var router = express.Router();
const ServiceProvider = require('../models/serviceProvider');
let serviceProvider = new ServiceProvider();

// router.post('/addParticipant', async function (req, res, next) {
//     console.log(req.body.serviceProviderAddress)
//     serviceProvider.addParticipant(req.body.serviceProviderAddress, req.body.newParticipantAddress)
//         .then((result) => {
//             console.log('success:' + result)
//             res.send({
//                 result: result
//             })

//         })
//         .catch((err) => {
//             console.log('error:' + err)
//             res.send({
//                 result: err
//             })

//         });
// });

router.post('/addParticipant', serviceProvider.addParticipant);
router.post('/createContract', serviceProvider.createContract);
router.get('/getContractDataByDeviceId', serviceProvider.getContractDataByDeviceId);
module.exports = router;