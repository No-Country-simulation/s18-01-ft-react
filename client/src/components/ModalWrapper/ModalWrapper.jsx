import { createPortal } from 'react-dom';
import { useMoveModal } from './useMoveModal';
import { cn } from '@/utils/functions/cn';

const root = document.getElementById('root-modal');

const ModalWrapper = ({ children, className }) => {
  const { onPointerDown, onPointerMove, onPointerStop, modal } = useMoveModal();
  if (!root) {
    console.error('Modal root element not found');
    return null;
  }

  return createPortal(
    <article
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerCancel={onPointerStop}
      onPointerLeave={onPointerStop}
      onPointerUp={onPointerStop}
      ref={modal}
      role="dialog"
      aria-modal="true"
      className={cn(
        className,
        'round absolute inset-0 size-full max-h-96 max-w-md rounded-4xl border border-solid border-black bg-accent-100 px-4 py-8 shadow-drop'
      )}>
      {children}
    </article>,
    root
  );
};

export default ModalWrapper;
