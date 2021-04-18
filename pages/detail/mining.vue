<template>
	<view class="container">

		<view class="top-box">
			<view class="left">
				<image src="../../static/images/mining/image2.png"></image>
				<text class="title">矿机型号</text>
				<text>{{info.level}}</text>
			</view>
			<view class="middle"></view>
			<view class="right">
				<image src="../../static/images/mining/image3.png"></image>
				<text class="title">我的YHTC</text>
				<text>{{info.all_zyc}}</text>
			</view>
		</view>

		<view class="num-box">
			<image src="../../static/images/mining/image4.png"></image>
			<text>可领取</text>
			<text>{{info.receive_zyc}}</text>
		</view>

		<image class="get" src="../../static/images/mining/image5.gif" @click="getBtn"></image>

		<image class="invite" src="../../static/images/mining/image6.png" @click="jump('/pages/me/friend')"></image>

	</view>
</template>

<script>
	import service from '@/service.js';
	// #ifdef APP-PLUS
	// const adSdk = uni.requireNativePlugin('AD-SDK')
	const fmssp = uni.requireNativePlugin("FmsspVideo")
	// #endif

	export default {
		data() {
			return {
				info: {}
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			getData() {
				service.auth(this, service.api.home.waKuang, "GET", {}, (self, res) => {
					self.info = res.data
				})
			},

			// 领取ZYC
			getBtn() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				// #ifdef APP-PLUS
				if (uni.getStorageSync('platform') == 'android') {
					// 加载广告并展示
					fmssp.loadAndShow(function(e) {
						if (e.code == -1 || e.code == 109) {
							service.auth(this, service.api.home.numberMoney, "GET", {}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: res.info,
										icon: 'none'
									});

									self.getData()
								}
							})
						}
					});
				} else if (uni.getStorageSync('platform') == 'ios') {
					service.auth(this, service.api.home.numberMoney, "GET", {}, (self, res) => {
						if (res.code == 1) {
							uni.showToast({
								title: res.info,
								icon: 'none'
							});

							self.getData()
						}
					})
				}
				// #endif

				// // #ifdef APP-PLUS
				// let status = 0
				// adSdk.showRewardVideoAd({
				// 	unitId: "rv1" // 广告位 id
				// }, result => {
				// 	if (result.event == 'onAdLoad') {
				// 		console.log(`onAdLoad: id=${result.id}`)
				// 	} else if (result.event == 'onVideoCached') {
				// 		console.log(`onVideoCached: id=${result.id}`)
				// 	} else if (result.event == 'onAdShow') {
				// 		console.log(`onAdShow: id=${result.id}`)
				// 	} else if (result.event == 'onReward') {
				// 		console.log(`onReward: id=${result.id}`)
				// 		status = 1
				// 	} else if (result.event == 'onAdClick') {
				// 		console.log(`onAdClick: id=${result.id}`)
				// 	} else if (result.event == 'onVideoComplete') {
				// 		console.log(`onVideoComplete: id=${result.id}`)
				// 		status = 1
				// 	} else if (result.event == 'onAdClose') {
				// 		console.log(`onAdClose: id=${result.id}`)
				// 		if (status == 1) {
				// 			service.auth(this, service.api.home.numberMoney, "GET", {}, (self, res) => {
				// 				if (res.code == 1) {
				// 					uni.showToast({
				// 						title: res.info,
				// 						icon: 'none'
				// 					});

				// 					self.getData()
				// 				}
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				title: '观看完广告才能获得奖励哦~',
				// 				icon: 'none'
				// 			});
				// 		}
				// 	} else if (result.event == 'onError') {
				// 		console.log(`onError: id=${result.id}, code=${result.code}, message=${result.message}`)
				// 		service.auth(this, service.api.home.numberMoney, "GET", {}, (self, res) => {
				// 			if (res.code == 1) {
				// 				uni.showToast({
				// 					title: res.info,
				// 					icon: 'none'
				// 				});

				// 				self.getData()
				// 			}
				// 		})
				// 	}
				// })
				// // #endif
			},

			// 跳转页面
			jump(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style>
	.container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url(../../static/images/mining/image1.png);
		background-size: 100% 100%;
	}

	.top-box {
		width: 90%;
		background-color: #FFF;
		border-radius: 32rpx;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 8%;
	}

	.top-box .left,
	.top-box .right {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.top-box image {
		width: 48rpx;
		height: 48rpx;
		margin-right: 16rpx;
	}

	.top-box .title {
		margin-right: 16rpx;
	}

	.top-box .left {
		color: #62B0FE;
	}

	.top-box .right {
		color: #FF903E;
	}

	.top-box .middle {
		width: 2rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.num-box {
		width: 40%;
		background-color: #FFF;
		border-radius: 32rpx;
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #62B0FE;
		position: fixed;
		top: 60%;
	}

	.num-box image {
		width: 48rpx;
		height: 48rpx;
	}

	.get {
		width: 293rpx;
		height: 250rpx;
		position: fixed;
		top: 65%;
	}

	.invite {
		width: 280rpx;
		height: 80rpx;
		position: fixed;
		top: 85%;
		z-index: 999;
	}
</style>
