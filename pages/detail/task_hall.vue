<template>
	<view class="container">

		<!-- 顶部搜索栏 -->
		<view class="search-box">
			<view class="title" @click="selectSort(sortColorIndex)">任务</view>
			<view class="search">
				<image class="icon" src="../../static/images/home_page/image8.png"></image>
				<input class="input" v-model="searchText" placeholder="搜索内容" placeholder-class="placeholder-input" @confirm="confirm" />
			</view>
			<view class="news" @click="jumpTab('/pages/home/message')">
				<image class="icon" src="../../static/images/home_page/image7.png"></image>
				<view class="dot"></view>
			</view>
		</view>

		<!-- 分区 -->
		<view class="task-box">
			<image src="../../static/images/task_hall/image2.png" @click="jump('')"></image>
			<image src="../../static/images/task_hall/image3.png" @click="jump('')"></image>
		</view>
		<view class="task-box">
			<image src="../../static/images/task_hall/image4.png" @click="jump('')"></image>
			<image src="../../static/images/task_hall/image5.png" @click="jump('')"></image>
		</view>

		<!-- 分类 -->
		<scroll-view class="sort-box" scroll-x>
			<view class="box" v-for="(item, index) in sortList" :key="index" @click="selectTaskSort(item.id)">
				<image :src="item.image"></image>
				<text class="text" :class="[classify == item.id ? 'classify' : '']">{{item.name}}</text>
			</view>
		</scroll-view>

		<!-- 标题栏 -->
		<view class="label-box">
			<view class="bottom-box">
				<view class="sort" @click="selectSort(1)">
					<text class="text" :class="[sortColorIndex == 1 ? 'sort-color' : '']">最新发布</text>
					<view class="arrow" :class="[sortColorIndex == 1 ? 'sort-color' : '']"></view>
				</view>
				<view class="sort" @click="selectSort(2)">
					<text class="text" :class="[sortColorIndex == 2 ? 'sort-color' : '']">佣金最高</text>
					<view class="arrow" :class="[sortColorIndex == 2 ? 'sort-color' : '']"></view>
				</view>
			</view>
		</view>

		<!-- 任务列表 -->
		<view class="task-list-box">
			<block v-for="(item, index) in taskList" :key="index">
				<view class="two-box" @click="jump('/pages/detail/task_detail?taskid=' + item.id)">
					<image class="avatar" :src="item.avatar"></image>
					<view class="right-box">
						<view class="top-box">
							<text class="title">{{item.name}}</text>
							<view style="display: flex;justify-content: space-between;align-items: center;min-width: 150rpx;">
								<!-- <view class="middle_box_flex_img">
									<image src="/static/icon/icon_pl.png" mode="aspectFill"></image>
								</view> -->
								<view style="padding-left: 10rpx;color: black;font-weight: bold;font-size: 28rpx;">普通：￥{{item.novip_money}}</view>
							</view>
							<!-- <text class="num">已赚取 {{item.takenum}}</text> -->
							<!-- <text class="num">剩余 {{item.num - item.takenum}}</text> -->
						</view>
						<view class="middle-box">
							<view>
								<text class="text desc" style="font-size: 20rpx;">{{item.cname}}</text>
								<text class="text" style="font-size: 20rpx;">{{item.cnames}}</text>
							</view>
							<!-- <view class="normal">￥{{item.money}}</view> -->
							<view class="middle_box_flex" style="min-width: 150rpx;">
								<!-- <view class="middle_box_flex_img">
									<image src="/static/icon/icon_vip.png" mode="aspectFill"></image>
								</view> -->
								<view class="middle_box_flex_vip" style=""><text class="symbol"><text style="color: red;font-size: 28rpx;">会员：￥{{item.vip_money}}</text></text></view>
							</view>
						</view>
						<view class="bottom-box">
							<view class="middle_box_flex">
								<view class="middle_box_flex" style="padding-right: 20rpx;">
									<view class="middle_box_flex_img">
										<image src="/static/icon/icon_qia.png" mode="aspectFill"></image>
									</view>
									<view class="middle_box_flex_text">{{item.takenum}}<text>人已赚</text></view>
								</view>
								<view class="middle_box_flex">
									<view class="middle_box_flex_img">
										<image src="/static/icon/icon_time.png" mode="aspectFill"></image>
									</view>
									<view class="middle_box_flex_text" style="">剩余{{item.num - item.takenum}}人</view>
								</view>
							</view>
							<!-- <view class="speed-box">
								<view class="speed" v-bind:style="{width: Math.floor(item.takenum/item.num*100) + '%'}" v-if="item.num != item.takenum"></view>
								<view class="speed" v-else></view>
								<view class="speed-num" v-if="item.num != item.takenum">{{Math.floor(item.takenum/item.num*100)}}%</view>
								<view class="speed-num" v-else>100%</view>
							</view> -->
							<view class="num-box" style="font-size: 28rpx;">立即领取</view>
						</view>
					</view>
					<image class="top-img" src="../../static/images/task_hall/image1.png" v-if="item.is_zd == 1"></image>
				</view>
			</block>
		</view>
		<!-- <view class="top-box">
			<view class="two-box" v-for="(item, index) in taskList" :key="index" @click="jump('/pages/detail/task_detail?taskid=' + item.id)">
				<view class="left-box">
					<view class="one">{{item.name}}</view>
					<view class="two">
						<text class="text desc">普通任务</text>
						<text class="text">注册</text>
					</view>
					<view class="three">
						<view class="speed" v-bind:style="{width: Math.floor(item.takenum/item.num*100) + '%'}" v-if="item.num != item.takenum"></view>
						<view class="speed" v-else></view>
						<view class="speed-num" v-if="item.num != item.takenum">{{Math.floor(item.takenum/item.num*100)}}%</view>
						<view class="speed-num" v-else>100%</view>
					</view>
				</view>
				<view class="right-box">
					<view class="top">
						<image class="icon" src="../../static/images/task_detail/image3.png"></image>
						<text class="text">￥{{item.money}}</text>
					</view>
					<view class="btm">
						<image class="icon" src="../../static/images/task_detail/image4.png"></image>
						<text class="text">￥2.08</text>
					</view>
					<view class="btn" @click.stop="receiveTask(item.id)">立即领取</view>
				</view>
				<image class="top-img" src="../../static/images/task_hall/image1.png" v-if="item.is_zd == 1"></image>
			</view>
		</view> -->

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				searchText: '',
				sortList: [],
				sortColorIndex: 1,
				taskList: [],
				isClick: true,
				classify: ''
			}
		},
		onLoad(options) {
			this.searchText = options.searchText
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
		},
		onReachBottom() {
			if (this.isClick) {
				this.isClick = false

				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth2(this, service.api.home.taskHall, "GET", {
					status: this.sortColorIndex,
					page: this.page,
					classify: this.classify,
					name: this.searchText
				}, (self, res) => {
					if (res.data.list.length > 0) {
						self.page += 1
						self.taskList = self.taskList.concat(res.data.list)
					} else {
						uni.showToast({
							title: '已经到底了~',
							icon: 'none'
						});
					}

					uni.hideLoading();
					self.isClick = true
				})
			}
		},
		methods: {
			// 获取页面初始数据
			getData() {
				service.auth2(this, service.api.home.taskHall, "GET", {
					status: this.sortColorIndex,
					page: 1,
					classify: this.classify,
					name: this.searchText
				}, (self, res) => {
					self.page = 2
					self.taskList = res.data.list
				})

				service.auth2(this, service.api.home.taskHallClassify, "GET", {}, (self, res) => {
					self.sortList = res.data

					uni.stopPullDownRefresh();
				})
			},

			// 搜索内容
			confirm(e) {
				this.selectSort(1)
			},

			// 点击分类
			selectTaskSort(classify) {
				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.classify = classify;

					service.auth2(this, service.api.home.taskHall, "GET", {
						status: this.sortColorIndex,
						page: 1,
						classify: classify,
						name: this.searchText
					}, (self, res) => {
						this.page = 2
						self.taskList = res.data.list

						uni.hideLoading();
						self.isClick = true
					})
				}
			},

			// 点击分类
			selectSort(status) {
				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.sortColorIndex = status;

					service.auth2(this, service.api.home.taskHall, "GET", {
						status: status,
						page: 1,
						classify: this.classify,
						name: this.searchText
					}, (self, res) => {
						this.page = 2
						self.taskList = res.data.list

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

			// 跳转 tabBar 页面
			jumpTab(url) {
				if (url == '') {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					})

					return;
				}

				uni.switchTab({
					url
				})
			},

			// 领取任务
			receiveTask(id) {
				uni.showLoading({
					title: '领取中...',
					mask: true
				});

				service.auth(this, service.api.home.take_task, "POST", {
					taskid: id,
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '领取成功',
							icon: 'none'
						})
					}

					self.getData()
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
		padding: 0 30rpx;
	}

	/* 顶部搜索栏 */
	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.search-box .title {
		font-size: 44rpx;
		color: #6264DF;
		font-weight: bold;
	}

	.search-box .search {
		box-shadow: 0 0 6rpx #C8C7CC;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		padding: 20rpx 40rpx;
	}

	.search-box .search .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.search-box .search .input {
		font-size: 28rpx;
	}

	.search-box .search .placeholder-input {
		font-size: 28rpx;
		color: #8A8A8A;
	}

	.search-box .news {
		width: 50rpx;
		height: 50rpx;
		position: relative;
	}

	.search-box .news .icon {
		width: 100%;
		height: 100%;
	}

	.search-box .news .dot {
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #FF0000;
		position: absolute;
		top: 0;
		right: 0;
	}

	/* 分区 */
	.task-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.task-box image {
		width: 48%;
		height: 184rpx;
		border-radius: 14rpx;
	}

	/* 分类 */
	.sort-box {
		width: 100%;
		white-space: nowrap;
	}

	.sort-box .box {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		margin: 12rpx;
	}

	.sort-box .box image {
		width: 58rpx;
		height: 40rpx;
	}

	.sort-box .box .text {
		font-size: 28rpx;
		color: #666;
	}

	.sort-box .box .classify {
		color: #000;
		font-weight: bold;
	}

	/* 标题栏 */
	.label-box {
		background-color: #F9F9F9;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.label-box .bottom-box {
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0;
	}

	.label-box .bottom-box .sort {
		display: flex;
		align-items: center;
	}

	.label-box .bottom-box .sort .text {
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
		margin-right: 18rpx;
	}

	.label-box .bottom-box .sort .arrow {
		border-top: 12rpx solid #666;
		border-right: 12rpx solid transparent;
		border-left: 12rpx solid transparent;
	}

	.label-box .bottom-box .sort .sort-color {
		color: #000;
		border-top-color: #000;
	}

	/* 任务列表 */
	/* .top-box {
		margin-bottom: 200rpx;
	}

	.top-box .two-box {
		display: flex;
		justify-content: space-between;
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx #C8C7CC;
		margin-top: 20rpx;
		position: relative;
	}

	.top-box .two-box .left-box {
		display: flex;
		flex-direction: column;
	}

	.top-box .two-box .left-box .one {
		width: 300rpx;
		font-size: 32rpx;
		margin-bottom: 30rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.top-box .two-box .left-box .two {
		font-size: 24rpx;
		color: #FD5B12;
		margin-bottom: 30rpx;
	}

	.top-box .two-box .left-box .two .text {
		padding: 4rpx 10rpx;
		background-color: #FEFEDF;
		border-radius: 10rpx;
	}

	.top-box .two-box .left-box .two .desc {
		margin-right: 30rpx;
	}

	.top-box .two-box .left-box .three {
		width: 360rpx;
		height: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx #C8C7CC;
		position: relative;
	}

	.top-box .two-box .left-box .three .speed {
		width: 100%;
		height: 30rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
		position: absolute;
		top: 0;
	}

	.top-box .two-box .left-box .three .speed-num {
		width: 100%;
		height: 30rpx;
		font-size: 20rpx;
		color: #FD6019;
		text-align: center;
		position: absolute;
		top: 0;
	}

	.top-box .two-box .right-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.top-box .two-box .right-box .top,
	.top-box .two-box .right-box .btm {
		display: flex;
		align-items: center;
	}

	.top-box .two-box .right-box .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.top-box .two-box .right-box .text {
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
	}

	.top-box .two-box .right-box .btm .text {
		color: #FF0000;
	}

	.top-box .two-box .right-box .btn {
		font-size: 28rpx;
		color: #FFF;
		background-color: #4B7EFE;
		padding: 4rpx 20rpx;
		border-radius: 10rpx;
	}

	.top-box .two-box .top-img {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		right: 0;
	} */
	/* 任务列表 */
	.task-list-box {
		/* margin: 0 20rpx 200rpx; */
	}

	.task-list-box .two-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx #C8C7CC;
		margin-top: 30rpx;
		position: relative;
	}

	.task-list-box .two-box .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.task-list-box .two-box .right-box {
		width: 80%;
		display: flex;
		flex-direction: column;
	}

	.task-list-box .two-box .right-box .top-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.task-list-box .two-box .right-box .top-box .title {
		width: 240rpx;
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.task-list-box .two-box .right-box .top-box .num {
		font-size: 28rpx;
		color: #999;
	}

	.task-list-box .two-box .right-box .middle-box {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #FD5B12;
		margin-bottom: 10rpx;
	}

	.task-list-box .two-box .right-box .middle-box .text {
		padding: 4rpx 10rpx;
		background-color: #4B7EFE;
		border-radius: 10rpx;
		color: white;
	}

	.task-list-box .two-box .right-box .middle-box .desc {
		margin-right: 20rpx;
	}

	.task-list-box .two-box .right-box .middle-box .normal {
		color: #000;
		font-weight: bold;
	}

	.task-list-box .two-box .right-box .bottom-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.task-list-box .two-box .right-box .bottom-box .speed-box {
		width: 360rpx;
		height: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx #C8C7CC;
		position: relative;
	}

	.task-list-box .two-box .right-box .bottom-box .speed-box .speed {
		width: 100%;
		height: 30rpx;
		background-color: #4B7EFE;
		border-radius: 20rpx;
		position: absolute;
		top: 0;
	}

	.task-list-box .two-box .right-box .bottom-box .speed-box .speed-num {
		width: 100%;
		height: 30rpx;
		font-size: 20rpx;
		color: #FD6019;
		text-align: center;
		position: absolute;
		top: 0;
	}

	.task-list-box .two-box .right-box .bottom-box .num-box {
		color: #666;
		font-weight: bold;
		background-color: #4B7EFE;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		padding: 0 10rpx;
		padding: 5rpx 10rpx;
	}

	.task-list-box .two-box .right-box .bottom-box .num-box .symbol {
		font-size: 28rpx;
		color: #FF0000;
	}

	.task-list-box .two-box .top-img {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		right: 0;
	}

	.release_btn image {
		width: 100rpx;
		height: 100rpx;
		/* background-color: #FFF; */
		/* border-radius: 50%; */
		position: fixed;
		/* box-shadow: 0 0 10rpx #6264DF; */
		right: 40rpx;
		bottom: 150rpx;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #6264DF; */
	}

	/* 列表样式二次修改 */
	.middle_box_flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.middle_box_flex_img image {
		width: 30rpx !important;
		height: 30rpx !important;
	}

	.middle_box_flex_vip {
		padding-left: 10rpx;
		color: black;
		font-weight: bold;
	}

	.middle_box_flex_text {
		font-size: 25rpx;
		color: #999999;
		padding-left: 10rpx;
	}
</style>
