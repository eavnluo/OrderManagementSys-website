<template>
  <div class="wscn-http403-container">
    <div class="wscn-http403">
      <div class="bullshit">
        <div class="bullshit__oops">抱歉!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">此功能正处于维护状态，请耐心等待，维护完毕后即可正常访问</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message () {
      return '数据维护中，请耐心等待......'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http403-container {
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .bullshit {
    width: 350px;
    &__oops {
      font-size: 34px;
      font-weight: bold;
      line-height: 45px;
      color: #13ABAB;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 22px;
      line-height: 35px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.5px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
