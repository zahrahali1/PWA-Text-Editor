import { request } from 'express';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates a new object store for the data
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database
  const db = await openDB('jate', 1);
  // Access the object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Add the content to the store
  await store.put(content);
  // Complete the transaction
  await tx.done;
  console.log('Content added to database:', content);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  // Access the object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Retrieve all content from the store
  const request = store.getAll();
  // Get confirmation fo the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();