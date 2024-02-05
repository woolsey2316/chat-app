import * as React from 'react';
import Nickname from '../Nickname';
import Timestamp from '../Timestamp';
import Linkify from 'linkifyjs/react';
import getUrls from 'get-urls';
import styled from 'styled-components';

export interface IMessage {
  from: string;
  content: string;
  time: string;
  type: string;
}

const StyledMessage = styled("div")<{ type: string }>`
  float: ${props => props.type === 'sent' ? 'right' : 'left'};
  background-color: ${props => props.theme.messageBackgroundColor};
  border-radius: ${props => props.type === 'sent' ? '7px 0 0 7px;' : '0 7px 7px 7px;'};
  font-size: .9em;
  width: auto;
  max-width: 250px;
  padding: 7px;
  margin: ${props => props.type === 'sent' ? '4px 0' : '4px 14px'};
  display: block;
  clear: both;
`;

const Message: React.FunctionComponent<{ message: IMessage }> = ({ message }) => {
  const parseURLs = (text: string) => {
    const urls = getUrls(text);
    if (!urls.size) {
      return;
    }
  
    const parsedUrls = Array.from(urls).map((url: string, idx: number) => (
      <div key={idx}>{url}</div>
    ));
    return <React.Fragment>
      {parsedUrls}
    </React.Fragment>
  };

  return (
    <React.Fragment>
      <div id='nickname-container'>
        {message.type === 'received' && <Nickname value={message.from}/>}
        <Timestamp value={message.time} floatToRight={message.type === 'sent'}/>
      </div>
      <StyledMessage type={message.type}>
        <Linkify>{message.content} {parseURLs(message.content)}</Linkify>
      </StyledMessage>
    </React.Fragment>

  );

}

export default Message;