<template>
	<view class="content">

		<view class="pwd">
			<view class="oldpwd">
				<input type="text" v-model="verifycode" placeholder="请输入验证码" placeholder-style="color:#999;" />
				<button v-if="countdown > 61" class="checker" @click="verification">获取验证码</button>
				<button v-if="countdown == 61" class="checker" @click="verification">重新获取</button>
				<button v-if="countdown < 61" class="checker" disabled="true">{{countdown}}秒</button>
			</view>
			<view class="oldpwd">
				<input type="password" v-model="pwd2" placeholder="请输入新密码" placeholder-style="color:#999;" />
			</view>
			<view class="oldpwd">
				<input type="password" v-model="repwd2" placeholder="请确认新密码" placeholder-style="color:#999;" />
			</view>
		</view>
		<view class="btn" @click="submit">确认</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				countdown: 62,
				account: '',
				pwd2: '',
				repwd2: '',
				verifycode: ''
			}
		},
		onShow() {
			this.account = uni.getStorageSync("user").account
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

			verification() {
				var self = this;
				//发送短信验证码
				uni.request({
					url: service.api.index.verifycode,
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token1')
					},
					success: res => {
						var res = res.data;
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							self.codetime(self, 60);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							return;
						}
					}
				});
			},

			//手机验证码获取倒计时
			codetime: function(obj, num) {
				if (num < 10) {
					obj.countdown = "0" + num;
				} else {
					obj.countdown = num;
				}
				num--;
				if (num < 0) {
					obj.countdown = 61;
				} else {
					setTimeout(function() {
						obj.codetime(obj, num);
					}, 1000);
				}
			},

			// 提交修改
			submit() {
				var self = this
				uni.request({
					url: service.api.setting.changePwd2,
					method: 'POST',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token1')
					},
					data: {
						pwd2: self.pwd2,
						repwd2: self.repwd2,
						verifycode: self.verifycode
					},
					success(res) {
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})

							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
						}

					}
				})
			}
		}
	}
</script>

<style>
	.pwd {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		color: #333;
		margin-top: 30rpx;
	}

	.pwd .oldpwd {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		height: 96rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #F4F4F4;
	}

	.btn {
		width: 600rpx;
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFF;
		border-radius: 50rpx;
		margin: 60rpx auto 0;
		background: #4B7EFE;
	}

	.checker {
		background: #4B7EFE;
		width: 200rpx;
		height: 56rpx;
		line-height: 56rpx;
		border-radius: 30rpx;
		font-size: 28rpx;
		color: #FFF;
		margin: 0;
	}
</style>
