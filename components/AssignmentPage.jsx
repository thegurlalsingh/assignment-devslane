import React from 'react';
import { useParams } from 'react-router-dom';
import assignments from './info.js';

// Dynamically import React assignments
import App from './assignment_58_1/Homepage.jsx';
import Homepage from './assignment_59_1/Homepage.jsx'; // example
import LoginForm from './assignment_68_1/login.jsx';
import LoginPage from './assignment_71_1/LoginPage.jsx'
import LoginPagePrivate from './assignment_74_1/LoginPage.jsx'

export default function AssignmentPage({ addToCart, cartItems }) {
  const { id } = useParams();
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return <p className="text-center text-red-500 mt-10">Assignment not found</p>;
  }

  if (assignment.type === 'react') {
    // Render corresponding component
    switch (assignment.id) {
      case 'assignment_58_1':
        return <App />;
      case 'assignment_59_1':
        return <Homepage addToCart={addToCart} cartItems={cartItems} />;
      case 'assignment_68_1':
        return <LoginForm />
      case 'assignment_71_1':
        return <LoginPage />
      case 'assignment_74_1':
        return <LoginPagePrivate />

      // Add more react components here
      default:
        return <p className="text-center text-red-500 mt-10">React component not found</p>;
    }
  }

  // Fallback to iframe for HTML-based assignments
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
