import { Injectable, OnInit } from '@angular/core';
import { collectionData, CollectionReference, Firestore, orderBy } from '@angular/fire/firestore';
import { addDoc, collection, limit, query } from '@firebase/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, User } from "firebase/auth";
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{
  private googleAuth:GoogleAuthProvider;
  private _chatsCollection: CollectionReference<any>;
  private _chats:Message[];
  private _user!:User;
  constructor(private firestore:Firestore,
              private _router:Router){
    this._chatsCollection = collection(this.firestore,'chats')
    this._chats = [];
    this.googleAuth = new GoogleAuthProvider();
  }
  ngOnInit(): void {
  }

  loadMessages():Observable<any>{
    return collectionData(query(this._chatsCollection,orderBy('date','desc'),limit(16))).pipe(
      map((value:Message[]) => {
        this._chats = [];
        for(let val of value){
          this._chats.unshift(val);
        }
        return this._chats;
      })
    )
  }

  async sendMessage(message:Message){
    const body:Message = {
      ...message,
      date: new Date()
    }

    await addDoc(collection(this.firestore,"chats"),body);
  }

  googleLogin(){
    const auth = getAuth();
    signInWithPopup(auth,this.googleAuth).then((result)=> {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      this._user = result.user;
      localStorage.setItem('token',token || '');
      localStorage.setItem('userInfo',JSON.stringify(this._user));
      this._router.navigateByUrl('/home/chat')
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }

  googleLogOut(){
    const auth:Auth = getAuth();
    signOut(auth).then(()=> {
      localStorage.clear();
    }).catch((error) =>{
      console.log(error);
    })
  }
}
