'use client';

import AddNotes from './_components/add-notes';
import NotesHeader from './_components/notes-header';
import NotesList from './_components/notes-list';

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="shadow border-solid border-2 px-12 py-5 mt-12 rounded-lg">
        <NotesHeader />
        <AddNotes />
        <NotesList />
      </div>
    </main>
  );
}
