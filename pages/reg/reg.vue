<template>
	<view class="container">

		<image class="logo" src="../../static/logo/logo.png"></image>

		<!-- 用户注册 -->
		<view class="tab-box">用户注册</view>

		<!-- 输入 -->
		<block v-if="stepStatus == 1">
			<input class="login-input login-input-top" type="number" v-model="account" placeholder="请输入您的手机号码" maxlength="11" />
			<view class="login-input-box login-input-top">
				<input v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
				<block v-if="countdown > 61"><text @click="send">获取验证码</text></block>
				<block v-if="countdown == 61"><text @click="send">重新发送</text></block>
				<block v-if="countdown < 61"><text>{{countdown}}</text></block>
			</view>
			<input class="login-input" v-model="show_id" placeholder="请输入邀请码" :disabled="promote_type == 1? true : false" />
		</block>

		<block v-else>
			<view class="login-input-box login-input-top">
				<input :password="passwordShow1" v-model="pwd" placeholder="请输入登录密码" />
				<view class="icon" @click="passwordShow1 = !passwordShow1">
					<image src="../../static/images/login/img2.png" v-if="passwordShow1"></image>
				</view>
			</view>

			<view class="login-input-box login-input-top">
				<input :password="passwordShow2" v-model="repwd" placeholder="请再次输入登录密码" />
				<view class="icon" @click="passwordShow2 = !passwordShow2">
					<image src="../../static/images/login/img2.png" v-if="passwordShow2"></image>
				</view>
			</view>

			<view class="login-input-box login-input-top">
				<input :password="passwordShow3" v-model="pwd2" placeholder="赠送密码" maxlength="20" />
				<view class="icon" @click="passwordShow3 = !passwordShow3">
					<image src="../../static/images/login/img2.png" v-if="passwordShow3"></image>
				</view>
			</view>

			<!-- <input class="login-input login-input-top" v-model="pwd2" placeholder="赠送密码" maxlength="20" /> -->

			<view class="login-input-box login-input-top" @click="select1">
				<input type="text" v-model="city" placeholder="选择省份" disabled />
				<view class="arrow"></view>
			</view>

			<view class="login-input-box" @click="select2">
				<input type="text" v-model="city1" placeholder="选择城市" disabled />
				<view class="arrow"></view>
			</view>
		</block>

		<!-- 立即注册 -->
		<view class="button" v-if="stepStatus == 1" @click="nextStepBtn">下一步</view>
		<view class="button" @click="registered" v-else>立即注册</view>

		<!-- 用户协议 -->
		<view class="agreement-box">
			<text class="text">注册/登录表示同意</text>
			<text class="left" @click="jump('/pages/login/agreement?title=' + '用户协议')">用户协议</text>
			<text @click="jump('/pages/login/agreement?title=' + '隐私条款')">隐私条款 </text>
		</view>

		<!-- 遮罩层 -->
		<view class="mask" v-show="show == 1" @click="show = 0"></view>

		<!-- 选择省和市 -->
		<view class="choice_city" :class="show == 0 ? 'mask_none' : show == 1 ? 'mask_show' : ''">
			<image src="../../static/images/reg/close.png" mode="widthFix" @click="show = 0"></image>
			<view class="ci_test1">请选择</view>
			<view class="ci_box">
				<scroll-view class="box_H" scroll-y scroll-top='0'>
					<view class="H_city_test">选择省份/城市</view>
					<view class="H_city" v-for="(item, index) in citys" :key="index" @click="choice_province(item.label, index)">
						{{item.label}}
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- <button @click="callbacks">验证</button> -->
	</view>
</template>

<script>
	// #ifdef H5
	import captcha from '@/common/TencentCaptchas.js';
	// #endif
	import service from '@/service.js';
	import cityData from "@/components/citydata.js";
	export default {
		data() {
			return {
				stepStatus: 1,
				show: 0,
				countdown: 62,
				account: '',
				verifycode: '',
				pwd: '',
				repwd: '',
				promote_type: '',
				show_id: '',
				pwd2: '',
				index: '', // 选择城市第一次点击省份的索引
				city: '', // 省份
				city1: '', // 城市
				citys: [],
				passwordShow1: true,
				passwordShow2: true,
				passwordShow3: true,
				isClick: true
			}
		},
		onLoad(options) {
			if (options.promote_type && options.promote_type) {
				this.promote_type = options.promote_type
				this.show_id = options.show_id
			}
		},
		onShow() {
			let self = this;

			// 拿到下载的网址
			uni.request({
				url: service.api.login.logo,
				success: res => {
					if (res.data.code == 1) {
						uni.setStorageSync('website', res.data.data)

						// 判断是什么系统
						uni.getSystemInfo({
							success: res => {
								uni.setStorageSync('platform', res.platform)

								if (res.platform == 'ios') {
									self.url = uni.getStorageSync('website').ios_dwonlink
								} else {
									self.url = uni.getStorageSync('website').android_dwonlink
								}
							}
						})
					}
				}
			})
		},
		methods: {
			// callbacks() {
			// 	// console.log(window)
			// 	let captcha1 = new TencentCaptcha('2078896871', function(res) {
			// 		console.log(res)
			// 		/* callback */
			// 	});
			// 	captcha1.show(); // 显示验证码
			// },
			// 下一步
			nextStepBtn() {
				if (this.account == '' || this.verifycode == '') {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})

					return;
				}

				this.stepStatus = 0;
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
					url: url
				})
			},

			// 选择省份
			select1() {
				this.show = 1;
				// 第一次点击清空所有城市
				this.city = '';
				this.city1 = '';
				// 加载所有数据
				this.citys = cityData;
			},

			// 选择城市
			select2() {
				if (this.city == '') {
					uni.showToast({
						title: '请先选择省份',
						icon: 'none'
					})

					return;
				}
				this.show = 1;
				this.citys = cityData[this.index].childrens;
			},

			choice_province(name, index) { //选择地区
				if (this.city == '') {
					this.city = name;
					this.index = index;

				} else {
					this.city1 = name;
				}
				this.show = 0;
			},

			// 验证码
			send() {
				let self = this;

				if (self.account == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}

				// #ifdef H5
				let captcha1 = new TencentCaptcha('2078896871', function(res) {
					console.log(res)
					if (res.ret == 0) {
						// 验证成功
						uni.request({
							url: service.api.reg.code,
							data: {
								mobile: self.account,
								temp: 'sms_reg',
								Ticket: res.ticket,
								Randstr: res.randstr
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
					}
				});
				captcha1.show(); // 显示验证码
				// return
				// #endif
				// console.log('=========')
				// uni.request({
				// 	url: service.api.reg.code,
				// 	data: {
				// 		'mobile': self.account,
				// 		'temp': 'sms_reg'
				// 	},
				// 	success: res => {
				// 		if (res.data.code == 1) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.data.info
				// 			});

				// 			self.codetime(self, 60);
				// 		} else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.data.info
				// 			});
				// 		}
				// 	}
				// })
			},

			// 手機驗證碼獲取倒計時
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

			// 立即注册
			registered() {
				uni.showLoading({
					title: '注册中...',
					mask: true
				});

				let self = this

				if (self.pwd != self.repwd) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					})

					return;
				}

				if (self.city == '' || self.city1 == '') {
					uni.showToast({
						title: '请选择省份城市',
						icon: 'none'
					})

					return;
				}

				if (self.isClick) {
					self.isClick = false

					uni.request({
						url: service.api.reg.register,
						method: 'POST',
						data: {
							account: self.account,
							verifycode: self.verifycode,
							pwd: self.pwd,
							show_id: self.show_id,
							pwd2: self.pwd2,
							attribution_province: self.city, // 归属省份
							attribution_city: self.city1, // 归属城市
							nickname: self.account,
							promote_type: self.promote_type
						},
						success: res => {
							if (res.data.code == 1) {
								uni.showToast({
									icon: 'none',
									title: res.data.info
								})

								self.isClick = true

								//在app内运行
								// #ifdef APP-PLUS
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 800)
								// #endif

								//在H5运行
								//#ifdef H5 || MP-WEIXIN
								setTimeout(() => {
									window.location.href = 'http://down.jinli366.com/6pv8'
								}, 800)
								//#endif
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.info
								})

								self.isClick = true
							}
						},
						fail: err => {
							uni.showToast({
								title: '网站消息获取错误',
								icon: 'none'
							});
						}
					})
				}
			},
		}
	}
</script>

<style>
	image {
		display: block;
	}

	.container {
		padding: 120rpx 70rpx 0;
	}

	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 16rpx;
		margin: 0 auto 100rpx;
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

	/* 用户注册 */
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

	.login-input-box .arrow {
		border-top: 12rpx solid #999;
		border-right: 12rpx solid transparent;
		border-left: 12rpx solid transparent;
	}

	/* 立即注册 */
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

	/* 遮罩层 */
	.mask {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 998;
	}

	/* 选择省和市 */
	.choice_city {
		background: #fff;
		position: fixed;
		height: 884rpx;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 999;
		transition: .3s;
		transform: translateY(100%);
	}

	.mask_none {
		transform: translateY(100%);
	}

	.mask_show {
		transform: translateY(0);
	}

	.choice_city image {
		position: absolute !important;
		width: 40rpx;
		height: 40rpx;
		right: 20rpx;
		top: 20rpx;
	}

	.choice_city .ci_test1 {
		text-align: center;
		padding: 10rpx;
		color: #999;
		font-size: 30rpx;
	}

	.choice_city .ci_test {
		height: 144rpx;
		font-size: 30rpx;
		padding: 20rpx;
	}

	.choice_city .ci_test text {}

	.choice_city .ci_box {
		height: 700rpx;
	}

	.choice_city .ci_box .box_H {
		height: 700rpx;
		font-size: 30rpx;
	}

	.choice_city .ci_box .box_H view {
		padding: 10rpx;
	}

	.choice_city .ci_box .box_H .H_city_test {
		color: #999;
	}
</style>
