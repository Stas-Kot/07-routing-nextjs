'use client';
import { Note } from '@/types/note';
import React from 'react';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';

interface NotePreviewClientProps {
  note: Note;
}

const NotePreviewClient = ({ note }: NotePreviewClientProps) => {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button onClick={() => router.back()} className={css.backBtn}>
            Close
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </div>
  );
};

export default NotePreviewClient;
