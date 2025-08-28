import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const InnerLoginForm = ({ values, errors, touched, handleChange, handleSubmit }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded"
        />
        {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-black rounded"
        />
        {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
    </form>
  </div>
);

const LoginForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  }),
  handleSubmit: (values, { props }) => {
    localStorage.setItem('user', JSON.stringify(values));
    console.log('Login successful:', values);
    props.navigate('/assignment_59_1'); // ✅ navigate on successful login
  }
})(InnerLoginForm);

export default LoginForm;
