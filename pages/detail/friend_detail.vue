<template>
	<view class="container">

		<!-- <view class="background"></view>

		<view class="avatar-box">
			<image :src="friend.avatar"></image>
			<view>
				<text class="name">{{friend.nickname}}</text>
				<text>志浩上海有限公司</text>
				<text>UI设计师</text>
			</view>
		</view>
 -->
		<view class="hr"></view>

		<view class="user" style="display: flex;justify-content: space-between;box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, 0.16);">

			<view class="user_img">
				<image :src="details.avatar" mode="aspectFit"></image>
			</view>
			<view style="flex: 1;padding: 10rpx 0 0 20rpx;">

				<view class="view_flex">
					<view style="color: black;font-size: 30rpx;font-weight: bold;">{{details.nickname}}</view>
					<view class="in_img" v-if="details.is_vip==1">
						<image src="/static/images/my/image3.png" mode="aspectFit"></image>
					</view>
				</view>

				<view class="view_flex user_view">
					<view class="view_flex dts" style="justify-content: space-between;">
						<view class="sex_img">
							<image :src="details.sex==1?'/static/images/friend/sex_m.png':'/static/images/friend/sex_n.png'" mode="scaleToFill"></image>
						</view>
						<view style="font-size: 22rpx;color: #4B7EFE;padding-left: 10rpx;">{{details.sex==1?'男': details.sex==2?'女':'未知'}}</view>
					</view>
					<view class="view_flex dts" style="justify-content: space-between;">
						<view class="sex_img">
							<image src="/static/images/friend/shiming.png" mode="scaleToFill"></image>
						</view>
						<view style="font-size: 22rpx;color: #4B7EFE;padding-left: 10rpx;flex: 1;">{{details.is_idverifly==1?'已实名':'未实名'}}</view>
					</view>
				</view>


				<view style="max-width: 400rpx;">
					<view style="color: #333333;font-size: 28rpx;font-weight: bold;margin-top: 15rpx;">
						<view>
							{{details.profession}}
						</view>
						<!-- <view>
							xxx工程师
						</view> -->
					</view>
					
					<view style="color: #999999;font-size: 30rpx;margin-top: 30rpx;display: flex;justify-content: space-between;align-items: flex-end;">
						<view>
							<view>{{details.workcity}}</view>
							<view><text style="color: #333333;font-weight: bold;padding-right: 15rpx;">{{details.active}}</text>贡献值</view>
						</view>
						<view><text style="color: #333333;font-weight: bold;padding-right: 15rpx;">0</text>访客</view>
					</view>
					
					<view v-if="details.remark" style="color: #999999;font-size: 25rpx;margin-top: 30rpx;font-weight: bold;">
						“{{details.remark}}”
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				details: {},
				// friend: [],
				mid: ''
			}
		},
		onLoad(options) {
			this.mid = options.id
			this.getData()
		},
		methods: {
			// 获取页面初始数据
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				service.auth(this, service.api.home.friendDetails, "GET", {
					friendID: this.mid
				}, (self, res) => {
					console.log(res)
					if(res.code==1){
						this.details=res.data;
					}
					// self.friend = res.data
				})
				uni.hideLoading();
			},
		}
	}
</script>

<style scoped>
	/* page {
		background-color: #F9F9F9;
	}

	image {
		display: block;
		background-color: #000;
	}

	.background {
		width: 100%;
		height: 266rpx;
		background-color: #4B7EFE;
	}

	.avatar-box {
		display: flex;
		background-color: #FFF;
		padding: 20rpx;
		margin: -60rpx 30rpx 0;
		border-radius: 20rpx;
	}

	.avatar-box image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.avatar-box view {
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #343434;
		font-weight: bold;
	}

	.avatar-box view .name {
		margin-bottom: 20rpx;
	} */
	.hr {
		height: 200rpx;
		background-color: #4B7EFE;
	}

	.user {
		margin: -80rpx 30rpx 0;
		background-color: white;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
	}

	.user_img {
		border: 6rpx solid white;
		margin: -50rpx 0 0;
		border-radius: 50%;
		overflow: hidden;
		width: 100rpx;
		height: 100rpx;
		background: white;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 15px 1px;
	}

	.user_img image {
		width: 100% !important;
		height: 100% !important;
	}

	.user_view {
		margin-top: 10rpx;
	}

	.user_view>view {
		/* margin-right: 20rpx; */
		margin: 0 15rpx;
	}

	.user_view>view:nth-child(1) {
		margin-left: 0;
	}

	.in_img {
		width: 35rpx;
		height: 35rpx;
		margin-left: 20rpx;
		/* border: 1px solid red; */
	}

	.in_img image {
		width: 100% !important;
		height: 100% !important;
	}

	.view_flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.dts {
		display: inline-flex;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		border: 3rpx solid #4B7EFE;
	}

	.sex_img {
		width: 25rpx;
		height: 25rpx;
	}

	.sex_img image {
		display: block !important;
		width: 100% !important;
		height: 100% !important;
	}


	/* 支付方式 */
	.way-box {
		/* border: 1px solid red; */
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
	}

	.way-box .title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.way-box .content {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.way-box .content .left {
		display: flex;
		align-items: center;
	}

	.way-box .content .left .icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.way-box .content .left .text {
		font-size: 28rpx;
		font-weight: bold;
	}

	.way-box .content .circle {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #D8D9DD;
		box-sizing: border-box;
	}

	.way-box .content .circle-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}
</style>
