// LoginForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6).required('Required'),
});

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            // Simulate login by storing in localStorage
            localStorage.setItem('user', JSON.stringify(values));
            alert('Login successful');
          }}
        >
          <Form>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <Field name="email" type="email" className="w-full px-3 py-2 border border-black rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <Field name="password" type="password" className="w-full px-3 py-2 border border-black rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
            <Link to={"/assignment_68_1/signup"}>Signup</Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
