import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { DbUser } from './model/db-user';
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminID = 'A4Rs2ksmNOUnTa61JH8uRDKlL5q2';
  public user!: Observable<firebase.User>;
  constructor(private auth: Auth, private firestore: Firestore) {
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  register(newUser: DbUser) {
    return createUserWithEmailAndPassword(this.auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.writeUserData(user.uid, newUser)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  writeUserData(userId: string, user: DbUser) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), user);
  }

  logout() {
    return signOut(this.auth);
  }

  isAdmin(): boolean {
    if (this.auth.currentUser){
      return (this.auth.currentUser.uid == this.adminID);
    }else {
      return false
    }
  }

  isSignedIn(): boolean{
    if (this.auth.currentUser){
      return true;
    }else {
      return false;
    }
  }

  getCurrentUser() {
    if (this.auth.currentUser){
      return this.auth.currentUser.uid;
    }else {
      return 'no current user';
    }
  }
}
