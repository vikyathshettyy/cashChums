const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Vikyath%401964@cluster0.owmhwku.mongodb.net/PayTm');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        
    },
    firstName: {
        type: String,
        trim: true,
        required: true,

    },
    lastName: {
        type: String,
        trim: true,
        required: true,

    }
})

const Users = mongoose.model('User',userSchema);

const AccountsSchema = mongoose.Schema({
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    balance: {
        type: Number,
        required: true,
    } 
})

const Account = mongoose.model('Account', AccountsSchema);

module.exports = {
    Users,
    Account
}