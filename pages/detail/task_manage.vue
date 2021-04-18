<template>
	<view class="container">

		<!-- 个人信息 -->
		<view class="user-box">
			<view class="top">
				<image class="avatar" :src="user.avatar"></image>
				<view class="right-box">
					<view class="name-box">
						<text class="name">{{user.nickname}}</text>
						<image class="gender" src="../../static/images/task_manage/image1.png"></image>
						<image class="icon" src="../../static/images/task_manage/image2.png"></image>
					</view>
					<view class="id">ID：{{user.show_id}}</view>
				</view>
			</view>
			<view class="bottom"></view>
		</view>

		<!-- 余额 -->
		<view class="balance-box">
			<view class="left">
				<text class="num">￥{{user.balance}}</text>
				<text class="text">余额</text>
			</view>
			<view class="right">
				<view class="btn recharge" @click="jump('/pages/detail/recharge')">充值</view>
				<view class="btn" @click="jump('')">提现</view>
			</view>
		</view>

		<!-- 任务管理状态栏 -->
		<view class="top-tab-box">
			<view class="tab-box" :class="[taskStatus == 1? 'bottom-color' : '']" @click="selectTaskStatus(1)">审核中</view>
			<view class="tab-box" :class="[taskStatus == 2? 'bottom-color' : '']" @click="selectTaskStatus(2)">进行中</view>
			<view class="tab-box" :class="[taskStatus == 3? 'bottom-color' : '']" @click="selectTaskStatus(3)">已完成</view>
		</view>

		<!-- 任务列表 -->
		<view class="list-box" v-for="(item, index) in taskList" :key="index" @click="taskListJump(item.id)">
			<view class="task">
				<view class="under upper">
					<view class="title">{{item.name}}</view>
				</view>
				<view class="under">
					<view class="price">￥{{item.money}}</view>
					<view class="reset" v-if="item.status == 0" @click.stop="cancelTask(item.id)">取消任务</view>
					<view class="reset" v-if="taskStatus == 2" @click.stop="cancelTask(item.id)">结束任务</view>
				</view>
			</view>
			<view class="bottom-box">
				<text v-if="taskStatus == 1 || taskStatus == 3">任务数量：{{item.num}}</text>
				<text v-if="taskStatus == 2">{{item.takenum}}人已赚 剩余{{item.num - item.takenum}}</text>
				<text v-if="taskStatus == 3">{{item.takenum}}人已领取</text>
				<text class="complete" v-if="taskStatus == 1">{{item.status==-1 ? '已取消' : item.status==0 ? '待审核' : '审核拒绝'}}</text>
				<text class="complete" v-if="taskStatus == 2">进行中</text>
				<text class="complete" v-if="taskStatus == 3">已完成</text>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: {},
				taskStatus: 1,
				taskList: [],
				isClick: true,
				onLoadNum: 0
			}
		},
		onLoad(options) {
			this.taskStatus = options.status
			this.getData(this.taskStatus)
		},
		onShow() {
			if (this.onLoadNum == 1) {
				this.getData(this.taskStatus)
			}
		},
		onReachBottom() {
			if (this.isClick) {
				this.isClick = false

				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth2(this, service.api.home.taskManagementList, "GET", {
					status: this.taskStatus,
					page: this.page
				}, (self, res) => {
					if (res.data.list.length > 0) {
						self.page += 1
						self.taskList = self.taskList.concat(res.data.list)
					} else {
						uni.showToast({
							title: '已经到底了~',
							icon: 'none'
						})
					}

					uni.hideLoading();
					self.isClick = true
				})
			}
		},
		methods: {
			// 获取页面初始数据
			getData(status) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				
				service.auth2(this, service.api.index.user, "GET", {}, (self, res) => {
					self.user = res.data.member
					uni.setStorageSync('user', res.data.member)
				})

				service.auth2(this, service.api.home.taskManagementList, "GET", {
					status: this.taskStatus,
					page: 1
				}, (self, res) => {
					if (self.onLoadNum == 0) {
						self.onLoadNum = 1
					}
					self.page = 2
					self.taskList = res.data.list

					uni.hideLoading();
				})
			},

			// 选择任务管理状态
			selectTaskStatus(status) {
				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.taskStatus = status;
					this.taskList = [];

					service.auth2(this, service.api.home.taskManagementList, "GET", {
						status: status,
						page: 1
					}, (self, res) => {
						self.page = 2
						self.taskList = res.data.list

						uni.hideLoading();
						self.isClick = true
					})
				}
			},

			// 取消任务
			cancelTask(id) {
				uni.showModal({
					title: '提示',
					content: '确定取消或结束任务吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							if (this.isClick) {
								this.isClick = false

								uni.showLoading({
									title: '取消中...',
									mask: true
								});

								service.auth(this, service.api.home.taskCancel, "GET", {
									taskid: id
								}, (self, res) => {
									if (res.code == 1) {
										uni.showToast({
											title: '取消或结束成功',
											icon: 'none',
											mask: true
										})

										self.getData()
									}
								})

								this.isClick = true
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 跳转页面
			jump(url) {
				if (url == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})

					return;
				}

				uni.navigateTo({
					url
				})
			},

			// taskList 跳转页面
			taskListJump(id) {
				if (this.taskStatus == 1 || this.taskStatus == 3) {
					uni.navigateTo({
						url: '/pages/detail/task_detail?taskid=' + id
					})
				}

				if (this.taskStatus == 2) {
					uni.navigateTo({
						url: '/pages/detail/task_manage_list?taskid=' + id
					})
				}
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
		padding: 0 30rpx 200rpx;
	}

	/* 个人信息 */
	.user-box {
		background-color: #FCFCEA;
		border-radius: 20rpx;
		margin-top: 20rpx;
	}

	.user-box .top {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
	}

	.user-box .top .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-box .top .right-box .name-box {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.user-box .top .right-box .name-box .name {
		font-size: 36rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}

	.user-box .top .right-box .name-box .gender {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.user-box .top .right-box .name-box .icon {
		width: 30rpx;
		height: 30rpx;
	}

	.user-box .top .right-box .id {
		font-size: 28rpx;
		color: #999;
	}

	.user-box .bottom {
		padding: 20rpx;
	}

	/* 余额 */
	.balance-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
	}

	.balance-box .left {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.balance-box .left .num {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.balance-box .left .text {
		font-size: 32rpx;
		color: #999;
	}

	.balance-box .right {
		display: flex;
	}

	.balance-box .right .btn {
		padding: 4rpx 40rpx;
		background-color: #4B7EFE;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #FFF;
	}

	.balance-box .right .recharge {
		margin-right: 30rpx;
	}

	/* 任务管理状态栏 */
	.top-tab-box {
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		background-color: #F9F9F9;
		position: sticky;
		top: 0;
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
		color: #000;
		border-bottom: 6rpx solid #4E68C9;
	}

	/* 任务列表 */
	.list-box {
		background-color: #DCDCEF;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.list-box .task {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.list-box .task .under {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-box .task .upper {
		margin-bottom: 20rpx;
	}

	.list-box .task .upper .title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.list-box .task .under .price {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
	}

	.list-box .task .under .reset {
		font-size: 28rpx;
		color: #FFF;
		padding: 4rpx 16rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
	}

	.list-box .bottom-box {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
	}

	.list-box .bottom-box .complete {
		color: #FF4800;
	}
</style>
