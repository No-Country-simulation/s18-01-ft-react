import Button from '../Button/Button';
import { ModalTitleWrapper } from '../ModalWrapper/ModalTitleWrapper';
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
    <ModalTitleWrapper
      className="max-h-[512px] w-full max-w-96"
      id="Salas"
      icon={container}
      title={`Salas (${roomsData.length})`}>
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
    </ModalTitleWrapper>
  );
};
