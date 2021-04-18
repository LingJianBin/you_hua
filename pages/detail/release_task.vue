<template>
	<view class="container">

		<!-- 顶部 -->
		<view class="top-box">
			<view class="title">
				<text class="star">*</text>
				<text class="text">任务标题</text>
			</view>
			<view class="title">
				<text class="star" style="opacity: 0;">*</text>
				<input class="input" type="text" v-model="name" placeholder="输入任务标题（5-20个即可）" placeholder-class="placeholder-input"
				 maxlength="20" />
			</view>
			<view class="title">
				<text class="star" style="opacity: 0;">*</text>
				<text class="text">任务链接（可选填）</text>
			</view>
			<view class="title">
				<text class="star" style="opacity: 0;">*</text>
				<input class="input" type="text" v-model="tasklink" placeholder="输入任务链接" placeholder-class="placeholder-input" />
			</view>
		</view>

		<!-- 任务类型 -->
		<picker mode="selector" :range="titleList" range-key="name" @change="selectTaskType">
			<view class="type-box">
				<view class="title">
					<text class="star">*</text>
					<text class="text">任务类型</text>
				</view>
				<view class="select">
					<view class="text">{{category}}</view>
					<image class="arrow" src="../../static/images/release_task/image1.png"></image>
				</view>
			</view>
		</picker>

		<!-- 任务步骤 -->
		<view class="step-box" v-for="(item, index) in stepList" :key="index">
			<view class="one-box" v-if="index == 0">
				<view class="box">
					<text class="star">*</text>
					<text>任务步骤</text>
				</view>
				<view class="icon-box">
					<view class="box box-right" @click="textBtn(1)">
						<image class="icon" src="../../static/images/release_task/image2.png"></image>
						<text class="icon-text">图文说明</text>
					</view>
					<view class="box" @click="textBtn(2)">
						<image class="icon" src="../../static/images/release_task/image2.png"></image>
						<text class="icon-text">收集截图</text>
					</view>
				</view>
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
			<textarea class="input" :auto-height="true" v-model="item.text" placeholder="请填写任务步骤图文说明（图片选填）" placeholder-class="placeholder-input"
			 v-if="item.status == 1" />
			<textarea class="input" :auto-height="true" v-model="item.text" placeholder="在这里说明要截取哪个页面（图片必填）" placeholder-class="placeholder-input"
			 v-if="item.status == 2" />
			<view class="four-box">
				<image mode="aspectFill" class="icon" :src="item.img" @click="uploadImage(index)"></image>
			</view>
			<image class="close" src="../../static/images/reg/close.png" v-if="index != 0" @click="deleteBtn(index)"></image>
		</view>
		
		<view class="submit-box">
			<text>提交数据（选填）</text>
			<view class="textarea">
				<textarea value="" placeholder="如：提交手机号或ID" maxlength="30" @input="submitInput" />
				<text>{{maxlength}}/30</text>
			</view>
		</view>

		<!-- 下一步 -->
		<view class="btn-box" @click="jump('/pages/detail/submit_task_order?stepList=' + JSON.stringify(stepList) + `&name=${name}&tasklink=${tasklink}&categoryid=${categoryid}&extdata=${extdata}`)">下一步</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				name: '',
				tasklink: '',
				category: '请选择',
				categoryid: -1,
				titleList: [],
				extdata: '',
				maxlength: 0,
				stepList: [{
					status: 1,
					text: '',
					img: '../../static/images/task_detail/image12.png'
				}]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 获取页面初始数据
			getData() {
				service.auth2(this, service.api.home.taskHallClassify, "GET", {}, (self, res) => {
					self.titleList = res.data
				})
			},

			// 跳转页面
			jump(url) {
				if (this.name.length < 5) {
					uni.showToast({
						title: '请输入正确的任务标题',
						icon: 'none'
					})

					return;
				}

				if (this.categoryid == -1) {
					uni.showToast({
						title: '请选择任务类型',
						icon: 'none'
					})

					return;
				}

				for (let item of this.stepList) {
					if (item.text == '') {
						uni.showToast({
							title: '请输入文字说明',
							icon: 'none'
						})

						return;
					}

					if (item.status == 2 && item.img == '../../static/images/task_detail/image12.png') {
						uni.showToast({
							title: '请上传图片',
							icon: 'none'
						})

						return;
					}
				}

				uni.navigateTo({
					url
				})
			},

			// 选择任务类型
			selectTaskType(e) {
				this.category = this.titleList[e.detail.value].name
				this.categoryid = this.titleList[e.detail.value].id
			},

			// 图文说明
			// 收集截图
			textBtn(status) {
				if (this.stepList.length == 8) {
					uni.showToast({
						title: '最多可设置8个步骤',
						icon: 'none'
					})

					return;
				}

				this.stepList.push({
					status: status,
					text: '',
					img: '../../static/images/task_detail/image12.png'
				})
			},

			// 删除步骤
			deleteBtn(index) {
				this.stepList.splice(index, 1)
			},
			
			submitInput(e) {
				this.extdata = e.detail.value
				this.maxlength = e.detail.cursor
			},
			
			// 上传图片
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
								_this.stepList[index].img = JSON.parse(res.data).data.url
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
		padding: 20rpx 30rpx 0;
	}

	/* 顶部 */
	.top-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.top-box .title {
		display: flex;
		margin-bottom: 20rpx;
	}

	.top-box .title .star {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.top-box .title .text {
		font-size: 32rpx;
		font-weight: bold;
	}

	.top-box .input {
		width: 100%;
		border-bottom: 2rpx solid #CCC;
		font-size: 32rpx;
	}

	.top-box .placeholder-input {
		font-size: 32rpx;
		color: #999;
	}

	/* 任务类型 */
	.type-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.type-box .title .star {
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.type-box .title .text {
		font-size: 32rpx;
		font-weight: bold;
	}

	.type-box .select {
		display: flex;
		align-items: center;
		padding: 4rpx 10rpx;
		border-radius: 10rpx;
	}

	.type-box .select .text {
		font-size: 32rpx;
		color: #999;
		margin-right: 20rpx;
	}

	.type-box .select .arrow {
		width: 16rpx;
		height: 30rpx;
	}

	/* 任务步骤 */
	.step-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
		position: relative;
	}

	.step-box .one-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.step-box .one-box .box {
		display: flex;
		align-items: center;
	}

	.step-box .one-box .icon-box {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.step-box .one-box .icon-box .box-right {
		margin-right: 20rpx;
	}

	.step-box .one-box .box .star {
		color: #FF0303;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.step-box .one-box .box .icon {
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}

	.step-box .one-box .box .icon-text {
		color: #FF0000;
		font-weight: normal;
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
		font-size: 28rpx;
		color: #333;
	}

	.step-box .two-box .desc {
		font-size: 28rpx;
		color: #333;
	}

	.step-box .three-box {
		font-size: 32rpx;
		color: #999;
		margin-top: 20rpx;
	}

	.step-box .four-box {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.step-box .four-box .icon {
		width: 160rpx;
		height: 160rpx;
	}

	.step-box .input {
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.step-box .placeholder-input {
		font-size: 28rpx;
		color: #999;
	}

	.step-box .close {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}
	
	.submit-box {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 30rpx;
	}
	
	.submit-box text {
		font-size: 32rpx;
	}
	
	.submit-box .textarea {
		width: 100%;
		height: 120rpx;
		position: relative;
	}
	
	.submit-box .textarea textarea {
		width: 100%;
		height: 100%;
		border-bottom: 2rpx solid #CCC;
		margin-top: 20rpx;
		font-size: 28rpx;
	}
	
	.submit-box .textarea text {
		position: absolute;
		right: 0;
		bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}

	/* 下一步 */
	.btn-box {
		width: 80%;
		background-color: #4B7EFE;
		padding: 20rpx;
		border-radius: 60rpx;
		font-size: 40rpx;
		color: #FFF;
		font-weight: bold;
		margin: 100rpx auto 200rpx;
		text-align: center;
	}
</style>
