// SignupForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const signupSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6).required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const SignupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            const { confirmPassword, ...userData } = values;
            localStorage.setItem('user', JSON.stringify(userData));
            alert('Signup successful');
          }}
        >
          <Form>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <Field name="name" type="text" className="w-full px-3 py-2 border border-black rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

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

            <div className="mb-4">
              <label className="block mb-1">Confirm Password</label>
              <Field name="confirmPassword" type="password" className="w-full px-3 py-2 border border-black rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Signup</button>
            
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
