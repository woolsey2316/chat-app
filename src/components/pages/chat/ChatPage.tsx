import * as React from 'react';
import ChatArea from '../../chatArea';
import MessageSender from '../../messageSender';
import styled from 'styled-components';

const StyledPageContainer = styled("section")`
  text-align: center;
  margin-top: 60px;
  height: calc( 100vh - 60px);
  color: ${props => props.theme.secondaryLightColor};
  background-color: ${props => props.theme.secondaryDarkColor};
`;

const ChatPage: React.FunctionComponent = () => {
  return (
    <StyledPageContainer>
      <ChatArea/>
      <MessageSender/>
    </StyledPageContainer>
  )
};

export default ChatPage;