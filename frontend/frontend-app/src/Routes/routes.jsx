import React from "react";

import { Routes, Route } from "react-router-dom";

import Information from "../Components/info/info";
import Resume from "../Components/resume";
import Statistics from "../Components/statistics";
import Payment from "../Components/payment";

export default function RoutesPath() {
  return (
    <Routes>
      {/* <Route exact path="/" element={<App />} /> */}
      <Route path="/info" element={<Information />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
