import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import each from 'jest-each';
import userEvent from '@testing-library/user-event';
import SignUpPage from '../SignUpPage.svelte';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('has Sign Up header', () => {
      render(SignUpPage);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    each([
      ['Username'],
      ['E-mail'],
      ['Password'],
      ['Password Repeat'],
    ]).test('has the given fields', (field) => {
      render(SignUpPage);
      const input = screen.getByLabelText(field);
      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(SignUpPage);
      const { type } = screen.getByLabelText('Password') as HTMLInputElement;
      expect(type).toBe('password');
    });

    it('has password type for password input', () => {
      render(SignUpPage);
      const { type } = screen.getByLabelText('Password Repeat') as HTMLInputElement;
      expect(type).toBe('password');
    });

    it('should have submit button', () => {
      render(SignUpPage);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('should be disabled', () => {
      render(SignUpPage);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });

    describe('Interactions', () => {
      it('should be not disabled when password and password repeat fields are the same', async () => {
        render(SignUpPage);
        const password = screen.getByLabelText('Password');
        const passwordRepeat = screen.getByLabelText('Password Repeat');

        const userPassword = '12345';
        await userEvent.type(password, userPassword);
        await userEvent.type(passwordRepeat, userPassword);
        const button = screen.getByRole('button', { name: 'Sign Up' });
        expect(button).toBeEnabled();
      });
    });
  });
});
