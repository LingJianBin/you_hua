<template>
	<view class="container">

		<!-- 任务状态 -->
		<view class="top-tab-box">
			<view class="tab-box" v-for="(item, index) in labelList" :key="index" :class="[item.status == taskStatus ? 'bottom-color' : '']"
			 @click="selectStatus(item.status)">{{item.text}}</view>
		</view>

		<!-- 任务列表 -->
		<view class="list-box" v-for="(item, index) in taskList" :key="item.id" @click="jump('/pages/detail/task_manage_list_detail?id=' + (taskStatus==5 ? item.recordid : item.id ) + '&taskid=' + (taskStatus==5 ? item.id : item.taskid ) + '&status=' + taskStatus)">
			<view class="task">
				<view class="title">
					<text>{{item.name}}</text>
					<image src="../../static/images/my_task/image7.png" v-if="item.mrstatus == -1"></image>
					<image src="../../static/images/my_task/image8.png" v-if="item.mrstatus == 0"></image>
					<image src="../../static/images/my_task/image9.png" v-if="item.mrstatus == 1"></image>
					<image src="../../static/images/my_task/image10.png" v-if="item.mrstatus == 2"></image>
				</view>
				<view class="under">
					<view class="price">￥{{item.money}}</view>
					<view class="delete" v-if="taskStatus == 4" @click.stop="jump('/pages/detail/task_manage_list_detail?id=' + item.id + '&taskid=' + item.taskid + '&status=' + taskStatus)">投诉</view>
					<view class="delete" v-if="taskStatus != 4 && taskStatus != 5" @click.stop="jump('/pages/detail/task_manage_list_detail?id=' + item.id + '&taskid=' + item.taskid + '&status=' + taskStatus)">查看详情</view>
					<view class="delete" @click.stop="cancelComplain(item.mrid)" v-if="item.mrstatus == 0 && item.tousu == 1">取消投诉</view>
				</view>
			</view>
			<view class="btm">
				<view class="left" v-if="taskStatus == 1 || taskStatus == 2 || taskStatus == 4">
					<image src="../../static/images/my_task/image4.png"></image>
					<text class="countdown">{{item.countdown}}</text>
					<text class="text">内完成提交</text>
				</view>
				<view class="left" v-if="taskStatus == 4">
					<view class="reason" @click.stop="checkReason(item)">查看原因</view>
				</view>
				<view class="left" v-if="taskStatus == 5">
					<text class="text">原因：</text>
					<view class="reason" @click.stop="checkReason(item)">查看</view>
				</view>
				<view class="left" v-if="taskStatus == 3 || taskStatus == 4"></view>
				<view class="right" v-if="taskStatus == 1">
					<image src="../../static/images/my_task/image3.png"></image>
					<text>待提交</text>
				</view>
				<view class="right" v-if="taskStatus == 2">
					<image src="../../static/images/my_task/image2.png"></image>
					<text>审核中</text>
				</view>
				<view class="right" v-if="taskStatus == 3">
					<image src="../../static/images/my_task/image1.png"></image>
					<text>已通过</text>
				</view>
				<view class="right" v-if="taskStatus == 4">
					<image src="../../static/images/my_task/image6.png"></image>
					<text>未通过</text>
				</view>
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
				// 1.待提交（包括已取消任务） 2.审核中 3.已通过 4.未通过 5.复审/举报
				labelList: [{
					text: '待提交',
					status: 1
				}, {
					text: '审核中',
					status: 2
				}, {
					text: '已通过',
					status: 3
				}, {
					text: '未通过',
					status: 4
				}, {
					text: '复审/举报',
					status: 5
				}],
				taskStatus: 1,
				onLoadNum: 0,
				taskList: [],
				isClick: true,
				reason1: '无',
				reason2: '无',
				reason3: '无',
				reasonStatus: 0,
				scrollViewTransitionShow: false
			}
		},
		onLoad(options) {
			this.taskid = options.taskid
			this.getData(this.taskid)
		},
		onShow() {
			if (this.onLoadNum == 1) {
				this.getData(this.taskid)
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
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth(this, service.api.home.taskAccept, "GET", {
					taskid: this.taskid,
					status: this.taskStatus
				}, (self, res) => {
					if (self.onLoadNum == 0) {
						self.onLoadNum = 1
					}
					self.page = 2
					if (self.taskStatus == 1 || self.taskStatus == 4) {
						for (let index in res.data) {
							res.data[index].countdown = '00:00:00'
							if ((res.data[index].auto_canceltime - Date.parse(new Date()) / 1000) > 0) {
								res.data[index].setIntervalId = setInterval(() => {
									self.showTime(res.data[index].auto_canceltime - Date.parse(new Date()) / 1000, index)
								}, 1000);
							}
						}
					} else if (self.taskStatus == 2) {
						for (let index in res.data) {
							res.data[index].countdown = '00:00:00'
							if ((res.data[index].auto_endtime - Date.parse(new Date()) / 1000) > 0) {
								res.data[index].setIntervalId = setInterval(() => {
									self.showTime(res.data[index].auto_endtime - Date.parse(new Date()) / 1000, index)
								}, 1000);
							}
						}
					}

					self.taskList = res.data
					uni.hideLoading();
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

									self.selectStatus(self.taskStatus)
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

			// 选择任务管理状态
			selectStatus(status) {
				for (let index in this.taskList) {
					if (this.taskList[index].setIntervalId) {
						clearInterval(this.taskList[index].setIntervalId)
					}
				}

				this.taskList = [];

				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.taskStatus = status;

					service.auth(this, service.api.home.taskAccept, "GET", {
						taskid: this.taskid,
						status: status
					}, (self, res) => {
						self.page = 2
						if (self.taskStatus == 1 || self.taskStatus == 4) {
							for (let index in res.data) {
								res.data[index].countdown = '00:00:00'
								if ((res.data[index].auto_canceltime - Date.parse(new Date()) / 1000) > 0) {
									res.data[index].setIntervalId = setInterval(() => {
										self.showTime(res.data[index].auto_canceltime - Date.parse(new Date()) / 1000, index)
									}, 1000);
								}
							}
						} else if (self.taskStatus == 2) {
							for (let index in res.data) {
								res.data[index].countdown = '00:00:00'
								if ((res.data[index].auto_endtime - Date.parse(new Date()) / 1000) > 0) {
									res.data[index].setIntervalId = setInterval(() => {
										self.showTime(res.data[index].auto_endtime - Date.parse(new Date()) / 1000, index)
									}, 1000);
								}
							}
						}

						self.taskList = res.data
						uni.hideLoading();
					})

					this.isClick = true
				}
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
		height: 80rpx;
		background-color: #F9F9F9;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
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

	.list-box .task {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 99;
	}

	.list-box .task .title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-box .task .title image {
		width: 120rpx;
		height: 40rpx;
	}

	.list-box .task .under {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-box .task .under .price {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
	}

	.list-box .task .under .delete {
		font-size: 28rpx;
		color: #FFF;
		padding: 4rpx 16rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
	}

	.list-box .btm {
		background-color: #FCFCEA;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		border-radius: 0 0 20rpx 20rpx;
		margin-top: -20rpx;
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
