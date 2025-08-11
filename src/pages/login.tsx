import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { login } from '@/api';
import { AuthWrapper, Input } from '@/components';

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors: typeof errors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      await login({ email: form.email, password: form.password });
      setForm({ email: '', password: '' });
      router.push('/');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setLoading(false);
      if (axiosError.response) {
        const msg = axiosError.response.data.message || 'Login failed';

        setErrors({ general: msg });
      } else {
        setErrors({ general: 'Login failed' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthWrapper handleSubmit={handleSubmit} loading={loading}>
      <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter Your Email" required error={errors.email} />
      <Input
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
        placeholder="Enter Your Password"
        required
        error={errors.password}
      />

      {errors.general && <p style={{ color: 'red', fontSize: '12px', marginBottom: '12px' }}>{errors.general}</p>}
    </AuthWrapper>
  );
};

export default Login;

Login.minimalLayout = true;
