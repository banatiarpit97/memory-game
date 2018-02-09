import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StartPage } from '../start/start';

declare var $:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  print;	
    images = [];
    brickClicked = false;
    prevBrick;
    currentBrick;
    clickedNumber;
    bricks:any;  
    numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23, 24, 25, 26, 27];
    brickNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23, 24, 25, 26, 27];

    count = 0;
    i = 1;
    sameImagesCount =1;
    sameImages=[];
    random;
    yes;  
    loader;
    state = "pause";
    moves = 0;
    minutes:any = 0;
    seconds:any = 0;
    minutesShow;        
    secondsShow;
    time;  
    score = 0;
    highscoreMinutes;
    highscoreSeconds; 
    highscoreMoves;     

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
  	          public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              private storage:Storage){
    this.minutesShow = this.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
    this.secondsShow = this.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});
     
     this.loader = loadingCtrl.create({
        content:"Starting Game"
      });
      this.loader.present();
     var global = this;

     var cc = setTimeout(function(){
        global.setBricks();
       $('.card').click(function(){
         if(global.state == "play"){
	 	      $(this).css('transform', 'rotateY(180deg)');
          global.moves++;
         }
	   })
      global.loader.dismiss();
      global.loader = null; 
      global.state = "play";
      global.changeTime();
	 }, 1000);

    this.highscoreMinutes = this.navParams.get('highscoreMinutes');
    this.highscoreSeconds = this.navParams.get('highscoreSeconds');
    this.highscoreMoves = this.navParams.get('highscoreMoves');
    console.log(this.highscoreMinutes, this.highscoreSeconds)
  }

  changeTime(){
    var global = this;
    this.time = setInterval(function(){
       global.seconds++;
       if(global.seconds == 60){
         global.minutes++;
         global.minutesShow = global.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
         global.seconds = 0;
         global.secondsShow = global.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});
       }
       else{
         global.secondsShow = global.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});
       }
    }, 950)
  }

  pause(){
    clearInterval(this.time);
    this.state = "pause";
  }

  play(){
    this.changeTime();
    this.state = "play";
  }

  setBricks(){
  	var glob = this;
  	this.bricks = document.querySelectorAll(".card");
     console.log(document.querySelectorAll(".card"));
     for(let i = 0;i<this.bricks.length;i++){
     	this.bricks[i].addEventListener('click', function(){
     		console.log(i);
         if(glob.state == "play"){
         		glob.clickedNumber = i;
              glob.checkBricks();
         }
     	});
     }
     this.setImages();
  }

  setImages(){
  	var no =null;
	no = this.getrandom();
	while(no == null){
		no = this.getrandom();
	}  	
  	this.sameImages.push(no);
  	console.log(this.sameImages);
  	this.numbers[no] = null;
  	this.count++;
  	if(this.count == 4){

       for(let j = 0;j<this.sameImages.length;j++){
       	 this.images[this.sameImages[j]] = "assets/imgs/fruit"+this.i+".jpg"; 
       }
       this.i++;
       this.sameImages = [];
       this.count = 0;
       this.sameImagesCount++;
       if(this.sameImagesCount == 8){
       	return 1;
       }
       else{
       	this.setImages();
       }
  	}
  	else{
  		this.setImages();
  	}
  }

  getrandom(){
  	this.random = Math.floor(Math.random()*28);
	return this.numbers[this.random];
  }

  checkBricks(){
    var global = this;
  	console.log('hh')
  	if(!this.brickClicked){
      var jqu = ".front:eq("+this.clickedNumber+")"; 
      $(jqu).css({"background-color": "#a8f3b5", "box-shadow": "5px 3px #85E79C,  3px 5px #85E79C"});
  		this.prevBrick = this.clickedNumber;
  		this.brickClicked = true;
      var jq = ".card:eq("+this.clickedNumber+")";
      var rotateBack = setTimeout(function(){
           $(jq).css('transform', 'rotateY(360deg)');
       }, 500)
  	}
  	else if(this.brickClicked){
      var jqu = ".front:eq("+this.prevBrick+")";
      $(jqu).css({'background-color': "#A8F3EF", 'box-shadow': '5px 3px #83cee0,  3px 5px #83cee0'});
  		this.currentBrick = this.clickedNumber;
  		console.log(this.prevBrick, this.currentBrick);
  		if(this.images[this.prevBrick] == this.images[this.currentBrick] && (this.prevBrick != this.currentBrick)){
  			console.log("true");
  			var hide1 = ".card:eq("+(this.prevBrick)+")";
  			var hide2 = ".card:eq("+(this.currentBrick)+")";
  			console.log($(hide1).html(), $(hide2).html());
  			let toast = this.toastCtrl.create({
              message: "Hurray! Match Found",
              duration: 1000
            });
            toast.present();
             $(hide1).css('transform', 'rotateY(180deg');
         this.score++;

  			var remove = setTimeout(function(){
          $(hide1).hide();
          $(hide2).hide();	
           if(global.score == 14){
             console.log('over');
             clearTimeout(global.time);

             if(global.highscoreMinutes == 0 && global.highscoreSeconds == 0){
                      global.storage.set('highscoreMinutes', global.minutes);
                      global.storage.set('highscoreSeconds', global.seconds);
              }
             else{
               if(global.minutes < global.highscoreMinutes){
                      global.storage.set('highscoreMinutes', global.minutes);
                      global.storage.set('highscoreSeconds', global.seconds);
               }  
               else if(global.minutes == global.highscoreMinutes){
                 if(global.seconds < global.highscoreSeconds){
                      global.storage.set('highscoreSeconds', global.seconds);
                 }
               }
              }
              console.log(global.highscoreMoves, typeof(global.highscoreMoves))

              if(global.highscoreMoves == 0){

                  console.log('1')
                   console.log(global.moves)
                   global.storage.set('highscoreMoves', global.moves);
              }
              else{
                  console.log('2')

                   console.log(global.moves)
                if(global.moves < global.highscoreMoves){
                  console.log('3')

                   global.storage.set('highscoreMoves', global.moves);
                }
              }
            global.navCtrl.setRoot(StartPage);  
               
           }
  			}, 900)
  			
  		}
  		else{
        var jq = ".card:eq("+this.clickedNumber+")";
        var rotateBack = setTimeout(function(){
           $(jq).css('transform', 'rotateY(360deg)');
       }, 500)
  			console.log("false");
  		}
  		this.brickClicked = false;
  	}
  }

  goBack() {
    console.log('hh');
    this.navCtrl.setRoot(StartPage);
  }



}
