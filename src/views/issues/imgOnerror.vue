<template>
  <div class="img-onerror">
    <section class="section">
      <h3>1. 图片正常加载</h3>
      <img class="img" alt="Vue logo" src="../../assets/logo.png">
    </section>
    <section class="section">
      <h3>2. 图片地址不存在: 显示碎裂图和alt文本</h3>
      <img class="img" alt="Vue logo" src="https://placeimg1.com/200/300/animals">
    </section>
    <section class="section">
      <h3>3. 图片地址不存在, 添加onerror事件, 初始化一个默认图: </h3>
      <img class="img" alt="Vue logo" src="https://placeimg1.com/200/300/animals" onerror="this.src='https://placeimg.com/200/300/animals'">
    </section>
    <section class="section">
      <h3>4. 图片地址不存在, 添加onerror事件, 初始化一个默认图, 默认图不存在，会一直请求默认图，陷入死循环: </h3>
      <img class="img" alt="Vue logo" src="https://placeimg1.com/200/300/animals" onerror="this.src='https://placeimg1.com/200/300/animals'">
    </section>
    <section class="section">
      <h3>5. 图片地址不存在, 添加onerror事件, 初始化一个默认图, 默认图不存在, 添加this.onerror=null解决死循环: </h3>
      <img class="img" alt="Vue logo" src="https://placeimg1.com/200/300/animals" onerror="this.onerror=null;this.src='https://placeimg1.com/200/300/animals'">
    </section>
    <section class="section">
      <h3>6. 图片地址为null或者undefined, 将不会渲染请求src的资源, 也不会触发onerror事件, 显示碎裂图和alt文本, 导致默认图无法渲染: </h3>
      <img class="img" alt="Vue logo" :src="imgUrl" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals'">
    </section>
    <section class="section">
      <h3>7. 图片地址为null或者undefined, 添加一个其它图片地址或者空字符串解决问题, :src="imgUrl || ''" : </h3>
      <img class="img" alt="Vue logo" :src="imgUrl || otherImgUrl || ''" onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals'">
    </section>
  </div>
</template>

<script>
export default {
  name: 'imgOnerror',
  data () {
    return {
      imgUrl: null,
      otherImgUrl: 'https://placeimg.com/200/300/animals'
    }
  }
}
</script>

<style lang="less" scoped>
.img-onerror {
  .img {
    width: 100px;
    height: 100px;
  }
}
</style>
