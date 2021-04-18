<template>
	<view class="container">

		<view class="pic-box">
			<view class="title">
				让分享更有价值
			</view>
			<image :src="info.qrcode"></image>
			<view class="text">
				公排码
			</view>
			<view class="id">{{user.pb_code}}</view>
			<view class="tip">
				保存二维码可分享
			</view>
			<view class="btn" @click="preview">
				保存图片
			</view>
			<view class="btn" @click="copy(info.link)">
				复制链接
			</view>
		</view>

		<canvas canvas-id="firstCanvas" id="firstCanvas"></canvas>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				info: {}
			}
		},
		onShow() {
			service.auth(this, service.api.home.invite_pbmem, "GET", {}, (self, res) => {
				self.info = res.data
			})
		},
		methods: {
			// 保存图片
			preview() {
				uni.showLoading({
					title: '保存中...',
					mask: true
				});

				// #ifdef APP-PLUS
				var context = uni.createCanvasContext('firstCanvas')
				context.drawImage('../../static/images/gongpai_code/image1.png', 0, 0, 375, 750);
				context.drawImage(this.info.qrcode, 130, 220, 115, 115);
				context.setFillStyle('white')
				context.setFontSize(20)
				context.setTextAlign('center')
				context.fillText('公排码', 187, 380)
				context.setFontSize(16)
				context.fillText(this.user.pb_code, 187.5, 410)
				context.draw(false, () => {
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success: res => {
							// 在H5平台下，tempFilePath 为 base64
							console.log(res.tempFilePath)
							let tempFilePath = res.tempFilePath

							setTimeout(() => {
								plus.gallery.save(tempFilePath, () => {
									uni.showToast({
										title: '保存成功',
										icon: 'none'
									});
								})
							}, 1500);
						},
						fail: err => {
							uni.showToast({
								title: '保存失败',
								icon: 'none'
							});
						}
					})
				})
				// #endif

				// // #ifdef APP-PLUS
				// //在app内运行
				// let filename = Math.random() + ".png"
				// plus.downloader.createDownload(url, {
				// 	filename: "_downloads/" + filename
				// }, (download, status) => {
				// 	if (status == 200) { //下载成功
				// 		plus.gallery.save(download.filename, () => {
				// 			uni.showToast({
				// 				title: '保存成功',
				// 				icon: 'none'
				// 			});
				// 		})
				// 	} else {
				// 		uni.showToast({
				// 			title: '保存失败',
				// 			icon: 'none'
				// 		});
				// 	}
				// }).start()
				// // #endif


				//#ifdef H5 || MP-WEIXIN
				//在H5运行
				uni.showToast({
					title: '此功能仅能在APP中使用',
					icon: 'none'
				})
				//#endif	
			},

			// 复制链接
			copy(link) {
				uni.setClipboardData({
					data: link,
					success: res => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					}
				});
			},
		}
	}
</script>

<style>
	canvas {
		width: 375px;
		height: 750px;
		position: fixed;
		top: -10000px;
	}

	page {
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		background-image: url(../../static/images/gongpai_code/image1.png);
		background-size: 100% 100%;
		padding-top: 400rpx;
		box-sizing: border-box;
	}

	.pic-box {
		width: 500rpx;
		height: 600rpx;
		background-image: url(../../static/images/gongpai_code/image2.png);
		background-size: 100% 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pic-box .title {
		width: 400rpx;
		height: 120rpx;
		background-image: url(../../static/images/gongpai_code/image3.png);
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		padding-top: 25rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		color: white;
		position: relative;
		bottom: 50rpx;
		margin-bottom: -50rpx;
	}

	.pic-box image {
		width: 220rpx;
		height: 220rpx;
	}

	.pic-box .text {
		font-size: 28rpx;
		font-weight: bold;
	}

	.pic-box .id {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 10rpx;
	}

	.pic-box .tip {
		font-size: 20rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.pic-box .btn {
		width: 260rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 32rpx;
		color: white;
		background-color: #71B3F2;
		border-radius: 50rpx;
		margin-top: 10rpx;
	}
</style>
