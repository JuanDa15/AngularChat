import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
//  request.time < timestamp.date(2022, 4, 25);

  constructor(private _chatService:ChatService,
              private _router:Router){
  }
  ngOnInit(): void {
  }

  logOut():any{
    const loginType:string = localStorage.getItem('loginType') || '';

    if(loginType === 'google'){
      this._chatService.googleLogOut();
      this._router.navigateByUrl('/home/login');
    }
  }
}
