import { useEffect, useRef } from 'react';
import StartGame from '../../utils/phaser';

const Office = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    let game;
    if (gameRef.current) {
      game = StartGame(gameRef.current);
    }
    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.style.width = `${window.innerWidth}px`;
        gameRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (game) game.destroy(true);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mx-auto mt-8 flex size-full max-w-4xl flex-col">
      <div
        ref={gameRef}
        id="office"
        className="size-full max-h-[500px] max-w-[800px]"></div>
    </div>
  );
};

export default Office;
