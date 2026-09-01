import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: 'AIzaSyCBwHrDgc6ffRx8ccpYsfz7XNAEOyuehAQ',
  authDomain: 'cherry-9886f.firebaseapp.com',
  projectId: 'cherry-9886f',
  storageBucket: 'cherry-9886f.firebasestorage.app',
  messagingSenderId: '294176754889',
  appId: '1:294176754889:web:e9580434f97eef3d56d118',
  measurementId: 'G-N0PK4K6L9Q',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerUserWithProfile({ name, lastName, email, password }) {
  const normalizedName = (name || '').trim();
  const normalizedLastName = (lastName || '').trim();
  const normalizedEmail = (email || '').trim().toLowerCase();

  if (!normalizedName || !normalizedLastName || !normalizedEmail || !password) {
    throw new Error('Faltan datos del usuario.');
  }

  const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
  const fullName = `${normalizedName} ${normalizedLastName}`.trim();

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  await setDoc(
    doc(db, 'users', userCredential.user.uid),
    {
      uid: userCredential.user.uid,
      nombre: normalizedName,
      apellido: normalizedLastName,
      displayName: fullName,
      email: normalizedEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      provider: 'email',
    },
    { merge: true }
  );

  return userCredential.user;
}
