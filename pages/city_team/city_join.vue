<template>
	<view class="container">

		<image class="background" src="../../static/images/city_team/image1.png"></image>

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

		<image class="background-middle" src="../../static/images/city_team/image9.png"></image>

		<view class="input-box">
			<input class="login-input" v-model="realname" placeholder="请输入您的姓名" placeholder-style="color: #4C7EFE;" />
			<input class="login-input" type="number" v-model="account" placeholder="请输入您的电话" placeholder-style="color: #4C7EFE;"
			 maxlength="11" />
			<view class="login-input-box" @click="show = 1">
				<input v-model="city" placeholder="请选择您的城市" disabled placeholder-style="color: #4C7EFE;" />
				<view class="arrow"></view>
			</view>
			<view style="color: #4C7EFE;margin-bottom: 20rpx;">￥{{money}}</view>
			<view class="btn" @click="submitBtn">立即提交</view>
		</view>

		<view class="open-box">
			<view class="title">已开通城市</view>
			<view class="city-box">
				<view v-for="(item, index) in applycity" :key="index">{{item.city}}</view>
			</view>
		</view>

		<view class="rule-box">
			<text>1、续费将在该服务到期时自动生效，从绑定账号上扣除费用，不会与当前有效时间重叠。\n2、绑定的账号必须是实名制并且是本人的有效的，可随时在绑定账号那里取消续费功能。</text>
		</view>

		<!-- 遮罩层 -->
		<view class="mask" v-show="show == 1" @click="show = 0"></view>

		<view class="choice_city" :class="show == 0 ? 'mask_none' : show == 1 ? 'mask_show' : ''">
			<image src="../../static/images/reg/close.png" mode="widthFix" @click="show = 0"></image>
			<view class="ci_test1">请选择</view>
			<view class="ci_box">
				<scroll-view class="box_H" scroll-y scroll-top='0'>
					<view class="H_city_test">选择【城市】</view>
					<view class="H_city" v-for="(item, index) in opencity" :key="index" @click="choice_province(index)">
						{{item.city}}
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				show: 0,
				realname: '',
				account: '',
				city: '',
				city1: '',
				city2: '',
				opencity: [],
				applycity: [],
				money: 0,
				citybonus: {}
			}
		},
		onLoad() {
			service.auth(this, service.api.home.cityapplypage, "GET", {}, (self, res) => {
				self.opencity = res.data.opencity
				self.applycity = res.data.applycity
				self.citybonus = res.data.citybonus
			})
		},
		methods: {
			choice_province(index) { //选择城市
				this.city = this.opencity[index].province + this.opencity[index].city
				this.city1 = this.opencity[index].province
				this.city2 = this.opencity[index].city
				this.money = this.opencity[index].money
				this.show = 0
			},

			// 立即提交
			submitBtn() {
				let _this = this;

				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				if (_this.realname == '' || _this.account == '' || _this.account.length < 11 || _this.city == '') {
					uni.showToast({
						title: '请填写完整资料',
						icon: 'none'
					})

					return;
				}

				service.auth(_this, service.api.home.applycity, "POST", {
					realname: _this.realname,
					account: _this.account,
					province: _this.city1,
					city: _this.city2
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.info,
							mask: true
						});

						setTimeout(() => {
							uni.navigateBack()
						}, 500);
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

	image {
		display: block;
	}

	.background {
		width: 100%;
		height: 446rpx;
	}

	.card-box {
		background-color: #FFF;
		padding: 20rpx 60rpx;
		margin: -140rpx 30rpx 0;
		border-radius: 20rpx;
		position: relative;
		z-index: 999;
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

	.background-middle {
		width: calc(100% - 60rpx);
		height: 180rpx;
		margin: 20rpx auto 0;
	}

	.input-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFF;
		padding: 40rpx 80rpx;
		margin: 20rpx 30rpx 0;
		border-radius: 20rpx;
	}

	.input-box .login-input {
		width: 100%;
		height: 80rpx;
		border-radius: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border: 2rpx solid #ccc;
		margin-bottom: 20rpx;
		color: #666;
	}

	.input-box .login-input-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 84rpx;
		border-radius: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border: 2rpx solid #ccc;
		margin-bottom: 20rpx;
		color: #666;
	}

	.input-box .login-input-box .arrow {
		border-top: 12rpx solid #4C7EFE;
		border-right: 12rpx solid transparent;
		border-left: 12rpx solid transparent;
	}

	.input-box .btn {
		background-color: #4C7EFE;
		color: #FFF;
		padding: 16rpx 50rpx;
		border-radius: 20rpx;
	}

	.open-box {
		margin: 20rpx 30rpx 0;
		font-size: 24rpx;
		color: #666;
	}

	.open-box .title {
		margin-bottom: 10rpx;
	}

	.open-box .city-box {
		display: flex;
		flex-wrap: wrap;
	}

	.open-box .city-box view {
		padding: 0 10rpx;
		border: 2rpx solid #4C7EFE;
		border-radius: 6rpx;
		margin: 0 10rpx 10rpx 0;
	}

	.rule-box {
		margin: 30rpx;
		font-size: 24rpx;
		color: #999;
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
