<template>
	<view class="container">

		<view class="title">{{data.title}}</view>
		<rich-text :nodes="data.detail"></rich-text>

	</view>
</template>

<script>
	import service from '@/service.js'

	export default {
		data() {
			return {
				data: ''
			}
		},
		onLoad(e) {
			service.auth(this, service.api.me.getNoticeDetai, 'get', {
				id: e.id
			}, (self, res) => {
				self.data = res.data
			})
		}
	}
</script>

<style>
	.container {
		padding: 0 30rpx;
	}

	.title {
		width: 100%;
		text-align: center;
		font-weight: bold;
		padding: 20rpx 0;
	}
</style>
