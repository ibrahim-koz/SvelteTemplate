import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import each from 'jest-each';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
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
      it('should be enabled when password and password repeat fields are the same', async () => {
        render(SignUpPage);
        const password = screen.getByLabelText('Password');
        const passwordRepeat = screen.getByLabelText('Password Repeat');

        const userPassword = '12345';
        await userEvent.type(password, userPassword);
        await userEvent.type(passwordRepeat, userPassword);
        const button = screen.getByRole('button', { name: 'Sign Up' });
        expect(button).toBeEnabled();
      });

      it('should send username, email and password to the backend after clicking the button', async () => {
        let requestBody;
        const server = setupServer(
          rest.post('/api/1.0/users', (req, res, ctx) => {
            requestBody = req.body;
            return res(ctx.status(200));
          }),
        );

        server.listen();
        render(SignUpPage);
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const passwordRepeat = screen.getByLabelText('Password Repeat');
        const email = screen.getByLabelText('E-mail');

        await userEvent.type(username, 'ibrahimkoz');
        await userEvent.type(email, 'ibrahimkoz@foo.com');
        await userEvent.type(password, 'sifre');
        await userEvent.type(passwordRepeat, 'sifre');

        const button = screen.getByRole('button', { name: 'Sign Up' });

        await userEvent.click(button);

        server.close();

        expect(requestBody).toEqual({
          username: 'ibrahimkoz',
          email: 'ibrahimkoz@foo.com',
          password: 'sifre',
        });
      });
    });
  });
});
