<template>
	<view class="container">

		<image class="logo" src="../../static/logo/logo.png"></image>

		<!-- 现在登录 -->
		<view class="tab-box">现在登录</view>

		<!-- 输入 -->
		<input class="login-input login-input-top" type="number" v-model="account" placeholder="请输入您的手机号码" maxlength="11" />
		<view class="login-input-box">
			<input :password="passwordShow" v-model="password" placeholder="请输入您的登录密码" />
			<view class="icon" @click="passwordShow = !passwordShow">
				<image src="../../static/images/login/img2.png" v-if="passwordShow"></image>
			</view>
		</view>

		<view class="forget-reg-box">
			<text @click="jump('/pages/login/forget')">忘记密码</text>
			<!-- <text @click="jump('/pages/reg/reg')">注册</text> -->
			<text @click="register">注册</text>
		</view>

		<!-- 登录按钮 -->
		<view class="button" @click="swi_jump">登录</view>

		<!-- 用户协议 -->
		<view class="agreement-box">
			<text class="text">注册/登录表示同意</text>
			<text class="left" @click="jump('/pages/login/agreement?title=' + '用户协议')">用户协议</text>
			<text @click="jump('/pages/login/agreement?title=' + '隐私条款')">隐私条款</text>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				account: '',
				password: '',
				passwordShow: true,
				urlStr: service._api_root + 'h5/#/pages/reg/reg'
			}
		},
		methods: {
			// 注册
			register() {
				plus.runtime.openURL(this.urlStr);
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

			// 登录按钮
			swi_jump() {
				let _this = this;

				uni.showLoading({
					title: '登录中...',
					mask: true
				});

				uni.request({
					url: service.api.login.login,
					data: {
						account: _this.account,
						password: _this.password
					},
					success: res => {
						if (res.data.code == 1) {
							uni.setStorageSync('token1', res.data.data.token)

							uni.request({
								url: service.api.login.login_task,
								data: {
									account: _this.account,
									password: _this.password
								},
								success: res => {
									if (res.data.code == 1) {
										uni.showToast({
											title: res.data.info,
											icon: 'none',
											mask: true
										})

										uni.setStorageSync('token2', res.data.data.token)

										setTimeout(() => {
											uni.switchTab({
												url: '/pages/home/home_page'
											})
										}, 500)
									} else {
										uni.showToast({
											title: res.data.info,
											icon: 'none'
										})
									}
								}
							})
						} else {
							uni.showToast({
								title: res.data.info,
								icon: 'none'
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
	image {
		display: block;
	}

	.container {
		padding: 0 70rpx;
	}

	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 16rpx;
		margin: 150rpx auto 100rpx;
		animation: logo-show .5s;
	}

	@keyframes logo-show {
		from {
			width: 0;
			height: 0;
		}

		to {
			width: 120rpx;
			height: 120rpx;
		}
	}

	/* 现在登录 */
	.tab-box {
		font-size: 40rpx;
		font-weight: bold;
		border-bottom: 4rpx solid #6B6DF4;
		display: inline-block;
		margin-bottom: 100rpx;
	}

	/* 输入 */
	.login-input {
		width: 100%;
		height: 84rpx;
		background-color: #F2F2F2;
		border-radius: 16rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #666;
	}

	.login-input-top {
		margin-bottom: 50rpx;
	}

	.login-input-box {
		width: 100%;
		height: 84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F2F2F2;
		border-radius: 16rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #666;
	}

	.login-input-box .icon {
		width: 36rpx;
		height: 26rpx;
		background-image: url(../../static/images/login/img1.png);
		background-size: 100% 100%;
	}

	.login-input-box .icon image {
		width: 36rpx;
		height: 26rpx;
	}

	.forget-reg-box {
		display: flex;
		justify-content: space-between;
		color: #6B6DF4;
		font-weight: bold;
		padding: 0 20rpx;
		margin-top: 30rpx;
	}

	/* 登录按钮 */
	.button {
		width: 400rpx;
		height: 84rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		color: #6B6DF4;
		font-weight: bold;
		border: 2rpx solid #6B6DF4;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: 0 0 10rpx #6B6DF4;
		margin: 100rpx auto;
	}

	/* 用户协议 */
	.agreement-box {
		font-size: 24rpx;
		color: #6B6DF4;
		text-align: center;
	}

	.agreement-box .text {
		color: #666;
		margin-right: 20rpx;
	}

	.agreement-box .left {
		padding-right: 20rpx;
		border-right: 2rpx solid #ccc;
		margin-right: 20rpx;
	}
</style>
