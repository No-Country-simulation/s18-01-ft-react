import message from '/public/svg/message.svg';
import more from '/public/svg/more.svg';

//TODO: Cambiar el div con bg-neutral-700 imagen de la sala (Cuando este disponible)
export const RoomItem = ({ name, count }) => (
  <div className="flex w-full items-center justify-between p-1">
    <div className="flex w-full items-center justify-start gap-x-[11px]">
      <div
        className="size-8 rounded-lg bg-neutral-700"
        aria-label="Imagen de la sala"></div>
      <p>
        {name} ({count})
      </p>
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
