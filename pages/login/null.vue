<template>
	<view class="container">

		<image class="logo" src="../../static/logo/logo.png"></image>

	</view>
</template>

<script>
	import service from '@/service.js';
	// #ifdef APP-PLUS
	// const adSdk = uni.requireNativePlugin('AD-SDK')
	// #endif

	export default {
		data() {
			return {
				version: 1,
				confirmText: '马上更新'
			}
		},
		onLoad() {
			// // #ifdef APP-PLUS
			// adSdk.showSplashAd({
			// 	logoUrl: 'https://mobi.oss-cn-shanghai.aliyuncs.com/images/slogan.png' // 底部 logo（可选）
			// }, result => {
			// 	console.log(JSON.stringify(result))
			// })
			// // #endif

			// 判断是什么系统
			uni.getSystemInfo({
				success: res => {
					uni.setStorageSync('platform', res.platform)

					this.updateApp()
				}
			})

			setTimeout(() => {
				if (uni.getStorageSync('token1') == '' || uni.getStorageSync('token2') == '') {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				} else {
					uni.reLaunch({
						url: '/pages/home/home_page'
					})
				}
			}, 500)
		},
		methods: {
			// 判断版本号，是否更新
			updateApp() {
				if (uni.getStorageSync('platform') == 'android') {
					service.auth(this, service.api.login.version, "GET", {}, (self, resp) => {
						if (service.config.version != resp.data.version) {
							uni.showModal({
								title: '更新内容',
								content: resp.data.content,
								confirmText: self.confirmText,
								showCancel: false,
								success: res => {
									if (res.confirm) {
										console.log('用户点击确定');

										if (self.version == 1) {
											self.version = 1
											self.confirmText = '请在浏览器下载安装'

											// #ifdef APP-PLUS
											plus.runtime.openURL(resp.data.request_url);
											// let dtask = plus.downloader.createDownload(resp.data.request_url, {}, (d, status) => {
											// 	if (status == 200) {
											// 		plus.runtime.install(d.filename); // app更新安装
											// 	} else {
											// 		console.log('下载失败')
											// 	}
											// })
											// dtask.start();
											// #endif
										}
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								},
								fail: err => {
									console.log(err);
								},
								complete: respo => {
									console.log(respo);
									if (respo.cancel === false) {
										self.updateApp()
									}
								}
							});
						}
					})
				} else if (uni.getStorageSync('platform') == 'ios') {
					service.auth(this, service.api.login.version, "GET", {}, (self, resp) => {
						if (service.config.version != resp.data.version) {
							uni.showModal({
								title: '更新内容',
								content: resp.data.content,
								confirmText: self.confirmText,
								showCancel: false,
								success: res => {
									if (res.confirm) {
										console.log('用户点击确定');

										if (self.version == 1) {
											self.version = 2
											self.confirmText = '正在下载安装'

											// #ifdef APP-PLUS
											uni.request({
												url: 'http://api.bq04.com/apps/5fb61b2eb2eb463c9247dec1/download_token', //仅为示例，并非真实接口地址。
												data: {
													api_token: 'becea047b542ffb4210021063db1c3c5'
												},
												success: res => {
													console.log(res)
													console.log('itms-services://?action=download-manifest&url=' + encodeURIComponent(
														'https://download.bq04.com/apps/5fb61b2eb2eb463c9247dec1/install?download_token=' + res.data.download_token
													))

													plus.runtime.openURL("itms-services://?action=download-manifest&url=" +
														encodeURIComponent(
															"https://download.bq04.com/apps/5fb61b2eb2eb463c9247dec1/install?download_token=" + res.data.download_token
														))
												},
												fail: err => {
													uni.showToast({
														title: '网站消息获取错误',
														icon: 'none'
													});
												}
											});
											// #endif
										}
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								},
								fail: err => {
									console.log(err);
								},
								complete: respo => {
									console.log(respo);
									if (respo.cancel === false) {
										self.updateApp()
									}
								}
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

	.logo {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		margin: 400rpx auto 0;
	}
</style>
