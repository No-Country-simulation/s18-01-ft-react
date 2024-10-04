import { useEffect } from 'react';
import { useRef } from 'react';
import StartGame from '../../utils/phaser';

const PageRoom = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = StartGame('room');
    }
  }, []);

  return (
    <div className="mx-auto mt-8 flex size-full max-w-4xl flex-col">
      <div id="room"></div>
    </div>
  );
};

export default PageRoom;
