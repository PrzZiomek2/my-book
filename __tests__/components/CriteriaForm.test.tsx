import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";

import CriteriaForm from '@/components/home/CriteriaForm';

jest.mock('next/navigation', () => {
   const originalModule = jest.requireActual('next/navigation');
   return{
      __esModule: true,
     ...originalModule,
     useRouter: () => ({
      replace: jest.fn()
     })
   }
});

jest.mock("next-auth/react", () => {
   const originalModule = jest.requireActual('next-auth/react');
   const mockSession = {
     expires: new Date(Date.now() + 86400).toISOString(),
     user: { 
         user: {name: "ziomek"}
      }
   };

   return {
     __esModule: true,
     ...originalModule,
     useSession: jest.fn(() =>({
         data: mockSession, 
         status: 'authenticated' 
     })),
   };
 });

describe("CriteriaForm component in Home page", () => {

   it("should render component", () => {
      render(<CriteriaForm />)
      
      const anchor = screen.getByText("SPRAWDŹ");
      expect(anchor).toBeInTheDocument();
   })

   const tagsInput = screen.getByLabelText("Tagi");
   const readBooksInput = screen.getByLabelText("Przeczytane książki");
   const favBooksInput = screen.getByLabelText("Ulubione książki");
   const creativeCheckbox = screen.getByLabelText("Kreatywnie");

   it("form should include fields with given names", () => {
      render(<CriteriaForm />);

      expect(tagsInput).toBeInTheDocument();
      expect(tagsInput).toHaveAttribute('name', 'tags');  

      expect(readBooksInput).toBeInTheDocument();
      expect(readBooksInput).toHaveAttribute('name', 'readBooks');

      expect(favBooksInput).toBeInTheDocument();
      expect(favBooksInput).toHaveAttribute('name', 'favouriteBooks');

      expect(creativeCheckbox).toBeInTheDocument();
      expect(creativeCheckbox).toHaveAttribute('name', 'isCreative');
   })

   it("should submit criteria form and redirect when data send successfully", () => {
       render(<CriteriaForm />);
   })
})
 
