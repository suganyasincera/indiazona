import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation, ensure you have react-router-dom installed
import './RegisterForm.css'; // Add your custom styles here
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const RegisterForm = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    referenceCode: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   // For navigating to other pages

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form validation logic
  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // No validation errors, proceed
      console.log('Form submitted:', formData);
      navigate('/'); // Redirect to the home page
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <img src="your-logo-path" alt="Indiazona Logo" className="logo" />
        <h1>Register Your Shop</h1>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Reference Code Field */}
        <div className="form-group">
          <label htmlFor="referenceCode">
            Reference Code <i className="info-icon">ℹ</i>
          </label>
          <input
            type="text"
            id="referenceCode"
            name="referenceCode"
            value={formData.referenceCode}
            onChange={handleChange}
            placeholder="Reference Code"
          />
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Your Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Your Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="form-group password-field">
          <label htmlFor="password">Password*</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <span
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <p className="info-text">Password must contain at least 8 digits</p>
        </div>

        {/* Confirm Password Field */}
        <div className="form-group password-field">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <span
            className="toggle-password"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Next
        </button>

        {/* Back Button */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
