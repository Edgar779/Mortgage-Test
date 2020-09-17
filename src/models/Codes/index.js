import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({

    phone: {
        type: String,
    },
    email: {
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


export const Code = mongoose.model('Code', schema);
export default Code;