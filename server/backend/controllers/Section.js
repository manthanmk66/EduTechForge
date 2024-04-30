const Section =require("../models/section");

const Course=require("../models/Course");

exports.createSection=async(req,res)=>{
    try {

        //data fetch

        const {sectionName,courseId}=req.body;


        //data validation
        if(!sectionNmae || !courseId){
            return res.status(400).json({
                message:"Missing Propertirs"
            });
        }
        //create Section
        const newSection=await Section.create({sectionName});

        
        //update Cours with Section ObjectId
        const updateCourseDetails=await Course.findByAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        );

        //H.W

        //return responce
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updateCourseDetails,

        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Section ,  Internal Server Error",
        });
    }
}

exports.updateSection=async(req,res)=>{
    try{

        //data input
        const{sectionName,sectionId}=req.body



        //data validation
        if(!sectionName ||!sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
            
        }


        //update Data

        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});


        //return responce
            return res.status(200).json({
                success:true,
                message:"Section updated Successfully"
            })

        //


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section Internal Server Error",
        });

    }

};

exports.deleteSection=async (req,res)=>{
    try{

        //get ID-assuming that we are sending id in params
        const {sectionId}=req.params;


        //User findByIDandDelete
        await Section.findByIdAndDelete(sectionId);

        //return responce
        return res.status(200).json({
            success:true,
            message:"Section deleted Successfully"
            })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Unable to delete Section Internal Server Error",
            error:error.message,


        })
    }
}
        
