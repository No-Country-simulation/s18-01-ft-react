import warning from '/public/svg/Warning.svg';

export const UserEmptyLobby = () => {
  return (
    <div className="mr-auto w-full max-w-[50rem] rounded-2xl border border-accent-1000 px-4 py-3">
      <div className="flex items-start justify-center gap-x-2 pb-12">
        <img src={warning} width={24} height={24} alt="Warning icon" />
        <p className="-mt-1 text-base font-semibold">
          Aún no perteneces a ningúna empresa o equipo de trabajo. ¡Únete a un equipo
          para poder visualizar sus salas e interactuar con tus compañeros!
        </p>
      </div>
    </div>
  );
};
