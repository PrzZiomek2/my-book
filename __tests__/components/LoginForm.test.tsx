import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

import { LoginForm } from '@/components/auth/signIn/LoginForm';

type FormValues = {
   email: string;
   password: string;
 }

const mockSubmit = jest.fn((data: FormValues) => Promise.resolve(data));

describe("LoginForm component in Home page", () => {

   beforeEach(() => {
      render(<LoginForm onSubmit={mockSubmit}/>);
    });

   it("form should include fields with given names", async () => {
      const emailInput = screen.getByRole('textbox', { name: /login/i  });
      const passwordInput = screen.getByLabelText(/hasło/i);
      const submitBtn = screen.getByRole("button", { name: /zaloguj się/i });

      await waitFor(() => {
         expect(emailInput).toHaveAttribute('name', 'email');  
         expect(passwordInput).toHaveAttribute('name', 'password');
         expect(submitBtn).toHaveAttribute('type', 'submit');
      })
   });

   it("should submit Login form successfully when email and password are provided", async () => {
      const emailInput = screen.getByRole('textbox', { name: /login/i  });
      const passwordInput = screen.getByLabelText(/hasło/i);
      const submitBtn = screen.getByRole("button", { name: /zaloguj się/i });

      const email = "test@mail.com";
      const password = "abc123";

      fireEvent.input(emailInput, {
         target: {
            value: email
         }
      });

      fireEvent.input(passwordInput, {
         target: {
            value: password
         }
      });

     expect(emailInput).toHaveValue(email);
     expect(passwordInput).toHaveValue(password);

     userEvent.click(submitBtn); 
      
      await waitFor(async () => {
         expect(mockSubmit).toHaveBeenCalledTimes(1);
         expect(mockSubmit).toHaveBeenCalledWith({email, password});
      })
   });

   it("form validation should check if fileds are empty or incorrect  ", async () => {
      const submitBtn = screen.getByRole("button", { name: /zaloguj się/i });
      const emailInput = screen.getByRole('textbox', { name: /login/i  });
      const passwordInput = screen.getByLabelText(/hasło/i);

      fireEvent.input(emailInput, {
         target: {
            value: ""
         }
      });

      fireEvent.input(passwordInput, { 
         target: {
            value: "" 
         }
      });

      userEvent.click(submitBtn); 

      await waitFor(async () => {
         expect(screen.getByText('Pole email nie może być puste')).toBeInTheDocument();
      })
   })
})
 
