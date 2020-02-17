// const mongoose = require("mongoose")   // require mongoose
// const Schema = mongoose.Schema;
// const userSchema = new Schema(
//     {
//         username :{
//             type:String,
//             unique:true,
//             required:true
//         },
//         email :{
//             type:String,
//             unique:true,
//             required:true,
//             match:/@/
//         },
//         password:{
//             type:String,
//             required:true
//         },
//         avatar:{
//             type:String
//         },
//         bio:{
//             type:String
//         }
//     },

//         {timestamps:true}
//     );

// // userSchema.pre("save",function(next){
// //     if(this.password && this.isModified("password")){
        
// //     }
// // })

//     module.exports = mongoose.model("User",userSchema)