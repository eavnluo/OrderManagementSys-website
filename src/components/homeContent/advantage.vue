<template>
  <div class="advantage">
    <p class="title-fontSize title-position">{{ $t('advantage.headTitle') }}</p>
    <div class="advantage-content">
      <ul v-for="item in advantageList" :key="item.id">
        <li>
          <img :src="item.imgUrl" />
        </li>
        <li>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    advantageList () {
      let i18nList = [
        {
          id: 1,
          imgUrl: require('../../assets/advantage/ys1.png'),
          title: this.$t('advantage.titleOne'),
          desc: this.$t('advantage.descOne')
        },
        {
          id: 2,
          imgUrl: require('../../assets/advantage/ys2.png'),
          title: this.$t('advantage.titleTwo'),
          desc: this.$t('advantage.descTwo')
        },
        {
          id: 3,
          imgUrl: require('../../assets/advantage/ys3.png'),
          title: this.$t('advantage.titleThree'),
          desc: this.$t('advantage.descThree')
        },
        {
          id: 4,
          imgUrl: require('../../assets/advantage/ys4.png'),
          title: this.$t('advantage.titleFour'),
          desc: this.$t('advantage.descFour')
        }
      ]
      return i18nList
    }
  }
}
</script>

<style lang="scss" scoped>
.advantage {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0 50px 0;

  .advantage-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    ul {
      padding: 20px 0;

      li {
        display: inline-block;
        vertical-align: top;
      }

      li:nth-of-type(2) {
        width: 380px;
        margin: 0.4rem 0 0 0.3rem;

        h4 {
          font-size: 1.125rem;
          margin: 0 0 0.885rem 0;
          font-weight: 700;
          opacity: 0.8;
        }

        p {
          font-size: 14px;
          line-height: 2.1em;
          opacity: 0.5;
        }
      }
      img {
        width: 64px;
        height: 64px;
      }
    }
  }
}
</style>
