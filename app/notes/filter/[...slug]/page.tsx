import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';
import NotesClient from './Notes.client';
import { fetchNotes, GetNotesRes } from '@/lib/api';
import { Tag, TAGS} from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function Notes({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const stringTag = slug?.[0];
  
  function isValidTag(value: string): value is Tag {
    return TAGS.includes(value as Tag);
  }
  const currentTag: Tag | undefined = stringTag && isValidTag(stringTag) ? stringTag : undefined;
  

  const initialTag = currentTag;
  const initialSearch = '';
  const initialPage = 1;
  const queryKey = ['notes', initialSearch, initialPage, initialTag];

  await queryClient.prefetchQuery<GetNotesRes>({
    queryKey,
    queryFn: () => fetchNotes(initialSearch, initialPage, initialTag),
  });

  const initialData = queryClient.getQueryData<GetNotesRes>(queryKey);

  if (!initialData) {
    throw new Error('Initial data for notes not found in cache after prefetch.');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Toaster />
      <div className={css.app}>
        <NotesClient
          initialTag={initialTag}
          initialData={initialData}
          initialSearch={initialSearch}
          initialPage={initialPage}
        />
      </div>
    </HydrationBoundary>
  );
}

export default Notes;
