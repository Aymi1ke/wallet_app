<template>
  <div class="index">
    <router-view></router-view>
    <tabBar/>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabBar'
export default {
  name: 'Index',
  components:{
  	TabBar
  },
  data () {
    return {
      msg: '',
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
