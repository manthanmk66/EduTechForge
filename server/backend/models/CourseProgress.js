const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
 
    
    courseID:{
        type:mongoose.Schema.types.objectId,
        ref:"Course",

    },
    completedVideos:{
        type:mongoose.Schema.Types.objectId,
        ref:"SubSection",
        
    }
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
