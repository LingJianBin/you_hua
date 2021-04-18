<template>
	<view class="container">

		<view class="list" v-for="(li, index) in list" :key="index" @click="jump('../setting/information?id=' + li.id)">
			<view class="list_left">{{li.title}}</view>
			<view class="list_right">{{li.createtime}}</view>
		</view>

	</view>
</template>

<script>
	import service from '@/service.js';

	export default {
		data() {
			return {
				list: [],
				page: 1,
				last_page: 1
			}
		},
		onLoad() {
			this.load()
		},
		onReachBottom(e) {
			if (this.last_page != this.page) {
				if (this.last_page > 1) {
					this.page = Number(this.page) + 1
				} else {
					this.page = 1
				}
				this.load()
			} else {

			}
		},
		methods: {
			load() {
				service.auth(this, service.api.me.getNoticeList, "GET", {
					page: this.page,
					limit: 10,
				}, (self, res) => {
					if (res.code == 1 && res.data.data.length > 0) {
						for (let i = 0; i < res.data.data.length; i++) {
							self.list.push(res.data.data[i])
						}
					}
					self.page = res.data.current_page
					self.last_page = res.data.last_page
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
	.container {
		width: 100%;
		padding: 50rpx 30rpx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		height: 108rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		box-shadow: #F1F1F1 0 0 2rpx 2rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list_left {
		width: 350rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 32rpx;
		color: #4B7EFE;
	}

	.list_right {
		font-size: 24rpx;
		color: #999;
	}
</style>
