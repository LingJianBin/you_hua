<template>
	<view class="contacts">

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

					<!-- <view v-if="details.profession" class="view_flex dts" style="justify-content: space-between;max-width: 200rpx;">
						<view class="sex_img">
							<image src="/static/images/friend/zhiye.png" mode="scaleToFill"></image>
						</view>
						<view style="font-size: 22rpx;color: #4B7EFE;padding-left: 10rpx;flex: 1;text-overflow: ellipsis;white-space: unset;display: -webkit-box;overflow: hidden;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{details.profession}}</view>
					</view> -->

				</view>


				<view style="color: #4B7EFE;font-size: 26rpx;margin-top: 10rpx;">
					我的置顶: {{details.hy_zd==0?'无':'有'}}
				</view>

				<view v-if="details.hy_zd!=0" style="color: #4B7EFE;font-size: 30rpx;margin-top: 10rpx;">
					我的到期时间: {{details.hy_endtime}}
				</view>

			</view>

		</view>

		<!-- 置顶服务 -->
		<view class="fuwu" style="margin: 30rpx 30rpx 50rpx;">

			<view style="display: flex;justify-content: flex-start;align-items: center;">
				<view style="background-color: #4B7EFE;width: 7.5rpx;height: 35rpx;"></view>
				<view style="font-size: 30rpx;color: black;padding-left: 20rpx;font-weight: bold;">置顶服务</view>
			</view>

			<view style="padding-top: 30rpx;">
				<view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
						<view id="demo1" :class="indexs==index?'childSelect':''" class="scroll-view-item_H uni-bg-red" :style="{backgroundImage:'url('+item.image+')'}"
						 v-for="(item,index) in list" :key="index" :data-index="item.index" @click="childs(index,item)">
							<view style="height: 150rpx;align-items: center;display: flex;">
								<view style="display: inline-block;color: white;text-align: left;padding: 0 50rpx 0 20rpx;">
									<view style="font-size: 28rpx;">置顶{{item.toptime}}个小时</view>
									<view style="font-size: 30rpx;font-weight: bold;">{{item.discount}}元</view>
									<view style="font-size: 25rpx;">原价:<text style="color: rgb(70 68 68);text-decoration:line-through;padding-left: 15rpx;">{{item.topmoney}}元</text></view>
								</view>
							</view>

							<view style="position: absolute;top: 0;right: 0;" v-if="item.is_tj==1">
								<view class="tuijian">
									<image src="/static/images/friend/tuijian.png" mode="aspectFit"></image>
								</view>
							</view>

						</view>
					</scroll-view>
				</view>
			</view>

			<view style="font-size: 28rpx;color: rgb(167 167 167);line-height: 40rpx;padding: 50rpx 0 0;">
				<view>1:续费将在该服务到期时自动生效，从绑定账号上扣除费用，不会与当前有效时间重叠。</view>
				<view>1:绑定的账号必须是实名制并且是本人的有效的。可随时在绑定账号那里取消续费功能。</view>
			</view>

		</view>


		<!-- 支付方式 -->
		<view class="way-box">
			<view style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 30rpx;">
				<view style="background-color: #4B7EFE;width: 7.5rpx;height: 35rpx;"></view>
				<view style="font-size: 30rpx;color: black;padding-left: 20rpx;font-weight: bold;">支付方式</view>
			</view>
			<view class="content" @click="selectWay(1)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/friend/mony.png"></image>
					<text class="text">余额</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 1"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(2)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/friend/yc.png"></image>
					<text class="text">YC</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 2"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(3)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image1.png"></image>
					<text class="text">支付宝</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 3"></image>
				<view class="circle" v-else></view>
			</view>
			<view class="content" @click="selectWay(4)" hover-class="button-hover">
				<view class="left">
					<image class="icon" mode="aspectFit" src="../../static/images/recharge/image2.png"></image>
					<text class="text">微信</text>
				</view>
				<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 4"></image>
				<view class="circle" v-else></view>
			</view>

		</view>

		<!-- 立即开通 -->
		<view style="padding-bottom: 30rpx;">
			<view class="btn-box" @click="rechargeBtn">确认</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	export default {
		data() {
			return {
				details: {},
				list: [],
				old: {
					scrollTop: 0
				},
				indexs: 0,
				wayStatus: 1,
				toptime: null,
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {

				service.auth(this, service.api.me.myContactsTopping, "GET", {}, (self, res) => {
					// console.log(res)
					if (res.code == 1) {
						this.details = res.data;
					}
				})

				service.auth(this, service.api.me.contactsPrice, "GET", {}, (self, res) => {
					// console.log(res)
					if (res.code == 1) {
						this.list = res.data;
						this.toptime = this.list[0].toptime;
					}
				})
				uni.hideLoading()
			},
			rechargeBtn() {
				uni.showLoading({
					title: '加载中'
				})
				let wayStatus = this.wayStatus; //支付方式
				let toptime = this.toptime; //购买时长

				// console.log(wayStatus)
				// console.log(toptime)

				if (wayStatus == null) {
					uni.showToast({
						title: '请选择支付方式',
						icon: 'none',
						duration: 2000
					})
					return
				}

				service.auth(this, service.api.me.purchaseContacts, "POST", {
					type: wayStatus,
					toptime: toptime
				}, (self, res) => {
					// console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none',
						// duration:2000
					})
					if (res.code == 1) {
						// this.wayStatus = null;
						this.toptime = null;
						this.getData();
					}
				})

			},
			childs(index, item) {
				// console.log(index);
				// console.log(item);
				this.indexs = index;
				this.toptime = item.toptime;
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 选择到账方式
			selectWay(status) {
				let _this = this;
				_this.wayStatus = status;
			},
		}
	}
</script>

<style scoped>
	/* scroll-view滑动 */
	/deep/ .uni-scroll-view-content {
		display: flex !important;
		align-items: center !important;
	}

	.childSelect {
		transform-origin: 50% 50%;
		transform: scale(1.1);
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 170rpx;
		display: flex;
		align-items: center;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		position: relative;
		transition: 0.2s;
		display: inline-block;
		/* min-width: 260rpx; */
		height: 150rpx;
		border-radius: 20rpx;
		/* overflow: hidden; */
		/* box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, 0.08); */
		/* margin: 0 25rpx; */
		margin-left: 20rpx;
	}

	.scroll-view-item_H:last-child {
		/* margin: 0; */
		margin-right: 20rpx;
	}

	.uni-bg-red {

		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.uni-bg-green {
		background-image: url('../../static/images/friend/dt_2.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.uni-bg-blue {
		background-image: url('../../static/images/friend/dt_3.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}


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

	/* 立即开通 */
	.btn-box {
		background-color: #4B7EFE;
		padding: 20rpx;
		border-radius: 60rpx;
		font-size: 40rpx;
		color: #FFF;
		font-weight: bold;
		margin: 50rpx 50rpx 50rpx;
		text-align: center;
	}

	.button-hover {
		background-color: white;
	}

	.tuijian {
		width: 60rpx;
		height: 60rpx;

	}

	.tuijian image {
		width: 100% !important;
		height: 100% !important;
	}
</style>
