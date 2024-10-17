const ToolbarButton = ({ icon, label, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-[69px] w-[86px] flex-col items-center justify-center rounded-lg hover:bg-primary-200 active:border-primary-400 active:bg-primary-300 ${isSelected ? 'border border-primary-400 bg-primary-300' : 'bg-white'}`}>
      <span>{icon}</span>
      <span className="mt-2 text-sm">{label}</span>
    </button>
  );
};

export default ToolbarButton;
