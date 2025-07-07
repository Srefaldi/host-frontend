import React, { useEffect } from "react";
import Layout from "../../pages/LoginPage/Layout.jsx";
import HistoryNilai from "../../pages/LoginPage/HistoryNilai.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice.js";

const HistoryNilaii = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <HistoryNilai />
    </Layout>
  );
};

export default HistoryNilaii;
