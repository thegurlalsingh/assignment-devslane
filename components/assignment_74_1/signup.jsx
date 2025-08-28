import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const InnerSignupForm = ({ values, errors, touched, handleChange, handleSubmit }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input type="text" name="name" value={values.name} onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded" />
        {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input type="email" name="email" value={values.email} onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded" />
        {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input type="password" name="password" value={values.password} onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded" />
        {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded" />
        {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Signup</button>
    </form>
  </div>
);

const SignupForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  validationSchema: Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
  }),
  handleSubmit: (values, { props }) => {
    const { confirmPassword, ...userData } = values;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const alreadyExists = existingUsers.find(user => user.email === userData.email);
    if (alreadyExists) {
      alert('User already exists. Please login.');
      props.navigate('/assignment_74_1/login');
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful!');
    props.navigate('/assignment_74_1/login');
  }
})(InnerSignupForm);

export default SignupForm;
