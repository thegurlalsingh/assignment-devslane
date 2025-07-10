import React from 'react';
import { useParams } from 'react-router-dom';
import assignments from './info.js';

export default function AssignmentPage() {
  const { id } = useParams();
  const assignment = assignments.find(a => a.id === id);

  if (!assignment) {
    return <p className="text-center text-red-500 mt-10">Assignment not found</p>;
  }

  return (
    <div className="min-h-screen">
      <iframe
        src={`/${assignment.id}/index.html`}
        title={assignment.title}
        className="w-full h-screen border border-gray-300 rounded-lg shadow-md bg-white"
      />
    </div>
  );
}
