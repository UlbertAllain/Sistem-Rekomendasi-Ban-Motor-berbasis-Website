// lib/firebase/admin.ts

import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminDb: any = null;

function getAdminApp() {
  // Cegah error saat build (env vars belum ada)
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
    return null;
  }

  const serviceAccount = {
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  };

  if (getApps().length === 0) {
    return initializeApp({ credential: cert(serviceAccount as any) });
  }
  return getApp();
}

export function getAdminDb() {
  if (adminDb) return adminDb;
  
  const app = getAdminApp();
  if (!app) return null;
  
  adminDb = getFirestore(app);
  return adminDb;
}