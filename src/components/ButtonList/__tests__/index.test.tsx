import React from 'react';
import '@testing-library/jest-dom';
import {
   fireEvent,
   render,
   screen,
   waitForElementToBeRemoved,
} from '@testing-library/react';

import ToastProvider, {
   DEFAULT_TIMEOUT,
   ToastColor,
   ToastContextType,
   useToast,
} from '../../ToastProvider';

const MOCKED_MESSAGE = 'message';

export default function TestToast({
   toastType,
   timeout,
}: {
   toastType: keyof ToastContextType;
   // eslint-disable-next-line react/require-default-props
   timeout?: number;
}) {
   const Toast = useToast();

   return (
      <div>
         <button
            type="button"
            aria-label="label"
            onClick={() => Toast[toastType](MOCKED_MESSAGE, timeout)}
         />
      </div>
   );
}

function makeSut(toastType: keyof ToastContextType, timeout?: number) {
   render(
      <ToastProvider>
         <TestToast toastType={toastType} timeout={timeout} />
      </ToastProvider>
   );
}

describe('ButtonList', () => {
   it('Should create a success toast', async () => {
      const toastType = 'success';
      makeSut(toastType);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toast = await screen.findByTestId('toast-container');
      expect(toast).toHaveStyle(`background-color: ${ToastColor.success}`);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      const toastTitle = await screen.findByText(toastType);
      expect(toastTitle).toBeInTheDocument();
   });

   it('Should create a danger toast', async () => {
      const toastType = 'danger';
      makeSut(toastType);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toast = await screen.findByTestId('toast-container');
      expect(toast).toHaveStyle(`background-color: ${ToastColor.danger}`);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      const toastTitle = await screen.findByText(toastType);
      expect(toastTitle).toBeInTheDocument();
   });

   it('Should create a info toast', async () => {
      const toastType = 'info';
      makeSut(toastType);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toast = await screen.findByTestId('toast-container');
      expect(toast).toHaveStyle(`background-color: ${ToastColor.info}`);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      const toastTitle = await screen.findByText(toastType);
      expect(toastTitle).toBeInTheDocument();
   });

   it('Should create a warning toast', async () => {
      const toastType = 'warning';
      makeSut(toastType);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toast = await screen.findByTestId('toast-container');
      expect(toast).toHaveStyle(`background-color: ${ToastColor.warning}`);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      const toastTitle = await screen.findByText(toastType);
      expect(toastTitle).toBeInTheDocument();
   });

   it('Should disappear from screen', async () => {
      makeSut('success');

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      await waitForElementToBeRemoved(
         () => screen.queryByText(MOCKED_MESSAGE),
         { timeout: DEFAULT_TIMEOUT }
      );
   });

   it('Should only last a second in screen', async () => {
      const timeout = 2000;
      makeSut('success', timeout);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      await waitForElementToBeRemoved(
         () => screen.queryByText(MOCKED_MESSAGE),
         { timeout }
      );
   });

   it('Should disappear from screen when clicking to close', async () => {
      makeSut('success', 10000);

      const button = await screen.findByRole('button');
      fireEvent.click(button);

      const toastMessage = await screen.findByText(MOCKED_MESSAGE);
      expect(toastMessage).toBeInTheDocument();

      const closeButton = await screen.findByText('X');
      fireEvent.click(closeButton);

      const vanishedToast = screen.queryByText(MOCKED_MESSAGE);
      expect(vanishedToast).toBeNull();
   });
});
