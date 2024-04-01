import * as React from 'react';
import ConfirmationAlert from '../alerts/ConfirmationAlert';

const templates = {
  confirmation: {
    title: 'Confirm',
    message: 'Are you sure?',
    buttons: [
      { label: 'Cancel', color: 'primary', action: 'close' },
      { label: 'Confirm', color: 'primary', action: 'confirm' },
    ],
  },
  error: {
    title: 'Error',
    message: 'An error occurred',
    buttons: [{ label: 'OK', color: 'primary', action: 'close' }],
  },
};


