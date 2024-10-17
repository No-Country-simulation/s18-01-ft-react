import { modalAtom } from '@/store/modalAtom';
import { useAtom } from 'jotai';
import { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export const useMoveModal = id => {
  const [modalA, _] = useAtom(modalAtom);
  const [shiftPosition, setShiftPosition] = useState([0, 0]);
  const [position, setPosition] = useState([0, 0]);
  const [isMoving, setMoving] = useState(false);
  const modal = useRef();

  const onPointerDown = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!modal.current || !modalA.open || e.target.closest('.ignore-drag')) return;
      const shiftX = e.clientX - modal.current.getBoundingClientRect().left;
      const shiftY = e.clientY - modal.current.getBoundingClientRect().top;
      setShiftPosition([shiftX, shiftY]);
      setMoving(true);
      document.documentElement.style.setProperty('--pointer-events-control', 'none');
    },
    [isMoving, modalA.open]
  );

  const onPointerMove = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!modal.current || !isMoving || !e.isPrimary) return;
      let newX = e.pageX - shiftPosition[0] - window.scrollX;
      let newY = e.pageY - shiftPosition[1] - window.scrollY;
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      const modalWidth = modal.current.offsetWidth;
      const modalHeight = modal.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      if (newX + modalWidth > viewportWidth) newX = viewportWidth - modalWidth;
      if (newY + modalHeight > viewportHeight) newY = viewportHeight - modalHeight;
      setPosition([newX, newY]);
    },
    [shiftPosition, isMoving]
  );

  const onPointerStop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMoving) return;
    setMoving(false);
    document.documentElement.style.setProperty('--pointer-events-control', 'auto');
  };

  useLayoutEffect(() => {
    if (isMoving) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerStop);
      window.addEventListener('pointerleave', onPointerStop);
      window.addEventListener('pointercancel', onPointerStop);
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerStop);
      window.removeEventListener('pointerleave', onPointerStop);
      window.removeEventListener('pointercancel', onPointerStop);
    };
  }, [isMoving, onPointerMove, onPointerStop]);

  console.log({ modalSeted: modalA.modalId, id });
  return {
    modal,
    isOpen: modalA.open && modalA.modalId === id,
    onPointerDown,
    position,
  };
};
