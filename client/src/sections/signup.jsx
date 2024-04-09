import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    role: '', // Added role field to formData
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Form submitted successfully!", {
       position: "top-center"
    });
  };

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
          <div>
          <form onSubmit={handleSubmit}>
          <ToastContainer />
              <div>
                <span className="text-sm text-gray-900">Welcome back</span>
                <h1 className="text-2xl font-bold">Sign up for an account</h1>
              </div>

              <div className='flex flex-row'> {/* Use flex container for radio buttons */}
                <div className="mt-2 mr-5">
                  <label className="block text-md mb-2" htmlFor="student">Student</label>
                  <input
                    className="px-4 border-2 py-2 rounded-md text-sm outline-none"
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-md mb-2" htmlFor="instructor">Instructor</label>
                  <input
                    className="px-4 border-2 py-2 rounded-md text-sm outline-none"
                    type="radio"
                    id="instructor"
                    name="role"
                    value="instructor"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-md mb-2" htmlFor="name">Name</label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                />
              </div>

              <div className="mt-5">
                <label className="block text-md mb-2" htmlFor="lname">Last Name</label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                  placeholder="Last Name"
                />
              </div>

              <div className="my-3">
                <label className="block text-md mb-2" htmlFor="email">Email</label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
              </div>


              <div className="my-3">
                <label className="block text-md mb-2" htmlFor="email">Password</label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="Password"
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                  placeholder="Password"
                />
              </div>


              
              {/* <div className="my-3">
                <label className="block text-md mb-2" htmlFor="email">Highest Qualification</label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="qualification"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="qualification"
                />
              </div> */}



              <div className="flex justify-between">
                <div>
                  <input className="cursor-pointer" type="checkbox" name="rememberme" />
                  <span className="text-sm">Remember Me</span>
                </div>
                <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <div>
              <button type="submit" className=" w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">Sign up now</button>
              </div>
            </form>
            <p className="mt-2">Already have an account? <span onClick={handleSignup} className="cursor-pointer text-sm text-blue-600">Login</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
