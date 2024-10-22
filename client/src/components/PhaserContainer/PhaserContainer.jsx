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
    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return (
    <div className="mt-2 flex size-full max-h-[75dvh] max-w-[67dvw] flex-col">
      <div
        ref={gameRef}
        id="office"
        className="size-full rounded-lg border border-neutral-1000 shadow-drop"></div>
    </div>
  );
};

export default PhaserContainer;
