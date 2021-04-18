<template>
	<view class="container">

		<textarea v-model="remark" placeholder="请输入投诉内容" />
		<image mode="aspectFill" :src="img" @click="uploadImage"></image>
		<view class="btn" @click="report">确认投诉</view>

	</view>
</template>

<script>
	import service from '@/service.js';
	
	export default {
		data() {
			return {
				remark: '',
				img: '../../static/images/task_detail/image12.png',
				id: ''
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		methods: {
			// 上传图片
			uploadImage() {
				let _this = this;
				uni.chooseImage({
					count: 1, // 默认9
					sourceType: ['album'], // 从相册选择
					success: res => {
						uni.uploadFile({
							url: service.api.secondary.uploadImg,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token2')
							},
							success: res => {
								_this.img = JSON.parse(res.data).data.url
							},
							fail: res => {
								uni.showToast({
									icon: 'none',
									title: '上传失败'
								});
							}
						});
					}
				})
			},
			
			// 投诉
			report() {
				if (this.remark == '') {
					uni.showToast({
						title: '请输入投诉内容',
						icon: 'none'
					})
				
					return;
				}
				
				uni.showLoading({
					title: '投诉中...',
					mask: true
				});
				
				service.auth(this, service.api.home.complain, "POST", {
					recordid: this.id,
					image: this.img,
					remark: this.remark
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: res.info,
							icon: 'none',
							mask: true
						})
						
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 800)
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.container{
		padding: 30rpx 30rpx 0;
	}
	
	textarea {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border: 2rpx solid #CCC;
		border-radius: 10rpx;
	}
	
	image {
		display: block;
		width: 200rpx;
		height: 200rpx;
		margin: 30rpx auto 0;
	}
	
	.btn {
		width: 50%;
		background-color: #4B7EFE;
		padding: 20rpx 0;
		border-radius: 100rpx;
		font-size: 36rpx;
		color: #FFF;
		text-align: center;
		margin: 100rpx auto 0;
	}
</style>
