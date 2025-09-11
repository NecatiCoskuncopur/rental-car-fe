import React, { useState } from 'react';

import { FaEnvelopeOpenText } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import theme from '@/theme';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

const { device } = theme;
const ContactForm = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', description: '' });
  const [errors, setErrors] = useState<{ email?: string; fullName?: string; description?: string }>({});
  const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL as string;
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.description) newErrors.description = 'Description is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ fullName: '', email: '', description: '' });
      } else {
        toast.error('Submission failed, please try again');
      }
    } catch (error) {
      toast.error('An error occurred. Please check your connection.');
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate action={FORMSPREE_URL} method="POST">
      <Input label="Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" required error={errors.fullName} />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
        error={errors.email}
      />

      <TextArea
        label="Tell me about it"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Write here..."
        required
        rows={5}
        error={errors.description}
      />

      <Button $variant="large" type="submit">
        <FaEnvelopeOpenText size={20} />
        Send Message
      </Button>
    </Form>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 50%;
  padding: 10px;
  @media ${device.tablet} {
    width: 100%;
  }
`;
