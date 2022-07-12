<template>
  <div class="video-play">
    <video-player :options="videoOptions"></video-player>
  </div>
</template>

<script>
import VideoPlayer from '@/components/videoPlayer.vue'

export default {
  name: 'videoPlay',
  components: {
    VideoPlayer
  },
  data () {
    return {
      videoOptions: {
        sources: [
          {
            src: 'https://baidu.mp4',
            type: 'video/mp4'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.video-play {
  width: 500px;
  height: 300px;
}
</style>
