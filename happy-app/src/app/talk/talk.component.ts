import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TalkService } from '../api/services';
import { isNull } from 'util';
import { ApiConfiguration } from '../api/api-configuration';


@Component({
  selector: 'app-chat',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css'],
  providers:[TalkService]
})
export class TalkComponent  {
  
  onlineUser:any=[]
  u:string;
  roomsForChat:any=['Subscription Plot','Community','Contest'];
  build_type_unselected: boolean = true;
  request_unstarted: boolean = true;
  messageArray:Array<{user:String,message:String}> = [];  
  join_message:string;
  leave_message:string;
  count:any;
  userJoined:string = JSON.parse(sessionStorage.getItem("user")).name;
  roomJoined:string;
  loggedIn:boolean = (isNull(sessionStorage.getItem("account_token")))? false : true;

  //reactive form
  chatForm:FormGroup;

  constructor(
      private _chatService:TalkService,
      private fb:FormBuilder,
      public apiConfiguration: ApiConfiguration
    ){
      this._chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));

      this._chatService.userLeftRoom()
      .subscribe(data=> this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=> this.messageArray.push(data));

      this._chatService.totalUsers()
      .subscribe((data)=>{
        this.count=data.count
      });


      
    }

    user = JSON.parse(sessionStorage.getItem("user"));
    userName: string = this.user["name"];

  join(){
    console.log("Request Started")
    this.build_type_unselected = true;
    this.request_unstarted = false;
    this.leave_message=null
    this.join_message="You have started a " +this.roomJoined +" request."
    this._chatService.joinRoom({user:this.chatForm.get('user').value,room:this.chatForm.get('room').value});
  }

  leave(){
    this.build_type_unselected = false;
    this.request_unstarted = true;
    this.join_message=null
    this.leave_message="You are done with a "+this.roomJoined +" request."
    this._chatService.leaveRoom({user:this.chatForm.get('user').value,room:this.chatForm.get('room').value});
  }
    
  sendMessage(){
    console.log("Send")
    console.log(this.chatForm.get('user').value)
    console.log(this.chatForm.get('room').value)    
    console.log(this.chatForm.get('messageText').value) 
        this._chatService.sendMessage({user:this.chatForm.get('user').value,room:this.chatForm.get('room').value,message:this.chatForm.get('messageText').value});
  }

  userInfo;

  ngOnInit() { 

    //this.chatForm.patchValue({ "user": JSON.parse(sessionStorage.getItem("user")).name });
    
    this.userInfo=history.state;
    this.u=this.userInfo.email;
    this.chatForm=this.fb.group({
     user:["",Validators.required],
     room:["",Validators.required],
     messageText:[""]
    })

    this.chatForm
      .valueChanges
      .subscribe(value => {  
        console.log(value);
        

        if(typeof value.room != "undefined" && value.room != ""){
          this.build_type_unselected = false;
        }
        /*
        this.chatForm.patchValue({ "room": value.room },  {
          onlySelf: true
        });
        */

        /*
        room.setValue(value.room, {
          onlySelf: true
        })
        */

      });
    
    
  }

  // Choose room using select dropdown
  
  changeRoom(e: any) {
    console.log(e);
    console.log("Jello")
    this.room.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get room() {
    return this.chatForm.get('room');
  }
  


  //to get list of online users
  getOnlineUsers(){

  }


}