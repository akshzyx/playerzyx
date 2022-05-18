new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Ew",
          artist: "Joji",
          cover: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/img/nectar-joji.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/Ew.mp3",
          url: "https://www.youtube.com/watch?v=UGB_Bsm5Unk",
          favorited: false
        },
        {
          name: "MODUS",
          artist: "Joji",
          cover: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/img/nectar-joji.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/MODUS.mp3",
          url: "https://www.youtube.com/watch?v=2Uxq-kIAMBM",
          favorited: true
        },
        {
          name: "Tick Tock",
          artist: "Joji",
          cover: "https://raw.githubusercontent.com/akshzyx/mini-player/master/img/nectar-joji.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/Tick Tock.mp3",
          url: "https://www.youtube.com/watch?v=2FCo7OxVoeY",
          favorited: false
        },
        {
          name: "Daylight",
          artist: "Joji, Diplo",
          cover: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/img/Daylight-joji.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/Daylight.mp3",
          url: "https://www.youtube.com/watch?v=v97FPN2US2o",
          favorited: false
        },
        {
          name: "Upgrade",
          artist: "Joji",
          cover: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/img/nectar-joji.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/Upgrade.mp3",
          url: "https://www.youtube.com/watch?v=DoE_le4Te9U",
          favorited: true
        },
        {
          name: "Gimme Love",
          artist: "Joji",
          cover: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/img/Gimme Love.jpg",
          source: "https://raw.githubusercontent.com/akshzyx/playerzyx/master/mp3/Gimme Love.mp3",
          url: "https://www.youtube.com/watch?v=jPan651rVMs",
          favorited: false
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
