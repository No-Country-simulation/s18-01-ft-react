import Button from '../Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { RoomModalTabs } from './RoomModalTabs';
import container from '/public/svg/container.svg';

const roomsData = [
  { name: 'Desarrollo', count: 4 },
  { name: 'Diseño', count: 2 },
  { name: 'General', count: 0 },
  { name: 'Daily', count: 0 },
  { name: 'Descanso', count: 0 },
];
export const RoomModal = () => {
  return (
    <ModalWrapper
      className="max-h-[512px] w-full max-w-96 bg-primary-400 pt-16"
      id="Salas">
      <div className="relative flex w-full flex-col">
        <h3 className="pointer-events-none absolute -top-12 left-1/2 -z-10 inline-flex w-fit -translate-x-1/2 touch-none gap-x-2 text-center text-lg font-semibold text-accent-100">
          <img
            src={container}
            decoding="async"
            width={24}
            height={24}
            className="aspect-square object-cover object-center"
          />
          Salas ({roomsData.length})
        </h3>
        <div className="flex size-full flex-col gap-y-4 rounded-b-4xl bg-accent-100">
          <RoomModalTabs rooms={roomsData} />
          <div className="mt-auto flex w-full items-center justify-center pb-8">
            <Button
              className="max-w-[75%] text-accent-100"
              size="full"
              onClick={() => alert('Proximamente')}>
              Crear Sala
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
