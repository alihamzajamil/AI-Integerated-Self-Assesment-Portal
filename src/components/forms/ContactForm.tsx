'use client';
// ContactForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mob: '',
    add: '',
    msg: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess('');
    setSubmitError(false);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitSuccess(data.message);
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          mob: '',
          add: '',
          msg: '',
        });
      } else {
        const errorData = await response.json();
        setSubmitError(true);
        setErrorMessage(errorData.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError(true);
      setErrorMessage('Failed to send email. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='md:flex justify-between my-2'>
          <div className='mx-4 grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='mx-4 grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='md:flex justify-between my-8'>
          <div className='mx-4 grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='mob'>Mobile No</Label>
            <Input
              type='text'
              id='mob'
              placeholder='Mobile Number'
              value={formData.mob}
              onChange={handleChange}
            />
          </div>
          <div className='mx-4 grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='add'>Address</Label>
            <Input
              type='text'
              id='add'
              placeholder='Address'
              value={formData.add}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='mx-4'>
          <Label htmlFor='msg'>Your Message</Label>
          <br />
          <textarea
            className='w-full border-2 border-gray-200 p-3'
            id='msg'
            name='msg'
            cols={30}
            rows={10}
            value={formData.msg}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='flex justify-end mr-4'>
          <button
            type='submit'
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {submitSuccess && <p className='text-green-600 mt-2'>{submitSuccess}</p>}
        {submitError && <p className='text-red-600 mt-2'>{errorMessage}</p>}
      </form>
    </>
  );
};

export default ContactForm;
