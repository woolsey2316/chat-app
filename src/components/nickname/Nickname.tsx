import * as React from 'react';
import styled from 'styled-components';

const StyledNickname = styled("div")`
  font-size: .7em;
  float: left;
  margin: 7px 0 0 14px;
`;

const Nickname = ({value}: {value: string}) => (
  <StyledNickname>
    {value}
  </StyledNickname>
);

export default Nickname;