<template>
	<view class="container">

		<!-- 提交单价 -->
		<view class="type-box">
			<view class="title">
				<text class="star">*</text>
				<text class="text">提交单价</text>
			</view>
			<input @input="input" class="input" type="number" v-model="money" placeholder="请输入价格" placeholder-class="placeholder-input" />
		</view>

		<!-- 投放数量 -->
		<view class="type-box">
			<view class="title">
				<text class="star">*</text>
				<text class="text">投放数量</text>
			</view>
			<input @input="input" class="input" type="number" v-model="num" placeholder="请输入投放数量" placeholder-class="placeholder-input" />
		</view>

		<!-- 结束时间 -->
		<picker mode="date" @change="submitTimeBtn">
			<view class="type-box">
				<view class="title">
					<text class="star">*</text>
					<text class="text">结束时间</text>
				</view>
				<view class="select">
					<view class="text">{{endtime}}</view>
					<image class="arrow" src="../../static/images/release_task/image1.png"></image>
				</view>
			</view>
		</picker>

		<!-- 提交限时 -->
		<picker mode="selector" :range="taskTypeArr1" @change="selectTaskType1">
			<view class="type-box">
				<view class="title">
					<text class="star">*</text>
					<text class="text">提交限时</text>
				</view>
				<view class="select">
					<view class="text">{{submittime}}</view>
					<image class="arrow" src="../../static/images/release_task/image1.png"></image>
				</view>
			</view>
		</picker>

		<!-- 审核限时 -->
		<picker mode="selector" :range="taskTypeArr2" @change="selectTaskType2">
			<view class="type-box">
				<view class="title">
					<text class="star">*</text>
					<text class="text">审核限时</text>
				</view>
				<view class="select">
					<view class="text">{{checktime}}</view>
					<image class="arrow" src="../../static/images/release_task/image1.png"></image>
				</view>
			</view>
		</picker>

		<!-- 手续费 -->
		<view class="type-box">
			<view class="title">
				<text class="star">*</text>
				<text class="text">手续费</text>
			</view>
			<!-- <view class="vip">
				<text>VIP专享:{{vip_charge_percent}}%</text>
			</view> -->
			<view class="select">
				<view class="text" style="margin-right: 0;">{{serviceCharge}}%</view>
			</view>
		</view>

		<!-- 置顶服务 -->
		<view class="top-service">
			<view class="select-box" @click="selectTopService(0)">
				<view class="icon-box">
					<view class="icon" v-if="topServiceStatus == 0"></view>
				</view>
				<text class="text">无需置顶服务</text>
			</view>
			<view class="select-box" @click="selectTopService(1)">
				<view class="icon-box">
					<view class="icon" v-if="topServiceStatus == 1"></view>
				</view>
				<text class="text">需订购置顶服务</text>
			</view>
		</view>

		<scroll-view :scroll-x="true" class="vip-box" :class="[topServiceStatus == 1? 'vip-box-show': '']">
			<block v-for="(item, index) in zdList" :key="index">
				<view class="vip" :class="[currentIndex == index? 'vip-color' : '']" @click="selectPrice(item, index)">
					<view class="time">{{item.toptime/3600}}小时</view>
					<view class="money">
						<text>￥</text>
						<text class="num">{{item.ye_discount}}</text>
					</view>
					<view class="price">{{item.ye_price}}元/月</view>
					<view class="recommend" v-if="item.is_tj == 1">推荐</view>
				</view>
			</block>
		</scroll-view>

		<!-- 规则 -->
		<view class="top-service">
			<view class="select-box">
				<view class="icon-box" @click="selectRuleStatus">
					<view class="icon" v-if="ruleStatus"></view>
				</view>
				<view class="text">
					<text @click="selectRuleStatus">已阅读并同意遵守</text>
					<text class="rule" @click="task_rules_status = true;">《发布规则》</text>
				</view>
			</view>
		</view>

		<!-- 提交订单 -->
		<view class="btn-box">
			<view class="num-box">
				<text>总计：</text>
				<text class="num">￥{{totalMoney.toFixed(2)}}</text>
			</view>
			<view class="btn" @click="submitBtn">提交订单</view>
		</view>

		<!-- 弹窗 -->
		<view class="window" v-if="task_rules_status">
			<scroll-view class="scroll-view" scroll-y="true">
				<rich-text class="content" :nodes="task_rules"></rich-text>
			</scroll-view>
			<view class="btn" @click="task_rules_status = false;">关闭</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: {},
				money: '',
				num: '',
				endtime: '请选择结束时间(单量完成自动结束)',
				submittime: '请选择',
				checktime: '请选择',
				toptime: 0,
				taskTypeArr1: ['2小时', '3小时', '4小时', '5小时', '6小时', '24小时', '48小时', '72小时'],
				taskTypeArr2: ['24小时', '48小时', '72小时'],
				topServiceStatus: 1,
				currentIndex: 0,
				ruleStatus: false,
				zdList: [],
				serviceCharge: 0,
				vip_charge_percent: 0,
				totalMoney: 0,
				isClick: true,
				task_rules: '',
				task_rules_status: false
			}
		},
		onLoad(options) {
			options.stepList = JSON.parse(options.stepList)
			this.options = options
			this.user = uni.getStorageSync('user')

			// 获取页面初始数据
			service.auth(this, service.api.home.publishpage, "GET", {}, (self, res) => {
				if (this.user.is_vip == 0) {
					self.serviceCharge = res.data.novip_charge_percent
				} else {
					self.serviceCharge = res.data.vip_charge_percent
				}
				self.vip_charge_percent = res.data.vip_charge_percent
				self.zdList = res.data.list
				self.task_rules = res.data.task_rules
				self.totalMoney = Number(self.zdList[self.currentIndex].ye_discount)
				self.toptime = self.zdList[self.currentIndex].toptime
			})
		},
		methods: {
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

			input(e) {
				if (this.money != '' && this.num != '') {
					if (this.topServiceStatus == 0) {
						this.totalMoney = this.money * this.num * (1 + this.serviceCharge * 0.01)
					} else {
						this.totalMoney = this.money * this.num * (1 + this.serviceCharge * 0.01) + Number(this.zdList[this.currentIndex]
							.ye_discount)
					}
				}
			},

			// 请选择结束时间
			submitTimeBtn(e) {
				this.endtime = e.detail.value + ' 24:00:00'
			},

			// 提交限时
			selectTaskType1(e) {
				this.submittime = this.taskTypeArr1[e.detail.value]
			},

			// 审核限时
			selectTaskType2(e) {
				this.checktime = this.taskTypeArr2[e.detail.value]
			},

			// 选择置顶服务
			selectTopService(status) {
				this.topServiceStatus = status;
				if (this.topServiceStatus == 0) {
					this.toptime = 0
					this.totalMoney = (this.money * this.num) * (1 + this.serviceCharge * 0.01)
				} else {
					this.toptime = this.zdList[this.currentIndex]
					this.totalMoney = (this.money * this.num) * (1 + this.serviceCharge * 0.01) + Number(this.zdList[this.currentIndex]
						.ye_discount)
				}
			},

			// 选择置顶时间
			selectPrice(item, index) {
				this.currentIndex = index;
				this.toptime = item.toptime;
				this.totalMoney = (this.money * this.num) * (1 + this.serviceCharge * 0.01) + Number(item.ye_discount)
			},

			// 已阅读规则
			selectRuleStatus() {
				this.ruleStatus = !this.ruleStatus;
			},

			// 提示信息
			showToast(title) {
				uni.showToast({
					title: title,
					icon: 'none'
				})
			},

			// 提交订单
			submitBtn() {
				if (this.money < 0.2) {
					this.showToast('请输入正确的单价')
					return;
				}

				if (this.num == '') {
					this.showToast('请输入投放数量')
					return;
				}

				if (this.endtime == '请选择结束时间(单量完成自动结束)') {
					this.showToast('请选择结束时间')
					return;
				}

				if (this.submittime == '请选择') {
					this.showToast('请选择提交限时')
					return;
				}

				if (this.checktime == '请选择') {
					this.showToast('请选择审核限时')
					return;
				}

				if (!this.ruleStatus) {
					this.showToast('请同意发布规则')
					return;
				}

				if (this.isClick) {
					this.isClick = false
					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					service.auth2(this, service.api.home.publish_task, "POST", {
						name: this.options.name,
						remark: this.options.stepList,
						starttime: Date.parse(new Date()) / 1000,
						endtime: new Date(this.endtime.replace(/\-/g, '/')).getTime() / 1000,
						num: this.num,
						categoryid: this.options.categoryid,
						money: this.money,
						checktime: parseInt(this.checktime) * 60 * 60,
						submittime: parseInt(this.submittime) * 60 * 60,
						tasklink: this.options.tasklink,
						is_zd: this.topServiceStatus,
						zd_time: this.toptime,
						extdata: this.options.extdata
					}, (self, res) => {
						if (res.code == 1) {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								mask: true
							})

							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/home_page'
								})
							}, 1000)
						}
					})

					this.isClick = true
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
		padding: 0 30rpx;
	}

	/* 结束时间 */
	.type-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.type-box .title .star {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
		vertical-align: middle;
		margin-right: 6rpx;
	}

	.type-box .title .text {
		font-size: 32rpx;
		color: #343434;
		font-weight: bold;
	}

	.type-box .placeholder-input {
		font-size: 28rpx;
		color: #9A9A9A;
		text-align: end;
	}

	.type-box .input {
		font-size: 28rpx;
		text-align: end;
	}

	.type-box .vip {
		display: flex;
		font-size: 28rpx;
		color: #4B7EFE;
		font-weight: bold;
	}

	.type-box .select {
		display: flex;
		align-items: center;
	}

	.type-box .select .text {
		font-size: 28rpx;
		color: #9A9A9A;
		margin-right: 20rpx;
	}

	.type-box .select .arrow {
		width: 16rpx;
		height: 30rpx;
	}

	/* 置顶服务 */
	.top-service {
		margin-top: 50rpx;
	}

	.top-service .select-box {
		display: flex;
		align-items: center;
	}

	.top-service .select-box .icon-box {
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #4B7EFE;
		border-radius: 50%;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.top-service .select-box .icon-box .icon {
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
		background-color: #4B7EFE;
	}

	.top-service .select-box .text {
		font-size: 32rpx;
	}

	.top-service .select-box .text .rule {
		color: #4B7EFE;
	}

	.vip-box {
		white-space: nowrap;
		width: 0;
		opacity: 0;
		transition: width 1s, opacity 1s;
	}

	.vip-box-show {
		width: 100%;
		opacity: 1;
	}

	.vip-box .vip {
		width: 160rpx;
		padding: 30rpx 0;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		border: 2rpx solid #B0B0B0;
		border-radius: 20rpx;
		margin: 20rpx 10rpx 50rpx;
		position: relative;
	}

	.vip-box .vip-color {
		width: 180rpx;
		padding: 40rpx 0;
		border: 2rpx solid transparent;
		box-shadow: 0 0 10rpx #32349c;
	}

	.vip-box .vip .time {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}

	.vip-box .vip .money {
		font-size: 28rpx;
		color: #F4CD63;
		margin-bottom: 10rpx;
	}

	.vip-box .vip .money .num {
		font-size: 36rpx;
	}

	.vip-box .vip .price {
		font-size: 24rpx;
		color: #B0B0B0;
		text-decoration: line-through;
	}

	.vip-box .vip .recommend {
		font-size: 28rpx;
		color: #FFF;
		background-color: #4E68C9;
		border-radius: 20rpx;
		padding: 0 20rpx;
		position: absolute;
		bottom: -20rpx;
	}

	/* 提交订单 */
	.btn-box {
		margin: 50rpx 0 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.btn-box .num-box {
		font-size: 32rpx;
		font-weight: bold;
	}

	.btn-box .num-box .num {
		color: #FF0000;
	}

	.btn-box .btn {
		font-size: 40rpx;
		color: #FFF;
		font-weight: bold;
		padding: 20rpx 100rpx;
		border-radius: 50rpx;
		background-color: #4B7EFE;
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
		height: 600rpx;
		background-color: #FFF;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 60rpx;
	}

	.window .scroll-view .content {
		word-break: break-all;
		font-size: 28rpx;
		color: #666;
	}

	.window .btn {
		border-radius: 50rpx;
		border: 2rpx solid #999;
		padding: 4rpx 30rpx;
		font-size: 28rpx;
		color: #FFF;
	}
</style>
