import {screen, render} from '@testing-library/react';

import Home from '../pages/index';

describe('Home', () => {
  it('should show a heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', {name: /title/i})).toBeVisible();
  });
});
