<template>
	<view class="container">

		<!-- 顶部 -->
		<view class="background"></view>
		<view class="top-box">
			<text class="num">{{info.active}}</text>
			<text>我的贡献值</text>
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
			<view class="right">{{balanceStatus == 1? '+' : '-' }}{{item.balance}}</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
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

			service.auth(this, service.api.home.activelog, "GET", {
				status: this.balanceStatus,
				page: this.page
			}, (self, res) => {
				self.info = res.data.active
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

				service.auth(this, service.api.home.activelog, "GET", {
					status: status,
					page: 1
				}, (self, res) => {
					self.page = 2
					self.info = res.data.active
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
		width: 90%;
		height: 280rpx;
		color: #FFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: url(../../static/images/active_degree/image1.png);
		background-size: 100% 100%;
		margin: -160rpx auto 0;
	}

	.top-box .num {
		font-size: 48rpx;
		font-weight: bold;
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

	/* 收入和支出状态栏 */
	.top-tab-box {
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 180rpx;
		position: sticky;
		top: 0;
		background-color: #F9F9F9;
		z-index: 999;
	}

	.top-tab-box .tab-box {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #999;
		font-weight: bold;
	}

	.top-tab-box .bottom-color {
		border-bottom: 6rpx solid #4E68C9;
		color: #000;
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
