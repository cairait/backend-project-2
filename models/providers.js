const mongoose = require('mongoose'); //require brinds in all functions that lives in the Mongoose object
const { Schema } = mongoose; //destructuring allows us to only pull out certain functions & classes that we need

const providerSchema = new Schema({
    picture: { type: String }, // This will be a url to display the provider's picture; it will be optional
    firstName: { type: String }, // Provider's first name will be optional
    lastName: { type: String, required: true },
    providerType: { type: String, required: true },
    specialty: { type: String, required: true },
    acceptsMedicaid: { type: Boolean },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments" 
    }]
}, { timestamps: true } )

module.exports = mongoose.model('Provider', providerSchema) 
//Keep the model name capital and singular
//In Mongo, the collection will become lowercase and plural--in this case 'providers'