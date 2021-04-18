<template>
	<view>
		<view class="pwd">
			<view class="oldpwd">
				<text>姓名</text><input v-model="mingzi" placeholder="请输入姓名" />
			</view>
			<view class="oldpwd">
				<text>身份证</text><input v-model="sfz" placeholder="请输入身份证" maxlength="18" />
			</view>
		</view>

		<view class="btn" @click="obtain">确认</view>
		<!-- 	<view style="padding: 50rpx;">
			<view style="border: 1px solid red;display: flex;justify-content: flex-start;align-items: center;">
				<view style="width: 150rpx;">身份证：</view>
				<view style="border: 1px solid blue;flex: 1;">
					<input type="text" placeholder="请输入身份证" v-model="sfz" />
				</view>
			</view>
			<view style="border: 1px solid red;display: flex;justify-content: flex-start;align-items: center;margin-top: 30rpx;">
				<view style="width: 150rpx;">姓名：</view>
				<view style="border: 1px solid blue;flex: 1;">
					<input type="text" placeholder="请输入姓名" v-model="mingzi" />
				</view>
			</view>
		</view>
		
		<view @click="obtain" style="background-color: #0279FF;border-radius: 10rpx;text-align: center;margin: 0 250rpx;color: white;padding: 20rpx 0;">开始认证</view> -->
	</view>
</template>
<script>
	import service from '@/service.js';
	// #ifdef APP-PLUS
	const APFaceDetectModule = uni.requireNativePlugin('AP-FaceDetectModule');
	// #endif

	export default {
		data() {
			return {
				sfz: '',
				mingzi: '',
				obj: {},
				certify: '',
				verifystr: ''
			}
		},
		onShow() {
			this.getMetaInfo();
		},
		methods: {
			//获取环境参数接口
			getMetaInfo: function() {
				// #ifdef APP-PLUS
				let t = APFaceDetectModule.getMetaInfo();
				this.obj = t;
				// #endif
			},

			//获取CertifyId
			obtain() {
				let _this = this;
				const aa = JSON.parse(this.obj)
				service.auth(this, service.api.me.getRealnameVerifyToken, "POST", {
					realname: this.mingzi,
					idnum: this.sfz,
					MetaInfo: aa
				}, (self, res) => {
					if (res.data.Code == 200) {
						_this.certify = res.data.ResultObject.CertifyId;
						_this.verifystr = res.data.verifystr;
						_this.verifyC();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.Code == 400 ? '参数不能为空' : res.data.Code == 401 ? '参数非法' : res.data.Code == 402 ? '应用配置不存在' : res
								.data.Code == 404 ? '认证场景配置不存在' : res.data.Code == 405 ? '您的年龄未满14周岁，不允许使用此产品' : res.data.Code == 410 ?
								'未开通服务' : res.data.Code == 411 ? 'RAM无权限' : res.data.Code == 412 ? '欠费中' : res.data.Code == 414 ? '设备类型不支持' :
								res.data.Code == 415 ? 'SDK版本不支持' : res.data.Code == 416 ? '系统版本不支持' : res.data.Code == 417 ? '无法使用刷脸服务' : res
								.data.Code == 418 ? '刷脸失败次数过多' : '系统错误'
						})
					}
				})
			},

			//调用刷脸插件
			verifyC: function() {
				// #ifdef APP-PLUS
				let _this = this;
				APFaceDetectModule.verify({
						certifyId: _this.certify
					},
					function(res) {
						_this.submitRealname()
					}
				);
				// #endif
			},


			// 实名最后的提交
			submitRealname() {
				let _this = this;
				service.auth(this, service.api.me.realname, "POST", {
					realname: _this.mingzi,
					idnum: _this.sfz,
					CertifyId: _this.certify,
					verifystr: _this.verifystr
				}, (self, res) => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '认证成功',
							mask: true
						})

						setTimeout(() => {
							uni.switchTab({
								url: '/pages/home/my'
							})
						}, 500)
					}
				})
			},
		}
	};
</script>
<style scoped>
	.pwd {
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		font-size: 32rpx;
		color: #333333;
		margin-top: 28rpx;
	}

	.pwd .oldpwd {
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		height: 86rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F4F4F4;
	}

	.oldpwd input {
		flex: 1;
		margin-left: 50rpx;
	}

	.oldpwd text {
		width: 100rpx;
	}

	.btn {
		width: 600rpx;
		height: 76rpx;
		line-height: 76rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34rpx;
		border-radius: 38rpx;
		margin: 52rpx auto 0;
		background-color: #4B7EFE;
	}
</style>
