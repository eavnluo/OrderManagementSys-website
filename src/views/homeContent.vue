<template>
  <div class="homeContent">
    <slide />
    <introduction id="introduction" />
    <company-news />
    <advantage />
    <solution id="solution" />
    <partners />
  </div>
</template>

<script>
import Slide from '@/components/homeContent/slide'
import Introduction from '@/components/homeContent/introduction'
import CompanyNews from '@/components/homeContent/companyNews'
import Advantage from '@/components/homeContent/advantage'
import Solution from '@/components/homeContent/solution'
import Partners from '@/components/homeContent/partners'
export default {
  data () {
    return {}
  },
  components: {
    Slide,
    Introduction,
    CompanyNews,
    Advantage,
    Solution,
    Partners
  }
}
</script>
