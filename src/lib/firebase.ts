import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  query,
  increment,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Project } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const BOOTSTRAPPED_ADMIN_EMAILS = [
  'athrnjd@gmail.com',
  'tknwlwjyblal@gmail.com',
];

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection to Firestore
export async function testFirestoreConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline. Please check network/config.');
    }
  }
}

// Run connection test non-blocking
testFirestoreConnection();

// Check if current user is an admin
export async function isCurrentUserAdmin(user: User | null): Promise<boolean> {
  if (!user || !user.email) return false;
  const userEmail = user.email.toLowerCase();
  if (BOOTSTRAPPED_ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === userEmail)) {
    return true;
  }
  try {
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    return adminDoc.exists();
  } catch {
    return false;
  }
}

// Google Sign-In via popup
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Sign Out
export async function signOutAdmin(): Promise<void> {
  await firebaseSignOut(auth);
}

// Realtime projects listener
export function subscribeToProjects(
  onUpdate: (projects: Project[]) => void,
  onError?: (error: Error) => void
) {
  const collectionRef = collection(db, 'projects');
  return onSnapshot(
    collectionRef,
    (snapshot) => {
      const items: Project[] = [];
      snapshot.forEach((d) => {
        const data = d.data();
        items.push({
          id: d.id,
          title: data.title || '',
          category: data.category || 'majlis',
          categoryLabel: data.categoryLabel || '',
          district: data.district || '',
          image: data.image || '',
          description: data.description || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          specs: data.specs || {},
          featured: Boolean(data.featured),
          span: data.span || 'lg:col-span-4',
          viewsCount: typeof data.viewsCount === 'number' ? data.viewsCount : 0,
        });
      });
      onUpdate(items);
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.LIST, 'projects');
      } catch (e) {
        if (onError) onError(e as Error);
      }
    }
  );
}

// Add or create a new showcase project
export async function addProject(project: Omit<Project, 'id'> & { id?: string }): Promise<string> {
  const id = project.id && project.id.trim().length > 0 ? project.id : `proj_${Date.now()}`;
  const docRef = doc(db, 'projects', id);

  const cleanData: Record<string, any> = {
    title: project.title,
    category: project.category,
    image: project.image,
    district: project.district,
    categoryLabel: project.categoryLabel || '',
    description: project.description || '',
    featured: Boolean(project.featured),
    span: project.span || 'lg:col-span-4',
    tags: project.tags || [],
    specs: project.specs || {},
    viewsCount: typeof project.viewsCount === 'number' ? project.viewsCount : 0,
  };

  try {
    await setDoc(docRef, cleanData);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `projects/${id}`);
  }
}

// Update existing showcase project (uses setDoc with merge so it creates if document does not exist yet)
export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const docRef = doc(db, 'projects', id);
  const cleanData: Record<string, any> = {};

  if (updates.title !== undefined) cleanData.title = updates.title;
  if (updates.category !== undefined) cleanData.category = updates.category;
  if (updates.image !== undefined) cleanData.image = updates.image;
  if (updates.district !== undefined) cleanData.district = updates.district;
  if (updates.categoryLabel !== undefined) cleanData.categoryLabel = updates.categoryLabel;
  if (updates.description !== undefined) cleanData.description = updates.description;
  if (updates.featured !== undefined) cleanData.featured = updates.featured;
  if (updates.span !== undefined) cleanData.span = updates.span;
  if (updates.tags !== undefined) cleanData.tags = updates.tags;
  if (updates.specs !== undefined) cleanData.specs = updates.specs;
  if (updates.viewsCount !== undefined) cleanData.viewsCount = updates.viewsCount;

  try {
    await setDoc(docRef, cleanData, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `projects/${id}`);
  }
}

// Increment project view count atomically with session deduplication
export async function incrementProjectViews(projectId: string): Promise<void> {
  if (!projectId) return;

  try {
    const sessionKey = `viewed_proj_${projectId}`;
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, '1');
    }
  } catch {
    // Ignore storage issues
  }

  const docRef = doc(db, 'projects', projectId);
  try {
    await updateDoc(docRef, {
      viewsCount: increment(1),
    });
  } catch (err) {
    try {
      await setDoc(docRef, { viewsCount: increment(1) }, { merge: true });
    } catch {
      // Non-blocking telemetry
    }
  }
}

// Delete project
export async function removeProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  try {
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
  }
}

// Seed initial default projects into Firestore
export async function seedInitialProjects(defaultProjects: Project[]): Promise<void> {
  try {
    for (const p of defaultProjects) {
      const docRef = doc(db, 'projects', p.id);
      await setDoc(docRef, {
        title: p.title,
        category: p.category,
        image: p.image,
        district: p.district,
        categoryLabel: p.categoryLabel || '',
        description: p.description || '',
        featured: Boolean(p.featured),
        span: p.span || 'lg:col-span-4',
        tags: p.tags || [],
        specs: p.specs || {},
      }, { merge: true });
    }
  } catch (err) {
    console.warn('Initial seeding error:', err);
  }
}
