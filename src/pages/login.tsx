import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { login } from '@/api';
import { AuthWrapper, Input } from '@/components';

interface FormErrors {
  email?: string[];
  password?: string[];
  general?: string;
}

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

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
      await login({ email: form.email, password: form.password });
      setForm({ email: '', password: '' });
      router.push('/');
    } catch (err) {
      const axiosError = err as AxiosError<{ errors?: { email?: string[]; password?: string[]; message?: string } }>;
      setLoading(false);
      if (axiosError.response?.data.errors) {
        const apiErrors = axiosError.response.data.errors;

        if ('message' in apiErrors) {
          setErrors({ general: apiErrors.message as string });
        } else {
          setErrors({
            email: apiErrors.email,
            password: apiErrors.password,
          });
        }
      }
    }
  };

  return (
    <AuthWrapper handleSubmit={handleSubmit} loading={loading}>
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

export default Login;
Login.minimalLayout = true;
