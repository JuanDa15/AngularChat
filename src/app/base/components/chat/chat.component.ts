import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Message } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public messageForm:FormGroup;
  public chats:Message[];

  @ViewChild('messageInput') messageInput!:ElementRef<HTMLInputElement>;
  @ViewChild('chatBody') chatContainer!:ElementRef<HTMLDivElement>;

  constructor(private _fb:FormBuilder,
              private _chatService:ChatService) { 
    this.messageForm = this.initializeForm();
    this.chats = [];
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this._chatService.loadMessages().subscribe({
      next:(messages:Message[]) => {
        this.chats = messages;
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      },
      error:(err:any) => {
        console.log(err)
      }
    })
  }

  initializeForm():FormGroup{
    return this._fb.group({
      message: ['']
    })
  }

  sendMessage():void{
    const control:AbstractControl | null = this.messageForm.get('message');
    if(control?.value.length !== 0){
      const promise = this._chatService.sendMessage(this.messageForm.value);
      control?.disable();

      promise.then( answer => {
        control?.enable();
        this.messageForm.reset();
        this.messageInput.nativeElement.focus();
        console.log(answer);
      })

      promise.catch( err => {
        console.log(err);
      })
    }
  }
}
