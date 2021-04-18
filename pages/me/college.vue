<template>
	<view class="container">

		<view class="list" v-for="(item, index) in list" :key="index" @click="skip(item.id)">
			<view class="top">
				<image :src="item.thumb"></image>
				<view class="text">
					<text class="title">{{item.title}}</text>
					<text>{{item.desc}}</text>
				</view>
				<view>{{item.read}}阅读</view>
			</view>
			<view class="btm">{{item.updatetime}}</view>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		data() {
			return {
				list: [],
				limit: 15,
				page: 1
			}
		},
		onShow() {
			this.list = []
			this.load()
		},
		onReachBottom() {
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
			// 加载页面初始数据
			load() {
				service.auth(this, service.api.me.articleList, "GET", {
					cate_id: 1,
					page: this.page,
					limit: this.limit
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
			skip(id) {
				uni.navigateTo({
					url: '../setting/school?id=' + id
				});
			},
		}
	}
</script>

<style>
	.container {
		padding: 30rpx;
	}

	.list {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx #CCC;
		margin-bottom: 30rpx;
		font-size: 24rpx;
		color: #999;
	}

	.list .top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.list .top image {
		width: 100rpx;
		height: 100rpx;
	}

	.list .top .text {
		width: 360rpx;
		display: flex;
		flex-direction: column;
	}

	.list .top .text text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.list .top .text .title {
		font-size: 28rpx;
		color: #000;
		font-weight: bold;
	}

	.list .btm {
		text-align: end;
	}
</style>
