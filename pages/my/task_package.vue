<template>
	<view class="container">

		<!-- 状态栏 -->
		<view class="top-tab-box">
			<view class="tab-box" :class="[titleStatus == -1? 'bottom-color' : '']" @click="selectTitleStatus(-1)">升职大厅</view>
			<view class="tab-box" :class="[titleStatus == 0? 'bottom-color' : '']" @click="selectTitleStatus(0)">我的职场包</view>
			<view class="tab-box" :class="[titleStatus == 1? 'bottom-color' : '']" @click="selectTitleStatus(1)">历史职场包</view>
		</view>

		<!-- 任务列表 -->
		<view class="list-box" v-for="(item, index) in taskList" :key="index">
			<view class="content">
				<view class="top">
					<image :src="item.image"></image>
					<view class="text-box">
						<text class="title">{{item.name}}</text>
						<text class="text">兑换所需：{{item.balance}} YC</text>
						<text class="text">每日奖励：{{item.daysend}} YC</text>
						<text class="text">总奖励：{{item.sumsend}} YC</text>
						<text class="text" v-if="titleStatus != -1">已领取：{{item.daysend * item.taketimes}} YC</text>
						<text class="text" v-if="titleStatus != -1">到期时间：{{item.endtime}}</text>
					</view>
				</view>
				<view class="bottom">
					<view class="view" v-if="titleStatus == -1" @click="exchangeBtn(item.id)">兑换</view>
					<!-- <view class="view" v-if="titleStatus == 0" @click="receiveBtn(item.id)">领取每日奖励</view> -->
					<view class="view" style="background-color: #999;" v-if="titleStatus == 1">已完成</view>
				</view>
			</view>
			<view class="bottom-box">
				<view class="box" v-if="titleStatus == -1">
					<image src="../../static/images/task_package/image10.png"></image>
					<text class="complete">有效期：{{item.validtime}}天</text>
				</view>
				<view class="box">
					<image src="../../static/images/task_package/image11.png"></image>
					<text class="complete" v-if="titleStatus == -1">最多持有数量：{{item.takenum}}</text>
					<text class="complete" v-if="titleStatus != -1">剩余奖励次数：{{item.totaltimes - item.taketimes}}</text>
				</view>
				<view class="box">
					<image src="../../static/images/task_package/image12.png"></image>
					<text class="complete">贡献值：{{item.active}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				titleStatus: -1,
				taskList: [],
				isClick: true
			}
		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			if (this.titleStatus == -1) {
				return;
			}

			if (this.isClick) {
				this.isClick = false

				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth2(this, service.api.taskPackage.user_taskbag, "GET", {
					status: this.titleStatus,
					page: this.page,
					pagesize: 10
				}, (self, res) => {
					if (res.data.length > 0) {
						for (let item of res.data) {
							item.endtime = service.format(item.endtime)
						}

						self.page += 1
						self.taskList = self.taskList.concat(res.data)
					}

					uni.hideLoading();
					self.isClick = true
				})
			}
		},
		methods: {
			// 获取页面初始数据
			getData() {
				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					service.auth2(this, service.api.taskPackage.taskbaglist, "GET", {}, (self, res) => {
						self.taskList = res.data

						uni.hideLoading();
						self.isClick = true
					})
				}
			},

			// 选择状态栏
			selectTitleStatus(status) {
				this.titleStatus = status;
				this.taskList = [];
				if (status == -1) {
					this.getData()
				} else {
					if (this.isClick) {
						this.isClick = false

						uni.showLoading({
							title: '加载中...',
							mask: true
						});

						service.auth2(this, service.api.taskPackage.user_taskbag, "GET", {
							status: status,
							page: 1,
							pagesize: 10
						}, (self, res) => {
							for (let item of res.data) {
								item.endtime = service.format(item.endtime)
							}

							self.page = 2
							self.taskList = res.data

							uni.hideLoading();
							self.isClick = true
						})
					}
				}
			},

			// 兑换
			exchangeBtn(id) {
				uni.showModal({
					title: '提示',
					content: '确定兑换任务吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							uni.showLoading({
								title: '兑换中...',
								mask: true
							});

							service.auth(this, service.api.taskPackage.exchange_taskbag, "POST", {
								taskbagid: id
							}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: res.info,
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 领取每日奖励
			// receiveBtn(id) {
			// 	uni.showLoading({
			// 		title: '领取中...',
			// 		mask: true
			// 	});

			// 	service.auth(this, service.api.taskPackage.taskbag_daysend, "GET", {
			// 		recordid: id
			// 	}, (self, res) => {
			// 		if (res.code == 1) {
			// 			uni.showToast({
			// 				title: res.info,
			// 				icon: 'none'
			// 			})
			// 		}
			// 	})
			// },
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
		padding: 0 30rpx 200rpx;
	}

	/* 状态栏 */
	.top-tab-box {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
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

	/* 任务列表 */
	.list-box {
		background-color: #C5C0FB;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.list-box .content {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 0;
	}

	.list-box .content .top {
		display: flex;
		align-items: flex-end;
	}

	.list-box .content .top image {
		width: 100rpx;
		height: 160rpx;
		margin: 0 60rpx;
	}

	.list-box .content .top .text-box {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
	}

	.list-box .content .top .text-box .title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.list-box .content .top .text-box .text {
		margin-top: 10rpx;
	}

	.list-box .content .bottom {
		padding-right: 30rpx;
		text-align: end;
		margin-top: 30rpx;
	}

	.list-box .content .bottom .view {
		display: inline-block;
		background-color: #6051FF;
		font-size: 28rpx;
		color: #FFF;
		font-weight: bold;
		padding: 4rpx 30rpx;
		border-radius: 12rpx;
	}

	.list-box .bottom-box {
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		color: #666;
		padding: 30rpx;
	}

	.list-box .bottom-box .box {
		display: flex;
		align-items: center;
	}

	.list-box .bottom-box .box image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
</style>
