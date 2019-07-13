<template>
  <div class="progressbar">
   <div style="width: 120px;height: 120px;margin: 0 auto;">
            <yd-progressbar
                    :trail-width="trailWidth"
                   :stroke-width="strokeWidth"
                    :stroke-color="strokeColor"
                   :trail-color="trailColor"
                   :fill-color="fillColor"
            >{{progress}}</yd-progressbar>
        </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data () {
    return {

    }
  },
  props:['progress','fillColor','trailColor','strokeColor','strokeWidth','trailWidth']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
