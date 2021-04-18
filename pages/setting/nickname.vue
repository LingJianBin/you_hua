<template>
	<view class="content">

		<view class="" style="padding: 0 50rpx;">
			<view class="" style="border-bottom: 2rpx solid #F4F4F4;">
				<input v-if="obj.type==1" type="text" placeholder="请输入新的昵称" v-model="nickname" />
				<input v-if="obj.type==2" type="text" placeholder="请输入新的所在地区" v-model="workcity" />
				<view v-if="obj.type==3" class="peng">
					<view style="border-bottom: 2rpx solid #F4F4F4;">
						<input type="text" placeholder="请输入新的公司名称" v-model="profession1" />
					</view>
					<view>
						<input type="text" placeholder="请输入新的职位" v-model="profession2" />
					</view>
				</view>
				<input v-if="obj.type==4" type="number" maxlength="11" placeholder="请输入新的手机号" v-model="account" />
				<input v-if="obj.type==5" type="text" placeholder="请输入新的自我介绍" v-model="remark" />
			</view>
			<view class="tip">
				{{obj.type==1?'昵称由汉字、字母、数字组成':''}}
			</view>
		</view>
		<view class="btn" style="background-color: #4B7EFE;" @click="submit()">
			确认
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				obj: {
					type: null,
					values: '',
					company: '',
					position: '',
				},
				nickname: '',
				workcity: '',
				profession1: '',
				profession2: '',
				account: '',
				remark: '',
			}
		},


		onLoad(data) {
			console.log(data);

			this.obj.type = data.type;
			const myType = this.obj.type;

			uni.setNavigationBarTitle({
				title: myType == 1 ? '昵称' : myType == 2 ? '所在地区' : myType == 3 ? '名片展示身份' : myType == 4 ? '手机号' : '自我介绍'
			})
		},
		methods: {
			aps() {
				setTimeout(function() {
					uni.navigateBack()
				}, 1000)
			},
			submit() {
				const _this = this;
				const myType = this.obj.type;

				if (myType == 1) {
					if (_this.nickname == '') {
						uni.showToast({
							title: '请输入新的昵称',
							duration: 2000,
							icon: 'none'
						})
						return
					}

					// var regu = \u4e00-\u9fa5_a-zA-Z0-9_/
					// var re = new RegExp(regu);

					uni.request({
						url: service.api.setting.modifyingNickname,
						method: 'POST',
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token1')
						},
						data: {
							nickname: _this.nickname
						},
						success(res) {
							console.log(res);
							if (res.data.code == 1) {
								_this.aps();
							}
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon: 'none'
							})
						}
					})
				} else if (myType == 2) {
					if (_this.workcity == '') {
						uni.showToast({
							title: '请输入新的所在地区',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
						workcity: _this.workcity
					}, (self, res) => {
						// console.log(res);
						uni.showToast({
							title: res.info,
							duration: 2000,
							icon: 'none'
						})
						if (res.data.code == 1) {
							_this.aps();
						}
					})
				} else if (myType == 3) {
					if (this.profession1 == '') {
						uni.showToast({
							title: '请输入新的公司名称',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					if (_this.profession2 == '') {
						uni.showToast({
							title: '请输入新的职位',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
						profession: _this.profession1 + _this.profession2
					}, (self, res) => {
						// console.log(res);
						uni.showToast({
							title: res.info,
							duration: 2000,
							icon: 'none'
						})
						if (res.data.code == 1) {
							_this.aps();
						}
					})
				} else if (myType == 4) {
					if (_this.account == '') {
						uni.showToast({
							title: '请输入新的手机号',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
						account: _this.account
					}, (self, res) => {
						// console.log(res);
						uni.showToast({
							title: res.info,
							duration: 2000,
							icon: 'none'
						})
						if (res.data.code == 1) {
							_this.aps();
						}
					})
				} else if (myType == 5) {
					if (_this.remark == '') {
						uni.showToast({
							title: '请输入新的自我介绍',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					service.auth(this, service.api.setting.submit_zcsjmember, "POST", {
						remark: _this.remark
					}, (self, res) => {
						// console.log(res);
						uni.showToast({
							title: res.info,
							duration: 2000,
							icon: 'none'
						})
						if (res.data.code == 1) {
							_this.aps();
						}
					})
				}

			}
		}
	}
</script>

<style scoped>
	.btn {
		height: 76rpx;
		line-height: 76rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34rpx;
		border-radius: 38rpx;
		margin: 60rpx 50rpx 0;
		background: #ff8426;
	}

	.tip {
		font-size: 32rpx;
		color: #333333;
		margin-top: 20rpx;
	}

	input {
		height: 110rpx;
	}
</style>
