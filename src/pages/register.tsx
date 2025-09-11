import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { register } from '@/api';
import { AuthWrapper, Input } from '@/components';

interface FormErrors {
  name?: string[];
  surname?: string[];
  dateOfBirth?: string[];
  email?: string[];
  password?: string[];
  general?: string;
}

const Register = () => {
  const router = useRouter();
  const initialForm = {
    name: '',
    surname: '',
    dateOfBirth: '',
    email: '',
    password: '',
  };
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    try {
      await register({ name: form.name, surname: form.surname, dateOfBirth: form.dateOfBirth, email: form.email, password: form.password });
      setForm(initialForm);
      router.push('/login');
    } catch (err) {
      const axiosError = err as AxiosError<{ errors?: FormErrors & { message?: string } }>;
      setLoading(false);
      if (axiosError.response?.data.errors) {
        const apiErrors = axiosError.response.data.errors;

        if ('message' in apiErrors) {
          setErrors({ general: apiErrors.message as string });
        } else {
          setErrors(apiErrors);
        }
      }
    }
  };

  return (
    <AuthWrapper handleSubmit={handleSubmit} loading={loading}>
      <Input label="Name" name="name" value={form.name} onChange={handleChange} type="text" placeholder="Enter Your Name" required error={errors?.name?.[0]} />
      <Input
        label="Surname"
        name="surname"
        value={form.surname}
        onChange={handleChange}
        type="text"
        placeholder="Enter Your Surname"
        required
        error={errors?.surname?.[0]}
      />
      <Input label="Date Of Birth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} type="date" required error={errors?.dateOfBirth?.[0]} />
      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Enter Your Email"
        required
        error={errors?.email?.[0]}
      />
      <Input
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
        placeholder="Enter Your Password"
        required
        error={errors?.password?.[0]}
      />
      {errors.general && <p style={{ color: 'red', fontSize: '12px', marginBottom: '12px' }}>{errors.general}</p>}
    </AuthWrapper>
  );
};

export default Register;
Register.minimalLayout = true;
