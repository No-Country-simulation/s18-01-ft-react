import { cn } from '@/utils/functions/cn';
import message from '/public/svg/message.svg';
import more from '/public/svg/more.svg';

//TODO: Cambiar el div con bg-neutral-700 imagen de la sala (Cuando este disponible)
export const TabItem = ({ name, sub, isRoom }) => (
  <div className="flex w-full items-center justify-between rounded px-2 py-1 transition duration-200 ease-in-out hover:bg-accent-300">
    <div className="flex w-full items-center justify-start gap-x-[11px]">
      <div
        className={cn(
          'size-8 bg-neutral-700',
          isRoom ? 'rounded-lg' : 'rounded-full'
        )}
        aria-label={isRoom ? 'Imagen de la sala' : 'Imagen del usuario'}></div>
      {isRoom ? (
        <p>{name}</p>
      ) : (
        <div className="flex flex-col">
          <h4>{name}</h4>
          <h5>{sub}</h5>
        </div>
      )}
    </div>
    <div className="flex gap-x-2">
      <div className="cursor-pointer" onClick={() => alert('Proximamente')}>
        <img
          src={message}
          decoding="async"
          width={24}
          height={24}
          className="aspect-square object-cover object-center"
        />
      </div>
      <div className="cursor-pointer" onClick={() => alert('Proximamente')}>
        <img
          src={more}
          decoding="async"
          width={24}
          height={24}
          className="aspect-square object-cover object-center"
        />
      </div>
    </div>
  </div>
);
