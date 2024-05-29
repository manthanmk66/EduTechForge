const { instance } = require("../config/razorpay");
const Course = require("../models/Course"); // Assuming Course is a model
const USER = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates");
const mongoose = require("mongoose");
const crypto = require("crypto");

exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;

  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provide valid course ID",
    });
  }

  // Validate Course Details
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    // Check if the user is already enrolled in the course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // Create order
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt: Math.random().toString(36).substring(2),
    notes: {
      CourseId: course_id,
      userId,
    },
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "123456";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is Authorized");

    const { course_id, userId } = req.body.payload.payment.entity.notes;
    try {
      // Enroll the student in the course
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: course_id },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(200).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);

      const enrolledStudent = await USER.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: course_id } },
        { new: true }
      );
      if (!enrolledStudent) {
        return res.status(200).json({
          success: false,
          message: "User not found",
        });
      }
      console.log(enrolledStudent);

      // Send confirmation email
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from EdutechForge",
        courseEnrollmentEmail(enrolledStudent.name, course.courseName)
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Payment verified and student enrolled",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};
