<template>
	<view class="container">

		<block v-if="user.is_idverifly == 0">
			<view class="text">未实名</view>
			<view class="btn" @click="paymentCost">支付费用</view>
		</block>
		<view class="text" v-else>实名认证成功</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				step: {}
			}
		},
		onLoad() {
			service.auth(this, service.api.me.getVerificationStep, "GET", {}, (self, res) => {
				if (res.data.step == 'payment_cost') {
					self.step = res.data
				} else {
					this.jump('/pages/me/authentication')
				}
			})
		},
		methods: {
			//支付接口
			paymentCost() {
				// #ifdef H5 || MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '该功能只能在app内使用'
				})
				// #endif

				// #ifdef APP-PLUS
				service.auth(this, service.api.me.paymentCost, "GET", {}, (self, res) => {
					if (res.code == 1) {
						if (res.data.isfree && res.data.isfree == 1) {
							self.jump('/pages/me/authentication')
						} else {
							self.alipay_params = res.data.alipay_params
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: self.alipay_params,
								success: res => {
									console.log(res)
									uni.showToast({
										icon: 'none',
										title: '支付成功',
										mask: true
									})

									setTimeout(() => {
										self.jump('/pages/me/authentication')
									}, 300)
								},
								fail: err => {
									console.log(err)
									uni.showToast({
										icon: 'none',
										title: '支付失败'
									})
								}
							})
						}
					}
				})
				// #endif
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
	.text {
		font-size: 48rpx;
		color: #999;
		text-align: center;
		margin-top: 200rpx;
	}

	.btn {
		width: 600rpx;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 32rpx;
		color: #FFF;
		text-align: center;
		border-radius: 100rpx;
		margin: 100rpx auto 0;
		background-color: #4B7EFE;
	}
</style>
