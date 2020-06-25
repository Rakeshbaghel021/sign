// All requires

const mongoose = require("mongoose") // require mongoose
const bcrypt = require("bcrypt")     // require bcrypt

// Extracting the schema from the mongoose

const Schema = mongoose.Schema;    

// Creating the schema for the user

const userSchema = new Schema(
    {
        username :{
            type:String,
            unique:true,
            required:true
        },
        email :{
            type:String,
            unique:true,
            required:true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address"
              ]
        },
        password:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        bio:{
            type:String
        }
    },

        {timestamps:true}
    );

// Implementing The Pre-save Function To Hash The Password

userSchema.pre("save",async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password  = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
    })

// Comparig The Hash And Plane Password

userSchema.methods.verifyPassword = async function(password,next){
    try {
        const match = await bcrypt.compare(password,this.password)
        return match;
    } catch (error) {
        next(error)
        
    }
    
}

// making the model of the schema and exporting the model
    module.exports = mongoose.model("User",userSchema)