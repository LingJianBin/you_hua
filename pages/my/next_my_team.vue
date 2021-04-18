<template>
	<view class="container">

		<!-- 个人信息 -->
		<view class="background">
			<view class="user-box">
				<view class="top-box">
					<image class="avatar" :src="user.avatar"></image>
					<view class="right-box">
						<view class="name-box">
							<text class="name">{{user.nickname}}</text>
							<image class="icon" src="../../static/images/my_team/image1.png" v-if="user.is_vip > 0"></image>
						</view>
						<view class="rank-box">
							<view class="left-rank-box">
								<image class="icon" src="../../static/images/my_team/image2.png"></image>
								<view class="level-box">
									<image class="level-icon" src="../../static/images/my_team/image4.png"></image>
									<text class="level">{{user.xjlevelinfo.name}}</text>
								</view>
							</view>
							<view class="right-rank-box">
								<!-- <image class="icon" src="../../static/images/my_team/image3.png"></image> -->
								<text class="level">{{user.personlevel.name}}</text>
							</view>
						</view>
						<view class="id-box">
							<text class="id">上级手机号</text>
							<text v-if="teamData.parent_account == null">无</text>
							<text v-else>{{teamData.parent_account}}</text>
						</view>
					</view>
				</view>
				<view class="bottom-box">
					<view class="box">
						<view class="num-box top">
							<text class="num">{{uplevel.max_active}}</text>
							<text class="text">大区贡献值</text>
						</view>
						<view class="num-box">
							<text class="num">{{uplevel.active}}</text>
							<text class="text">个人贡献值</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{uplevel.min_active}}</text>
							<text class="text">小区贡献值</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{uplevel.ztactivenum}}</text>
							<text class="text">活跃直推人数</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<block v-if="(nextData.mylevel + 1) <= nextData.list[nextData.list.length - 1].id">
			<!-- 升级下一等级 -->
			<view class="user-box next-box">
				<view class="title">
					<view class="text">升级下一等级：</view>
					<view class="left-rank-box">
						<image class="icon" src="../../static/images/my_team/image2.png"></image>
						<view class="level-box">
							<image class="level-icon" src="../../static/images/my_team/image4.png"></image>
							<block v-for="(item, index) in nextData.list" :key="index">
								<text class="level" v-if="(nextData.mylevel + 1) == item.id">{{item.name}}</text>
							</block>
						</view>
					</view>
				</view>
				<view class="bottom-box">
					<view class="box">
						<view class="num-box top">
							<text class="num">{{nextData.list[nextData.mylevel].max_active}}</text>
							<text class="text">大区贡献值</text>
							<text class="status" v-if="uplevel.max_active >= nextData.list[nextData.mylevel].max_active">已达到</text>
							<text class="status fail-status" v-else>未达到</text>
						</view>
						<view class="num-box">
							<text class="num">{{nextData.list[nextData.mylevel].person_active}}</text>
							<text class="text">个人贡献值</text>
							<text class="status" v-if="uplevel.active >= nextData.list[nextData.mylevel].person_active">已达到</text>
							<text class="status fail-status" v-else>未达到</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{nextData.list[nextData.mylevel].min_active}}</text>
							<text class="text">小区贡献值</text>
							<text class="status" v-if="uplevel.min_active >= nextData.list[nextData.mylevel].min_active">已达到</text>
							<text class="status fail-status" v-else>未达到</text>
						</view>
						<view class="num-box">
							<text class="num">-</text>
							<text class="text">小区星级达人</text>
							<text class="status" v-if="xjnumarr[nextData.mylevel + 1] > 0">已达到</text>
							<text class="status fail-status" v-else>未达到</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{nextData.list[nextData.mylevel].zt_active_num}}</text>
							<text class="text">活跃直推人数</text>
							<text class="status" v-if="uplevel.ztactivenum >= nextData.list[nextData.mylevel].zt_active_num">已达到</text>
							<text class="status fail-status" v-else>未达到</text>
						</view>
					</view>
				</view>
			</view>
			<view class="btn" @click="nextBtn">立即升级</view>
		</block>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				teamData: {},
				nextData: {},
				uplevel: {},
				xjnumarr: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 获取页面初始数据
			getData() {
				service.auth(this, service.api.home.TeamFriendsTow, "GET", {}, (self, res) => {
					self.teamData = res.data
				})

				service.auth(this, service.api.taskPackage.xjlevelpage, "GET", {}, (self, res) => {
					self.nextData = res.data
					self.uplevel = res.data.uplevel
					self.xjnumarr = res.data.uplevel.xjnumarr
				})
			},

			// 升级星级达人
			nextBtn() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth(this, service.api.taskPackage.xjlevelup, "POST", {
					xjlevel: this.nextData.mylevel + 1
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '升级成功',
							icon: 'none'
						});

						service.auth2(self, service.api.index.user, "GET", {}, (self, res) => {
							self.user = res.data.member
						})
						self.getData()
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

	.container {
		margin-bottom: 200rpx;
	}

	/* 个人信息 */
	.background {
		background-color: #4B7EFE;
		padding: 0 30rpx;
	}

	.user-box {
		background-color: #FFF;
		border-radius: 20rpx;
		position: relative;
		top: 70rpx;
		margin-bottom: 70rpx;
	}

	.user-box .top-box {
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx #C8C7CC;
		display: flex;
		align-items: center;
	}

	.user-box .top-box .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.user-box .top-box .right-box .name-box {
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}

	.user-box .top-box .right-box .name-box .name {
		font-size: 36rpx;
		color: #333;
		font-weight: bold;
		margin-right: 20rpx;
	}

	.user-box .top-box .right-box .name-box .icon {
		width: 30rpx;
		height: 30rpx;
	}

	.user-box .top-box .right-box .rank-box {
		display: flex;
		margin-bottom: 14rpx;
	}

	.user-box .top-box .right-box .rank-box .left-rank-box {
		width: 140rpx;
		height: 40rpx;
		position: relative;
		margin-right: 20rpx;
	}

	.user-box .top-box .right-box .rank-box .left-rank-box .icon {
		width: 100%;
		height: 100%;
	}

	.user-box .top-box .right-box .rank-box .left-rank-box .level-box {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.user-box .top-box .right-box .rank-box .left-rank-box .level-box .level-icon {
		width: 22rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}

	.user-box .top-box .right-box .rank-box .left-rank-box .level-box .level {
		font-size: 24rpx;
		color: #FFF;
	}

	.user-box .top-box .right-box .rank-box .right-rank-box {
		width: 70rpx;
		height: 40rpx;
		position: relative;
	}

	.user-box .top-box .right-box .rank-box .right-rank-box .icon {
		width: 100%;
		height: 100%;
	}

	.user-box .top-box .right-box .rank-box .right-rank-box .level {
		background-image: linear-gradient(to right, #FFB632, #FD950F);
		padding: 0 8rpx;
		border-radius: 10rpx;
		white-space: nowrap;
		text-align: center;
		font-size: 24rpx;
		color: #FFF;
		line-height: 40rpx;
		position: absolute;
		top: 0;
	}

	.user-box .top-box .right-box .id-box {
		font-size: 24rpx;
		color: #999;
	}

	.user-box .top-box .right-box .id-box .id {
		margin-right: 30rpx;
	}

	.user-box .next {
		background-color: #4B7EFE;
		padding: 4rpx 10rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		color: #FFF;
		margin-left: 30rpx;
	}

	.user-box .bottom-box {
		padding: 30rpx 60rpx;
		display: flex;
		justify-content: space-between;
	}

	.user-box .bottom-box .box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.user-box .bottom-box .box .num-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.user-box .bottom-box .box .top {
		margin-bottom: 30rpx;
	}

	.user-box .bottom-box .box .num-box .num {
		font-size: 28rpx;
		color: #4C7EFE;
		font-weight: bold;
	}

	.user-box .bottom-box .box .num-box .text {
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
	}

	/* 升级下一等级 */
	.next-box {
		margin: 0 30rpx;
		padding: 30rpx 0;
	}

	.next-box .title {
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}

	.next-box .title .text {
		color: #4B7EFE;
		font-weight: bold;
	}

	.next-box .left-rank-box {
		width: 140rpx;
		height: 40rpx;
		position: relative;
		margin-right: 20rpx;
	}

	.next-box .left-rank-box .icon {
		width: 100%;
		height: 100%;
	}

	.next-box .left-rank-box .level-box {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.next-box .left-rank-box .level-box .level-icon {
		width: 22rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}

	.next-box .left-rank-box .level-box .level {
		font-size: 24rpx;
		color: #FFF;
	}

	.next-box .status {
		padding: 0 30rpx;
		background-color: #4B7EFE;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #FFF;
		font-weight: bold;
	}

	.next-box .fail-status {
		background-color: #D6D6D6;
	}

	.btn {
		width: 500rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #007AFF;
		margin: 140rpx auto 0;
		color: white;
		font-weight: bold;
		border-radius: 20rpx;
	}

	/* 好友状态栏 */
	.top-tab-box {
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 60rpx;
		position: sticky;
		top: 0;
		background-color: #F9F9F9;
		z-index: 999;
	}

	.top-tab-box .tab-box {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #999;
		font-weight: bold;
	}

	.top-tab-box .bottom-color {
		border-bottom: 6rpx solid #4E68C9;
		color: #000;
	}

	/* 好友列表 */
	.friend-box {
		margin: 30rpx 30rpx 0;
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.friend-box .avatar-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.friend-box .avatar-box .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		margin-bottom: 10rpx;
	}

	.friend-box .avatar-box .id {
		font-size: 24rpx;
		color: #999;
	}

	.friend-box .right-box {
		width: 74%;
	}

	.friend-box .right-box .top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.friend-box .right-box .top .name {
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		display: flex;
		flex-direction: column;
	}

	.friend-box .right-box .top .name .num {
		font-size: 24rpx;
		color: #999;
	}

	.friend-box .right-box .top .team {
		font-size: 28rpx;
		color: #333;
	}

	.friend-box .right-box .top .team .num {
		color: #FF0000;
	}

	.friend-box .right-box .top .icon-box {
		width: 140rpx;
		height: 40rpx;
		position: relative;
	}

	.friend-box .right-box .top .icon-box .icon {
		width: 100%;
		height: 100%;
	}

	.friend-box .right-box .top .icon-box .level-box {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.friend-box .right-box .top .icon-box .level-box .level-icon {
		width: 22rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}

	.friend-box .right-box .top .icon-box .level-box .level {
		font-size: 24rpx;
		color: #FFF;
	}

	.friend-box .right-box .bottom {
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.friend-box .right-box .bottom .box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.friend-box .right-box .bottom .box .text {
		margin-bottom: 10rpx;
	}

	.friend-box .right-box .bottom .box .num {
		color: #0279FF;
	}

	.friend-box .right-box .bottom .time {
		font-size: 24rpx;
		color: #999;
		font-weight: normal;
	}
</style>
