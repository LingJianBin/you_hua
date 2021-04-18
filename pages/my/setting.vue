<template>
	<view class="container">

		<view class="box" @click="jump('/pages/my/user_info')">
			<text>我的信息</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>
		<view class="box" @click="jump('/pages/setting/exchange')">
			<text>账户信息</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>
		<view class="box" @click="jump('/pages/setting/setPwd')">
			<text>修改登录密码</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>
		<view class="box" @click="jump('/pages/setting/setpwd2')">
			<text>修改赠送密码</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>
		<view class="box" @click="update">
			<text>当前版本号</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>
		<view class="box" @click="exit('/pages/login/login')">
			<text>退出登录</text>
			<image src="../../static/images/setting/arrow.png"></image>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {

			}
		},
		onShow() {
			service.auth2(this, service.api.index.user, "GET", {}, (self, res) => {
				self.user = res.data.member
				uni.setStorageSync('user', res.data.member)
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

			// 当前版本号
			update() {
				uni.showModal({
					title: '当前版本号',
					content: service.config.version,
					showCancel: false,
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 退出
			exit(url) {
				uni.showModal({
					title: '提示',
					content: '确定退出当前账号吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							// 退出登录请重置 userId：
							// // #ifdef APP-PLUS
							// const adSdk = uni.requireNativePlugin('AD-SDK')
							// adSdk.setUserId(null)
							// // #endif

							uni.clearStorageSync();
							uni.reLaunch({
								url
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style>
	image {
		display: block;
	}

	.box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #F2F2F2;
		padding: 24rpx 20rpx;
	}

	.box text {
		color: #666;
	}

	.box image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
