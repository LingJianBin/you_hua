<template>
	<view class="container">

		<!-- 顶部 -->
		<view class="background"></view>
		<view class="top-box">
			<image class="avatar" :src="user.avatar"></image>
			<text class="num">{{info.total_pool}}</text>
			<text>每日YC释放比{{info.percent}}%</text>
			<view class="btn" @click="ZYBtn">释放</view>
		</view>

		<!-- 收入和支出状态栏 -->
		<view class="top-tab-box">
			<view class="tab-box" :class="[balanceStatus == 1? 'bottom-color' : '']" @click="selectBalanceStatus(1)">收入</view>
			<view class="tab-box" :class="[balanceStatus == 2? 'bottom-color' : '']" @click="selectBalanceStatus(2)">支出</view>
		</view>

		<!-- 列表 -->
		<view class="list-box" v-for="(item, index) in list" :key="index">
			<view class="left">
				<image class="avatar" :src="item.avatar"></image>
				<view class="text-box">
					<text>{{item.source}}</text>
					<text class="time">{{item.addtime}}</text>
				</view>
			</view>
			<view class="right" v-if="item.balance < 0">{{item.balance}}</view>
			<view class="right" v-else>+{{item.balance}}</view>
		</view>

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
				user: uni.getStorageSync('user'),
				info: {},
				list: [],
				balanceStatus: 1
			}
		},
		onLoad() {
			this.getData(this.balanceStatus);
		},
		onReachBottom() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});

			service.auth(this, service.api.home.poolLog, "GET", {
				status: this.balanceStatus,
				page: this.page
			}, (self, res) => {
				self.info = res.data
				if (res.data.list.length > 0) {
					self.page += 1
					self.list = self.list.concat(res.data.list)

					uni.hideLoading();
				} else {
					uni.showToast({
						title: '已经到底了~',
						icon: 'none'
					});
				}
			})
		},
		methods: {
			// 获取页面初始数据
			getData(status) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth(this, service.api.home.poolLog, "GET", {
					status: status,
					page: 1
				}, (self, res) => {
					self.page = 2
					self.info = res.data
					self.list = res.data.list

					if (self.list.length == 0) {
						uni.showToast({
							title: '已经到底了~',
							icon: 'none'
						});
					} else {
						uni.hideLoading();
					}
				})
			},

			// 释放ZY
			ZYBtn() {
				uni.showLoading({
					title: '释放中...',
					mask: true
				});

				// #ifdef APP-PLUS
				if (uni.getStorageSync('platform') == 'android') {
					// 加载广告并展示
					fmssp.loadAndShow(function(e) {
						if (e.code == -1 || e.code == 109) {
							service.auth(this, service.api.home.release_pool, "GET", {}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: '释放成功',
										icon: 'none'
									})
								}

								self.getData(self.balanceStatus);
							})
						}
					});
				} else if (uni.getStorageSync('platform') == 'ios') {
					service.auth(this, service.api.home.release_pool, "GET", {}, (self, res) => {
						if (res.code == 1) {
							uni.showToast({
								title: '释放成功',
								icon: 'none'
							})
						}

						self.getData(self.balanceStatus);
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
				// 			service.auth(this, service.api.home.release_pool, "GET", {}, (self, res) => {
				// 				if (res.code == 1) {
				// 					uni.showToast({
				// 						title: '释放成功',
				// 						icon: 'none'
				// 					})
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
				// 		service.auth(this, service.api.home.release_pool, "GET", {}, (self, res) => {
				// 			if (res.code == 1) {
				// 				uni.showToast({
				// 					title: '释放成功',
				// 					icon: 'none'
				// 				})
				// 			}
				// 		})
				// 	}
				// })
				// // #endif
			},

			// 收入和支出状态栏
			selectBalanceStatus(status) {
				this.balanceStatus = status
				this.list = []
				this.getData(status)
			},
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	image {
		display: block;
	}

	.container {
		margin-bottom: 200rpx;
	}

	/* 顶部 */
	.background {
		width: 100%;
		height: 200rpx;
		background-color: #4B7EFE;
	}

	.top-box {
		font-size: 28rpx;
		color: #4B7EFE;
		font-weight: bold;
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: -160rpx 30rpx 0;
	}

	.top-box .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}

	.top-box .num {
		font-size: 48rpx;
		margin-bottom: 10rpx;
	}

	.top-box .btn {
		color: #FFF;
		background-color: #4B7EFE;
		padding: 4rpx 60rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}

	/* 收入和支出状态栏 */
	.top-tab-box {
		height: 80rpx;
		background-color: #F9F9F9;
		display: flex;
		justify-content: space-between;
		padding: 0 180rpx;
		font-size: 32rpx;
		color: #999;
		font-weight: bold;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.top-tab-box .tab-box {
		display: flex;
		align-items: center;
	}

	.top-tab-box .bottom-color {
		color: #000;
		border-bottom: 6rpx solid #4B7EFE;
	}

	/* 列表 */
	.list-box {
		font-size: 28rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 30rpx 0;
	}

	.list-box .left {
		display: flex;
		align-items: center;
	}

	.list-box .left .avatar {
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.list-box .left .text-box {
		display: flex;
		flex-direction: column;
	}

	.list-box .left .text-box .time {
		font-size: 20rpx;
	}

	.list-box .right {
		color: #FF0000;
	}
</style>
