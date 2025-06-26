'use client';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NewNoteModal() {
  return (
    <Modal>
      <NoteForm />
    </Modal>
  );
}
