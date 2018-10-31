import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StartPage } from '../start/start';
 
declare var $:any;

@Component({
  selector: 'page-high-scores',
  templateUrl: 'high-scores.html',
})
export class HighScoresPage {
  highscoreMinutes;
  highscoreSeconds;
  highscoreMoves;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.storage.get('highscoreMinutes').then(highscoreMinutes => {
      if (highscoreMinutes) {
        this.highscoreMinutes = highscoreMinutes;
      }
      else {
        this.highscoreMinutes = 0;
      }
    })
    this.storage.get('highscoreSeconds').then(highscoreSeconds => {
      if (highscoreSeconds) {
        this.highscoreSeconds = highscoreSeconds;
      }
      else {
        this.highscoreSeconds = 0;
      }
    })
    this.storage.get('highscoreMoves').then(highscoreMoves => {
      if (highscoreMoves) {
        this.highscoreMoves = highscoreMoves;
      }
      else {
        this.highscoreMoves = 0;
      }
    }) 

    $(document).ready(function () {
      setTimeout(function () {
        $('.fire').fireworks();
      });
    }, 500);

    var first = setTimeout(function () {
      $('.time_heading').css('display', 'block');
      $('.time_heading').addClass('animated rollIn')
    }, 500);


    var second = setTimeout(function () {
      $('.time_value').css('display', 'block');
      $('.time_value').addClass('animated zoomInDown')
    }, 1000);

    var third = setTimeout(function () {
      $('.moves_heading').css('display', 'block');
      $('.moves_heading').addClass('animated rollIn')
    }, 2500);


    var fourth = setTimeout(function () {
      $('.moves_value').css('display', 'block');
      $('.moves_value').addClass('animated zoomInDown')
    }, 3000);
  }

  goBack(){
    console.log('hh');
    this.navCtrl.setRoot(StartPage);
  }
}
