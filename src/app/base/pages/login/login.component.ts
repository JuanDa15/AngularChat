import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _chatService:ChatService) { }

  ngOnInit(): void {
  }

  login(loginProvider:string):void{
    localStorage.setItem('loginType',loginProvider)
    if(loginProvider === 'google'){
      this._chatService.googleLogin();
    }

    if(loginProvider === 'twitter'){
    
    }
  }

}
