<template>
	<view class="container">

		<!-- 提现余额 -->
		<view class="balance-box">
			<view class="balance">
				<view class="title">提现金额：￥0</view>
				<view class="content">
					<text class="num">余额：800元</text>
					<text class="total">全部提现</text>
				</view>
			</view>
		</view>

		<!-- 选择金额 -->
		<view class="bottom_box">
			<block v-for="(item, index) in amountList" :key="item">
				<view class="amount_box" :class="[amountIndex == index? 'amount_box_click' : '']" @click="amountBtn(index)">
					<text class="num">{{item}}元</text>
					<text class="actual">实时到账：49.50元</text>
				</view>
			</block>
		</view>

		<!-- 到账方式 -->
		<view class="way-box">
			<view class="title">到账方式</view>
			<view class="content" @click="selectWay(1)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image1.png"></image>
					<text class="text">支付宝</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 1"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(2)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image2.png"></image>
					<text class="text">微信</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 2"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(3)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image3.png"></image>
					<text class="text">银行卡</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 3"></image>
				<view class="circle" v-else></view>
			</view>
		</view>

		<!-- 提现规则 -->
		<view class="rule-box">
			<view class="title">提现规则</view>
			<text class="content">1、发布余额提现2元起，普通商人收取5%手续费，超级商人收取3%手续费。\n2、每天可提现一次，每笔最多200元,50元以下秒到账，50元以上24小时内到账，节假日延后至工作日发放。\n3、推广佣金高于2000元即可联系客服申请大额提现。</text>
		</view>

		<!-- 确定提现 -->
		<view class="btn-box" @click="rechargeBtn">确定提现</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				amountList: [50, 100, 200, 500, 1000],
				amountIndex: 0,
				wayStatus: 1
			}
		},
		methods: {
			// 选择金额
			amountBtn(index) {
				let _this = this;
				_this.amountIndex = index;
			},

			// 选择到账方式
			selectWay(status) {
				let _this = this;
				_this.wayStatus = status;
			},

			// 确定提现
			rechargeBtn() {
				uni.showToast({
					title: '提现成功！',
					mask: true
				});
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

	/* 提现余额 */
	.balance-box {
		background-color: #FCFCEA;
		border-radius: 20rpx;
		padding-bottom: 30rpx;
		margin-top: 30rpx;
	}

	.balance-box .balance {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.balance-box .balance .title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.balance-box .balance .content {
		display: flex;
		justify-content: space-between;
	}

	.balance-box .balance .content .num {
		font-size: 32rpx;
		color: #4B7EFE;
		font-weight: bold;
	}

	.balance-box .balance .content .total {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
	}

	/* 选择金额 */
	.bottom_box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}

	.bottom_box .amount_box {
		width: 200rpx;
		height: 160rpx;
		border: 2rpx solid #808080;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #808080;
	}
	
	.bottom_box::after {
		content: '';
		width: 200rpx;
	}

	.bottom_box .amount_box_click {
		border-color: #4B7EFE;
		color: #4B7EFE;
	}

	.bottom_box .amount_box .num {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.bottom_box .amount_box .actual {
		font-size: 20rpx;
	}

	/* 到账方式 */
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

	/* 提现规则 */
	.rule-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
	}

	.rule-box .title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.rule-box .content {
		font-size: 24rpx;
		color: #999;
	}

	/* 确定提现 */
	.btn-box {
		width: 80%;
		background-color: #4B7EFE;
		padding: 20rpx;
		border-radius: 60rpx;
		font-size: 40rpx;
		color: #FFF;
		font-weight: bold;
		margin: 50rpx auto 200rpx;
		text-align: center;
	}
</style>
