'use client';

import css from './Modal.module.css';
import { useRouter } from 'next/navigation';
// import { useEffect } from "react";
// import NoteForm from "../NoteForm/NoteForm";

// interface ModalProps {
//   onClose?: () => void;
// }

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter()

  const handleClose = () => router.back()
  
  return (
    <div className={css.backdrop} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
