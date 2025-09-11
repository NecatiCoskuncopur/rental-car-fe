import React from 'react';

import styled from 'styled-components';

import theme from '@/theme';

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
};

const { borderRadius, colors, typography } = theme;

const TextArea: React.FC<TextAreaProps> = ({ label, name, value, onChange, placeholder, required = false, error, rows = 4 }) => {
  return (
    <TextAreaWrapper>
      <Label htmlFor={name}>
        {label} {required && <span>*</span>}
      </Label>
      <StyledTextArea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} $hasError={!!error} rows={rows} />
      {error && <ErrorText>{error}</ErrorText>}
    </TextAreaWrapper>
  );
};

export default TextArea;

const TextAreaWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: ${colors.mutedPurple};
  font-weight: ${typography.fontWeights.medium};
  line-height: 19px;
  font-size: ${typography.fontSizes.$2};
  letter-spacing: -0.64px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  span {
    color: ${colors.red};
    margin-left: 2px;
  }
`;

const StyledTextArea = styled.textarea<{ $hasError: boolean }>`
  line-height: 21px;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : colors.softGray)};
  outline: none;
  color: ${colors.black};
  resize: none;
  border-radius: ${borderRadius.lg};
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : colors.focusBlue)};
  }
`;

const ErrorText = styled.p`
  color: ${colors.red};
  font-size: ${typography.fontSizes.$1};
  margin-top: 6px;
`;
