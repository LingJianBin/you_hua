<template>
	<view class="container">

		<rich-text :nodes="data.content"></rich-text>

	</view>
</template>

<script>
	import service from '../../service.js'

	export default {
		data() {
			return {
				data: '',
			}
		},
		onLoad(e) {
			id: e.id,
			service.auth(this, service.api.me.articleDetails, 'get', {
				id: e.id,
			}, function(self, res) {
				self.data = res.data
			})
		}
	}
</script>

<style>
	.container {
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
