const entryRequestModel = require("../models/entryRequest.model");
const { userModel } = require("../models/user.model");

exports.createEntryRequest = async (req, res) => {
    const { visitorName, visitirPhone, visitorPhoto, flatToVisit } = req.body
    try {
        const user = await userModel.findOne({ _id: req.userID })
        if (user.role == 'security') {
            const entryRequest = new entryRequestModel({ visitorName, visitirPhone, visitorPhoto, flatToVisit, createdBy: req.userID })
            const result = await entryRequest.save()
            if (result) {
                return res.send({ 'msg': 'New entry request has been created', 'success': true, 'request': result })
            } else {
                return res.send({ 'msg': 'Something went wrong', 'success': false })
            }
        } else {
            return res.send({ 'msg': 'Only security can create entry rquest', 'success': false })
        }
    } catch (err) {
        console.log(err);
        return res.send({ 'msg': 'Entry request not created', 'success': false })
    }
}

exports.updateEntryRequest = async (req, res) => {
    const { status } = req.body
    try {
        const user = await userModel.findOne({ _id: req.userID })
        if (user.role == 'owner') {
            let _id = req.params.id
            await entryRequestModel.findByIdAndUpdate({ _id }, {status})
            res.send({ "msg": "Entry request has been updated successfully", "success": true })
        } else {
            res.send('Entry request status only update by owner')
        }
    } catch (err) {
        console.log(err);
        return res.send({ 'msg': 'Entry request status has not been updated', 'success': false })
    }
}

exports.getAllRequest = async (req, res) => {
    try {
        const entryRequest = await entryRequestModel.find()
        if (entryRequest) {
            return res.send({ 'msg': 'Entry request fetch successfully', 'success': true, 'data': entryRequest })
        }
    } catch (err) {
        console.log(err);
        return res.send({ 'msg': 'Something went wrong not found entry request', 'success': false })
    }
}