import centralImg from '/public/images/CENTRAL.png';
import dailyImg from '/public/images/DAILY.png';
import designImg from '/public/images/DESIGN.png';
import forgeImg from '/public/images/FORGE.png';
import zenzoneImg from '/public/images/ZENZONE.png';

const getImage = val => {
  if (val === 'CENTRAL') return centralImg;
  if (val === 'DAILY') return dailyImg;
  if (val === 'DESIGN') return designImg;
  if (val === 'FORGE') return forgeImg;
  if (val === 'ZENZONE') return zenzoneImg;
  return '';
};

export const PresetRadioItem = ({ title, sub, value, id, name, img }) => {
  return (
    <label
      className="relative flex cursor-pointer gap-x-2 rounded p-1 opacity-85 transition duration-200 ease-in-out after:pointer-events-none after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:transition-all after:duration-150 after:ease-linear after:content-[''] hover:bg-accent-200 hover:opacity-100 active:bg-accent-300 [&:has(input:checked)]:bg-accent-300 [&:has(input:checked)]:opacity-100 [&:has(input:checked)]:after:w-1 [&:has(input:checked)]:after:bg-primary-400"
      htmlFor={id}>
      <input className="hidden" type="radio" name={name} id={id} value={value} />
      <img
        src={getImage(value)}
        alt="Preset"
        className="aspect-square size-14 rounded-md"
        width={56}
        height={56}
        decoding="async"
      />
      <div className="flex flex-col pr-3">
        <span className="font-medium text-accent-1000">{title}</span>
        <p className="text-neutral-900">{sub}</p>
      </div>
    </label>
  );
};