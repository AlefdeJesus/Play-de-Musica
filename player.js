import audios from "./data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js";
export default{
    ////////essse objeto esta dentro do obj player//////
          audioData: audios,
          currentAudio :{},
          currenPlaying: 0,
          isPlaing: false,
     ////////////essa função tambem esta dentro do obj///////   
        start(){
          elements.get.call(this);
          elements.actions.call(this);

            this.update();
          ////para iniciar o proximo audio apos finalizar//
          this.audio.onended = ()=> this.next();
        },
        play(){
          this.isPlaing = true;
          this.audio.play();
          this.playPause.innerText = "pause";
        },
        pause(){
            this.isPlaing = false;
            this.audio.pause();
            this.playPause.innerText = "play_arrow";
        },

      /////tooglePlayPause é ovento do click do botao////
        tooglePlayPause(){
          if(this.isPlaing){
            this.pause();
          } else {
            this.play();
          }
        },
        toogleMute(){
            this.audio.muted =  !this.audio.muted;
            //o codigo abaixo é a mesma coisa do if else.//
            this.vol.innerText = this.audio.muted ? "volume_down" : "volume_up";
        },
        next(){
            this.currenPlaying++;
          if(this.currenPlaying == this.audioData.length){
          this.restart()
          }
            this.update();
            this.audio.play();
        },
        setVolume(value){
          this.audio.volume = value / 100;
        },
        update(){
            this.currentAudio = this.audioData[this.currenPlaying];
            this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
            this.title.innerText = this.currentAudio.title;
            this.artist.innerText =  this.currentAudio.artist;
            elements.createAudioElement.call(this, path(this.currentAudio.file))
           
        },
        restart(){
            this.currenPlaying = 0;
            this.update();
        }
  };
  