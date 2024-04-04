import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../data/countrycode.json";
// import { apiConnector } from "../../../services/apiConnector"
// import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Form Data - ", data);
    // try {
    //   setLoading(true);
    //   const res = await apiConnector(
    //     "POST",
    //     contactusEndpoint.CONTACT_US_API,
    //     data
    //   );
    // console.log("Email Res - ", res);
    setLoading(false);
    // } catch (error) {
    //   console.log("ERROR MESSAGE - ", error.message);
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label
            htmlFor="firstname"
            className="text-base text-white border-radius"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-white">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-base text-white">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-base text-white">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-base text-white">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-base text-white">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="rounded-lg bg-white p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-black focus:outline-none"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
