const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    Signup : async (req,res,next)=>{
        try {
            let user = User.create(req.body);
            console.log(req.body)
            if(!user)
               return res.json({success:false, message:"user not found"});
            else res.json({user,success:true})
        } catch (error) {
            return next(error)

        }
    },

    Signin : async (req,res,next)=>{
        let{email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user) res.json({success:false,message:"invalid email"});

            if(user.verified) {
                user.verifyPassword(password,(error,matched)=>{
                    if(error) return next(error);
                    if(!matched)
                    res.json({success:false,message:"Invalid Password"});


        jwt.sign({
            userid : user._id,
            username : user.username,
            email : user.email
        },
        "secret",(error,token)=>{
            if(error) return next(error);
            res.json({success:true,message:"you are logged in",token})
        }

        )            
                })
            }
        } catch (error) {
            return next(error)
        }
    },

    ListUsers: async (req, res, next) => {
        try {
          let users = await User.find({}, "-password");
          // console.log(users)
          if (!users)
            return res.json({ success: false, message: "no users found!" });
          res.json({ success: true, users });
        } catch (err) {
          return next(err);
        }
      }
}