<template>
	<div class="Zhima">
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: 'Zhima',
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				Authorization(state) {
					return state.Authorization
				}
			})
		},
  beforeCreate(){
      this.$dialog.loading.open('加载中');
    },
	created() {
			this.$post('/api/taobaoZhiMa', {
				  token:this.Authorization
			}).then(res => {
				if (res.code === 1) {
          console.log(res)
          window.location.href = res.result.url;
          this.$dialog.loading.close();
				}
			}).catch(error => {
        this.$dialog.toast({
          mes: '网络错误',
          timeout: 1500,
          icon: 'error',
          callback: () => {
            this.$router.push('/check');
          }
        });
			})

		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
