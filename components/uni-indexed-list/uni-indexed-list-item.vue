<template>
	<view>
		<view v-if="loaded || list.itemIndex < 15" class="uni-indexed-list__title-wrapper">
			<text v-if="list.items && list.items.length > 0" class="uni-indexed-list__title">{{ list.key }}</text>
		</view>
		<view v-if="(loaded || list.itemIndex < 15) && list.items && list.items.length > 0" class="uni-indexed-list__list">
			<view v-for="(item, index) in list.items" :key="index" class="uni-indexed-list__item" hover-class="uni-indexed-list__item--hover">
				<view style="display: flex;justify-content: flex-start;align-items: center;flex: 1;padding: 20rpx;">
					<view style="width: 60rpx;height: 60rpx;border-radius: 50%;overflow: hidden;">
						<!-- <image src="../../nativeplugins/AP-FaceDetectModule/ios/AliyunIdentityManager.framework/OCRXMedia.bundle/completedemo@3x.png" mode="aspectFit" style="width: 100%;height: 100%;"></image> -->
						<image :src="item.avatar" mode="aspectFit" style="width: 100%;height: 100%;"></image>
					</view>
					<view style="padding-left: 20rpx;flex: 1;">
						<view style="color: #666666;font-size: 35rpx;">{{item.nicakname}}</view>
						<view style="color: #999999;">{{item.profession}}</view>
					</view>
				</view>
				<!-- <view class="uni-indexed-list__item-container" @click="onClick(idx, index)" style="border: 1px solid red;">
					<view class="uni-indexed-list__item-border" :class="{'uni-indexed-list__item-border--last':index===list.items.length-1}">
						<view v-if="showSelect" style="margin-right: 20rpx;">
							<uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
						</view>
						<text class="uni-indexed-list__item-content">{{ item.name }}</text>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniIndexedList',
		components: {
			uniIcons
		},
		props: {
			loaded: {
				type: Boolean,
				default: false
			},
			idx: {
				type: Number,
				default: 0
			},
			list: {
				type: Object,
				default () {
					return {}
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		created() {
			// console.log(this.list)
		},
		methods: {
			onClick(idx, index) {
				this.$emit("itemClick", {
					idx,
					index
				})
			}
		}
	}
</script>

<style scoped>
	.uni-indexed-list__list {
		background-color: #ffffff;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		/* border-top-style: solid;
		border-top-width: 1px;
		border-top-color: #e5e5e5; */
	}

	.uni-indexed-list__item {
		font-size: 16px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-indexed-list__item-container {
		padding-left: 15px;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-indexed-list__item-border {
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		padding: 15px;
		padding-left: 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #e5e5e5;
	}

	.uni-indexed-list__item-border--last {
		border-bottom-width: 0px;
	}

	.uni-indexed-list__item-content {
		flex: 1;
		font-size: 14px;
	}

	.uni-indexed-list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-indexed-list__title-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		color: #333333!important;
		/* background-color: #f7f7f7; */
	}

	.uni-indexed-list__title {
		padding: 6px 12px;
		line-height: 24px;
		font-size: 28rpx;
	}
</style>