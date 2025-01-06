import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// جلب الموظفين
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    try {
      const response = await axios.get(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel"
      );
      if (response.data && response.data.employees) {
        return response.data.employees; // الرد يحتوي على "employees"
      }
      throw new Error("Invalid API response");
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  }
);

// إضافة موظف جديد
// export const addEmployee = createAsyncThunk(
//   "employee/addEmployee",
//   async (employee) => {
//     try {
//       const response = await axios.post(
//         "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataIns",
//         employee
//       );
//       console.log("API Response:", response.data); // عرض استجابة الخادم
//       if (response.data && response.data.employee) {
//         return response.data.employee; // إذا نجح الطلب
//       }
//       throw new Error("Invalid response format"); // إذا كانت الاستجابة غير متوقعة
//     } catch (error) {
//       console.error("Error in API request:", error.response?.data || error.message);
//       throw new Error("Failed to add employee."); // رمي الخطأ ليظهر في الواجهة
//     }
//   }
// );
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    try {
      const response = await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataIns",
        employee
      );
      console.log("API Response:", response.data);
      if (response.data && response.data.employee) {
        return response.data.employee;
      }
      throw new Error("Invalid API response");
    } catch (error) {
      console.error("Error in API request:", error.response ? error.response.data : error);
      throw new Error("Failed to add employee.");
    }
  }
);



// تحديث بيانات موظف
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee) => {
    try {
      const response = await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd",
        employee
      );
      if (response.data && response.data.employee) {
        return response.data.employee;
      }
      throw new Error("Invalid API response for updated employee");
    } catch (error) {
      throw new Error("Failed to update employee");
    }
  }
);

// حذف موظف
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    try {
      await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataDel",
        { id }
      );
      return id;
    } catch (error) {
      throw new Error("Failed to delete employee");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employees: [], status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // جلب الموظفين
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })

      // إضافة موظف جديد
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload); // إضافة الموظف الجديد
      })

      // تحديث بيانات موظف
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload; // تحديث الموظف
        }
      })

      // حذف موظف
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
