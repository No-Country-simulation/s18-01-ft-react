import StartGame from '@/utils/phaser';
import { useEffect, useRef } from 'react';

const PhaserContainer = () => {
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
    <div className="mx-auto mt-9 flex size-full max-w-4xl flex-col">
      <div
        ref={gameRef}
        id="office"
        className="size-full max-h-[657px] max-w-[845px] rounded-lg border border-neutral-1000"></div>
    </div>
  );
};

export default PhaserContainer;
