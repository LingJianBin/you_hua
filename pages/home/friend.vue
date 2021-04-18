<template>
	<view class="container" style="background-color: #ffffff;">

		<!-- 顶部标题 -->
		<view class="label-box">
			<view class="top-box">
				<block v-for="(item, index) in titleList" :key="index">
					<text class="title" :class="[titleColorIndex == index ? 'title-color' : '']" @click="selectTitle(index)">{{item}}</text>
				</block>
			</view>
		</view>

		<!-- 我的职友/人脉搜索 -->
		<!-- 样式1 -->
		<!-- <view class="app_flex" style="padding: 20rpx 30rpx 0;">
			<view class="app_flex app_flex_box" @click="myFriends">
				<view class="app_flex_viewImg">
					<image src="/static/images/home/youyo.png" mode="aspectFit"></image>
				</view>
				<view class="app_flex_viewText">我的职友</view>
			</view>
			<view class="app_flex app_flex_box">
				<view class="app_flex_viewImg">
					<image src="/static/images/home/youySeac.png" mode="aspectFit"></image>
				</view>
				<view class="app_flex_viewText">人脉搜索</view>
			</view>
		</view> -->
		<!-- 样式2 -->
		<view class="city_list">

			<view>
				<view class="city_list_li" @click="myFriends">
					<view class="app_flex_viewImg">
						<image src="/static/images/home/youyo.png" mode="aspectFit"></image>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="app_flex_text">我的职友</view>
						<view class="city_list_li_icon">
							<image src="/static/images/friend/jianto.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>

			<view>
				<view class="city_list_li" @click="renmaisousuo">
					<view class="app_flex_viewImg">
						<image src="/static/images/friend/renmai.png" mode="aspectFit"></image>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="app_flex_text">人脉搜索</view>
						<view class="city_list_li_icon">
							<image src="/static/images/friend/jianto.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>

			<view style="display: inline-grid;">
				<!-- <view class="city_list_dt" style="border: 1px solid red;display: flex;flex-direction: column"> -->

				<view @click="wodexinxi" style="border-radius: 20rpx;overflow: hidden;box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, 0.08);margin-bottom: 10rpx;display: flex;justify-content: space-between;align-items: center;padding: 0 20rpx;">
					<view class="">
						<image src="/static/images/friend/me.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
					</view>
					<view class="app_flex_text" style="text-align: center;flex: 1;">我的信息</view>
					<view class="city_list_li_icon" style="margin: 0;">
						<image src="/static/images/friend/jianto.png" mode="aspectFit"></image>
					</view>
				</view>

				<view @click="contacts" style="border-radius: 20rpx;overflow: hidden;box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, 0.08);margin-top: 10rpx;display: flex;justify-content: space-between;align-items: center;padding: 0 20rpx;">
					<view class="">
						<image src="/static/images/friend/topping.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
					</view>
					<view class="app_flex_text" style="text-align: center;flex: 1;">人脉置顶</view>
					<view class="city_list_li_icon" style="margin: 0;">
						<image src="/static/images/friend/jianto.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- </view> -->
			</view>

		</view>

		<!-- 待处理请求 -->
		<!-- <view class="title-box">待处理请求</view>
		<view class="request-box" v-for="(item, index) in applyList" :key="index">
			<view class="left">
				<image class="avatar" :src="item.avatar"></image>
				<view class="text-box">
					<text class="one">好友请求：{{item.nickname}}</text>
					<text class="two">广州电子公司经理</text>
					<text class="three">同城</text>
				</view>
			</view>
			<view class="right">
				<view class="top" @click="friendApplySubmit(item.id, item.fmid, 1)">接受</view>
				<view class="btm" @click="friendApplySubmit(item.id, item.fmid, -1)">拒绝</view>
			</view>
		</view> -->
		<!-- 待处理请求 -->
		<view class="stay">

			<view class="stay_bt" style="">
				<view style="color: #333333;font-size: 30rpx;">待处理请求</view>
				<view class="stay_bt_title" @click="friendGet" style="">
					<view style="font-size: 25rpx;color: #999999;">全部{{count==''?'0':count}}个请求</view>
					<view class="">
						<image src="/static/images/setting/arrow.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>
			</view>

			<!-- <view class="stay_box" style="" v-for="(item, index) in applyList" :key="index"> -->
			<view class="stay_box" style="" v-if="count>0">
				<view class="stay_box_flex" style="">
					<view class="">
						<image :src="applyList.avatar" mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 50%;overflow: hidden;"></image>
					</view>
					<view style="padding-left: 10rpx;">
						<view style="font-size: 28rpx;color: #333333;margin-bottom: 10rpx;">好友请求：{{applyList.nickname}}</view>
						<view style="font-size: 25rpx;color: #999999;margin-bottom: 10rpx;" v-if="applyList.profession">{{applyList.profession}}</view>
						<view style="display: flex;justify-content: flex-start;align-items: center;font-size: 28rpx;color: white;flex-wrap: wrap;">
							<view style="background-color: #4B7EFE;padding: 5rpx 10rpx;border-radius: 5rpx;margin-right: 10rpx;height: 30rpx;line-height: 30rpx;font-size: 24rpx;"
							 v-if="applyList.workcity">{{applyList.workcity}}</view>
							<!-- <view style="background-color: #4B7EFE;padding: 0 10rpx;border-radius: 5rpx;margin-right: 10rpx;height: 40rpx;line-height: 40rpx;">9个共同好友</view> -->
						</view>
					</view>
				</view>

				<view class="stay_box_flex">
					<view @click="friendApplySubmit(applyList,-1)" style="width: 75rpx;height: 75rpx;border: 2.8rpx solid #999999;border-radius: 50%;display: flex;align-items: center;justify-content: center;">
						<view class="">
							<image src="/static/images/home/cuo.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;display: block;"></image>
						</view>
					</view>
					<view @click="friendApplySubmit(applyList,1)" style="width: 75rpx;height: 75rpx;border: 2.8rpx solid #999999;border-radius: 50%;display: flex;align-items: center;justify-content: center;margin-left: 34rpx;">
						<view class="">
							<image src="/static/images/home/dui.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;display: block;"></image>
						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 好友列表 -->
		<!-- <view class="title-box">好友列表</view>
		<view class="request-box" v-for="(item, index) in friendList" :key="index" @click="jump('/pages/detail/friend_detail?id=' + item.mid)">
			<view class="left">
				<image class="avatar" :src="item.avatar"></image>
				<view class="text-box">
					<text class="one">{{item.nickname}}</text>
					<text class="two">湖北工业大学研究院</text>
					<text class="three">武汉</text>
				</view>
			</view>
			<view class="middle-text">学生</view>
			<view class="right-btn" @click="jump('/pages/detail/friend_detail?id=' + item.mid)">详情</view>
		</view> -->



		<!-- 推荐 -->
		<view class="recommend" style="">
			<view style="" v-for="(item,index) in itls" :key="index" :class="indexRec==index?'recommendSelct':'recommendDef'"
			 @click="childRecommend(index)">{{item.name}}</view>
		</view>
		<view class="request-box" v-for="(item, index) in recommendFriends" :key="index">
			<view class="left" style="flex: 1;">
				<image class="avatar" :src="item.avatar" @click="aaa(item.mid)"></image>
				<view class="text-box" style="flex: 1;">
					<view style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 10rpx;">
						<view style="flex: 1;" @click="aaa(item.mid)">
							<view class="one">{{item.nickname}}</view>
							<view class="two" v-if="item.profession">{{item.profession}}
								<!-- <text class="middle-text">副教授</text> -->
							</view>
						</view>
						<view style="display: flex;justify-content: flex-end;align-items: flex-end;">
							<view @click="addFriends(item.mid)" style="background-color: #4B7EFE;border-radius: 10rpx;color: white;font-size: 28rpx;padding: 6rpx 20rpx;display: flex;justify-self: center;align-items: center;">
								<view style="padding-right: 5rpx;">+</view>
								<view>好友</view>
							</view>
						</view>
					</view>
					<text @click="aaa(item.mid)" class="three" v-if="item.workcity">{{item.workcity}}</text>
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
				indexRec: 0,
				itls: [{
						name: '推荐'
					},
					{
						name: '同城'
					},
					{
						name: '同行'
					},
					{
						name: '同事'
					}
				],
				titleList: ['人脉', '圈子', '协会'],
				titleColorIndex: 0,
				friendList: [],
				applyList: {},
				recommendFriends: [],
				count: '',
			}
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
		},
		methods: {
			// 获取页面初始数据
			getData() {
				let _this = this;

				// 好友请求
				service.auth(_this, service.api.setting.applyListPart, "GET", {}, (self, res) => {
					if (res.code == 1) {
						self.count = res.data.count
						self.applyList = res.data.list
					}
				})

				// 好友推荐
				service.auth(_this, service.api.home.recommendFriends, "GET", {}, (self, res) => {
					self.recommendFriends = res.data.list

					uni.stopPullDownRefresh();
				})
			},

			childRecommend(index) {
				if (index == 0) {
					this.indexRec = index;
				} else {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})
				}
			},

			aaa(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/detail/friend_detail?id=' + id
				})
			},

			// 处理好友申请（-1为拒绝，1为接受）
			friendApplySubmit(item, e) {
				let _this = this;
				// console.log(item)
				// console.log(e)
				service.auth(this, service.api.setting.disposeApply, "GET", {
					id: item.id,
					fmid: item.fmid,
					status: e
				}, (self, res) => {
					// console.log(res);
					if (res.code == 1) {
						_this.getData();
					}
					uni.showLoading({
						title: res.info,
						mask: true,
						icon: 'none'
					});
				})
			},


			// 添加好友
			addFriends(id) {
				// console.log(id)
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				service.auth(this, service.api.home.friendsApply, "POST", {
					friendid: id
				}, (self, res) => {
					if (res.code == 1) {
						// uni.showToast({
						// 	title: '已发送申请',
						// 	icon: 'none'
						// })
						uni.hideLoading();
						self.getData()
					}
					uni.showLoading({
						title: res.info,
						mask: true,
						icon: 'none'
					});
				})
			},

			// 删除好友
			deleteFriend() {
				service.auth(this, service.api.home.deleteFriend, "GET", {}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						})

						self.getData()
					}
				})
			},

			// 跳转页面
			jump(url) {
				uni.navigateTo({
					url
				})
			},

			// 点击标题
			selectTitle(index) {
				if (index == 1 || index == 2) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});

					return;
				}

				this.titleColorIndex = index;
			},
			friendGet() {
				uni.navigateTo({
					url: '../detail/friend_request'
				})
			},
			myFriends() {
				uni.navigateTo({
					url: '../my/myFriends'
				})
			},
			contacts() {
				uni.navigateTo({
					url: '../me/contacts'
				})
			},
			renmaisousuo() {
				uni.showLoading({
					title: '敬请期待',
					icon: 'none'
				})
			},
			wodexinxi() {
				uni.navigateTo({
					url: '../my/user_info'
				})
			}
		}
	}
</script>

<style>
	/* 我的职友/人脉搜索 */
	.city_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}

	.city_list_li {
		padding: 28rpx;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, .1);
	}

	.city_list>view {
		width: 33.33%;
		box-sizing: border-box;
		padding: 0 15rpx;
	}

	.app_flex_viewImg {
		padding: 0 0 28rpx;
	}

	.app_flex_viewImg image {
		width: 45rpx;
		height: 45rpx;
	}

	.city_list_li_icon {
		width: 20rpx;
		height: 20rpx;
		margin-left: 20rpx;
	}

	.city_list_li_icon image {
		width: 100% !important;
		height: 100% !important;

	}

	.app_flex_text {
		color: #666666;
		font-size: 25rpx;
		font-weight: bold;
	}

	.city_list_dt {
		/* border: 1px solid red;
		flex: 1;
		align-items: flex-end; */
	}

	/* .app_flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.app_flex_box {
		background-color: white;
		border-radius: 10rpx;
		box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, 0.08);
	}

	.app_flex_viewImg {
		padding: 14rpx 14rpx 14rpx 20rpx;
	}

	.app_flex_viewImg image {
		width: 60rpx;
		height: 72rpx;
	}

	.app_flex_viewText {
		color: #4B7EFE;
		font-size: 35rpx;
		font-weight: bold;
		padding: 0 50rpx 0 10rpx;
	} */

	image {
		display: block;
	}

	/* .container {
		padding: 0 30rpx;
	} */

	/* 顶部标题 */
	.label-box {
		padding: 20rpx 30rpx;
		background-color: #FFF;
		position: sticky;
		top: 0;
		z-index: 999;
		/* border-bottom: 1rpx solid #F4F4F4; */
	}

	.label-box .top-box {
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
	}

	.label-box .top-box .title {
		margin-right: 30rpx;
	}

	.label-box .top-box .title-color {
		font-size: 40rpx;
		color: #000;
	}

	/* 待处理请求 */
	.title-box {
		font-size: 32rpx;
		color: #343434;
		font-weight: bold;
		padding: 40rpx 0 20rpx;
	}

	.stay {
		margin: 20rpx 30rpx 30rpx;
	}

	.stay_bt {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-items: center;
		padding: 20rpx 0 40rpx;
	}

	.stay_bt_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-items: center;
	}

	.stay_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx 20rpx;
	}

	.stay_box_flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.request-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		/* box-shadow: 0 0 10rpx #C8C7CC; */
		margin-bottom: 20rpx;
	}

	.request-box .left {
		display: flex;
		align-items: center;
	}

	.request-box .left .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.request-box .left .text-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 28rpx;
		color: #343434;
	}

	.request-box .left .text-box .one {
		/* margin-bottom: 10rpx; */
	}

	.request-box .left .text-box .two {
		color: #9A9A9A;
		/* margin-bottom: 10rpx; */
	}

	.request-box .left .text-box .three {
		color: white;
		border-radius: 5rpx;
		/* color: #9A9A9A; */
		background-color: #4B7EFE;
		padding: 0 10rpx;
	}

	.request-box .right {
		font-size: 28rpx;
		color: #FFF;
	}

	.request-box .right view {
		padding: 4rpx 20rpx;
		border-radius: 10rpx;
	}

	.request-box .right .top {
		background-color: #4C7EFE;
		margin-bottom: 20rpx;
	}

	.request-box .right .btm {
		background-color: #FF8426;
	}

	/* 推荐 */
	.middle-text {
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #9A9A9A;
	}

	.request-box .right-btn {
		font-size: 28rpx;
		color: #FFF;
		padding: 4rpx 20rpx;
		border-radius: 10rpx;
		background-color: #4C7EFE;
	}

	.request-box .right-btn .icon {
		margin-right: 10rpx;
	}

	.recommend {
		border-bottom: 1px solid rgb(195 195 195);
		margin-bottom: 20rpx;
		/* padding: 0 30rpx; */
	}

	.recommend>view {
		display: inline-block;
		padding: 0 10rpx 20rpx;
		margin-right: 30rpx;
	}

	.recommend>view:nth-child(1) {
		margin-left: 30rpx;
	}

	.recommendSelct {
		color: #373737 !important;
		border-bottom: 4rpx solid #4B7EFE !important;
	}

	.recommendDef {
		color: #777777;
	}
</style>
