import { SOCKET_URL } from '@/utils/api/socket';
import StartGame from '@/utils/phaser';
import { SCENE_KEYS } from '@/utils/phaser/consts';
import { EventBus } from '@/utils/phaser/EventBus';
import { useEffect, useRef } from 'react';

const PhaserContainer = ({ roomId }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    let game;
    if (gameRef.current) {
      game = StartGame(gameRef.current);
      EventBus.on(SCENE_KEYS.SCENE_READY, mainScene => {
        mainScene.socket = io(`${SOCKET_URL}/${roomId || ''}`, {
          autoConnect: false,
        });
        // mainScene.setupSocketListeners();
      });
    }

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