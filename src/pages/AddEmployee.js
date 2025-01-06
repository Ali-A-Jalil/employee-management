// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addEmployee } from "../features/employeeSlice";
// import { useNavigate } from "react-router-dom";

// const AddEmployee = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     hireDate: "",
//     isActive: true,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
      
//       await dispatch(addEmployee(formData)).unwrap();
//       alert("Employee added successfully!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error details:", error); // تسجيل تفاصيل الخطأ
//       alert("Failed to add employee. Please try again.");
//     }
    
//   };

  

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-500 text-white py-4 px-6 shadow-lg flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Employee Management System</h1>
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition"
//         >
//           Go to Dashboard
//         </button>
//       </header>

//       {/* Main Form */}
//       <div className="flex-grow flex items-center justify-center">
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//           <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//             Add New Employee
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter employee name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter employee email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Enter employee age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Hire Date</label>
//               <input
//                 type="date"
//                 name="hireDate"
//                 value={formData.hireDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="mb-4 flex items-center">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={formData.isActive}
//                 onChange={(e) =>
//                   setFormData({ ...formData, isActive: e.target.checked })
//                 }
//                 className="mr-2"
//               />
//               <label className="text-gray-700">Active</label>
//             </div>

//             <div className="flex justify-between items-center">
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard")}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//               >
//                 Add Employee
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employeeSlice";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    hireDate: "",
    isActive: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // منع التحديث التلقائي للصفحة
  //   try {
  //     const transformedData = {
  //       ...formData,
  //       isActive: formData.isActive ? "Y" : "N", // تحويل true/false إلى "Y"/"N"
  //     };
  //     console.log("Data Sent to API:", transformedData);
  //     await dispatch(addEmployee(transformedData)).unwrap(); // انتظار استجابة الإضافة
  //     alert("Employee added successfully!");
  //     navigate("/dashboard"); // الانتقال إلى صفحة الداشبورد
  //   } catch (error) {
  //     console.error("Failed to add employee:", error);
  //     alert("Failed to add employee. Please try again.");
  //   }
    
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        NAME_ONE: formData.name,
        EMAIL: formData.email,
        AGE: formData.age,
        JOINING_DATE: formData.hireDate,
        IS_ACTIVE_Y_N: formData.isActive ? "Y" : "N",
      };
      console.log("Data Sent to API:", transformedData);
      await dispatch(addEmployee(transformedData)).unwrap();
      alert("Employee added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add employee:", error.response ? error.response.data : error);
      alert("Failed to add employee. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-6 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management System</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Go to Dashboard
        </button>
      </header>

      {/* Main Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Add New Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter employee email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter employee age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Hire Date</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="mr-2"
              />
              <label className="text-gray-700">Active</label>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
