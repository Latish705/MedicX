import * as admin from "firebase-admin";


import dotenv from "dotenv";  

dotenv.config();

const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS)
  : undefined;

admin.initializeApp({
  credential: admin.credential.cert(
    FIREBASE_CREDENTIALS as admin.ServiceAccount
  ),
});

export default admin;
