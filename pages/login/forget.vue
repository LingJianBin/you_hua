<template>
	<view class="container">

		<!-- 忘记密码 -->
		<view class="tab-box">忘记密码</view>

		<!-- 输入 -->
		<input class="login-input login-input-top" type="number" v-model="account" placeholder="请输入您的手机号码" maxlength="11" />
		<view class="login-input-box login-input-top">
			<input v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
			<block v-if="countdown > 61"><text @click="send">获取验证码</text></block>
			<block v-if="countdown == 61"><text @click="send">重新发送</text></block>
			<block v-if="countdown < 61"><text>{{countdown}}</text></block>
		</view>

		<view class="login-input-box login-input-top">
			<input :password="passwordShow" v-model="pwd" placeholder="请输入登录密码" />
			<view class="icon" @click="passwordShow = !passwordShow">
				<image src="../../static/images/login/img2.png" v-if="passwordShow"></image>
			</view>
		</view>

		<view class="login-input-box">
			<input :password="passwordShow" v-model="repwd" placeholder="请再次输入登录密码" />
			<view class="icon" @click="passwordShow = !passwordShow">
				<image src="../../static/images/login/img2.png" v-if="passwordShow"></image>
			</view>
		</view>

		<!-- 完成按钮 -->
		<view class="button" @click="submit">完成</view>

		<!-- 用户协议 -->
		<view class="agreement-box">
			<text class="text">注册/登录表示同意</text>
			<text class="left" @click="jump('/pages/login/agreement?title=' + '用户协议')">用户协议</text>
			<text @click="jump('/pages/login/agreement?title=' + '隐私条款')">隐私条款 </text>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				countdown: 62,
				account: '',
				verifycode: '',
				pwd: '',
				repwd: '',
				passwordShow: true
			}
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
					url: url
				})
			},

			// 验证码
			send() {
				let self = this;

				uni.request({
					url: service.api.reg.code,
					data: {
						'mobile': self.account,
						'temp': 'sms_forget'
					},
					success: res => {
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});

							self.codetime(self, 60);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
					}
				})
			},

			//手機驗證碼獲取倒計時
			codetime(obj, num) {
				if (num < 10) {
					obj.countdown = "0" + num;
				} else {
					obj.countdown = num;
				}

				num--;

				if (num < 0) {
					obj.countdown = 61;
				} else {
					setTimeout(() => {
						obj.codetime(obj, num);
					}, 1000);
				}
			},

			// 完成
			submit() {
				let self = this;

				if (self.pwd != self.repwd) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					})

					return;
				}

				uni.request({
					url: service.api.login.forget,
					method: 'POST',
					data: {
						account: self.account,
						verifycode: self.verifycode,
						pwd: self.pwd,
						repwd: self.repwd
					},
					success: res => {
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})

							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
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
		padding: 200rpx 70rpx 0;
	}

	/* 忘记密码 */
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

	.login-input-box text {
		font-size: 28rpx;
		color: #6B6DF4;
		font-weight: bold;
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

	/* 完成按钮 */
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
		margin-bottom: 100rpx;
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
