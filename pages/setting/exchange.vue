<template>
	<view class="content">

		<view class="pwd">
			<view class="oldpwd">
				<text>支付宝</text><input v-model="alipay" placeholder="请输入支付宝账号" />
			</view>
			<view class="oldpwd">
				<text>微信</text><input v-model="weixin" placeholder="请输入微信账号" />
			</view>
		</view>

		<view class="btn" @click="submit">确认</view>

	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		data() {
			return {
				alipay: '',
				weixin: ''
			}
		},
		onLoad() {
			this.alipay = uni.getStorageSync('user').alipay
			this.weixin = uni.getStorageSync('user').weixin
		},
		methods: {
			// 确认
			submit() {
				let self = this;

				uni.showLoading({
					title: '修改中...',
					mask: true
				})

				service.auth(self, service.api.setting.changePayment, "POST", {
					alipay: self.alipay,
					weixin: self.weixin
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.info
						})

						service.auth2(self, service.api.index.user, "GET", {}, (self, res) => {
							self.alipay = res.data.member.alipay
							self.weixin = res.data.member.weixin
						})
					}
				})
			},
		}
	}
</script>

<style>
	.pwd {
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		font-size: 32rpx;
		color: #333333;
		margin-top: 28rpx;
	}

	.pwd .oldpwd {
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		height: 86rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F4F4F4;
	}

	.oldpwd input {
		margin-left: 50rpx;
	}

	.btn {
		width: 600rpx;
		height: 76rpx;
		line-height: 76rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34rpx;
		border-radius: 38rpx;
		margin: 52rpx auto 0;
		background-color: #4B7EFE;
	}
</style>
