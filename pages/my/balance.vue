<template>
	<view class="container">

		<!-- 顶部 -->
		<view class="background"></view>
		<view class="top-box">
			<image class="avatar" :src="user.avatar"></image>
			<text class="text">我的账户余额（元）</text>
			<text class="num">{{info.total_money}}</text>
			<text class="yesterday">昨日收益 {{info.yesterday_money}}</text>
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

			service.auth(this, service.api.home.balanceLog, "GET", {
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

				service.auth(this, service.api.home.balanceLog, "GET", {
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

	.top-box .text {
		margin-bottom: 10rpx;
	}

	.top-box .num {
		font-size: 48rpx;
		margin-bottom: 10rpx;
	}

	.top-box .yesterday {
		font-size: 24rpx;
		font-weight: normal;
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
