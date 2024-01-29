import * as React from 'react';
import { useState, useEffect } from 'react';
import { connectSocket } from '../../store/socket/actions';

export function Navigation() {
  const [receivedUnreadMessages, setUnreceievedMessages] = useState([])
  const [shoudBlink, setShouldBlink] = useState(false)

  const startBlinking = (): void => {
    setShouldBlink(true)
  };

  const stopBlinking = (): void => {
    setShouldBlink(false)
  };

  const clearNotifications = () => {
    setUnreceievedMessages([])
    stopBlinking();
  };

  return (
    <div>Navigation</div>
  )

}

export default Navigation;