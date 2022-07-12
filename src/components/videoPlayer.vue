<template>
  <div :class="['video-player', isErrorVideo ? 'video-error' : '']">
    <video
      ref="videoPlayer"
      class="video-js"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      playsinline="true"
      webkit-playsinline="true"
    >
    </video>
    <div class="error-msg" v-if="isErrorVideo">{{ errorMsg }}</div>
  </div>
</template>

<script>
// import videojs from 'video.js'
import videojs from 'video.js/core'
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    errorMsg: {
      type: String,
      default: '视频加载出错'
    }
  },
  data () {
    return {
      player: null,
      isErrorVideo: false,
      defaultOptions: {
        height: 210,
        controlBar: {
          pictureInPictureToggle: false // 画中画
        }
      }
    }
  },
  watch: {
    'options.currentTime' (val) {
      if (val >= 0) {
        this.setVideoTime(val)
      }
    }
  },
  mounted () {
    this.player = videojs(
      this.$refs.videoPlayer,
      Object.assign({}, this.defaultOptions, this.options),
      () => {
        // this.player.log('onPlayerReady', this)
        this.player.on('error', () => {
          this.isErrorVideo = true // 去掉错误默认样式
          this.player.error(null) // 隐藏控制栏
          this.player.bigPlayButton.hide() // 隐藏播放按钮
          this.player.controlBar.hide() // 加载中图标，有可能没隐藏
          this.player.loadingSpinner.hide()
        })
      }
    )
  },
  methods: {
    /**
     * 设置播放时间
     */
    setVideoTime (time) {
      this.player.currentTime(time)
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style lang="less" scoped>
.video-player {
    width: 100%;
    position: relative;
    .video-js {
      width: 100%;
    }
    .error-msg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #FFFFFF;
    }
}
</style>

<style lang="less">
.video-player {
    .video-js .vjs-big-play-button {
        font-size: 2.5em;
        line-height: 2.3em;
        height: 2.5em;
        width: 2.5em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-border-radius: 2.5em;
        -moz-border-radius: 2.5em;
        border-radius: 2.5em;
        background-color: #73859f;
        background-color: rgba(115,133,159,.5);
        border-width: 0.15em;
    }
    /* 中间的播放箭头 */
    .vjs-big-play-button .vjs-icon-placeholder {
      font-size: 1.63em;
    }
    /* 加载圆圈 */
    .vjs-loading-spinner {
      font-size: 2.5em;
      width: 2em;
      height: 2em;
      border-radius: 1em;
      margin-top: -1em;
      margin-left: -1.5em;
    }
    .video-js.vjs-paused .vjs-big-play-button { /* 视频暂停时显示播放按钮 */
      display: block;
    }
}
</style>
