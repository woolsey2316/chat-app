import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { connectSocket } from '../../store/socket/actions';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UnreadMessagesCounter from '../unreadMessagesCounter/UnreadMessagesCounter';
import { AppContext } from 'src/utilities/TranslationsProvider';
import { useAppDispatch } from 'src/hooks/hooks';

const UL = styled.ul`
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.secondaryLightColor};
`
const LI = styled.li`
  width: 100%;
`
const StyledNavLink = styled(NavLink)`
  display: block;
  color: ${props => props.theme.primaryLightColor};
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
    
  &:hover {
    background-color: ${props => props.theme.secondaryDarkColor};
  }

  &.active {
    background-color: ${props => props.theme.secondaryDarkColor};
    border-bottom: 3px solid #ccc;
  }

  .blinking {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      background-color: ${props => props.theme.secondaryLightColor};
    }
    100% {
      background-color: ${props => props.theme.primaryDarkColor};
    }
  }
  
  .no-blinking {
    background-color: unset;
  }
`
const Span = styled.span`
  padding: 14px;
  font-size: 1.4em;
  
  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  /* Portrait */
  @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) {
      padding: 7px;
  }      
`
export const Navigation: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const appContext = useContext(AppContext)
  const [, setUnreceievedMessages] = useState([])
  const [unreadMessages, ] = useState(0)
  const [shouldBlink, setShouldBlink] = useState(false)

  const startBlinking = (): void => {
    setShouldBlink(true);
  };

  const stopBlinking = (): void => {
    setShouldBlink(false);
  };

  const clearNotifications = () => {
    setUnreceievedMessages([]);
    stopBlinking();
  };

  useEffect(() => {
    startBlinking();
    dispatch(connectSocket())
  },[])

  return (
    <UL>
      <LI>
        <StyledNavLink className={({ isActive }) => (isActive ? "active" : shouldBlink ? "blinking" : "no-blinking")}
                 onClick={clearNotifications}
                 to='/chat'>
          <FontAwesomeIcon icon={faComment} color="white" size="lg"/>
          <UnreadMessagesCounter count={unreadMessages}/>
          <Span>{appContext.translations.nav.chatTabLabel}</Span>
        </StyledNavLink>
      </LI>
      <LI>
        <StyledNavLink className={({ isActive }) => (isActive ? "active" : "")} to='/settings'>
          <FontAwesomeIcon icon={faCog} color="white" size="lg"/>
          <Span>{appContext.translations.nav.settingsTabLabel}</Span>
        </StyledNavLink>
      </LI>
    </UL>
  );
}

export default Navigation;