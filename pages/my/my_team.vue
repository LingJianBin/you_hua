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
					<view class="next" @click="jump('/pages/my/next_my_team')">手动升级</view>
				</view>
				<view class="bottom-box">
					<view class="box">
						<view class="num-box top">
							<text class="num">{{teamData.my_active}}</text>
							<text class="text">个人贡献值</text>
						</view>
						<view class="num-box">
							<text class="num">{{teamData.ztactivenum}}</text>
							<text class="text">直推人数</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{teamData.max_active}}</text>
							<text class="text">大区贡献值</text>
						</view>
						<view class="num-box">
							<text class="num">{{teamData.team_count}}</text>
							<text class="text">总人数</text>
						</view>
					</view>
					<view class="box">
						<view class="num-box top">
							<text class="num">{{teamData.min_active}}</text>
							<text class="text">小区贡献值</text>
						</view>
						<view class="num-box">
							<text class="num">{{teamData.team_realname}}</text>
							<text class="text">总实名</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 好友状态栏 -->
		<view class="top-tab-box">
			<view class="tab-box" :class="[friendStatus == 1? 'bottom-color' : '']" @click="selectFriendStatus(1)">全部好友</view>
			<view class="tab-box" :class="[friendStatus == 2? 'bottom-color' : '']" @click="selectFriendStatus(2)">实名好友</view>
			<view class="tab-box" :class="[friendStatus == 3? 'bottom-color' : '']" @click="selectFriendStatus(3)">未实名好友</view>
		</view>

		<!-- 好友列表 -->
		<view class="friend-box" v-for="(item, index) in teamList" :key="index">
			<image class="avatar" :src="item.avatar"></image>
			<view class="right-box">
				<view class="top">
					<view class="name">
						<text>{{item.nickname}}</text>
						<text class="num">{{item.account}}</text>
					</view>
					<view class="team">团队：<text class="num">{{item.team_count}}</text>人</view>
					<view class="icon-box">
						<image class="icon" src="../../static/images/my_team/image2.png"></image>
						<view class="level-box">
							<image class="level-icon" src="../../static/images/my_team/image4.png"></image>
							<text class="level">{{item.xj_name}}</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="box">
						<text class="text">个人贡献值</text>
						<text class="num">{{item.active}}</text>
					</view>
					<view class="box">
						<text class="text">团队贡献值</text>
						<text class="num">{{item.team_active}}</text>
					</view>
					<view class="time">{{item.add_time}}</view>
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
				user: uni.getStorageSync('user'),
				friendStatus: 1,
				teamData: {},
				teamList: [],
				isClick: true
			}
		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			if (this.isClick) {
				this.isClick = false

				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				service.auth(this, service.api.home.dpFriends, "GET", {
					status: this.friendStatus,
					page: this.page
				}, (self, res) => {
					if (res.data.length > 0) {
						self.page += 1
						for (let i = 0; i < res.data.length; i++) {
							res.data[i].add_time = service.format(res.data[i].add_time).substr(0, 10)
						}
						self.teamList = self.teamList.concat(res.data)

						uni.hideLoading();
					} else {
						uni.showToast({
							title: '已经到底了~',
							icon: 'none'
						});
					}

					self.isClick = true
				})

			}
		},
		methods: {
			// 获取页面初始数据
			getData() {
				service.auth(this, service.api.home.TeamFriendsTow, "GET", {}, (self, res) => {
					self.teamData = res.data
				})

				service.auth(this, service.api.home.dpFriends, "GET", {
					status: this.friendStatus,
					page: 1
				}, (self, res) => {
					self.page = 2
					self.teamList = res.data
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].add_time = service.format(res.data[i].add_time).substr(0, 10)
					}
				})
			},

			// 选择好友状态
			selectFriendStatus(status) {
				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.friendStatus = status;
					service.auth(this, service.api.home.dpFriends, "GET", {
						status: status,
						page: 1
					}, (self, res) => {
						self.page = 2
						self.teamList = res.data
						for (let i = 0; i < res.data.length; i++) {
							res.data[i].add_time = service.format(res.data[i].add_time).substr(0, 10)
						}

						uni.hideLoading();
						self.isClick = true
					})
				}
			},

			// 跳转页面
			jump(url) {
				if (url == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})

					return;
				}

				uni.navigateTo({
					url
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
		position: relative;
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
		padding: 10rpx 30rpx;
		border-radius: 100rpx 0 0 100rpx;
		font-size: 28rpx;
		color: #FFF;
		position: absolute;
		top: 30rpx;
		right: 0;
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
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.friend-box .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
	}

	.friend-box .right-box {
		width: 80%;
	}

	.friend-box .right-box .top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.friend-box .right-box .top .name {
		font-size: 28rpx;
		font-weight: bold;
		display: flex;
		flex-direction: column;
	}

	.friend-box .right-box .top .name .num {
		font-size: 24rpx;
		color: #999;
		font-weight: normal;
	}

	.friend-box .right-box .top .team {
		font-size: 24rpx;
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
		font-size: 24rpx;
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
		margin-bottom: 6rpx;
	}

	.friend-box .right-box .bottom .box .num {
		color: #0279FF;
	}

	.friend-box .right-box .bottom .time {
		font-size: 24rpx;
		color: #999;
		font-weight: lighter;
	}
</style>
