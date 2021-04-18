<template>
	<view class="container">

		<!-- 任务状态栏 -->
		<view class="top-tab-box">
			<view class="tab-box" :class="[taskStatus == 1? 'bottom-color' : '']" @click="selectTaskStatus(1)">待提交</view>
			<view class="tab-box" :class="[taskStatus == 2? 'bottom-color' : '']" @click="selectTaskStatus(2)">审核中</view>
			<view class="tab-box" :class="[taskStatus == 3? 'bottom-color' : '']" @click="selectTaskStatus(3)">已通过</view>
			<view class="tab-box" :class="[taskStatus == 4? 'bottom-color' : '']" @click="selectTaskStatus(4)">未通过</view>
			<view class="tab-box" :class="[taskStatus == 5? 'bottom-color' : '']" @click="selectTaskStatus(5)">复审/举报</view>
		</view>

		<!-- 任务列表 -->
		<view class="list-box" v-for="(item, index) in taskList" :key="index" @click="jump('/pages/detail/task_detail?taskid=' + (item.taskid ? item.taskid : item.id))">
			<view class="top">
				<view class="left">
					<view class="title">{{item.name}}</view>
					<view class="price">￥{{item.money}}</view>
				</view>
				<block v-if="taskStatus == 5">
					<view class="right">
						<image class="status" src="../../static/images/my_task/image7.png" v-if="item.mrstatus == -1"></image>
						<image class="status btn-top" src="../../static/images/my_task/image8.png" v-if="item.mrstatus == 0"></image>
						<image class="status" src="../../static/images/my_task/image9.png" v-if="item.mrstatus == 1"></image>
						<image class="status" src="../../static/images/my_task/image10.png" v-if="item.mrstatus == 2"></image>
						<view class="btn" @click.stop="cancelComplain(item.mrid)" v-if="item.mrstatus == 0 && item.tousu == 1">取消投诉</view>
					</view>
				</block>
				<block v-else>
					<view class="right" v-if="item.status == 0">
						<view class="btn btn-top" @click.stop="jump('/pages/detail/task_detail?taskid=' + item.taskid)">提交任务</view>
						<view class="btn" @click.stop="cancelTask(item.id)">取消任务</view>
					</view>
					<view class="right" v-if="item.status == 3">
						<view class="btn btn-top" @click.stop="jump('/pages/detail/task_detail?taskid=' + item.taskid + '&againSubmit=1')">再次提交</view>
						<view class="btn" style="background-color: #FF0000;" @click.stop="cancelTask(item.id)">取消任务</view>
					</view>
				</block>
			</view>
			<view class="btm">
				<block v-if="taskStatus == 5">
					<view class="left">
						<view class="text">原因：</view>
						<view class="reason" @click.stop="checkReason(item)">查看</view>
					</view>
				</block>
				<block v-else>
					<view class="left" v-if="item.status == -1 || item.status == 2"></view>
					<view class="left" v-if="item.status == 0 || (item.status == 3 && item.is_disabled == 0)">
						<image src="../../static/images/my_task/image4.png"></image>
						<text class="countdown">{{item.countdown}}</text>
						<text class="text">内完成提交</text>
					</view>
					<view class="left" v-if="item.status == 3 && item.is_disabled == 0">
						<view class="reason" @click.stop="checkReason(item)">查看原因</view>
					</view>
					<view class="left" v-if="item.status == 1">
						<image src="../../static/images/my_task/image4.png"></image>
						<text class="countdown">{{item.countdown}}</text>
						<text class="text">内完成审核</text>
					</view>
				</block>
				<block v-if="taskStatus == 5">
					<view class="right" v-if="item.tousu == 1">
						<image src="../../static/images/my_task/image5.png"></image>
						<text>投诉</text>
					</view>
					<view class="right" v-if="item.tousu == 2">
						<image src="../../static/images/my_task/image5.png"></image>
						<text>被投诉</text>
					</view>
				</block>
				<block v-else>
					<view class="right" v-if="item.status == -1">
						<image src="../../static/images/my_task/image3.png"></image>
						<text>已取消</text>
					</view>
					<view class="right" v-if="item.status == 0">
						<image src="../../static/images/my_task/image3.png"></image>
						<text>待提交</text>
					</view>
					<view class="right" v-if="item.status == 1">
						<image src="../../static/images/my_task/image2.png"></image>
						<text>审核中</text>
					</view>
					<view class="right" v-if="item.status == 2">
						<image src="../../static/images/my_task/image1.png"></image>
						<text>已通过</text>
					</view>
					<view class="right" v-if="item.status == 3">
						<image src="../../static/images/my_task/image6.png"></image>
						<text>未通过</text>
					</view>
				</block>
			</view>
		</view>

		<!-- 弹窗 -->
		<view class="window" v-if="reasonStatus">
			<scroll-view class="scroll-view" :class="{'scroll-view-transition': scrollViewTransitionShow}" scroll-y="true">
				<view class="content" v-if="reason1 != '无'">发布者拒绝理由：{{reason1}}</view>
				<view class="content" v-if="reason2 != '无'">用户投诉理由：{{reason2}}</view>
				<view v-if="reason3 != '无'">平台申诉拒绝理由：{{reason3}}</view>
			</scroll-view>
			<view class="btn" @click="reasonStatus = 0;scrollViewTransitionShow = false;">关闭</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				taskStatus: 1,
				taskList: [],
				isClick: true,
				onLoadNum: 0,
				reason1: '无',
				reason2: '无',
				reason3: '无',
				reasonStatus: 0,
				scrollViewTransitionShow: false
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
		onHide() {
			for (let index in this.taskList) {
				if (this.taskList[index].setIntervalId) {
					clearInterval(this.taskList[index].setIntervalId)
				}
			}
		},
		onUnload() {
			for (let index in this.taskList) {
				if (this.taskList[index].setIntervalId) {
					clearInterval(this.taskList[index].setIntervalId)
				}
			}
		},
		methods: {
			// 获取页面初始数据
			getData(status) {
				service.auth(this, service.api.home.myTaskList, "GET", {
					status: status,
					page: 1
				}, (self, res) => {
					if (self.onLoadNum == 0) {
						self.onLoadNum = 1
					}
					self.page = 2
					if (status == 1 || status == 4) {
						for (let index in res.data.list) {
							res.data.list[index].countdown = '00:00:00'
							if (((res.data.list[index].auto_canceltime - Date.parse(new Date()) / 1000) > 0) && (res.data.list[index].status ==
									0 || res.data.list[index].status == 1 || (res.data.list[index].status == 3 && res.data.list[index].is_disabled ==
										0))) {
								res.data.list[index].setIntervalId = setInterval(() => {
									self.showTime(res.data.list[index].auto_canceltime - Date.parse(new Date()) / 1000, index)
								}, 1000);
							}
						}
					} else if (status == 2) {
						for (let index in res.data.list) {
							res.data.list[index].countdown = '00:00:00'
							if (((res.data.list[index].auto_endtime - Date.parse(new Date()) / 1000) > 0) && (res.data.list[index].status ==
									0 || res.data.list[index].status == 1)) {
								res.data.list[index].setIntervalId = setInterval(() => {
									self.showTime(res.data.list[index].auto_endtime - Date.parse(new Date()) / 1000, index)
								}, 1000);
							}
						}
					}

					self.taskList = res.data.list
				})
			},

			// 倒计时
			showTime(lefttime, index) {
				var lefth = Math.floor(lefttime / 3600), //计算小时
					leftm = Math.floor(lefttime / 60 % 60), //计算分钟数
					lefts = Math.floor(lefttime % 60); //计算秒数
				this.taskList[index].countdown = (lefth < 10 ? "0" + lefth : lefth) + ":" + (leftm < 10 ? "0" + leftm : leftm) +
					":" + (lefts < 10 ? "0" + lefts : lefts) //返回倒计时的字符串

				if (this.taskList[index].countdown == '00:00:00') {
					clearInterval(this.taskList[index].setIntervalId)
				}
			},

			// 选择任务状态
			selectTaskStatus(status) {
				for (let index in this.taskList) {
					if (this.taskList[index].setIntervalId) {
						clearInterval(this.taskList[index].setIntervalId)
					}
				}

				this.taskList = []

				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.taskStatus = status;

					service.auth(this, service.api.home.myTaskList, "GET", {
						status: status,
						page: 1
					}, (self, res) => {
						self.page = 2
						if (status == 1 || status == 4) {
							for (let index in res.data.list) {
								res.data.list[index].countdown = '00:00:00'
								if (((res.data.list[index].auto_canceltime - Date.parse(new Date()) / 1000) > 0) && (res.data.list[index].status ==
										0 || res.data.list[index].status == 1 || (res.data.list[index].status == 3 && res.data.list[index].is_disabled ==
											0))) {
									res.data.list[index].setIntervalId = setInterval(() => {
										self.showTime(res.data.list[index].auto_canceltime - Date.parse(new Date()) / 1000, index)
									}, 1000);
								}
							}
						} else if (status == 2) {
							for (let index in res.data.list) {
								res.data.list[index].countdown = '00:00:00'
								if (((res.data.list[index].auto_endtime - Date.parse(new Date()) / 1000) > 0) && (res.data.list[index].status ==
										0 || res.data.list[index].status == 1)) {
									res.data.list[index].setIntervalId = setInterval(() => {
										self.showTime(res.data.list[index].auto_endtime - Date.parse(new Date()) / 1000, index)
									}, 1000);
								}
							}
						}

						self.taskList = res.data.list

						uni.hideLoading();
						self.isClick = true
					})
				}
			},

			// 取消投诉
			cancelComplain(id) {
				uni.showModal({
					title: '提示',
					content: '确定取消投诉吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							uni.showLoading({
								title: '取消中...',
								mask: true
							});

							service.auth(this, service.api.home.cancel_taskcomplain, "GET", {
								complain_id: id
							}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: '取消成功',
										icon: 'none'
									})

									self.selectTaskStatus(self.taskStatus)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 取消任务
			cancelTask(id) {
				uni.showModal({
					title: '提示',
					content: '确定取消任务吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							uni.showLoading({
								title: '取消中...',
								mask: true
							});

							service.auth(this, service.api.home.cancel_taskrecord, "GET", {
								recordid: id
							}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: '取消成功',
										icon: 'none'
									})

									self.selectTaskStatus(self.taskStatus)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 查看原因
			checkReason(item) {
				this.reasonStatus = 1
				this.reason1 = '无'
				this.reason2 = '无'
				this.reason3 = '无'
				if (item.refuseremark) {
					this.reason1 = item.refuseremark
				}
				if (item.mrremark) {
					this.reason2 = item.mrremark
				}
				if (item.mrcomplain_remark) {
					this.reason3 = item.mrcomplain_remark
				}
				setTimeout(() => {
					this.scrollViewTransitionShow = true
				}, 10);
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

	/* 任务状态栏 */
	.top-tab-box {
		width: 100%;
		height: 80rpx;
		background-color: #F9F9F9;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
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
		border-bottom: 6rpx solid #4B7EFE;
	}

	/* 任务列表 */
	.list-box {
		border-radius: 20rpx;
		margin: 30rpx 20rpx 0;
	}

	.list-box .top {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 99;
	}

	.list-box .top .left {
		font-size: 32rpx;
		font-weight: bold;
	}

	.list-box .top .left .title {
		width: 400rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 20rpx;
	}

	.list-box .top .left .price {
		color: #FF0000;
	}

	.list-box .top .right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 28rpx;
		color: #FFF;
	}

	.list-box .top .right .btn {
		padding: 4rpx 20rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
	}

	.list-box .top .right .btn-top {
		margin-bottom: 20rpx;
	}

	.list-box .top .right .status {
		width: 120rpx;
		height: 40rpx;
	}

	.list-box .btm {
		background-color: #FCFCEA;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		border-radius: 0 0 20rpx 20rpx;
		margin-top: -16rpx;
		font-size: 28rpx;
		font-weight: bold;
	}

	.list-box .btm .left {
		display: flex;
		align-items: center;
	}

	.list-box .btm .left image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.list-box .btm .left .countdown {
		color: #FD5B12;
		margin-right: 10rpx;
	}

	.list-box .btm .left .text {
		color: #4B7EFE;
	}

	.list-box .btm .left .reason {
		padding: 0 20rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
		color: #FFF;
	}

	.list-box .btm .right {
		width: 100rpx;
		height: 100rpx;
		color: #FF0000;
		position: relative;
	}

	.list-box .btm .right image {
		width: 100%;
		height: 100%;
	}

	.list-box .btm .right text {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 30rpx;
	}

	/* 弹窗 */
	.window {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.window .scroll-view {
		width: 400rpx;
		height: 0;
		background-color: #FFF;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 60rpx;
		transition: height .3s;
	}

	.window .scroll-view-transition {
		height: 600rpx;
	}

	.window .scroll-view view {
		word-break: break-all;
		font-size: 28rpx;
		color: #666;
	}

	.window .scroll-view .content {
		margin-bottom: 50rpx;
	}

	.window .btn {
		border-radius: 50rpx;
		border: 2rpx solid #999;
		padding: 4rpx 30rpx;
		font-size: 28rpx;
		color: #FFF;
	}
</style>
