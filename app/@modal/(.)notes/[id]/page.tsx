import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

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
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </Modal>
    );
  } catch (error) {
    console.error('Error loading note:', error);
    return (
      <Modal>
        <h2>Note not found</h2>
        <p>The note might have been deleted or the ID is invalid.</p>
      </Modal>
    );
  }
};

export default NotePreview;
