import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { HighScoresPage } from '../high-scores/high-scores'


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
	highscoreMinutes;
	highscoreSeconds;
  highscoreMoves;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private platform:Platform,
              public alertCtrl:AlertController) {
   // this.platform.ready().then(() => {
   	this.storage.get('highscoreMinutes').then(highscoreMinutes => {
   		if(highscoreMinutes){
   			this.highscoreMinutes = highscoreMinutes;
   		}
   		else{
   			this.highscoreMinutes = 0;
   		}
   	})
   	this.storage.get('highscoreSeconds').then(highscoreSeconds => {
   		if(highscoreSeconds){
   			this.highscoreSeconds = highscoreSeconds;
   		}
   		else{
   			this.highscoreSeconds = 0;
   		}
   	})
     this.storage.get('highscoreMoves').then(highscoreMoves => {
       if(highscoreMoves){
         this.highscoreMoves = highscoreMoves;
       }
       else{
         this.highscoreMoves = 0;
       }
     })
   // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  play(){
  	console.log(this.highscoreMinutes, this.highscoreSeconds);
  	this.navCtrl.setRoot(HomePage, {highscoreSeconds:this.highscoreSeconds, highscoreMinutes:this.highscoreMinutes, highscoreMoves:this.highscoreMoves});
  }


  showInstructions() {
    let alert = this.alertCtrl.create({
      title: 'Game Instructions!',
      subTitle: "<p>Welcome to the Memory Game!</p> <p>Touch the brick to reveal the fruit behind it.</p> <p>For every fruit there are 4 bricks in the game.</p><p>Touching the bricks with similar fruits behind them one after the other will make a perfect match and both the bricks will disappear.<p>Try to find the matches and make all the bricks disappear in minimum time and moves.</p><p><b>So are you ready to Test your memory?</b></p>" ,
      buttons: ['OK']
    });
    alert.present();
  }
  
  showHighScores(){
    this.navCtrl.setRoot(HighScoresPage);
  }

}
