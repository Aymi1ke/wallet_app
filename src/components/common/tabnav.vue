<template>
    <div>
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/" >
          <span class="mui-icon iconfont icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Market" >
          <span class="mui-icon iconfont icon-tool"></span>
          <span class="mui-tab-label">工具</span>
        </router-link>
        <router-link class="mui-tab-item" to="/profile" style="overflow: visible;">
          <span class="mui-icon iconfont icon-pk_default"></span>
          <span class="mui-tab-label">约战</span>
        </router-link>
      </nav>

    </div>
</template>

<script>
    export default {
        name: "tabnav",

    }
</script>

<style scoped>

</style>
