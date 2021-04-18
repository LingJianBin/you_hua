<template>
	<view class="container">

		<view class="background">
			<image src="../../static/images/city_team/image10.png"></image>
		</view>

		<image class="avatar" :src="user.avatar"></image>

		<view class="card-box">
			<view class="box box-top">
				<view class="img-box">
					<image src="../../static/images/city_team/image5.png"></image>
					<text>{{citybonus.mining_zcsj_citychange}}</text>
				</view>
				<view class="img-box">
					<image src="../../static/images/city_team/image6.png"></image>
					<text>{{citybonus.mining_zcsj_citytask}}</text>
				</view>
			</view>
			<view class="box">
				<view class="img-box">
					<image src="../../static/images/city_team/image7.png"></image>
					<text>{{citybonus.mining_zcsj_cityprofess}}</text>
				</view>
				<view class="img-box">
					<image src="../../static/images/city_team/image8.png"></image>
					<text>{{citybonus.mining_zcsj_citybuyvip}}</text>
				</view>
			</view>
		</view>

		<view class="rule-box">
			<text>1、续费将在该服务到期时自动生效，从绑定账号上扣除费用，不会与当前有效时间重叠。\n2、绑定的账号必须是实名制并且是本人的有效的，可随时在绑定账号那里取消续费功能。</text>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				citybonus: {}
			}
		},
		onShow() {
			service.auth(this, service.api.home.cityapplypage, "GET", {}, (self, res) => {
				self.citybonus = res.data.citybonus
			})

			service.auth(this, service.api.home.fhlist, "GET", {}, (self, res) => {

			})
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	image {
		display: block;
	}

	.background {
		width: 100%;
		height: 446rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(../../static/images/city_team/image1.png);
		background-size: 100% 100%;
	}

	.background image {
		width: 600rpx;
		height: 64rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin: -60rpx auto 0;
	}

	.card-box {
		background-color: #FFF;
		padding: 20rpx 60rpx;
		margin: 60rpx 30rpx;
		border-radius: 20rpx;
	}

	.card-box .box {
		display: flex;
		justify-content: space-between;
	}

	.card-box .box-top {
		margin-bottom: 20rpx;
	}

	.card-box .box .img-box {
		width: 48%;
		height: 112rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.card-box .box .img-box image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.card-box .box .img-box text {
		position: absolute;
		left: 50rpx;
		bottom: 14rpx;
		font-size: 24rpx;
		color: #FFF;
	}

	.rule-box {
		margin: 0 30rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>
