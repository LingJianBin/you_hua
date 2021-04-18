<template>
	<view class="container">

		<!-- 顶部模块 -->
		<view class="top-box">
			<view class="two-box">
				<view class="left-box">
					<view class="one">{{taskInfo.name}}</view>
					<view class="two">
						<view class="text desc">{{taskInfo.cname}}</view>
						<view class="text">{{taskInfo.cnames}}</view>
					</view>
				</view>
				<view class="right-box">
					<text class="normal">普通：￥{{taskInfo.novip_money}}</text>
					<text>会员：￥{{taskInfo.vip_money}}</text>
				</view>
			</view>
			<view class="three-box">
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image5.png"></image>
					<text>{{taskInfo.takenum}}人已赚</text>
				</view>
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image6.png"></image>
					<text>剩余{{taskInfo.num - taskInfo.takenum}}单</text>
				</view>
				<view class="icon-box">
					<image class="icon" src="../../static/images/task_detail/image7.png"></image>
					<text>24小时到账</text>
				</view>
			</view>
		</view>

		<!-- 用户信息 -->
		<view class="user-box">
			<view class="left-box">
				<image class="avatar" :src="takemen.avatar"></image>
				<view class="name-box">
					<view class="name">{{takemen.nickname}}</view>
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
		
		<view class="submit-box" v-if="taskInfo.tasklink != ''">
			<text>任务链接：</text>
			<view class="btn">
				<input :disabled="true" :placeholder="taskInfo.tasklink" />
				<view class="copy" @click="copy(taskInfo.tasklink)">复制链接</view>
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
				<image class="icon" mode="aspectFill" :src="item.img" v-if="item.img != '../../static/images/task_detail/image12.png'"
				 @click="previewImage(item.img)"></image>
				<image mode="aspectFill" :src="item.img1" v-if="item.img1 != '../../static/images/task_detail/image12.png'" @click="previewImage(item.img1)"></image>
			</view>
		</view>

		<!-- 提交数据 -->
		<view class="submit-box" v-if="status == 1">
			<text>提交数据</text>
			<input :disabled="true" :placeholder="taskInfo.extdata" />
		</view>
		<view class="submit-box" v-if="status != 1 && taskInfo.data != ''">
			<text>提交数据</text>
			<input :disabled="true" :placeholder="extdata" />
		</view>

		<!-- 底部任务按钮 -->
		<view class="btn-box" v-if="status == 2">
			<view class="cancel" @click="refuse">拒绝</view>
			<view class="submit" @click="check">通过</view>
		</view>

		<!-- 投诉 -->
		<view class="complaint" @click="jump('/pages/detail/complaint?id=' + recordId)" v-if="status == 4">投诉</view>

		<!-- 提交信息 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="拒绝理由" :value="refuseValue" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import service from '@/service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				user: uni.getStorageSync('user'),
				taskInfo: {},
				takemen: {},
				description: [],
				recordId: null,
				refuseValue: '',
				extdata: '',
				status: 0
			}
		},
		onLoad(options) {
			this.status = options.status
			this.recordId = options.id
			this.getData(options.id, options.taskid);
		},
		methods: {
			// 获取页面初始数据
			getData(id, taskid) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				service.auth2(this, service.api.home.taskinfo, "GET", {
					taskid: taskid
				}, (self, res) => {
					if (self.status == 1) {
						self.description = res.data.taskinfo.desction
					}
					self.taskInfo = res.data.taskinfo
				})

				service.auth(this, service.api.setting.publisherDetails, "GET", {
					id: id
				}, (self, res) => {
					if (self.status != 1) {
						self.description = res.data.record.mrimages
					}

					self.extdata = res.data.record.extdata
					self.takemen = res.data.takemen

					uni.hideLoading();
				})
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

			// 预览
			previewImage(url) {
				let urls = [];
				urls[0] = url;
				uni.previewImage({
					urls: urls
				});
			},

			// 拒绝
			refuse() {
				this.$refs.dialogInput.open();
			},

			// 通过
			check() {
				uni.showModal({
					title: '提示',
					content: '确定通过该任务吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');

							uni.showLoading({
								title: '提交中...',
								mask: true
							});

							let _this = this;

							service.auth(this, service.api.home.fixtask, "POST", {
								recordid: _this.recordId,
								type: 2
							}, (self, res) => {
								if (res.code == 1) {
									uni.showToast({
										title: res.info,
										icon: 'none',
										mask: true
									})

									setTimeout(() => {
										uni.navigateBack()
									}, 800)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			// 拒绝信息
			change(e) {
				this.upType = e.show;
			},

			// 提交拒绝信息确定
			dialogInputConfirm(done, val) {
				let _this = this;

				if (val == '') {
					uni.showToast({
						title: '请输入拒绝理由',
						icon: 'none'
					});

					return;
				}

				uni.showLoading({
					title: '提交中...',
					mask: true
				});

				service.auth(this, service.api.home.fixtask, "POST", {
					recordid: _this.recordId,
					type: 3,
					refuseremark: val
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							title: res.info,
							icon: 'none',
							mask: true
						})

						_this.$refs.dialogInput.close();

						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}
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
		padding: 0 30rpx 200rpx;
	}

	/* 顶部模块 */
	.top-box {
		background-color: #EDEDED;
		border-radius: 20rpx;
		margin-top: 40rpx;
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

	/* 底部任务按钮 */
	.btn-box {
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		color: #FFF;
		font-weight: bold;
		margin-top: 40rpx;
	}

	.btn-box view {
		width: 45%;
		padding: 16rpx 0;
		text-align: center;
		border-radius: 100rpx;
	}

	.btn-box .cancel {
		color: #666;
		background-color: #C8C8C8;
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
