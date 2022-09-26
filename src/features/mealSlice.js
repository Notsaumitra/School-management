import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  meals: [],
  selectedDate: "",
  selectedMeal: 1,
  isChanged: false,
  studentDetails: {
    studentId: null,
    firstName: "",
    lastName: "",
    _id: "",
  },
};
const url = "http://localhost:3000";
export const getStudentDetails = createAsyncThunk(
  "stu/student",
  (studentId) => {
    return axios
      .get(url + `/stu/student/${studentId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const getAllMealsPerStudent = createAsyncThunk(
  "mls/meals/studentId",
  (studentId) => {
    return axios
      .get(url + `/mls/meals/${studentId}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const postSingleMeal = createAsyncThunk("mls/meal", (mealObj) => {
  return axios
    .post(url + `/mls/meal`, mealObj)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
});

export const updateSingleMeal = createAsyncThunk(
  "mls/updateMeal",
  (mealObj) => {
    return axios
      .put(url + `/mls/updatemeal`, mealObj)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    addSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      const currentState = current(state);
      console.log(currentState);
      if (currentState.meals.length) {
        const findMeal = currentState.meals.find(
          (meal) => meal.date === state.selectedDate
        );
        if (findMeal) {
          state.selectedMeal = findMeal.mealId;
          state.isChanged = findMeal.isChanged;
        } else {
          state.selectedMeal = 1;
          state.isChanged = false;
        }
      }
    },
    addStudentMealOption: (state, action) => {
      state.selectedMeal = action.payload;
    },
  },
  extraReducers: {
    [getStudentDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudentDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.studentDetails = action.payload.student;
      state.meals = [];
    },
    [getStudentDetails.rejected]: (state) => {
      state.isLoading = false;
    },
    [getAllMealsPerStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllMealsPerStudent.fulfilled]: (state, action) => {
      //   state.isLoading = false;
      state.meals = [...action.payload.mealData];
      // console.log(action.payload);
      console.log(current(state));
      const currentState = current(state);
      const findMeal = currentState.meals.find(
        (meal) => meal.date === currentState.selectedDate
      );
      if (findMeal) {
        state.selectedMeal = findMeal.mealId;
        state.isChanged = findMeal.isChanged;
      } else {
        state.selectedMeal = 1;
        state.isChanged = false;
      }
    },
    [getAllMealsPerStudent.rejected]: (state) => {
      state.isLoading = false;
    },
    [postSingleMeal.pending]: (state) => {
      state.isLoading = true;
    },
    [postSingleMeal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.meals = [...state.meals, action.payload.newMeal];
    },
    [postSingleMeal.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateSingleMeal.pending]: (state) => {
      state.isLoading = true;
    },
    [updateSingleMeal.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isChanged = true;
      state.isLoading = false;
    },
    [updateSingleMeal.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addStudentId, addSelectedDate, addStudentMealOption } =
  mealSlice.actions;
export default mealSlice.reducer;
