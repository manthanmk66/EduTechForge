const Tag = require("../models/tags");

// Create Tag handler
exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create Entry in DB
        const tagDetails = await Tag.create({
            name: name,
            description: description
        });
        console.log(tagDetails);

        // Return response
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
            tagDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get all Tags
exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            tags: allTags
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
