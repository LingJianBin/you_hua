<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

			// #ifdef APP-PLUS
			const fmssp = uni.requireNativePlugin("FmsspVideo")
			fmssp.init({
				'appid': '2540',
				'posid': '3771',
				'appkey': 'lJAbYRjP'
			})
			// #endif

			// 开发者需要在 App 的 onLaunch 方法中调用以下代码来初始化插件：
			// // #ifdef APP-PLUS
			// const adSdk = uni.requireNativePlugin('AD-SDK')

			// adSdk.setup({
			// 	appId: 'ba0063bfbc1a5ad878',
			// 	userId: 'uid', // 用户 id
			// 	multiProcess: false, // 是否多进程，默认 false
			// 	debug: false // 是否调试模式，默认 false，请至少运行一次调试模式
			// })

			// // 推荐开发者在初始化时设置最短开屏间隔时间。如果超出此间隔时间，从后台切回 App 任意页面都会显示开屏，以提升开屏广告的曝光量：
			// // adSdk.setMinSplashInterval(3 * 60 * 1000) // 单位 ms
			// // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
