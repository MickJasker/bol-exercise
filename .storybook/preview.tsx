import type { Preview } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import '../app/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter],
};

export default preview;
