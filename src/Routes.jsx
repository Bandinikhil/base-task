import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";

const Upload = React.lazy(() => import("pages/Upload"));
const SignIn = React.lazy(() => import("pages/SignIn"));
const ProjectRoutes = () => {
  return (
    <React.Suspense
    fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}
    >
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
