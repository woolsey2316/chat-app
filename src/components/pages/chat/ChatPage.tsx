import * as React from 'react';
import ChatArea from '../../ChatArea';
import MessageSender from '../../MessageSender';
import styled from 'styled-components';
import { AppContext } from 'src/utilities/TranslationsProvider';

const StyledPageContainer = styled("section")`
  text-align: center;
  margin-top: 60px;
  height: calc( 100vh - 60px);
  color: ${props => props.theme.secondaryLightColor};
  background-color: ${props => props.theme.secondaryDarkColor};
`;

const ChatPage: React.FunctionComponent = () => {
  const appContext = React.useContext(AppContext)
  return (
    <StyledPageContainer>
      <ChatArea/>
      <MessageSender/>
    </StyledPageContainer>
  )
};

export default ChatPage;