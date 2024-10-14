import { useEffect, useRef } from 'react';
import StartGame from '../../utils/phaser';

const Room = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = StartGame('room');
    }
    return () => {
      if (gameRef.current) gameRef.current.destroy(true);
    };
  }, []);

  return (
    <div className="mx-auto mt-8 flex size-full max-w-4xl flex-col">
      <div id="room"></div>
    </div>
  );
};

export default Room;
