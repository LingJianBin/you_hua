<template>
	<view class="container">

		<!-- 个人信息 -->
		<view class="background" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
			<image class="set-box" src="../../static/images/my/image1.png" @click="jump('/pages/my/setting')"></image>
			<view class="user-box">
				<view class="top-box">
					<image class="avatar" :src="user.avatar"></image>
					<view class="right-box">
						<view class="name-box">
							<text class="name">{{user.nickname}}</text>
							<!-- <image class="icon icon-left" src="../../static/images/my/image2.png"></image> -->
							<image class="icon" src="../../static/images/my/image3.png" v-if="user.is_vip > 0"></image>
						</view>
						<view class="rank-box">
							<view class="left-rank-box">
								<image class="icon" src="../../static/images/my_team/image2.png"></image>
								<view class="level-box">
									<image class="level-icon" src="../../static/images/my_team/image4.png"></image>
									<text class="level">{{xjlevelinfo.name}}</text>
								</view>
							</view>
							<view class="right-rank-box">
								<!-- <image class="icon" src="../../static/images/my_team/image3.png"></image> -->
								<text class="level">{{personlevel.name}}</text>
							</view>
						</view>
						<view class="address-box">
							<text>ID：{{user.show_id}}</text>
						</view>
						<view class="address-box" style="margin-top: 10rpx;">
							<text>手机号：{{user.account}}</text>
						</view>
					</view>
				</view>
				<view class="bottom-box">
					<view class="box" @click="myFriends()">
						<text class="num">{{user.friend_count}}</text>
						<view class="text-box">
							<image class="icon" src="../../static/images/my/image4.png"></image>
							<text>职友</text>
						</view>
					</view>
					<view class="box" @click="jump('/pages/my/active_degree')">
						<text class="num">{{user.active}}</text>
						<view class="text-box">
							<image class="icon" src="../../static/images/my/image5.png"></image>
							<text>贡献值</text>
						</view>
					</view>
					<view class="box" @click="jump('')">
						<text class="num">0</text>
						<view class="text-box">
							<image class="icon" src="../../static/images/my/image6.png"></image>
							<text>访客记录</text>
						</view>
					</view>
				</view>
			</view>
			<view class="user_right" @click="jump('/pages/my/task_package')">升职大厅</view>
			<view class="user_right_exit" @click="jump('/pages/detail/recharge')">充值</view>
		</view>

		<!-- 超级会员卡 -->
		<view class="card-box">
			<view class="left">
				<view class="icon-box">
					<image class="icon" src="../../static/images/my/image7.png"></image>
					<text>超级会员卡</text>
				</view>
				<view class="desc">升级超级会员，即可享受8项专属特权！</view>
			</view>
			<view class="right" @click="jump('/pages/VIP/VIP')">立即购买</view>
		</view>
		<view class="update-box">上次更新时间为：{{y}}年{{m}}月{{d}}日 {{h}}:{{mm}}:{{s}}</view>

		<!-- 余额 -->
		<view class="balance-box" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" :style="{'margin-top': (-120 + length) + 'rpx'}">
			<view class="box" @click="jump('/pages/my/balance')">
				<text>{{user.balance}}</text>
				<text class="text">余额</text>
			</view>
			<view class="box" @click="jump('/pages/my/ZY')">
				<text>{{user.zy_value}}</text>
				<text class="text">YC</text>
			</view>
			<view class="box" @click="jump('/pages/my/release_ZY')">
				<text>{{user.pool}}</text>
				<text class="text">释放YC</text>
			</view>
			<view class="box" @click="jump('/pages/my/ZYC')">
				<text>{{user.zyc}}</text>
				<text class="text">YHTC</text>
			</view>
		</view>

		<!-- 任务管理 -->
		<view class="manage-box">
			<view class="one">
				<image src="../../static/images/my/image9.png"></image>
				<text>任务管理</text>
			</view>
			<view class="two">
				<view class="box" @click="jump('/pages/detail/task_manage?status=1')">
					<image src="../../static/images/my/image10.png"></image>
					<text>未上线</text>
				</view>
				<view class="box" @click="jump('/pages/detail/task_manage?status=2')">
					<image src="../../static/images/my/image37.png"></image>
					<text>进行中</text>
				</view>
				<view class="box" @click="jump('/pages/detail/task_manage?status=3')">
					<image src="../../static/images/my/image38.png"></image>
					<text>已完成</text>
				</view>
			</view>
		</view>

		<!-- 任务状态 -->
		<view class="manage-box">
			<view class="one">
				<image src="../../static/images/my/image18.png"></image>
				<text>任务状态</text>
			</view>
			<view class="two two-between">
				<view class="box" @click="jump('/pages/my/my_task?status=1')">
					<image src="../../static/images/my/image13.png"></image>
					<text>待提交</text>
				</view>
				<view class="box" @click="jump('/pages/my/my_task?status=2')">
					<image src="../../static/images/my/image14.png"></image>
					<text>进行中</text>
				</view>
				<view class="box" @click="jump('/pages/my/my_task?status=3')">
					<image src="../../static/images/my/image15.png"></image>
					<text>已通过</text>
				</view>
				<view class="box" @click="jump('/pages/my/my_task?status=4')">
					<image src="../../static/images/my/image16.png"></image>
					<text>未通过</text>
				</view>
				<view class="box" @click="jump('/pages/my/my_task?status=5')">
					<image src="../../static/images/my/image17.png"></image>
					<text>复审/举报</text>
				</view>
			</view>
		</view>

		<!-- 我的求职 -->
		<view class="manage-box">
			<view class="one">
				<image src="../../static/images/my/image19.png"></image>
				<text>我的求职</text>
			</view>
			<view class="job-box">
				<view class="job">
					<image class="img img-top" src="../../static/images/my/image39.png" @click="jump('')"></image>
					<image class="img" src="../../static/images/my/image40.png" @click="jump('')"></image>
				</view>
				<view class="job">
					<view class="box" @click="jump('')">
						<image src="../../static/images/my/image20.png"></image>
						<text>我的简历</text>
					</view>
					<view class="box" @click="jump('')">
						<image src="../../static/images/my/image22.png"></image>
						<text>求职进度</text>
					</view>
				</view>
				<view class="job">
					<view class="box" @click="jump('')">
						<image src="../../static/images/my/image21.png"></image>
						<text>被下载</text>
					</view>
					<view class="box" @click="jump('')">
						<image src="../../static/images/my/image23.png"></image>
						<text>面试邀请</text>
					</view>
				</view>
			</view>
		</view>


		<!-- 其它分类 -->
		<view class="other-box">
			<image src="../../static/images/my/image41.png" @click="jump('/pages/city_team/city_team')"></image>
			<image src="../../static/images/my/image42.png" @click="jump('/pages/detail/task_hall')"></image>
			<image src="../../static/images/my/image43.png" @click="jump('')"></image>
			<image src="../../static/images/my/image44.png" @click="jump('')"></image>
		</view>

		<!-- 常用工具 -->
		<view class="tool-box">
			<view class="one">
				<image src="../../static/images/my/image11.png"></image>
				<text>常用工具</text>
			</view>
			<view class="two two-top">
				<view class="box" @click="jump('/pages/me/friend')">
					<image src="../../static/images/my/image25.png"></image>
					<text>邀请好友</text>
				</view>
				<view class="box" @click="jump('/pages/my/real_name')">
					<image src="../../static/images/my/image27.png"></image>
					<text>实名认证</text>
				</view>
				<view class="box" @click="jump('/pages/my/my_team')">
					<image src="../../static/images/my/image26.png"></image>
					<text>好友</text>
				</view>
				<view class="box" @click="jump('/pages/VIP/VIP')">
					<image src="../../static/images/my/image24.png"></image>
					<text>成为VIP</text>
				</view>
			</view>
			<view class="two two-top">
				<view class="box" @click="jump('/pages/city_team/city_team')">
					<image src="../../static/images/my/image30.png"></image>
					<text>城市加盟</text>
				</view>
				<view class="box" @click="jump('/pages/me/college')">
					<image src="../../static/images/my/image31.png"></image>
					<text>新人指南</text>
				</view>
				<view class="box" @click="jump('/pages/me/notice')">
					<image src="../../static/images/my/image29.png"></image>
					<text>公告</text>
				</view>
				<view class="box" @click="jump('')">
					<image src="../../static/images/my/image28.png"></image>
					<text>在线客服</text>
				</view>
			</view>
			<view class="two">
				<view class="box" @click="jump('/pages/me/gongpai_code')">
					<image src="../../static/images/my/image45.png"></image>
					<text>一线公排</text>
				</view>
			</view>
		</view>

		<!-- 区块链应用服务 -->
		<view class="tool-box">
			<view class="one">
				<image src="../../static/images/my/image12.png"></image>
				<text>区块链应用服务</text>
			</view>
			<view class="two">
				<view class="box" @click="jump('')">
					<image src="../../static/images/my/image32.png"></image>
					<text>白皮书</text>
				</view>
				<view class="box" @click="jump('')">
					<image src="../../static/images/my/image33.png"></image>
					<text>平行链</text>
				</view>
				<view class="box" style="opacity: 0;">
					<image src="../../static/images/my/image34.png"></image>
					<text>区块浏览器</text>
				</view>
				<view class="box" style="opacity: 0;">
					<image src="../../static/images/my/image35.png"></image>
					<text>区块验证器</text>
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
				user: {},
				xjlevelinfo: {},
				personlevel: {},
				y: '',
				m: '',
				d: '',
				h: '',
				mm: '',
				s: '',
				length: 0,
				startLength: 0,
				endLength: 0,
				touchendLength: 0
			}
		},
		onShow() {
			this.getData()

			this.y = new Date().getFullYear();
			this.m = service.addZero(new Date().getMonth() + 1);
			this.d = service.addZero(new Date().getDate());
			this.h = service.addZero(new Date().getHours());
			this.mm = service.addZero(new Date().getMinutes());
			this.s = service.addZero(new Date().getSeconds());
		},
		methods: {
			touchstart(e) {
				this.startLength = e.changedTouches[0].pageY
			},

			touchmove(e) {
				this.endLength = e.changedTouches[0].pageY
				this.touchendLength = this.endLength - this.startLength
				if (this.endLength - this.startLength <= 120) {
					this.length = this.endLength - this.startLength
				}
			},

			touchend(e) {
				if (this.touchendLength > 120) {
					uni.showLoading({
						title: '更新中...',
						mask: true
					});

					this.getData()

					this.y = new Date().getFullYear();
					this.m = service.addZero(new Date().getMonth() + 1);
					this.d = service.addZero(new Date().getDate());
					this.h = service.addZero(new Date().getHours());
					this.mm = service.addZero(new Date().getMinutes());
					this.s = service.addZero(new Date().getSeconds());

				}

				this.length = 0
			},

			// 获取页面初始数据
			getData() {
				service.auth2(this, service.api.index.user, "GET", {}, (self, res) => {
					self.user = res.data.member
					self.xjlevelinfo = res.data.member.xjlevelinfo
					self.personlevel = res.data.member.personlevel

					uni.setStorageSync('user', res.data.member)

					uni.hideLoading();
				})
			},

			// 跳转页面
			jump(url) {
				if (url == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})

					return;
				} else if (url == '/pages/city_team/city_team') {
					if (this.user.personlevel.name == '城市合伙人') {
						uni.navigateTo({
							url: '/pages/city_team/city_my'
						})
					} else {
						uni.navigateTo({
							url: '/pages/city_team/city_join'
						})
					}
				} else {
					uni.navigateTo({
						url
					})
				}
			},

			myFriends() {
				uni.navigateTo({
					url: '../my/myFriends'
				})
			}
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
		margin-bottom: 20rpx;
	}

	/* 个人信息 */
	.background {
		background-color: #346EFE;
		padding: 88rpx 50rpx 100rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.set-box {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 30rpx;
	}

	.user-box {
		width: 100%;
	}

	.user-box .top-box {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.user-box .top-box .avatar {
		background-color: #FFF;
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		border: 4rpx solid #FFF;
		margin-right: 40rpx;
	}

	.user-box .top-box .right-box .name-box {
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}

	.user-box .top-box .right-box .name-box .name {
		width: 200rpx;
		font-size: 36rpx;
		color: #FFF;
		font-weight: bold;
		margin-right: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-box .top-box .right-box .name-box .icon {
		width: 30rpx;
		height: 30rpx;
	}

	.user-box .top-box .right-box .name-box .icon-left {
		margin-right: 20rpx;
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

	.user-box .top-box .right-box .address-box {
		font-size: 24rpx;
		color: #FFF;
	}

	.user-box .top-box .right-box .address-box .icon {
		width: 28rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.user-box .bottom-box {
		display: flex;
		justify-content: space-between;
	}

	.user-box .bottom-box .box {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 32rpx;
		color: #FFF;
	}

	.user-box .bottom-box .box .num {
		font-weight: bold;
	}

	.user-box .bottom-box .box .text-box {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.user-box .bottom-box .box .text-box .icon {
		width: 24rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.user_right {
		width: 164rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #666;
		background-color: #F9F9F9;
		border-radius: 50rpx 0 0 50rpx;
		position: absolute;
		top: 178rpx;
		right: 0;
	}

	.user_right_exit {
		width: 164rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #666;
		background-color: #F9F9F9;
		border-radius: 50rpx 0 0 50rpx;
		position: absolute;
		top: calc(178rpx + 80rpx);
		right: 0;
	}

	/* 超级会员卡 */
	.card-box {
		height: 110rpx;
		margin: -60rpx 30rpx 0;
		padding: 20rpx 20rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background-image: url(../../static/images/my/image8.png);
		background-size: 100% 100%;
	}

	.card-box .left .icon-box {
		font-size: 36rpx;
		color: #FEE3B7;
		display: flex;
		align-items: center;
	}

	.card-box .left .icon-box .icon {
		width: 62rpx;
		height: 34rpx;
		margin-right: 10rpx;
	}

	.card-box .left .desc {
		font-size: 20rpx;
		color: #C2C2C2;
	}

	.card-box .right {
		background: linear-gradient(to right, #FFE4B9, #E9B87C);
		font-size: 28rpx;
		color: #603A2A;
		padding: 4rpx 20rpx;
		border-radius: 20rpx;
	}

	.update-box {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		padding: 16rpx 0;
	}

	/* 余额 */
	.balance-box {
		display: flex;
		justify-content: space-between;
		margin: 0 30rpx;
		padding: 40rpx 20rpx 20rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 28rpx;
		color: #343434;
		position: relative;
		z-index: 999;
	}

	.balance-box .box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.balance-box .box .text {
		color: #666;
	}

	/* 任务管理 */
	.manage-box {
		margin: 20rpx 30rpx 0;
		padding: 20rpx 20rpx 30rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		color: #343434;
	}

	.manage-box .one {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.manage-box .one image {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.manage-box .one text {
		font-weight: bold;
	}

	.manage-box .two {
		display: flex;
		justify-content: space-around;
	}

	.manage-box .two-between {
		display: flex;
		justify-content: space-between;
	}

	.manage-box .two .box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.manage-box .two .box image {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}

	.manage-box .two .box text {
		font-size: 24rpx;
	}

	/* 我的求职 */
	.manage-box .job-box {
		display: flex;
		justify-content: space-between;
	}

	.manage-box .job-box .job {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.manage-box .job-box .job .img {
		width: 320rpx;
		height: 130rpx;
		border-radius: 10rpx;
	}

	.manage-box .job-box .job .img-top {
		margin-bottom: 10rpx;
	}

	.manage-box .job-box .job .box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.manage-box .job-box .job .box image {
		width: 60rpx;
		height: 50rpx;
		margin-bottom: 10rpx;
	}

	.manage-box .job-box .job .box text {
		font-size: 24rpx;
	}

	/* 其它分类 */
	.other-box {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 30rpx 0;
	}

	.other-box image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}

	/* 常用工具 */
	.tool-box {
		margin: 20rpx 30rpx 0;
		padding: 20rpx 20rpx 30rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		color: #343434;
	}

	.tool-box .one {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.tool-box .one image {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.tool-box .one text {
		font-weight: bold;
	}

	.tool-box .two {
		display: flex;
		justify-content: space-between;
	}

	.tool-box .two-top {
		margin-bottom: 30rpx;
	}

	.tool-box .two .box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tool-box .two .box image {
		width: 50rpx;
		height: 44rpx;
		margin-bottom: 10rpx;
	}

	.tool-box .two .box text {
		font-size: 24rpx;
	}
</style>
