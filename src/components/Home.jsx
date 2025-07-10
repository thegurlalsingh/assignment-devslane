import React from "react";
import { useNavigate } from "react-router-dom";
import assignments from "./info.js";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white px-[500px] py-[50px]">
      <h1 className="text-3xl font-bold mb-6 text-center">My Assignments</h1>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id}>
            <button
              onClick={() => navigate(`/${assignment.id}`)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {assignment.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
