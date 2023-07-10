import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiCall from '../apis/axios';

const TenantForm = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    lname: '',
    fname: '',
    email: '',
    aptno: ''
  });
  const [errors, setErrors] = useState({
    lname: false,
    fname: false,
    email: false,
    aptno: false
  });
  const [isClicked, setIsClicked] = useState(false); // not to show errors at the first loading

  const navigate = useNavigate();

  // Get the current values for update
  useEffect(() => {
    if (id) {
      const getTenant = async () => {
        try {
          const response = await apiCall.get(`tenants/${id}`);
          setInputs({
            lname: response.data.lname,
            fname: response.data.fname,
            email: response.data.email,
            aptno: response.data.aptno,
          });
        } catch (err) {
          console.log(err);
        }
      };

      getTenant();
    }
  }, [id]);

  // Form Validation
  const formValidation = (currentValues) => {
    if (!currentValues.lname) {
      setErrors(prevState => ({ ...prevState, lname: true }));
    } else {
      setErrors(prevState => ({ ...prevState, lname: false }));
    }
    if (!currentValues.fname) {
      setErrors(prevState => ({ ...prevState, fname: true }));
    } else {
      setErrors(prevState => ({ ...prevState, fname: false }));
    }
    if (!currentValues.aptno) {
      setErrors(prevState => ({ ...prevState, aptno: true }));
    } else {
      setErrors(prevState => ({ ...prevState, aptno: false }));
    }
    if (!currentValues.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrors(prevState => ({ ...prevState, email: true }));
    } else {
      setErrors(prevState => ({ ...prevState, email: false }));
    }
  };

  useEffect(() => {
    formValidation(inputs);
  }, [inputs]);

  // Change Handler
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // no errors shown at the first loading until clicking 'Submit'
    setIsClicked(true);

    // check if no errors before sending data to database
    if (!errors.lname && !errors.fname && !errors.email && !errors.aptno) {
      if (id) {
        // UPDATE
        try {
          await apiCall.put(`/tenants/${id}`, inputs);
        } catch (err) {
          console.log(err);
        }
      } else {
        // CREATE
        try {
          await apiCall.post('/tenants', inputs);
        } catch (err) {
          console.log(err);
        }
      }

      navigate('/');
    }
  };

  // Cancel Handler
  const handleCancel = (e) => {
    e.preventDefault();

    navigate('/');
  };

  return (
    <Fragment>
      <form className='w-1/2 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor="lname">Last Name:</label><br />
        <input
          type="text"
          id="lname"
          name='lname'
          value={inputs.lname}
          onChange={handleChange}
          autoFocus /><br />
        {errors.lname && isClicked && <p className='text-red-600'>Last name is required</p>}
        <label htmlFor="fname">First Name:</label><br />
        <input
          type="text"
          id="fname"
          name='fname'
          value={inputs.fname}
          onChange={handleChange} /><br />
        {errors.fname && isClicked && <p className='text-red-600'>First name is required</p>}
        <label htmlFor="email">Email:</label><br />
        <input
          type="text"
          id="email"
          name='email'
          value={inputs.email}
          onChange={handleChange} /><br />
        {errors.email && isClicked && <p className='text-red-600'>Invalid email address</p>}
        <label htmlFor="aptno">Apt Number:</label><br />
        <input
          type="text"
          id="aptno"
          name='aptno'
          value={inputs.aptno}
          onChange={handleChange} /><br />
        {errors.aptno && isClicked && <p className='text-red-600'>Apartment number is required</p>}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full'
        >
          Submit
        </button>
        <button
          className='bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 mt-3 ms-3 rounded-full'
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </button>
      </form>
    </Fragment>
  );
};

export default TenantForm;