<template>
	<view class="friendGet">

		<!-- 列表 -->
		<view style="margin: 0 28rpx 0;">

			<view class="box" style="" v-for="(item,index) in list" :key="index">
				<view class="box_flex">
					<view class="box_flex_user">
						<image :src="item.avatar" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;"></image>
					</view>
					<view style="padding-left: 10rpx;padding-top: 70rpx;">
						<view style="font-size: 28rpx;color: #333333;margin-bottom: 10rpx;">好友请求：{{item.nickname}}</view>
						<view style="font-size: 25rpx;color: #999999;margin-bottom: 10rpx;" v-if="item.profession">{{item.profession}}</view>
						<view style="display: flex;justify-content: flex-start;align-items: center;font-size: 28rpx;color: white;flex-wrap: wrap;">
							<view style="background-color: #4B7EFE;padding: 5rpx 10rpx;border-radius: 5rpx;margin-right: 10rpx;height: 30rpx;line-height: 30rpx;font-size: 24rpx;"
							 v-if="item.workcity">{{item.workcity}}</view>
							<!-- <view style="background-color: #4B7EFE;padding: 0 10rpx;border-radius: 5rpx;margin-right: 10rpx;height: 40rpx;line-height: 40rpx;">9个共同好友</view> -->
						</view>
					</view>
				</view>

				<view class="box_flex">
					<view @click="friendApplySubmit(item,-1)" style="width: 75rpx;height: 75rpx;border: 2.8rpx solid #999999;border-radius: 50%;display: flex;align-items: center;justify-content: center;">
						<view class="">
							<image src="/static/images/home/cuo.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;display: block;"></image>
						</view>
					</view>
					<view @click="friendApplySubmit(item,1)" style="width: 75rpx;height: 75rpx;border: 2.8rpx solid #999999;border-radius: 50%;display: flex;align-items: center;justify-content: center;margin-left: 34rpx;">
						<view class="">
							<image src="/static/images/home/dui.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;display: block;"></image>
						</view>
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
				list: []
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				service.auth(this, service.api.setting.applyList, "GET", {}, (self, res) => {
					console.log(res);
					if (res.code == 1) {
						if (res.data.list.length == 0) {
							uni.showLoading({
								title: '暂无好友请求',
								mask: true,
								icon: 'none'
							});
						} else {
							this.list = res.data.list;
						}
					} else {
						uni.showLoading({
							title: res.info,
							mask: true,
							icon: 'none'
						});
					}

					setTimeout(() => {
						uni.hideLoading();
					}, 2000);
				})
			},

			friendApplySubmit(item, e) {
				service.auth(this, service.api.setting.disposeApply, "GET", {
					id: item.id,
					fmid: item.fmid,
					status: e
				}, (self, res) => {
					if (res.code == 1) {
						this.getData();
					} else {
						uni.showLoading({
							title: res.info,
							mask: true,
							icon: 'none'
						});
					}
				})
			},
		}
	}
</script>

<style scoped>
	.box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx 20rpx;
	}

	.box_flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
