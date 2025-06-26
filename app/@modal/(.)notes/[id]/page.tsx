import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const stringId = await params;
  const id = Number(stringId);

  if (!stringId || isNaN(id)) {
    return null;
  }
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
