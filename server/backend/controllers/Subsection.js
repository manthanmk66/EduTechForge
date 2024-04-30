 const SubSection=require("../models/SubSection");

 const Section=require("../models/section");
const { uploadImageCloudinary } = require("../utils/imageUploader");

 //create sub section

 exports.createSection= async (req,res)=>{

    try{
        //fetch data from req body

        const {sectionId,title,timeDuration,description}=req.body;


        //extract data from req body
        const video=req.files.videoFile;

        

        //validation
        if(!sectionId ||!title ||!timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All Fields are Required",
            });
        }

        //upload value to cloudinary
        const uploadDetails=await uploadImageCloudinary(video,process.env.FOLDER_NAME)
       

        //create a SubSection
        const subSectionDetals=await  SubSection.create({
           
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //update Section with this sub section objects
        const updateSection=await Section.findByIdAndDelete({_id:sectionId},
        {$push:{

        }},
    {new:true});
       
       //log update section after adding populate query
        //return response
        return res.status(200).json({
            success:true,
            message:"Sub Section Added Successfully",
            data:updateSection

        })



    }
    catch(error){
        return res.status(500).json({
             success:false,
                            message:"Internal Server Error",
                            error:error
        })


    }
 }

