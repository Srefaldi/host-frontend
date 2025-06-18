import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

console.log("VITE_API_ENDPOINT:", import.meta.env.VITE_API_ENDPOINT);

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  evaluations: [],
  questions: [],
  kkm: [],
  completedLessons: [],
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    console.log("Mengirim login request:", {
      nis: user.nis,
      endpoint: `${import.meta.env.VITE_API_ENDPOINT}/login`,
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/login`,
        {
          nis: user.nis,
          password: user.password,
        },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.message, error.response?.data);
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RegisterGuru = createAsyncThunk(
  "user/RegisterGuru",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/register-guru`,
        {
          fullName: user.fullName,
          nip: user.nip,
          password: user.password,
          school: user.school,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RegisterSiswa = createAsyncThunk(
  "user/RegisterSiswa",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/register-siswa`,
        {
          fullName: user.fullName,
          nis: user.nis,
          password: user.password,
          class: user.class,
          token: user.token,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/me`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Terjadi kesalahan";
    return thunkAPI.rejectWithValue(message);
  }
});

export const validateLesson = createAsyncThunk(
  "user/validateLesson",
  async ({ lessonPath }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user?.uuid;
      if (!userId) {
        return thunkAPI.rejectWithValue("User tidak terautentikasi");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/users/${userId}/validate-lesson`,
        { lessonPath },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/logout`,
      {
        withCredentials: true,
      }
    );
    return { message: "Logout berhasil" };
  } catch (error) {
    const message = error.response?.data?.msg || "Gagal logout";
    return thunkAPI.rejectWithValue(message);
  }
});

export const createEvaluation = createAsyncThunk(
  "evaluations/createEvaluation",
  async (evaluationData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/evaluations`,
        evaluationData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvaluations = createAsyncThunk(
  "evaluations/getEvaluations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/evaluations`,
        {
          withCredentials: true,
        }
      );
      console.log("getEvaluations response:", response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getQuestionsByEvaluation = createAsyncThunk(
  "questions/getQuestionsByEvaluation",
  async (evaluation_id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/questions/evaluation/${evaluation_id}`,
        { withCredentials: true }
      );
      console.log("getQuestionsByEvaluation response:", response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      console.error("getQuestionsByEvaluation error:", error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (questionData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/questions`,
        questionData,
        { withCredentials: true }
      );
      console.log("createQuestion response:", response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async ({ id, questionData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/questions/${id}`,
        questionData,
        { withCredentials: true }
      );
      console.log("updateQuestion response:", response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      console.error("updateQuestion error:", error.response?.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ENDPOINT}/questions/${questionId}`,
        { withCredentials: true }
      );
      console.log("deleteQuestion response:", response.data);
      return { questionId, message: response.data.msg };
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getKkm = createAsyncThunk("kkm/getKkm", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/kkm`,
      {
        withCredentials: true,
      }
    );
    console.log("getKkm response:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Terjadi kesalahan";
    return thunkAPI.rejectWithValue(message);
  }
});

export const setKkm = createAsyncThunk(
  "kkm/setKkm",
  async (kkmData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/kkm`,
        kkmData,
        {
          withCredentials: true,
        }
      );
      console.log("setKkm response:", response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.msg || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.completedLessons = action.payload.completedLessons || [];
      state.isError = false;
      state.message = "";
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(RegisterGuru.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(RegisterGuru.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      state.isError = false;
    });
    builder.addCase(RegisterGuru.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(RegisterSiswa.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(RegisterSiswa.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      state.isError = false;
    });
    builder.addCase(RegisterSiswa.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.completedLessons = action.payload.completedLessons || [];
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
      state.completedLessons = [];
    });

    builder.addCase(validateLesson.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(validateLesson.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(validateLesson.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(LogOut.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(LogOut.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
      state.completedLessons = [];
      state.isError = false;
      state.message = action.payload.message;
    });
    builder.addCase(LogOut.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(createEvaluation.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(createEvaluation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      state.evaluations.push(action.payload.evaluation);
      state.isError = false;
    });
    builder.addCase(createEvaluation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getEvaluations.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getEvaluations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.evaluations = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getEvaluations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getQuestionsByEvaluation.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getQuestionsByEvaluation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // Pastikan payload memiliki properti questions, jika tidak, gunakan array kosong
      state.questions = Array.isArray(action.payload?.questions)
        ? action.payload.questions
        : [];
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getQuestionsByEvaluation.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.questions = []; // Reset questions jika gagal
    });

    builder.addCase(createQuestion.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      // Pastikan menambahkan question ke array questions
      if (action.payload.question) {
        state.questions.push(action.payload.question);
      }
      state.isError = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(updateQuestion.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      // Pastikan hanya memperbarui jika question ada
      if (action.payload.question) {
        state.questions = state.questions.map((question) =>
          question.id === action.payload.question?.id
            ? action.payload.question
            : question
        );
      }
      state.isError = false;
    });
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(deleteQuestion.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload.questionId
      );
      state.isError = false;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getKkm.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getKkm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.kkm = action.payload;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(getKkm.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(setKkm.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.message = "";
    });
    builder.addCase(setKkm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      state.isError = false;
    });
    builder.addCase(setKkm.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
