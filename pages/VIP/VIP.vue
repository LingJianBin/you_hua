<template>
	<view class="container">

		<view class="top-box">
			<view class="top">
				<text>友话职说VIP</text>
				<text class="text" v-if="user.is_vip == 0">未开通</text>
				<text class="text" v-else>到期时间：{{user.vip_endtime}}</text>
			</view>
			<image class="btm" src="../../static/images/VIP/image19.png"></image>
		</view>

		<!-- 尊享会员权益 -->
		<view class="title-box">
			<image class="icon" src="../../static/images/VIP/image3.png"></image>
			<image class="text" src="../../static/images/VIP/image4.png"></image>
			<image class="icon" src="../../static/images/VIP/image2.png"></image>
		</view>
		<view class="content-box">
			<view class="content content-top">
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image6.png"></image>
					</view>
					<text class="text">加油享7折</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image8.png"></image>
					</view>
					<text class="text">发布悬赏任务</text>
					<text class="text">每天20条</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image9.png"></image>
					</view>
					<text class="text">领取悬赏任务</text>
					<text class="text">享受VIP价</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image17.png"></image>
					</view>
					<text class="text">悬赏任务</text>
					<text class="text">专属VIP发布价</text>
				</view>
			</view>
			<view class="content">
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image7.png"></image>
					</view>
					<text class="text">提现手续费</text>
					<text class="text">3.5%(专享)</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image8.png"></image>
					</view>
					<text class="text">无限添加好友</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image16.png"></image>
					</view>
					<text class="text">专属VIP客服</text>
				</view>
				<view class="icon-box">
					<view class="icon">
						<image class="img" src="../../static/images/VIP/image13.png"></image>
					</view>
					<text class="text">专属优惠功能</text>
				</view>
			</view>
		</view>

		<!-- 会员都在买 -->
		<view class="title-box">
			<image class="icon" src="../../static/images/VIP/image3.png"></image>
			<image class="text" src="../../static/images/VIP/image14.png"></image>
			<image class="icon" src="../../static/images/VIP/image2.png"></image>
		</view>
		<scroll-view :scroll-x="true" class="vip-box">
			<block v-for="(item, index) in timeList" :key="index">
				<view class="vip" :class="[currentIndex == index? 'vip-color' : '']" @click="selectPrice(index)">
					<view class="time">{{item.member_time}}个月</view>
					<view class="money">
						<text>￥</text>
						<text class="num">{{item.discount}}</text>
					</view>
					<view class="price">￥{{item.price}}</view>
					<view class="save">立省{{(item.price*100 - item.discount*100)/100}}元</view>
					<view class="recommend" v-if="item.is_tj > 0">推荐开通</view>
				</view>
			</block>
		</scroll-view>

		<!-- 支付方式 -->
		<view class="type-box" @click="selectType(1)">
			<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 1"></image>
			<view class="circle" v-else></view>
			<text>余额</text>
		</view>
		<view class="type-box" @click="selectType(2)">
			<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 2"></image>
			<view class="circle" v-else></view>
			<text>支付宝</text>
		</view>
		<view class="type-box" @click="selectType(3)">
			<image class="circle-icon" src="../../static/images/recharge/image4.png" v-if="wayStatus == 3"></image>
			<view class="circle" v-else></view>
			<text>微信</text>
		</view>

		<!-- 提交订单 -->
		<view class="submit-btn" @click="submitBtn">立即开通</view>

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
				user: {},
				timeList: [],
				currentIndex: 0,
				month: 0,
				wayStatus: 2
			}
		},
		onShow() {
			this.getData()
			this.user = uni.getStorageSync('user')
			this.user.vip_endtime = service.format(this.user.vip_endtime).substr(0, 10)
		},
		methods: {
			// 获取页面初始数据
			getData() {
				service.auth(this, service.api.home.vippage, "GET", {}, (self, res) => {
					self.timeList = res.data
					self.month = self.timeList[self.currentIndex].member_time;
				})
			},

			// 选择价格
			selectPrice(index) {
				this.currentIndex = index;
				this.month = this.timeList[index].member_time;
			},
			
			// 支付方式
			selectType(status) {
				if (status == 3) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});
					
					return;
				}
				
				this.wayStatus = status
			},

			// 立即开通
			submitBtn() {
				if (this.wayStatus == 1) {
					uni.showModal({
						title: '提示',
						content: '确认开通会员吗？',
						success: res => {
							if (res.confirm) {
								console.log('用户点击确定');
					
								uni.showLoading({
									title: '加载中...',
									mask: true
								});
					
								service.auth(this, service.api.home.zcvip, "POST", {
									type: this.wayStatus,
									month: this.month
								}, (self, res) => {
									if (res.code == 1) {
										uni.showToast({
											icon: 'none',
											title: '充值成功',
											mask: true
										})
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
										
					service.auth(this, service.api.home.zcvip, "POST", {
						type: this.wayStatus,
						month: this.month
					}, (self, res) => {
						if (res.code == 1) {
							uni.hideLoading();
							self.alipay_params = res.data.alipay_params
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: self.alipay_params,
								success: res => {
									uni.showToast({
										icon: 'none',
										title: '充值成功',
										mask: true
									})
						
									service.auth2(self, service.api.index.user, "GET", {}, (self, res) => {
										self.user = res.data.member
										self.user.vip_endtime = service.format(this.user.vip_endtime).substr(0, 10)
									
										uni.setStorageSync('user', res.data.member)
									})
								},
								fail: err => {
									console.log(err)
									uni.showToast({
										icon: 'none',
										title: '充值失败'
									})
								}
							})
						}
					})
				}
				
			},
		}
	}
</script>

<style>
	page {
		background-color: #171619;
	}

	image {
		display: block;
	}

	.top-box {
		width: 100%;
		height: 500rpx;
		background-image: url(../../static/images/VIP/image1.png);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.top-box .top {
		width: 484rpx;
		height: 222rpx;
		position: relative;
		top: 70rpx;
		background-image: url(../../static/images/VIP/image18.png);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		color: #2F2B29;
		font-weight: bold;
	}

	.top-box .top .text {
		font-size: 24rpx;
		color: #AB7223;
		font-weight: bold;
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.top-box .btm {
		width: 584rpx;
		height: 222rpx;
	}

	/* 尊享会员权益 */
	.title-box {
		padding: 40rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title-box .icon {
		width: 70rpx;
		height: 6rpx;
		margin: 0 20rpx;
	}

	.title-box .text {
		width: 200rpx;
		height: 32rpx;
	}

	.content-box {
		background-color: #24232A;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		margin: 0 30rpx;
	}

	.content-box .content {
		display: flex;
		justify-content: space-between;
	}

	.content-box .content-top {
		margin-bottom: 50rpx;
	}

	.content-box .content .icon-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content-box .content .icon-box .icon {
		width: 108rpx;
		height: 108rpx;
		background-image: url(../../static/images/VIP/image5.png);
		background-size: 108rpx 108rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.content-box .content .icon-box .icon .img {
		width: 54rpx;
		height: 46rpx;
	}

	.content-box .content .icon-box .text {
		font-size: 24rpx;
		color: #FAE2BF;
	}

	/* 会员都在买 */
	.vip-box {
		white-space: nowrap;
		animation: vip-box-show 1s;
		margin-left: 30rpx;
		width: calc(100% - 30rpx);
	}

	@keyframes vip-box-show {
		from {
			width: 0;
			opacity: 0;
		}

		to {
			width: calc(100% - 30rpx);
			opacity: 1;
		}
	}

	.vip-box .vip {
		width: 194rpx;
		padding: 30rpx 0;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;
		margin: 20rpx 20rpx 40rpx 0;
		position: relative;
		border: 6rpx solid transparent;
		background: #3B3E50;
		color: #EECEA7;
	}

	.vip-box .vip-color {
		border: 6rpx solid #BE9676;
		background: linear-gradient(#FBE7CF, #EFCFA9);
		color: #483123;
	}

	.vip-box .vip .time {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.vip-box .vip .money {
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.vip-box .vip .money .num {
		font-size: 40rpx;
		font-weight: bold;
	}

	.vip-box .vip .price {
		font-size: 28rpx;
		text-decoration: line-through;
		margin-bottom: 10rpx;
	}

	.vip-box .vip .save {
		font-size: 28rpx;
		font-weight: lighter;
	}

	.vip-box .vip .recommend {
		font-size: 20rpx;
		color: #FFF;
		font-weight: unset;
		font-weight: lighter;
		background-color: #BE9676;
		border-radius: 10rpx;
		padding: 6rpx 20rpx;
		position: absolute;
		top: -20rpx;
		left: -6rpx;
	}
	
	/* 支付方式 */
	.type-box {
		padding: 0 30rpx 20rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #FAE2BF;
	}
	
	.type-box .circle-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 16rpx;
	}
	
	.type-box .circle {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #D8D9DD;
		box-sizing: border-box;
		margin-right: 16rpx;
	}

	/* 提交订单 */
	.submit-btn {
		width: 90%;
		font-size: 48rpx;
		color: #3E3835;
		font-weight: bold;
		padding: 20rpx 0;
		border-radius: 50rpx;
		text-align: center;
		margin: 0 auto 50rpx;
		background: linear-gradient(to right, #DAB47E, #E7CAA4);
		margin-top: 20rpx;
	}

	.rule-box {
		margin: 0 30rpx 50rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>
