import * as React from 'react';
import { connect } from 'react-redux';
import Message from '../Message';
import { scrollToBottom } from '../../utilities/common';
import { IMessage } from '../Message/Message';
import { useAppSelector } from 'src/hooks/hooks';
import styled from 'styled-components';

const StyledChatArea = styled.section.attrs(props => ({
  color: props.theme.primaryLightColor,
  backgroundColor: props.theme.secondaryDarkColor
}))`
display: inline-block;
position: absolute;
width: 100%;
height: calc( 100vh - 125px);
overflow-y: scroll;
left: 0;

#nickname-container {
  clear: both;
}

/* ----------- Non-Retina Screens ----------- */
@media screen
and (min-device-width: 1200px)
and (max-device-width: 1600px)
and (-webkit-min-device-pixel-ratio: 1) {
  overflow-y: hidden;
}

/* ----------- Retina Screens ----------- */
@media screen
and (min-device-width: 1200px)
and (max-device-width: 1600px)
and (-webkit-min-device-pixel-ratio: 2)
and (min-resolution: 192dpi) {
  overflow-y: hidden;
}
`;

export const ChatArea: React.FunctionComponent = () => {
  const chatAreaRef = React.createRef<HTMLDivElement>();
  const { messages } = useAppSelector(state => state.messageState)

  React.useEffect(() => {
    const chatAreaElement: Element = chatAreaRef.current as Element;
    const shouldScroll: boolean = chatAreaElement.scrollTop + chatAreaElement.clientHeight !== chatAreaElement.scrollHeight;

    if (shouldScroll) {
      scrollToBottom(chatAreaElement);
    }
  }, [])
  return (
    <StyledChatArea ref={chatAreaRef}>
        {messages.map((element: IMessage, idx: number) => {
          return (
            <React.Fragment key={idx}>
              <Message message={element}/>
            </React.Fragment>
          )
        })}
    </StyledChatArea>
  );

}


export default connect(mapStateToProps)(ChatArea);