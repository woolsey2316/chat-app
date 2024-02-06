import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/message/actions';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { readRecord } from '../../utilities/localStorageService';
import { getTime12Hours, getTime24hours } from '../../utilities/common';
import styled from 'styled-components';

const StyledMessageSender = styled("section")`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  
  input {
    color: ${props => props.theme.primaryDarkColor};
    width: 80%;
    line-height: 42px;
    font-size: 1.1em;
    box-sizing: border-box;
    padding: 7px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  }
  
  button {
    background-color: ${props => props.theme.primaryDarkColor};
    width: 20%;
    height: 60px;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  }
`;

const KEY_CODES = {
  ENTER: 'Enter',
  CTRL: 'Control'
};

export const MessageSender: React.FunctionComponent = () => {

  const [username,] =  React.useState(readRecord('username') || 'guest0001');
  const [chatMessage, setChatMessage] =  React.useState('');
  const messagesInputRef = React.createRef<HTMLInputElement>();
  let pressedKeysMap: {} = {};

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    }
  },[])
    
  const handleKeyUp = () => {
    pressedKeysMap = {};
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    pressedKeysMap[e.key] = e.type === 'keydown';

    if (readRecord('ctrlEnterSending') !== 'On') {
      sendOnPressEnter();
    } else {
      sendOnPressCtrlEnter();
    }
  };

  const sendOnPressEnter = () => {
    if (KEY_CODES.ENTER in pressedKeysMap && !(KEY_CODES.CTRL in pressedKeysMap)) {
      sendChatMessage();
      cleanMessageInput();
    } else {
      return; // For more readability - return explicitly (in JS all functions return undefined implicitly).
    }
  };

  const sendOnPressCtrlEnter = () => {
    if (KEY_CODES.CTRL in pressedKeysMap && KEY_CODES.ENTER in pressedKeysMap) {
      sendChatMessage();
      cleanMessageInput();
    } else {
      return;
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChatMessage(e.currentTarget.value);
  };

  const handleClick = () => {
    sendChatMessage();
    cleanMessageInput();
  };

  const sendChatMessage = (): void => {
    if (chatMessage !== '') {
      // @ts-ignore
      props.sendMessage({ from: username, content: chatMessage, time: getTime() });
    }
  };

  const cleanMessageInput = (): void => {
    setChatMessage('');
    if ((messagesInputRef.current as HTMLInputElement)) {
      (messagesInputRef.current as HTMLInputElement).focus();
    }
  };

  const getTime = (): string => {
    return readRecord('clockMode') === '12' ? getTime12Hours() : getTime24hours();
  };

  return (
    <StyledMessageSender>
      <input id='send-message-input' type='text' ref={messagesInputRef} value={chatMessage}
              onChange={handleOnChange}/>
      <button id='send-message-btn' onClick={handleClick}>
        <FontAwesomeIcon icon={faPaperPlane} color="white" size="2x"/>
      </button>
    </StyledMessageSender>
  );

}

export default MessageSender;