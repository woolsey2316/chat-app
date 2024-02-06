import * as React from 'react';
import styled from 'styled-components';

const StyledTimestamp = styled("div")<{ floatToRight: boolean }>`
  font-size: .7em;
  float: ${props => props.floatToRight ? 'right' : 'left'};
  margin: 7px 0 0 4px;
`;

const Timestamp = ({value, floatToRight}: {value: string, floatToRight: boolean}) => (
  <StyledTimestamp floatToRight={floatToRight}>
    {value}
  </StyledTimestamp>
);

export default Timestamp;