import React, { useState } from 'react';

import { FiEye, FiEyeOff } from 'react-icons/fi';
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

const { borderRadius, colors, typography } = theme;

const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, required = false, type = 'text', error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <InputWrapper>
      <Label>
        {label} {required && <span>*</span>}
      </Label>
      <InputContainer>
        <StyledInput
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={isPasswordField && showPassword ? 'text' : type}
          $hasError={!!error}
          autoComplete="new-password"
        />
        {isPasswordField && (
          <IconWrapper type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </IconWrapper>
        )}
      </InputContainer>
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
  color: ${colors.mutedPurple};
  font-weight: ${typography.fontWeights.medium};
  line-height: 19px;
  font-size: ${typography.fontSizes.$2};
  letter-spacing: -0.64px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  span {
    ${colors.red};
    margin-left: 2px;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  line-height: 21px;
  width: 100%;
  padding: 10px 40px 10px 16px;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : colors.softGray)};
  outline: none;
  border-radius: ${borderRadius.lg};
  color: ${colors.black};
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : colors.focusBlue)};
  }
`;

const IconWrapper = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${colors.mutedPurple};
  cursor: pointer;
`;

const ErrorText = styled.p`
  ${colors.red};
  font-size: ${typography.fontSizes.$1};
  margin-top: 6px;
`;
