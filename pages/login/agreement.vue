<template>
	<view class="container">

		<view class="text">【说明】</view>
		<rich-text :nodes="content"></rich-text>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(options) {
			// 动态设置当前页面的标题
			uni.setNavigationBarTitle({
				title: options.title
			});

			if (options.title == '用户协议') {
				uni.request({
					url: service.api.home.agreement,
					success: res => {
						if (res.data.code == 1) {
							this.content = res.data.data.content
						} else {
							uni.showToast({
								title: res.data.info,
								icon: 'none'
							})
						}
					}
				})
			}

			if (options.title == '隐私条款') {
				uni.request({
					url: service.api.home.userprivate,
					success: res => {
						if (res.data.code == 1) {
							this.content = res.data.data.content
						} else {
							uni.showToast({
								title: res.data.info,
								icon: 'none'
							})
						}
					}
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 50rpx 30rpx;
	}

	.text {
		font-size: 28rpx;
		color: #999;
	}
</style>
