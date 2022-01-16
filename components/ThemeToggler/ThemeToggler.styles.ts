import styled from 'styled-components';

import { QUERIES } from '../../styles/constants/Queries';

export const ThemeToggler = styled.button`
  background: var(--theme-toggler-bg);
  color: var(--theme-toggler-color);
  border: none;
  padding: 7px 10px;
  font-size: 0.9rem;
  border-radius: 0.25rem;
  outline-offset: 3px;
`;
