<template>
  <div class="footer">
    <div class="footer-middle">
      <div class="footer-content">
        <ul>
          <h5>{{ $t('bottomView.solution.headTitle') }}</h5>
          <li v-for="item in solutionList1" :key="item.id">
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <ul>
          <li v-for="item in solutionList2" :key="item.id">
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <ul>
          <h5>{{ $t('bottomView.product.headTitle') }}</h5>
          <li v-for="item in productList" :key="item.id">
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <ul>
          <h5>{{ $t('bottomView.contact.headTitle') }}</h5>
          <li>{{ $t('bottomView.contact.type.one') }}+86 021-80339150 转 702</li>
          <li>{{ $t('bottomView.contact.type.two') }}+86 021-80339150 转 705</li>
          <li>{{ $t('bottomView.contact.type.three') }}service@ks4pl.com</li>
        </ul>
        <div class="gallery-feed">
          <img src="../assets/bottomView/wechat.jpg" />
        </div>
      </div>
      <hr class="bottom-hr" />
      <p
        class="footer-banquan"
      >Copyright © 2020 聚潍通 Internet Of Things Technology Co.,Ltd. All Rights Reserved. 鲁ICP备19052762号</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    solutionList1 () {
      let changeList1 = [
        {
          id: 1,
          name: this.$t('bottomView.solution.type.one')
        },
        {
          id: 2,
          name: this.$t('bottomView.solution.type.two')
        },
        {
          id: 3,
          name: this.$t('bottomView.solution.type.three')
        },
        {
          id: 4,
          name: this.$t('bottomView.solution.type.four')
        },
        {
          id: 5,
          name: this.$t('bottomView.solution.type.five')
        }]
      return changeList1
    },
    solutionList2 () {
      let changeList2 = [
        {
          id: 1,
          name: this.$t('bottomView.solution.type.six')
        },
        {
          id: 2,
          name: this.$t('bottomView.solution.type.seven')
        },
        {
          id: 3,
          name: this.$t('bottomView.solution.type.eight')
        },
        {
          id: 4,
          name: this.$t('bottomView.solution.type.nine')
        },
        {
          id: 5,
          name: this.$t('bottomView.solution.type.ten')
        }]
      return changeList2
    },
    productList () {
      let changeList3 = [
        {
          id: 1,
          name: this.$t('bottomView.product.type.one')
        },
        {
          id: 2,
          name: this.$t('bottomView.product.type.two')
        },
        {
          id: 3,
          name: this.$t('bottomView.product.type.three')
        },
        {
          id: 4,
          name: this.$t('bottomView.product.type.four')
        }
      ]
      return changeList3
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #fff;
.footer {
  padding: 30px 0;
  background-color: #2c2c2c;

  .footer-middle {
    width: 1200px;
    margin: 0 auto;

    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 0 15px 0;

      ul {
        color: $color;

        &:nth-of-type(2) {
          margin-top: 40px;
        }

        &:nth-of-type(4) {
          padding: 0 0 0 40px;
          li {
            font-size: 14px;
          }
        }

        li {
          font-size: 12px;
          line-height: 2.8em;
          opacity: 0.8;
        }

        h5 {
          margin: 0 0 15px 0;
          font-size: 1.0625rem;
          line-height: 1.55em;
        }
      }

      .gallery-feed {
        padding-left: 100px;
        img {
          width: 170px;
          height: 188px;
          border-radius: 5px;
        }
      }
    }
  }

  .footer-banquan {
    padding: 30px 0 15px 0;
    text-align: center;
    color: $color;
  }
}
</style>
