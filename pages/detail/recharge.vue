<template>
	<view class="container">

		<!-- 充值金额 -->
		<view class="amount-box">
			<view class="title">充值金额</view>
			<view class="content">
				<text class="icon">￥</text>
				<input type="number" :focus="true" class="input" v-model="money" placeholder="充值金额" />
			</view>
		</view>

		<!-- 支付方式 -->
		<view class="way-box">
			<view class="title">支付方式</view>
			<view class="content" @click="selectWay(1)">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image1.png"></image>
					<text class="text">支付宝</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 1"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(2)">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image2.png"></image>
					<text class="text">微信</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 2"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(3)">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image3.png"></image>
					<text class="text">银行卡</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 3"></image>
				<view class="circle" v-else></view>
			</view>
		</view>

		<!-- 立即充值 -->
		<view class="btn-box" @click="rechargeBtn">立即充值</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				wayStatus: 1,
				money: ''
			}
		},
		methods: {
			// 选择支付方式
			selectWay(status) {
				let _this = this;

				if (status == 2 || status == 3) {
					uni.showToast({
						title: '暂未开放',
						icon: 'none'
					})

					return;
				}

				_this.wayStatus = status
			},

			// 立即充值
			rechargeBtn() {
				if (this.money <= 0) {
					uni.showToast({
						title: '请输入正确的金额',
						icon: 'none'
					})

					return;
				}

				uni.showLoading({
					title: '充值中...',
					mask: true
				});

				service.auth(this, service.api.home.czgold, "POST", {
					money: Number(this.money)
				}, (self, res) => {
					if (res.code == 1) {
						uni.hideLoading();
						self.alipay_params = res.data.alipay_params
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: self.alipay_params,
							success: res => {
								uni.showToast({
									icon: 'none',
									title: '充值成功',
									mask: true
								})

								setTimeout(() => {
									uni.navigateBack()
								}, 500)
							},
							fail: err => {
								console.log(err)
								uni.showToast({
									icon: 'none',
									title: '充值失败'
								})
							}
						})
					}
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
		padding: 0 30rpx;
	}

	/* 充值金额 */
	.amount-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
	}

	.amount-box .title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.amount-box .content {
		display: flex;
		align-items: center;
		margin-right: 200rpx;
	}

	.amount-box .content .icon {
		margin-right: 8rpx;
	}

	/* 支付方式 */
	.way-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
	}

	.way-box .title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.way-box .content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.way-box .content .left {
		display: flex;
		align-items: center;
	}

	.way-box .content .left .icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.way-box .content .left .text {
		font-size: 28rpx;
		font-weight: bold;
	}

	.way-box .content .circle {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #D8D9DD;
		box-sizing: border-box;
	}

	.way-box .content .circle-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	/* 立即充值 */
	.btn-box {
		width: 80%;
		background-color: #4B7EFE;
		padding: 20rpx;
		border-radius: 60rpx;
		font-size: 40rpx;
		color: #FFF;
		font-weight: bold;
		margin: 100rpx auto 0;
		text-align: center;
	}
</style>
