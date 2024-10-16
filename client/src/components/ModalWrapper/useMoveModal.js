import { useRef } from 'react';
import { useState } from 'react';

export const useMoveModal = () => {
  const [isMoving, setMoving] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const modal = useRef();

  const onPointerDown = e => {
    e.preventDefault();
    if (!modal.current) return;
    const shiftX = e.clientX - modal.current.getBoundingClientRect().left;
    const shiftY = e.clientY - modal.current.getBoundingClientRect().top;
    setPosition([shiftX, shiftY]);
    setMoving(true);
    modal.current.style.cursor = 'grab';
    document.documentElement.style.setProperty('--pointer-events-control', 'none');
  };
  const onPointerMove = e => {
    e.preventDefault();
    if (!modal.current || !isMoving || !e.isPrimary) return;
    let newX = e.pageX - position[0];
    let newY = e.pageY - position[1];
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    const modalWidth = modal.current.offsetWidth;
    const modalHeight = modal.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (newX + modalWidth > viewportWidth) newX = viewportWidth - modalWidth;
    if (newY + modalHeight > viewportHeight) newY = viewportHeight - modalHeight;
    modal.current.style.left = newX + 'px';
    modal.current.style.top = newY + 'px';
    modal.current.style.cursor = 'grabbing';
  };
  const onPointerStop = e => {
    e.preventDefault();
    e.stopPropagation();
    setMoving(false);
    modal.current.style.cursor = 'default';
    document.documentElement.style.setProperty('--pointer-events-control', 'auto');
  };

  return { onPointerDown, onPointerMove, onPointerStop, modal };
};
