const mongoos = require('mongoose')

const entryRequestSchema = mongoos.Schema({
    visitorName: { type: String, required: true },
    visitirPhone: { type: String, required: true },
    visitorPhoto: { type: String },
    flatToVisit: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
    createdBy: { type: mongoos.Schema.Types.ObjectId, ref: 'User' }
}, {
    versionKey: false,
    timestamps: true
})

const entryRequestModel = mongoos.model('entryRequest', entryRequestSchema)

module.exports = entryRequestModel;