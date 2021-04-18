<template>
	<view class="container">

		<!-- 顶部搜索栏 -->
		<view class="search-box">
			<view class="title" @click="selectSort(sortColorIndex)">首页</view>
			<view class="search">
				<image class="icon" src="../../static/images/home_page/image8.png"></image>
				<input class="input" v-model="searchText" placeholder="搜索内容" placeholder-class="placeholder-input" @confirm="confirm" />
			</view>
			<view class="title" style="font-size: 28rpx;padding: 4rpx 10rpx;border: 2rpx solid #6264DF;border-radius: 8rpx;"
			 @click="qiandao">签到</view>
		</view>

		<!-- 轮播图 -->
		<carousel :img-list="imgList" url-key="img" @selected="selectedBanner" />

		<!-- 图片展示 -->
		<view class="img-show-box">
			<image class="left-img" src="../../static/images/home_page/image6.png" @click="jump('/pages/detail/mining')"></image>
			<view class="right-img">
				<image class="img" src="../../static/images/home_page/image5.png" @click="jump('/pages/detail/task_hall')"></image>
				<image class="img" src="../../static/images/home_page/image5.1.png" @click="jump('/pages/me/friend')"></image>
			</view>
		</view>

		<!-- 标题栏 -->
		<view class="label-box">
			<view class="top-box">
				<block v-for="(item, index) in titleList" :key="index">
					<text class="title" :class="[titleColorIndex == index ? 'title-color' : '']" @click="selectTitle(index, item.id)">{{item.name}}</text>
				</block>
			</view>
			<view class="bottom-box">
				<view class="sort" @click="selectSort(1)">
					<text class="text" :class="[sortColorIndex == 1 ? 'sort-color' : '']">默认排序</text>
					<view class="arrow" :class="[sortColorIndex == 1 ? 'sort-color' : '']"></view>
				</view>
				<view class="sort" @click="selectSort(2)">
					<text class="text" :class="[sortColorIndex == 2 ? 'sort-color' : '']">最新发布</text>
					<view class="arrow" :class="[sortColorIndex == 2 ? 'sort-color' : '']"></view>
				</view>
				<view class="sort" @click="selectSort(3)">
					<text class="text" :class="[sortColorIndex == 3 ? 'sort-color' : '']">佣金最高</text>
					<view class="arrow" :class="[sortColorIndex == 3 ? 'sort-color' : '']"></view>
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

		<!-- 发布任务按钮 -->
		<view class="release_btn" @click="jump('/pages/detail/release_task')">
			<image src="../../static/images/home_page/image9.png"></image>
		</view>

		<!-- 公告 -->
		<view class="notice" v-if="notices">
			<view class="notice_box">
				<view class="notice_content">
					<rich-text :nodes="notice_content"></rich-text>
				</view>
				<view class="notice_btn" @click.stop="close">好的</view>
			</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';
	import carousel from '@/components/vear-carousel/vear-carousel';
	// #ifdef APP-PLUS
	// const adSdk = uni.requireNativePlugin('AD-SDK')
	const fmssp = uni.requireNativePlugin("FmsspVideo")
	// #endif

	export default {
		components: {
			carousel
		},
		data() {
			return {
				searchText: '',
				imgList: [],
				titleList: [{
						id: 1,
						name: '网络兼职'
					},
					{
						id: 2,
						name: '全职招聘'
					},
					{
						id: 3,
						name: '兼职招聘'
					}
				],
				titleColorIndex: 0,
				sortColorIndex: 1,
				taskList: [],
				isClick: true,
				notices: true,
				notice_content: ''
			}
		},
		onShow() {
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

				service.auth2(this, service.api.home.taskList, "GET", {
					status: this.sortColorIndex,
					page: this.page
				}, (self, res) => {
					if (res.data.list.length > 0) {
						self.page += 1
						self.taskList = self.taskList.concat(res.data.list)

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
			// 关闭公告
			close() {
				this.notices = !this.notices
			},

			// 获取页面初始数据
			getData() {
				// 弹出公告接口
				service.auth(this, service.api.index.notice, "GET", {}, function(self, res) {
					if (res.code == 1) {
						let richtext = res.data.detail;
						const regex = new RegExp('<img', 'gi');
						const regexP = new RegExp('<p', 'gi');
						const regexspan = new RegExp('<span', 'gi')
						richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
						richtext = richtext.replace(regexP, `<p style="word-wrap:break-word;word-break:normal;"`);
						richtext = richtext.replace(regexspan,
							`<span style="word-wrap:break-word;word-break:normal;white-space: pre-wrap;"`);
						self.notice_content = richtext;
					}
				})

				service.auth2(this, service.api.index.user, "GET", {}, (self, res) => {
					uni.setStorageSync('user', res.data.member)

					// 登录时请设置 userId：
					// // #ifdef APP-PLUS
					// adSdk.setUserId(res.data.member.mid)
					// // #endif
				})

				service.auth2(this, service.api.home.index, "GET", {}, (self, res) => {
					self.imgList = res.data.slidelist
				})

				service.auth2(this, service.api.home.taskList, "GET", {
					status: this.sortColorIndex,
					page: 1
				}, (self, res) => {
					self.page = 2
					self.taskList = res.data.list

					uni.stopPullDownRefresh();
				})
			},

			// 搜索内容
			confirm(e) {
				this.jump('/pages/detail/task_hall?searchText=' + this.searchText)
			},

			// 签到
			qiandao() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				// #ifdef APP-PLUS
				if (uni.getStorageSync('platform') == 'android') {
					// 加载广告并展示
					fmssp.loadAndShow(function(e) {
						if (e.code == -1 || e.code == 109) {
							service.auth(this, service.api.home.qiandao, "GET", {}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: '签到成功',
										icon: 'none'
									});
								}
							})
						}
					});
				} else if (uni.getStorageSync('platform') == 'ios') {
					service.auth(this, service.api.home.qiandao, "GET", {}, (self, res) => {
						if (res.code == 1) {
							uni.showToast({
								title: '签到成功',
								icon: 'none'
							});
						}
					})
				}
				// #endif

				// // #ifdef APP-PLUS
				// let status = 0
				// adSdk.showRewardVideoAd({
				// 	unitId: "rv1" // 广告位 id
				// }, result => {
				// 	if (result.event == 'onAdLoad') {
				// 		console.log(`onAdLoad: id=${result.id}`)
				// 	} else if (result.event == 'onVideoCached') {
				// 		console.log(`onVideoCached: id=${result.id}`)
				// 	} else if (result.event == 'onAdShow') {
				// 		console.log(`onAdShow: id=${result.id}`)
				// 	} else if (result.event == 'onReward') {
				// 		console.log(`onReward: id=${result.id}`)
				// 		status = 1
				// 	} else if (result.event == 'onAdClick') {
				// 		console.log(`onAdClick: id=${result.id}`)
				// 	} else if (result.event == 'onVideoComplete') {
				// 		console.log(`onVideoComplete: id=${result.id}`)
				// 		status = 1
				// 	} else if (result.event == 'onAdClose') {
				// 		console.log(`onAdClose: id=${result.id}`)
				// 		if (status == 1) {
				// 			service.auth(this, service.api.home.qiandao, "GET", {}, (self, res) => {
				// 				if (res.code == 1) {
				// 					uni.showToast({
				// 						title: '签到成功',
				// 						icon: 'none'
				// 					});
				// 				}
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				title: '观看完广告才能获得奖励哦~',
				// 				icon: 'none'
				// 			});
				// 		}
				// 	} else if (result.event == 'onError') {
				// 		console.log(`onError: id=${result.id}, code=${result.code}, message=${result.message}`)
				// 		service.auth(this, service.api.home.qiandao, "GET", {}, (self, res) => {
				// 			if (res.code == 1) {
				// 				uni.showToast({
				// 					title: '签到成功',
				// 					icon: 'none'
				// 				});
				// 			}
				// 		})
				// 	}
				// })
				// // #endif
			},

			// 点击轮播图
			selectedBanner(item, index) {
				console.log(item, index)
			},

			// 点击标题
			selectTitle(index, id) {
				if (index == 1 || index == 2) {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});

					return;
				}

				if (this.isClick) {
					this.isClick = false

					uni.showLoading({
						title: '加载中...',
						mask: true
					});

					this.titleColorIndex = index;

					service.auth2(this, service.api.home.taskList, "GET", {
						status: this.sortColorIndex,
						page: 1
					}, (self, res) => {
						self.page = 2
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

					service.auth2(this, service.api.home.taskList, "GET", {
						status: status,
						page: 1
					}, (self, res) => {
						self.page = 2
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
		}
	}
</script>

<style>
	image {
		display: block;
	}

	.container {
		padding-top: 88rpx;
	}

	/* 顶部搜索栏 */
	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx 0;
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

	/* 功能列表 */
	.home-function-list {
		margin: 20rpx;
		padding: 20rpx 0;
		box-shadow: 0 0 10rpx #C8C7CC;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
	}

	.home-function-list .content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.home-function-list .content-box .icon {
		width: 74rpx;
		height: 74rpx;
		margin-bottom: 10rpx;
	}

	.home-function-list .content-box .text {
		font-size: 28rpx;
		color: #333;
	}

	/* 图片展示 */
	.img-show-box {
		display: flex;
		justify-content: space-between;
		margin: 20rpx;
	}

	.img-show-box .left-img {
		width: 48%;
		height: 300rpx;
		border-radius: 20rpx;
	}

	.img-show-box .right-img {
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.img-show-box .right-img .img {
		width: 100%;
		height: 140rpx;
		border-radius: 20rpx;
	}

	/* 标题栏 */
	.label-box {
		padding: 20rpx;
		position: sticky;
		top: 0;
		background-color: #FFF;
		z-index: 99;
		border-bottom: 1rpx solid #F4F4F4;
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

	.label-box .bottom-box {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 20rpx 0;
	}

	.label-box .bottom-box .sort {
		display: flex;
		align-items: center;
	}

	.label-box .bottom-box .sort .text {
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
		margin-right: 10rpx;
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
	.task-list-box {
		margin: 0 20rpx 210rpx;
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
		width: 120rpx;
		height: 120rpx;
		position: fixed;
		right: 40rpx;
		bottom: 100rpx;
		z-index: 999;
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

	/* 公告 */
	.notice {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		padding: 0 120rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .5);
	}

	.notice_box {
		width: 100%;
		height: 640rpx;
		background: url(../../static/images/home_page/image10.png) no-repeat;
		background-size: 100% 100%;
		padding: 300rpx 30rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #666;
	}

	.notice_btn {
		width: 100%;
		height: 54rpx;
		border-radius: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #4B7EFE, #6e8fde);
		font-size: 28rpx;
		color: #FFF;
	}
</style>
