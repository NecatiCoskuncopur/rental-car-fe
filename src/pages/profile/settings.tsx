import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { updateUser } from '@/api';
import { Input, ProfileLayout, Title } from '@/components';
import { useCurrentUser, useUpdateData } from '@/hooks';
import theme from '@/theme';

const { borderRadius, colors, device, typography } = theme;

interface FormState {
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  password: string;
  oldPassword: string;
}

const Settings = () => {
  const { user } = useCurrentUser();

  const [form, setForm] = useState<FormState>({
    name: '',
    surname: '',
    dateOfBirth: '',
    email: '',
    password: '',
    oldPassword: '',
  });

  const [initialForm, setInitialForm] = useState<FormState | null>(null);

  const { loading: updateLoading, mutate } = useUpdateData<IUpdateUserPayload, IUpdateUserPayload>(payload => updateUser(payload));

  useEffect(() => {
    if (user) {
      const filledForm: FormState = {
        name: user.name || '',
        surname: user.surname || '',
        dateOfBirth: user.dateOfBirth ? String(user.dateOfBirth).slice(0, 10) : '',
        email: user.email || '',
        password: '',
        oldPassword: '',
      };
      setForm(filledForm);
      setInitialForm(filledForm);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isFormChanged = () => {
    if (!initialForm) return true;

    const basicChanged =
      form.name !== initialForm.name ||
      form.surname !== initialForm.surname ||
      form.dateOfBirth !== initialForm.dateOfBirth ||
      form.email !== initialForm.email;

    const passwordChanged = form.password.length > 0 && form.oldPassword.length > 0;

    return basicChanged || passwordChanged;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) return;

    if (!isFormChanged()) {
      toast.warn('No changes detected!');
      return;
    }

    const payload: IUpdateUserPayload = {
      userId: user._id,
      name: form.name,
      surname: form.surname,
      dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth) : undefined,
      email: form.email,
      password: form.password || undefined,
      oldPassword: form.oldPassword || undefined,
    };

    try {
      await mutate(payload);
      toast.success('Your profile has been updated successfully!');
      setInitialForm({ ...form, password: '', oldPassword: '' });
      setForm(prev => ({ ...prev, password: '', oldPassword: '' }));
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <ProfileLayout title="Settings">
      <Wrapper>
        <Title $variant="xxsmall" $mt="10px" $mb="24px">
          Personal Information
        </Title>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Input label="Name" name="name" value={form.name} onChange={handleChange} type="text" placeholder="Enter Name" required />
            <Input label="Surname" name="surname" value={form.surname} onChange={handleChange} type="text" placeholder="Enter Surname" required />
            <Input label="Date Of Birth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} type="date" required />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter Email" required />
            <Input label="Old Password" name="oldPassword" value={form.oldPassword} onChange={handleChange} type="password" placeholder="Enter Old Password" />
            <Input label="New Password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Enter New Password" />
          </FormWrapper>
          <Button type="submit" disabled={updateLoading}>
            {updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default Settings;

const Wrapper = styled.div`
  padding: 32px;
  border-radius: ${borderRadius.md};
  box-shadow:
    0 0 2px 0 rgba(145, 158, 171, 0.3),
    0 12px 24px -4px rgba(145, 158, 171, 0.12);
  background-color: ${colors.white};
  width: 100%;
`;

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 20px;
  @media ${device.laptop} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Button = styled.button`
  color: ${colors.white};
  padding: 12px 36px;
  font-weight: ${typography.fontWeights.semiBold};
  border-radius: ${borderRadius.md};
  background-color: ${colors.vibrantRed};
  box-shadow: 0px 10px 15px 0px rgba(255, 83, 48, 0.35);
  cursor: pointer;
  margin-top: 24px;
`;
