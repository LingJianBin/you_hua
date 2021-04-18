<template>
	<view class="container">

		<view class="box">
			<view class="box_pdd">
				<text>头像</text>
				<view class="avatar-box">
					<cropper selWidth="600rpx" selHeight="600rpx" @upload="myUpload" :avatarSrc="details.avatar==''?imgurl:details.avatar"
					 quality="0.8" avatarStyle="width:80rpx;height:80rpx;border-radius: 50%;"></cropper>
					<!-- <image class="avatar" :src="details.avatar"></image> -->
					<image class="arrow" src="../../static/images/setting/arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box_pdd">
				<text>真实姓名</text>
				<view class="avatar-box">
					<text class="content">{{details.realname}}</text>
					<!-- <image class="arrow" src="../../static/images/setting/arrow.png"></image> -->
				</view>
			</view>
		</view>
		<view class="box" @click="jump('/pages/setting/nickname?type=1')">
			<view class="box_pdd">
				<text>昵称</text>
				<view class="avatar-box">
					<text class="content">{{user.nickname}}</text>
					<image class="arrow" src="../../static/images/setting/arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box_pdd">
				<text>性别</text>
				<view class="avatar-box">
					<view class="pat sex" style="">
						<view class="sex_lis" v-for="(item, index) in sex" :key="index" :data-index="index+1" @tap="childs">
							<view class="sex_lis_co" v-show="item.gender!=details.sex"></view>
							<view class="sex_lis_coItem" v-show="item.gender==details.sex"></view>
							<view class="sex_lis_nc">{{item.text}}</view>
						</view>
					</view>
					<!-- <image class="arrow" src="../../static/images/setting/arrow.png"></image> -->
				</view>
			</view>
		</view>
		<!-- <view class="box" @click="jump('/pages/setting/nickname?type=2')"> -->
		<view class="box" @click="showMulLinkageTwoPicker">
			<view class="box_pdd">
				<text>所在地区</text>
				<view class="avatar-box" style="flex: 1;padding-left: 50rpx;">
					<text class="content" style="">{{details.workcity}}</text>
					<view>
						<image class="arrow" src="../../static/images/setting/arrow.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="box" @click="jump('/pages/setting/nickname?type=3')">
			<view class="box_pdd">
				<text>名片展示身份</text>
				<view class="avatar-box" style="flex: 1;padding-left: 50rpx;">
					<text class="content" style="">{{details.profession}}</text>
					<view>
						<image class="arrow" src="../../static/images/setting/arrow.png"></image>
					</view>
				</view>
			</view>
		</view>



		<view class="box" @click="jump('/pages/setting/nickname?type=4')">
			<view class="box_pdd">
				<text>手机号</text>
				<view class="avatar-box">
					<text class="content">{{details.account}}</text>
					<image class="arrow" src="../../static/images/setting/arrow.png"></image>
				</view>
			</view>
		</view>

		<view class="hr"></view>

		<view class="box" @click="jump('/pages/setting/nickname?type=5')">
			<view class="box_pdd">
				<text>自我介绍</text>
				<view class="avatar-box" style="flex: 1;padding-left: 50rpx;justify-content: flex-end;">
					<view class="content">{{details.remark}}</view>
					<view>
						<image class="arrow" src="../../static/images/setting/arrow.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 
		<view style="padding: 50rpx 30rpx;">
			<view style="flex: 1;background-color: #3a78ff;padding: 20rpx 0;text-align: center;color: white;border-radius: 10rpx;">保存</view>
		</view> -->


		<view class="mpvue-picker">
			<!-- <view class="uni-padding-wrap uni-common-mt">
				<view style="uni-title">选中的值 : </view>
				<view class="uni-textarea uni-common-mt">
					<textarea :value="pickerText" disabled placeholder="请点击下面的按钮进行选择"></textarea>
				</view>
				<view class="uni-btn-v">
					<button type="default" @click="showSinglePicker">单列选择</button>
					<button type="default" @click="showMulLinkageTwoPicker">二级联动</button>
					<button type="default" @click="showMulLinkageThreePicker">三级城市联动</button>
				</view>
			</view> -->
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	
	import cropper from "../../components/cropper.vue";
	import mpvuePicker from '@/components/city/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/city/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/components/city/city.data.js';

	export default {
		components: {
			cropper,
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				user: {},
				details: {},
				// user: {},
				indexs: 0,
				sex: [{
						text: '男',
						gender: 1
					},
					{
						text: '女',
						gender: 2
					}
				],
				imgurl: '../../static/images/my/image36.png',


				title: "mpvue-picker 使用示例",
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			}
		},
		onShow() {
			this.getIfon();
			this.getData();
		},
		onLoad() {
			const _this = this;
			uni.$on('onConfirm',(data)=>{
				console.log(data)
				service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
					workcity: data.label
				}, (self, res) => {
					console.log(res);
					uni.showToast({
						title: res.info,
						duration: 2000,
						icon: 'none'
					})
					if(res.code==1){
						_this.getData();
					}
				})
			})
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			// showSinglePicker() {
			// 	this.pickerValueArray = this.pickerSingleArray
			// 	this.mode = 'selector'
			// 	this.deepLength = 1
			// 	this.pickerValueDefault = [0]
			// 	this.$refs.mpvuePicker.show()
			// },
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			// 三级联动选择
			// showMulLinkageThreePicker() {
			// 	this.$refs.mpvueCityPicker.show()
			// },
			onConfirm(e) {
				console.log(e)
				// this.pickerText = JSON.stringify(e)
				this.details.workcity=e.label;
				console.log(this.details)
			},
			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},
			// () {
			//     if (this.$refs.mpvuePicker.showPicker) {
			//         this.$refs.mpvuePicker.pickerCancel()
			//     }
			//     if (this.$refs.mpvueCityPicker.showPicker) {
			//         this.$refs.mpvueCityPicker.pickerCancel()
			//     }
			// }

			// 上传头像
			myUpload(rsp) {
				const self = this;
				// console.log(rsp);
				self.details.avatar = rsp.path;
				uni.uploadFile({
					url: service.api.setting.modifyingHead,
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token2')
					},
					filePath: self.details.avatar,
					name: 'file',
					success(res) {
						var res = JSON.parse(res.data)
						console.log(res)
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.info
							})
							self.getData();
							uni.request({
								url: service.api.index.user,
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token2')
								},
								success(res) {
									uni.setStorageSync('user', res.data.data.member)
									console.log(res.data.data.member)
								}
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.info
							})
						}

					}
				})
			},
			// 获取会员信息
			getIfon() {
				service.auth2(this, service.api.index.user, "GET", {}, (self, res) => {
					if (res.code == 1) {
						this.user = res.data.member;
					} else {
						uni.showToast({
							title: res.info,
							icon: 'none'
						})
					}
				})
			},
			//初始化个人信息
			getData() {
				let _this = this;
				uni.request({
					url: service.api.home.zcsj_member,
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token2')
					},
					success(res) {
						_this.details = res.data.data;
					}
				})
			},
			// 跳转页面
			jump(url) {
				let _this = this;
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

			childs(e) {
				// console.log(e.currentTarget.dataset)

				this.details.sex = e.currentTarget.dataset.index
				// this.indexs = e.currentTarget.dataset.index;
				this.gender = e.currentTarget.dataset.gender;

				service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
					sex: this.details.sex
				}, (self, res) => {
					console.log(res);
					if (res.code == 1) {
						this.getData()
					}
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	image {
		display: block;
	}

	.hr {
		width: 100%;
		padding: 10rpx 0;
		background-color: #F2F2F2;
	}

	.container {
		// padding: 0 30rpx;
	}

	.box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #F2F2F2;
		padding: 40rpx 0;
	}

	.box_pdd {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
	}

	.box text {
		color: #666;
	}

	.box .arrow {
		width: 40rpx;
		height: 40rpx;
	}

	.box .avatar-box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.box .avatar-box .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.box .avatar-box .content {
		color: #333;
		display: block;
		word-break: break-all;
	}


	.pat {
		flex: 1;
	}

	.pat input {
		height: 58rpx;
		color: rgb(54, 54, 54);
		font-size: 30rpx;
		// border: 1px solid red;
	}

	.sex {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.sex_lis {
			// border: 1px solid blue;
			display: flex;
			height: 58rpx;
			line-height: 48rpx;
			margin-left: 44rpx;

			.sex_lis_co {
				width: 34rpx;
				height: 34rpx;
				border: 2rpx solid rgb(204, 204, 204);
				border-radius: 50%;
				margin-top: 10rpx;
			}

			.sex_lis_coItem {
				width: 34rpx;
				height: 34rpx;
				border-radius: 50%;
				margin-top: 10rpx;
				background-image: url('../../static/images/my/dui.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

			.sex_lis_nc {
				color: #a1a1a1;
				font-size: 30rpx;
				padding-left: 20rpx;
			}
		}
	}
</style>
