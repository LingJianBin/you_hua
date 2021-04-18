<template>
	<view class="container">

		<!-- 顶部模块 -->
		<view class="top-box">
			<view class="one-box" v-if="user.mid != info.fmid && record != null && (record.status == 0 || (record.status == 3 && record.is_disabled == 0))">
				<view class="left-box">
					<image class="icon" src="../../static/images/task_detail/image1.png"></image>
					<text class="countdown">{{countdown}}</text>
					<text class="text">内提交完成任务</text>
				</view>
				<image class="right-box" src="../../static/images/task_detail/image2.png"></image>
			</view>
			<view class="two-box">
				<view class="left-box">
					<view class="one">{{info.name}}</view>
					<view class="two">
						<view class="text desc">{{info.cname}}</view>
						<view class="text">{{info.cnames}}</view>
					</view>
				</view>
				<view class="right-box">
					<text class="normal">普通：￥{{info.novip_money}}</text>
					<text>会员：￥{{info.vip_money}}</text>
				</view>
			</view>
			<view class="three-box">
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image5.png"></image>
					<text>{{info.takenum}}人已赚</text>
				</view>
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image6.png"></image>
					<text>剩余{{info.num - info.takenum}}单</text>
				</view>
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image7.png"></image>
					<text>24小时到账</text>
				</view>
			</view>
		</view>

		<!-- 邀请好友领红包 -->
		<!-- <image class="invite-box" src="../../static/images/task_detail/image8.png"></image> -->

		<!-- 用户信息 -->
		<view class="user-box">
			<view class="left-box">
				<image class="avatar" :src="publishmem.avatar"></image>
				<view class="name-box">
					<view class="name">{{publishmem.nickname}}</view>
					<view class="title-box">
						<image class="icon" src="../../static/images/task_detail/image9.png"></image>
						<text class="text">达人</text>
					</view>
				</view>
			</view>
			<view class="right-box" @click="jump('')">
				<image class="icon" src="../../static/images/task_detail/image10.png"></image>
				<text class="text">添加好友</text>
			</view>
		</view>

		<view class="submit-box" v-if="info.tasklink != ''">
			<text>任务链接：</text>
			<view class="btn">
				<input :disabled="true" :placeholder="info.tasklink" />
				<view class="copy" @click="copy(info.tasklink)">复制链接</view>
			</view>
		</view>

		<!-- 任务步骤 -->
		<view class="step-box" v-for="(item, index) in description" :key="index">
			<view class="one-box" v-if="index == 0">
				<text class="star">*</text>
				<text>任务步骤</text>
			</view>
			<view class="two-box">
				<image class="icon" src="../../static/images/task_detail/image11.png"></image>
				<text class="title" v-if="index == 0">第一步</text>
				<text class="title" v-if="index == 1">第二步</text>
				<text class="title" v-if="index == 2">第三步</text>
				<text class="title" v-if="index == 3">第四步</text>
				<text class="title" v-if="index == 4">第五步</text>
				<text class="title" v-if="index == 5">第六步</text>
				<text class="title" v-if="index == 6">第七步</text>
				<text class="title" v-if="index == 7">第八步</text>
				<text class="desc" v-if="item.status == 1">（图文说明）</text>
				<text class="desc" v-if="item.status == 2">（收集截图）</text>
			</view>
			<view class="three-box">{{item.text}}</view>
			<view class="four-box">
				<image mode="aspectFill" class="icon" :src="item.img" v-if="item.img != '../../static/images/task_detail/image12.png'"
				 @click="previewImage(item.img)"></image>
				<image mode="aspectFill" class="icon" :src="item.img1" v-if="(item.status == 2 && record != null && record.status == 0) || (item.status == 2 && againSubmit == 1)"
				 @click="uploadImage(index)"></image>
				<image mode="aspectFill" class="icon" :src="item.img1" v-if="item.img1 != '../../static/images/task_detail/image12.png' && item.status == 2 && (record.status == -1 || record.status == 1 || record.status == 2 || record.status == 3) && againSubmit == 0"
				 @click="previewImage(item.img1)"></image>
			</view>
		</view>

		<!-- 提交数据 -->
		<view class="submit-box" v-if="(user.mid != info.fmid && info.extdata != '' && record != null && record.status == 0) || (againSubmit == 1 && info.extdata != '')">
			<text>提交数据</text>
			<input v-model="extdata" :placeholder="info.extdata" />
		</view>
		<view class="submit-box" v-else-if="info.extdata != '' && record != null">
			<text>提交数据</text>
			<input :disabled="true" :placeholder="record.extdata" />
		</view>
		<view class="submit-box" v-else-if="user.mid == info.fmid && info.extdata">
			<text>提交数据</text>
			<input :disabled="true" :placeholder="info.extdata" />
		</view>

		<!-- 本次结算 -->
		<view class="count-box">
			<text>本次结算：</text>
			<text class="sign">￥</text>
			<text class="num" v-if="user.is_vip == 0">{{info.novip_money}}</text>
			<text class="num" v-if="user.is_vip == 1">{{info.vip_money}}</text>
		</view>

		<!-- 底部任务按钮 -->
		<block v-if="user.mid != info.fmid">
			<view class="btn-box btn-box-get" v-if="record == null">
				<view class="submit" @click="getBtn">领取任务</view>
			</view>
			<view class="btn-box" v-if="(record != null && record.status == 0) || againSubmit == 1">
				<view class="cancel" @click="cancelBtn(record.id)">取消任务</view>
				<view class="submit" @click="submitBtn">提交任务</view>
			</view>
		</block>

		<!-- 投诉 -->
		<view class="complaint" @click="jump('/pages/detail/complaint?id=' + record.id)" v-if="record != null && record.status == 3 && againSubmit == 0 && record.is_disabled == 0">投诉</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				countdown: '00:00:00',
				info: {},
				record: {},
				publishmem: {},
				extdata: '',
				description: [],
				againSubmit: 0
			}
		},
		onLoad(options) {
			if (options.againSubmit) {
				this.againSubmit = options.againSubmit
			}
			this.getData(options.taskid)
		},
		onUnload() {
			clearInterval(this.setIntervalId)
		},
		methods: {
			// 获取页面初始数据
			getData(id) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth2(this, service.api.home.taskinfo, "GET", {
					taskid: id
				}, (self, res) => {
					console.log(res)
					if (res.data.record == null || this.againSubmit == 1 || (res.data.record != null && res.data.record.images ==
							null)) {
						for (let item of res.data.taskinfo.desction) {
							item.img1 = '../../static/images/task_detail/image12.png'
						}
						self.description = res.data.taskinfo.desction
					} else {
						self.description = res.data.record.images
					}

					self.info = res.data.taskinfo
					self.record = res.data.record
					self.publishmem = res.data.publishmem

					uni.hideLoading();

					if (res.data.record && (res.data.record.status == 0 || (res.data.record.status == 3 && res.data.record.is_disabled ==
							0)) && ((res.data.record.auto_canceltime - Date.parse(new Date()) /
							1000) > 0)) {
						this.setIntervalId = setInterval(() => {
							self.showTime(res.data.record.auto_canceltime - Date.parse(new Date()) / 1000)
						}, 1000); //反复执行函数本身
					}
				})
			},

			// 倒计时
			showTime(lefttime) {
				var lefth = Math.floor(lefttime / 3600), //计算小时
					leftm = Math.floor(lefttime / 60 % 60), //计算分钟数
					lefts = Math.floor(lefttime % 60); //计算秒数
				this.countdown = (lefth < 10 ? "0" + lefth : lefth) + ":" + (leftm < 10 ? "0" + leftm : leftm) + ":" +
					(lefts < 10 ? "0" + lefts : lefts) //返回倒计时的字符串

				if (this.countdown == '00:00:00') {
					clearInterval(this.setIntervalId)
				}
			},

			// 预览
			previewImage(url) {
				let urls = [];
				urls[0] = url;
				uni.previewImage({
					urls: urls
				});
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

			// 领取任务
			getBtn() {
				uni.showLoading({
					title: '领取中...',
					mask: true
				});

				service.auth(this, service.api.home.take_task, "POST", {
					taskid: this.info.id
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '领取成功',
							icon: 'none',
							mask: true
						})

						self.getData(self.info.id)
					}
				})
			},

			// 上传截图
			uploadImage(index) {
				let _this = this;
				uni.chooseImage({
					count: 1, // 默认9
					sourceType: ['album'], // 从相册选择
					success: res => {
						uni.uploadFile({
							url: service.api.secondary.uploadImg,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token2')
							},
							success: res => {
								_this.description[index].img1 = JSON.parse(res.data).data.url
							},
							fail: res => {
								uni.showToast({
									icon: 'none',
									title: '网站消息获取错误'
								});
							}
						});
					}
				})
			},

			// 取消任务
			cancelBtn(id) {
				uni.showModal({
					title: '提示',
					content: '确定取消任务吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							uni.showLoading({
								title: '取消中...',
								mask: true
							});

							service.auth(this, service.api.home.cancel_taskrecord, "GET", {
								recordid: id
							}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: '取消成功',
										icon: 'none',
										mask: true
									})

									setTimeout(() => {
										uni.switchTab({
											url: '/pages/home/home_page'
										})
									}, 800)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 复制链接
			copy(link) {
				uni.setClipboardData({
					data: link,
					success: res => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					}
				});
			},

			// 提交任务
			submitBtn() {
				uni.showLoading({
					title: '提交中...',
					mask: true
				});

				for (let item of this.description) {
					if (item.status == 2 && item.img1 == '../../static/images/task_detail/image12.png') {
						uni.showToast({
							title: '请上传图片',
							icon: 'none'
						})

						return;
					}
				}

				if (this.info.extdata != '' && this.extdata == '') {
					uni.showToast({
						title: `请输入${this.info.extdata}`,
						icon: 'none'
					})

					return;
				}

				service.auth2(this, service.api.home.submit_task, "POST", {
					recordid: this.record.id,
					remark: '',
					extdata: this.extdata,
					images: this.description
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							mask: true
						})

						setTimeout(() => {
							uni.navigateBack()
						}, 800)
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
		padding: 0 30rpx 200rpx;
	}

	/* 顶部模块 */
	.top-box {
		background-color: #EDEDED;
		border-radius: 20rpx;
		margin-top: 30rpx;
	}

	.top-box .one-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FCFCEA;
		padding: 0 20rpx;
		border-radius: 20rpx 20rpx 0 0;
	}

	.top-box .one-box .left-box {
		display: flex;
		align-items: center;
	}

	.top-box .one-box .left-box .icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.top-box .one-box .left-box .countdown {
		font-size: 28rpx;
		color: #FD5B12;
		font-weight: bold;
		margin-right: 10rpx;
	}

	.top-box .one-box .left-box .text {
		font-size: 32rpx;
		color: #999;
		font-weight: bold;
	}

	.top-box .one-box .right-box {
		width: 120rpx;
		height: 120rpx;
	}

	.top-box .two-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		box-shadow: 0 0 10rpx #C8C7CC;
		position: relative;
		bottom: 20rpx;
	}

	.top-box .two-box .left-box {
		display: flex;
		flex-direction: column;
	}

	.top-box .two-box .left-box .one {
		width: 360rpx;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.top-box .two-box .left-box .two {
		display: flex;
		font-size: 24rpx;
		color: #FFF;
		font-weight: bold;
	}

	.top-box .two-box .left-box .two .text {
		padding: 4rpx 10rpx;
		background-color: #4B7EFE;
		border-radius: 10rpx;
	}

	.top-box .two-box .left-box .two .desc {
		margin-right: 30rpx;
	}

	.top-box .two-box .right-box {
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #FF0000;
		font-weight: bold;
	}

	.top-box .two-box .right-box .normal {
		color: #000;
		margin-bottom: 30rpx;
	}

	.top-box .three-box {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx 20rpx;
		font-size: 24rpx;
		color: #666;
	}

	.top-box .three-box .icon-box {
		display: flex;
		align-items: center;
	}

	.top-box .three-box .icon-box .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	/* 邀请好友领红包 */
	.invite-box {
		width: 100%;
		height: 250rpx;
		margin-top: 30rpx;
	}

	/* 用户信息 */
	.user-box {
		background-color: #EDEDED;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		margin-top: 30rpx;
	}

	.user-box .left-box {
		display: flex;
	}

	.user-box .left-box .avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-box .left-box .name-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.user-box .left-box .name-box .name {
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.user-box .left-box .name-box .title-box {
		display: flex;
		align-items: center;
		padding: 4rpx 10rpx;
		background-color: #DFDCE8;
	}

	.user-box .left-box .name-box .title-box .icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.user-box .left-box .name-box .title-box .text {
		font-size: 24rpx;
		color: #4C7EFE;
		font-weight: bold;
	}

	.user-box .right-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.user-box .right-box .icon {
		width: 44rpx;
		height: 44rpx;
		margin-bottom: 10rpx;
	}

	.user-box .right-box .text {
		font-size: 24rpx;
		color: #FFF;
		font-weight: bold;
		background-color: #4C7EFE;
		padding: 2rpx 20rpx;
		border-radius: 50rpx;
	}

	/* 任务步骤 */
	.step-box {
		margin-top: 30rpx;
	}

	.step-box .one-box {
		font-size: 32rpx;
		font-weight: bold;
	}

	.step-box .one-box .star {
		color: #FF0000;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.step-box .two-box {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.step-box .two-box .icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}

	.step-box .two-box .title {
		font-size: 32rpx;
	}

	.step-box .two-box .desc {
		font-size: 28rpx;
	}

	.step-box .three-box {
		font-size: 32rpx;
		color: #999;
		margin-top: 20rpx;
	}

	.step-box .four-box {
		display: flex;
		margin-top: 20rpx;
	}

	.step-box .four-box image {
		width: 160rpx;
		height: 160rpx;
	}

	.step-box .four-box .icon {
		margin-right: 30rpx;
	}

	/* 提交数据 */
	.submit-box {
		margin-top: 40rpx;
	}

	.submit-box text {
		font-size: 32rpx;
		font-weight: bold;
	}

	.submit-box input {
		width: 70%;
		border-bottom: 2rpx solid #CCC;
		margin-top: 20rpx;
	}

	.submit-box .btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.submit-box .btn .copy {
		padding: 4rpx 10rpx;
		background-color: #4B7EFE;
		border-radius: 50rpx;
		font-size: 28rpx;
		color: #FFF;
		font-weight: normal;
	}

	/* 本次结算 */
	.count-box {
		font-size: 28rpx;
		font-weight: bold;
		text-align: end;
		margin-top: 40rpx;
	}

	.count-box .sign {
		color: #FF0000;
	}

	.count-box .num {
		font-size: 40rpx;
		color: #FF0000;
	}

	/* 底部任务按钮 */
	.btn-box {
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		color: #FFF;
		font-weight: bold;
		margin-top: 40rpx;
	}

	.btn-box-get {
		justify-content: center;
	}

	.btn-box .cancel,
	.btn-box .submit {
		width: 45%;
		padding: 16rpx 0;
		text-align: center;
		border-radius: 100rpx;
	}

	.btn-box .cancel {
		background-color: #C8C8C8;
		color: #666;
	}

	.btn-box .submit {
		background-color: #4B7EFE;
	}

	/* 投诉 */
	.complaint {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		box-shadow: 0 0 20rpx #4B7EFE;
		position: fixed;
		right: 40rpx;
		bottom: 100rpx;
		z-index: 999;
		color: #666;
		font-weight: bold;
	}
</style>
