import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    codePhone: {
        type: String
    },
    codeEmail: {
        type: String
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Worker = mongoose.model('User', schema);
export default Worker;