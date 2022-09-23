import audios from "./data.js";
import { path, sencondsToMinutes } from "./utils.js";
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
          this.update();
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
        //////funcção de mute do audio e altera o icone ao clicar
        toogleMute(){
            this.audio.muted =  !this.audio.muted;
            //o codigo abaixo é a mesma coisa do if else.//
            this.mute.innerText = this.audio.muted ? "volume_down" : "volume_up";
        },
        next(){
            this.currenPlaying++;
          if(this.currenPlaying == this.audioData.length){
          this.update()
          this.play();
          }
            this.update();
            this.audio.play();
        },
        setVolume(value){
          this.audio.volume = value / 100;
        },
        //////função de tempo do audio/////
        setSeek(value){
            this.audio.currentTime = value
        },
        timeUpdate(){
          this.currentDuration.innerText = sencondsToMinutes(this.audio.currentTime);
          this.seekbar.value = this.audio.currentTime;
        },
        ////funcao que faz o audio rodar/////
        update(){
            this.currentAudio = this.audioData[this.currenPlaying];
            this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
            this.title.innerText = this.currentAudio.title;
            this.artist.innerText =  this.currentAudio.artist;
            elements.createAudioElement.call(this, path(this.currentAudio.file))
            ////funcao abaixo aguarda todo o carregamento do audio///
            this.audio.onloadeddata = () =>{  
              elements.actions.call(this);
            }
             
           
        },
        restart(){
            this.currenPlaying = 0;
            this.update();
        }
  };
  