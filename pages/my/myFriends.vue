<template>
	<view>
		<view v-if="list.length==0" style="text-align: center;padding: 30rpx 0;color: #666666;">
			亲、暂无职友哦~
		</view>
		<view v-else>
			<uni-indexed-list :options="list" :show-select="true" @click="bindClick" />
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	// import airport from '@/common/airport.js'
	export default {
		components: {},
		data() {
			return {
				// list: airport.list
				list: []
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				let _this = this;
				uni.showLoading({
					title: '加载中'
				});
				service.auth2(this, service.api.friend.friendList, "GET", {}, (self, res) => {
					console.log(res);
					if (res.code = 1) {
						this.list = res.data;
					} else {
						uni.showLoading({
							title: res.info,
							duration: 2000,
							mask: true,
							icon: 'none'
						});
					}
					uni.hideLoading();
				})
			},
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			}
		}
	}
</script>

<style></style>
