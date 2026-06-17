import mongoose , {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
         required:true
    },
    username:{
         type:String,
         required:true,
         unique:true

    },
    email:{
        type:String,
         required:true,
         unique:true
    },
     active:{
         type:Boolean,
         default:true
    },
    password:{
      type:String,
      required:true
    },
    ProfilePicture:{
        type:String,
        default:'default.jpg'
    },
    fileType:{
    type:String,
        default:''
    },
    resume:{
        type:String,
        default:''
    },
    token:{
        type:String,
        default:''
    }
});

const User = mongoose.model("User",UserSchema);

export default User;