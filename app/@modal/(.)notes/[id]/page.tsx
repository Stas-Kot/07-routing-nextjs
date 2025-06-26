import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const idString = (await params).id;
  const id = Number(idString);

  if (!idString || isNaN(id)) {
    return null;
  }

  try {
    const note = await fetchNoteById(id);

    return (
      <Modal>
        <NotePreviewClient note={note} />
      </Modal>
    );
  } catch (error) {
    console.error('Error loading note:', error);
  }
};

export default NotePreview;
