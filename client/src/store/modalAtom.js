import { atom } from 'jotai';

export const modalAtom = atom({
  open: false,
  modalId: '',
  coords: [0, 0],
  firstOpen: false,
});
