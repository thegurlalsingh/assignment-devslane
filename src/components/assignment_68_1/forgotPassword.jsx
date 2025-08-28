// ForgotPasswordForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Inline schema if you haven't separated it
export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => {
            console.log('Forgot Password Data:', values);
          }}
        >
          <Form>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-black rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
