import React from 'react';

import styled from 'styled-components';

import theme from '@/theme';

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
};

const { colors, typography } = theme;
const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, required = false, type = 'text', error }) => {
  return (
    <InputWrapper>
      <Label>
        {label} {required && <span>*</span>}
      </Label>
      <StyledInput id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} type={type} $hasError={!!error} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: ${colors.ink};
  font-weight: ${typography.fontWeights.medium};
  line-height: 19px;
  letter-spacing: -0.64px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  span {
    color: red;
    margin-left: 2px;
  }
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  line-height: 21px;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : colors.softGray)};
  outline: none;
  background-color: ${colors.grayLight};
  color: ${colors.black};
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : colors.focusBlue)};
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 6px;
`;
