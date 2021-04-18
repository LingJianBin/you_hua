var totalUrl = 'jinli366.com/'

var ip1 = 'http://ls1.' + totalUrl
var ip2 = 'http://ls2.' + totalUrl
var ip3 = 'http://ls3.' + totalUrl
var ip4 = 'http://ls4.' + totalUrl
var ip5 = 'http://ls5.' + totalUrl
var ip6 = 'http://ls6.' + totalUrl
var ip7 = 'http://ls7.' + totalUrl
var ip8 = 'http://ls8.' + totalUrl
var ip9 = 'http://ls9.' + totalUrl
var ip10 = 'http://ls10.' + totalUrl

var task1 = 'http://task1.' + totalUrl
var task2 = 'http://task2.' + totalUrl
var task3 = 'http://task3.' + totalUrl
var task4 = 'http://task4.' + totalUrl
var task5 = 'http://task5.' + totalUrl
var task6 = 'http://task6.' + totalUrl
var task7 = 'http://task7.' + totalUrl
var task8 = 'http://task8.' + totalUrl

// IP地址
const _api_root = 'http://www.' + totalUrl;
const _api_root_version = 'http://27.50.164.139:86/';

// 版本号
var config = {
	version: '1.0.3'
}

// 获取数据的封装函数
var auth = (self, url, method, data, _success) => {

	let token = uni.getStorageSync('token1');
	if (token == '') {
		uni.showToast({
			title: '已退出登錄，請重新登錄',
			icon: 'none',
			mask: true
		});

		uni.setStorageSync('token1', '');

		uni.reLaunch({
			url: '/pages/login/login'
		});
	}

	uni.request({
		url: url,
		header: {
			Authorization: 'Bearer ' + uni.getStorageSync('token1')
		},
		method: method,
		data: data,
		success: res => {
			if (res.data.code == 1) {
				_success(self, res.data)
			} else {
				if (res.data.code == 400) {
					uni.setStorageSync('token1', '')

					uni.reLaunch({
						url: '/pages/login/login'
					});

					setTimeout(() => {
						uni.showToast({
							title: '已退出登錄，請重新登錄',
							icon: 'none',
							mask: true
						});
					}, 500);
				} else {
					uni.showToast({
						title: res.data.info,
						icon: 'none'
					});
				}
			}
		},
		fail: err => {
			uni.showToast({
				title: '网站消息获取错误',
				icon: 'none'
			});
		}
	})
}

// 获取数据的封装函数2
var auth2 = (self, url, method, data, _success) => {

	let token = uni.getStorageSync('token2');
	if (token == '') {
		uni.showToast({
			title: '已退出登錄，請重新登錄',
			icon: 'none',
			mask: true
		});

		uni.setStorageSync('token2', '');

		uni.reLaunch({
			url: '/pages/login/login'
		});
	}

	uni.request({
		url: url,
		header: {
			Authorization: 'Bearer ' + uni.getStorageSync('token2')
		},
		method: method,
		data: data,
		success: res => {
			if (res.data.code == 1) {
				_success(self, res.data)
			} else {
				if (res.data.code == 400) {
					uni.setStorageSync('token2', '')

					uni.reLaunch({
						url: '/pages/login/login'
					});

					setTimeout(() => {
						uni.showToast({
							title: '已退出登錄，請重新登錄',
							icon: 'none',
							mask: true
						});
					}, 500);
				} else {
					uni.showToast({
						title: res.data.info,
						icon: 'none'
					});
				}
			}
		},
		fail: err => {
			uni.showToast({
				title: '网站消息获取错误',
				icon: 'none'
			});
		}
	})
}

// 时间格式是否加 0
function addZero(m) {
	return m < 10 ? '0' + m : m
}

// 将时间戳转化为日期格式
var format = timeStamp => {
	let _temp = parseInt(String(timeStamp).length < 13 ? (timeStamp * 1000) : parseInt(timeStamp));
	let time = new Date(_temp);
	let y = time.getFullYear();
	let m = time.getMonth() + 1;
	let d = time.getDate();
	let h = time.getHours();
	let mm = time.getMinutes();
	let s = time.getSeconds();
	return y + '-' + addZero(m) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(mm) + ':' + addZero(s);
}

var api = {
	login: {
		login: ip1 + 'api/login/index', //系统登录1
		login_task: task1 + 'api/login/index', //系统登录2
		logo: _api_root + "api/login/get_enter_logo", //获取网站图像
		forget: _api_root + 'api/login/forgetpwd', //忘记密码
		unbind: _api_root + 'api/login/unbind', //解除绑定
		captcha: _api_root + 'api/service/captcha', //获取验证码
		version: _api_root_version + 'api/version/version', //获取版本号
	},
	reg: {
		register: ip2 + 'api/login/register', //新用户注册//post
		code: _api_root + 'api/login/verifycode', //获取验证码
		get_user_regagree: _api_root + 'api/login/get_user_regagree', //用户协议
	},
	home: {
		index: task1 + 'api/task/index', //首页数据
		catelist: task1 + 'api/task/catelist', //二级分类列表
		qiandao: ip3 + 'api/taskbag/qiandao', //签到
		taskList: task2 + 'api/task/taskList', //任务列表
		taskHall: task3 + 'api/task/taskHall', //任务大厅
		publish_task: task4 + 'api/task/publish_task', //发布任务
		publishpage: _api_root + 'api/task/publishpage', //置顶任务单价（每小时）
		taskCancel: _api_root + 'api/task/taskCancel', //取消发布
		taskinfo: task5 + 'api/task/taskinfo', //任务详情
		take_task: _api_root + 'api/task/take_task', //领取任务
		submit_task: task6 + 'api/task/submit_task', //提交任务
		fixtask: _api_root + 'api/task/fixtask', //审核任务
		complain: _api_root + 'api/task/complain', //投诉任务
		taskManagementList: task1 + 'api/task/taskManagementList', //我的任务发布
		taskAccept: _api_root + 'api/task/taskAccept', //已接该任务列表
		myTaskList: _api_root + 'api/task/myTaskList', //任务列表
		friendList: task7 + 'api/task/friendList', //好友列表
		friendDetails: _api_root + 'api/task/friendDetails', //好友详情
		recommendFriends: ip4 + 'api/task/recommendFriends', //推荐好友
		applyList: _api_root + 'api/task/applyList', //我的好友申请列表
		disposeApply: _api_root + 'api/task/disposeApply', //处理好友申请
		friendsApply: _api_root + 'api/task/friendsApply', //发起好友申请
		deleteFriend: _api_root + 'api/task/deleteFriend', //删除好友
		cityapplypage: _api_root + 'api/charge/cityapplypage', //城市合伙人页面
		applycity: _api_root + 'api/charge/applycity', //申请合伙人
		vippage: _api_root + 'api/charge/vippage', //vip充值页面
		zcvip: _api_root + 'api/charge/zcvip', //vip充值
		TeamFriendsTow: ip5 + 'api/task/TeamFriendsTow', //我的团队贡献值
		dpFriends: ip5 + 'api/task/dpFriends', //我的团队列表
		ZYLog: ip6 + 'api/task/ZYLog', //ZY日志
		release_pool: _api_root + 'api/charge/release_pool', //释放ZY
		poolLog: ip6 + 'api/task/poolLog', //释放ZY日志
		balanceLog: ip6 + 'api/task/balanceLog', //余额日志
		zycLog: ip6 + 'api/task/zycLog', //zyc日志
		numberMoney: ip7 + 'api/task/numberMoney', //领取zyc
		waKuang: _api_root + 'api/task/waKuang', //挖矿
		invite_pbmem: _api_root + 'api/member/invite_pbmem', //公排码邀请
		activelog: ip6 + 'api/task/activlog', //贡献值记录
		agreement: _api_root + 'api/reg/agreement', //用户协议
		userprivate: _api_root + 'api/reg/userprivate', //隐私条款
		fhlist: _api_root + 'api/charge/fhlist', //4大分红模块数据
		taskHallClassify: task5 + 'api/task/taskHallClassify', //任务大厅分类
		cancel_taskrecord: _api_root + 'api/task/cancel_taskrecord', //取消任务
		complain_list: _api_root + 'api/task/complain_list', //投诉列表
		cancel_taskcomplain: _api_root + 'api/task/cancel_taskcomplain', //取消投诉
		czgold: _api_root + 'api/charge/czgold', //充值
		zcsj_member: task8 + "api/member/zcsj_member", //获取个人信息
	},
	taskPackage: {
		taskbaglist: task7 + 'api/taskbag/taskbaglist', //任务包列表
		user_taskbag: task7 + 'api/taskbag/user_taskbag', //用户已有任务包
		exchange_taskbag: _api_root + 'api/taskbag/exchange_taskbag', //兑换任务包
		taskbag_daysend: _api_root + 'api/taskbag/taskbag_daysend', //领取每日奖励
		xjlevelpage: ip8 + 'api/taskbag/xjlevelpage', //星级达人等级页面
		xjlevelup: ip8 + 'api/taskbag/xjlevelup', //升级星级达人
	},
	index: {
		user: task8 + 'api/member/info', //获取会员信息
		verifycode: _api_root + "api/member/verifycode", //获取登陆密码(内部)
		confInfo: _api_root + 'api/index/confInfo', //配置信息
		notice: _api_root + 'api/service/notice', //弹出公告
		dynamicsList: _api_root + 'api/praise/dynamicsList', //赞圈列表
		follow: _api_root + 'api/praise/follow', //关注按钮
		cancelFollow: _api_root + 'api/praise/cancelFollow', //取消关注按钮
		dynamicsLikes: _api_root + 'api/praise/dynamicsLikes', //点赞按钮
		dynamicsCancelLikes: _api_root + 'api/praise/dynamicsCancelLikes', //取消点赞按钮
		getSocialList: _api_root + 'api/social/getSocialList', //社交圈列表(未加入状态下)
		joinSocial: _api_root + 'api/social/joinSocial', //加入社交圈
		quitSocial: _api_root + 'api/social/quitSocial', //退出社交圈
		getArticleList: _api_root + 'api/social/getArticleList', //社交圈公告
		getMemberList: _api_root + 'api/social/getMemberList', //社交圈成员列表
		getSocialInfo: _api_root + 'api/social/getSocialInfo', //社交圈的信息
		articleLikes: _api_root + 'api/social/articleLikes', //社交圈点赞
		articleCancelLikes: _api_root + 'api/social/articleCancelLikes', //社交圈取消点赞
		getList: _api_root + 'api/square/getList', //获取分享文章列表
		deleteArticle: _api_root + 'api/social/deleteArticle', //删除社交圈公告

	},
	share: {
		myArticle: _api_root + 'api/square/myArticle', //获取我分享文章
		articleDetail: _api_root + 'api/square/articleDetail', //获取分享文章详情
		articleLikes: _api_root + 'api/square/articleLikes', //分享文章点赞
		articleCancelLikes: _api_root + 'api/square/articleCancelLikes', //取消分享文章点赞
		articleComplaint: _api_root + 'api/square/articleComplaint', //分享文章投诉
		releaseArticle: _api_root + 'api/square/releaseArticle', //分享文章发布
		deleteArticle: _api_root + 'api/square/deleteArticle', //分享文章删除
	},
	life: {
		store_getSlide: _api_root + 'api/store/getSlide', //商城-首页轮播图
		getGoodList: _api_root + 'api/store/getGoodList', //商城-全部商品（搜索）
		store_getHotGoodList: _api_root + 'api/store/getHotGoodList', //获取热销商品列表
		store_getGoodsDetail: _api_root + 'api/store/getGoodsDetail', //获取商品详情
		getOrderList: _api_root + 'api/store_order/getOrderList', //获取商城我的订单数据
		articleList: _api_root + 'api/article/articleList', //获取文章列表1、商学院 2、电台
		caculate: _api_root + 'api/store_order/caculate', //确认订单数据显示
		create: _api_root + 'api/store_order/create', //提交订单
		getOrderDetail: _api_root + 'api/store_order/getOrderDetail', //订单详情
		cancel: _api_root + 'api/store_order/cancel', //订单取消
		pay: _api_root + 'api/store_order/pay', //订单支付
		confirm: _api_root + 'api/store_order/confirm', //确认收货
	},
	me: {
		friends: _api_root + "api/member/inviteFriends", //获取邀请二维码
		informationCate: _api_root + "api/article/informationCate", //资讯分类
		articleList: _api_root + "api/article/articleList", //文章列表1、商学院 2、电台
		articleDetails: _api_root + 'api/article/articleDetails', //获取文章详情
		getNoticeList: _api_root + "api/service/getNoticeList", //公告列表
		getNoticeDetai: _api_root + 'api/service/getNoticeDetail', // 获取系统消息详情
		myMiningMachine: _api_root + "api/member/myMiningMachine", //我的任务
		machineCates: _api_root + "api/member/machineCates", //任务大厅
		byMiningMachine: _api_root + "api/member/byMiningMachine", //兑换任务
		setAddressDefault: _api_root + "api/member/setAddressDefault", // 设置默认地址/api/member/modifyAddress
		modifyAddress: _api_root + "api/member/modifyAddress", // 修改地址 
		deteleAddress: _api_root + "api/member/deteleAddress", // 删除地址 
		getAddress: _api_root + "api/member/getAddress", // 获取地址详细
		getAddressList: _api_root + "api/member/getAddressList", // 获取所有地址
		myTeam: _api_root + "api/member/myTeam", //团队列表
		myTeamDetail: _api_root + "api/member/myTeamDetail", //团队个人信息
		givePurchasing: _api_root + "api/order/givePurchasing", //赠送获取id昵称
		submitPurchasing: _api_root + "api/order/submitPurchasing", //确认id赠送数量
		getTransactionInfo: _api_root + "api/order/getTransactionInfo", //赠送列表
		getTransactionDetail: _api_root + "api/order/getTransactionDetail", //赠送详情
		getTransactionPay: _api_root + "api/order/getTransactionPay", //提交支付凭证,也是提交审核
		auditPassOrder: _api_root + "api/order/auditPassOrder", //审核通过
		orderComplaint: _api_root + "api/order/orderComplaint", //投诉
		orderRevoke: _api_root + "api/order/orderRevoke", //取消投诉
		getMclog: _api_root + "api/member/getMclog", //美点记录/MC
		getMdlog: _api_root + "api/member/getMdlog", //美豆记录/MD
		releaseMcvalue: _api_root + "api/member/releaseMcvalue", //释放美豆/MD
		getSociallog: _api_root + "api/member/getSociallog", //个人社交值记录
		suggestionMessage: _api_root + 'api/service/suggestionMessage', //站点留言
		submitTask: _api_root + 'api/member/submitTask', //站点留言
		getVerificationStep: _api_root + "api/member/getVerificationStep", //获取实名验证步骤
		paymentCost: _api_root + "api/member/paymentCost", //支付接口
		bindAccount: _api_root + "api/member/bindAccount", //绑定账号
		getRealnameVerifyToken: _api_root + "api/member/getRealnameVerifyToken", //获取实名提交码
		realname: _api_root + "api/member/realname", //提交实名信息
		getAddressList: _api_root + "api/member/getAddressList", //收货地址
		friendHome: _api_root + "api/praise/friendHome", // 我的赞圈数据
		myFans: _api_root + "api/praise/myFans", // 赞圈我的粉丝
		myFollow: _api_root + "api/praise/myFollow", // 赞圈我的关注
		myDynamics: _api_root + "api/praise/myDynamics", // 赞圈我的发布
		applyPartner: _api_root + 'api/service/applyPartner', //申请城市圈主
		getCityPartner: _api_root + 'api/service/getCityPartner', //城市圈主信息
		suggestionMessage: _api_root + 'api/service/suggestionMessage', //留言
		applyInfluential: _api_root + 'api/service/applyInfluential', //申请大V
		deleteDynamics: _api_root + 'api/praise/deleteDynamics', //删除动态
		workorder: _api_root + 'api/service/workorder', //反馈类型
		workorderList: _api_root + 'api/service/workorderList', //反馈记录
		submitWorkorder: _api_root + 'api/service/submitWorkorder', //提交反馈
		myContactsTopping: _api_root + 'api/charge/myContactsTopping', //我的人脉置顶
		contactsPrice: _api_root + 'api/charge/contactsPrice', //人脉置顶价格列表
		purchaseContacts: _api_root + 'api/charge/purchaseContacts', //人脉置顶服务开通
	},
	setting: {
		changePwd: _api_root + "api/member/changePwd", //修改登录密码
		changePwd2: _api_root + "api/member/changePwd2", //修改二级密码
		modifyingHead: task7 + "api/member/modifyingHead", //修改头像
		modifyingNickname: _api_root + "api/member/modifyingNickname", //修改昵称
		submit_zcsjmember: _api_root + "api/member/submit_zcsjmember", //修改个人信息
		changePayment: _api_root + "api/member/changePayment", //交换设置
		service_aboutUs: _api_root + 'api/service/aboutUs', //关于我们
		member_realname: _api_root + 'api/member/realname', //实名认证
		modifyingProfile: _api_root + 'api/member/modifyingProfile', //个人简介
		applyList: _api_root + 'api/task/applyList', //好友申请列表
		applyListPart: _api_root + 'api/task/applyListPart', //待处理请求
		disposeApply: _api_root + 'api/task/disposeApply', //处理好友申请
		publisherDetails: _api_root + 'api/task/publisherDetails', //自己发布的任务详情
	},
	friend: {
		friendList: task7 + 'api/task/friendList', //我的职友
	},
	secondary: {
		dynamicsDetail: _api_root + 'api/praise/dynamicsDetail', //赞圈评论详情
		articleDetail: _api_root + 'api/social/articleDetail', //公告评论详情
		getCommentList: _api_root + 'api/praise/getCommentList', //赞圈文章评论列表
		s_getCommentList: _api_root + 'api/social/getCommentList', //公告文章评论列表
		dynamicsReward: _api_root + 'api/praise/dynamicsReward', //赞圈打赏
		articleReward: _api_root + 'api/social/articleReward', //社交圈打赏
		complaintType: _api_root + 'api/service/complaintType', //赞圈投诉类型
		articleComplaint: _api_root + 'api/social/articleComplaint', //社交公告投诉
		dynamicsComplaint: _api_root + 'api/praise/dynamicsComplaint', //赞圈投诉
		releaseDynamics: _api_root + 'api/praise/releaseDynamics', //发布赞圈
		releaseArticle: _api_root + 'api/social/releaseArticle', //发布社交公告
		uploadImg: task6 + 'api/member/uploadImg', //上传图片
		deleteImg: task6 + 'api/member/deleteImg', //删除图片
		create: _api_root + 'api/social/create', //创建社交圈
		setSocial: _api_root + 'api/social/setSocial', //设置社交圈
		dissolutionSocial: _api_root + 'api/social/dissolutionSocial', //解散社交圈
		submitComment: _api_root + 'api/praise/submitComment', //赞圈发送评论
		s_submitComment: _api_root + 'api/social/submitComment', //赞圈发送评论
		setSocialIcon: _api_root + 'api/social/setSocialIcon', //设置社交圈圈标 ---lxj
		setSocialBanner: _api_root + 'api/social/setSocialBanner', //设置社交圈横幅 ---lxj
		transferSocial: _api_root + 'api/social/transferSocial', //转让社交圈
		friendDynamics: _api_root + 'api/praise/friendDynamics', //好友赞圈动态 
	},
	game: {
		getGuessingRanking: _api_root + 'api/social/getGuessingRanking', //赞圈排行榜
		getGuessingRules: _api_root + 'api/social/getGuessingRules', //竞猜活动规则
		getZdlog: _api_root + 'api/member/getZdlog', //获取赞豆明细
		mcExchangeZd: _api_root + 'api/social/mcExchangeZd', //兑换赞豆（mc兑换赞豆）
		zdExchangeMc: _api_root + 'api/social/zdExchangeMc', //兑换赞豆（赞豆兑换mc）
		getGuessingLog: _api_root + 'api/social/getGuessingLog', //我的战绩列表
		getGuessingDetail: _api_root + 'api/social/getGuessingDetail', //我的战绩详情
		getGuessingPeriods: _api_root + 'api/social/getGuessingPeriods', //查看往期
		guessingBet: _api_root + 'api/social/guessingBet', //竞猜投注
		getGuessingZd: _api_root + 'api/social/getGuessingZd', //竞猜奖池的数量
		getGuessingHomeInfo: _api_root + 'api/social/getGuessingHomeInfo', //竞猜首页的信息
		getGuessingRes: _api_root + 'api/social/getGuessingRes', //获取竞猜结果
		refreshGuessing: _api_root + 'api/social/refreshGuessing', //刷新实时数据
	},
	feedback: {
		workorderList: _api_root + 'api/service/workorderList', //工单列表
	},
	xingzan: {
		ConstellationIndex: _api_root + 'api/Constellation/index', // 星赞首页
		ConstellationGetConstellations: _api_root + 'api/Constellation/get_constellations', // 获取星赞碎片
		ConstellationGetRedbag: _api_root + 'api/Constellation/get_redbag', // 合成红包赞
		ConstellationFengHong: _api_root + 'api/Constellation/fenghong', // 合成分红赞
		ConstellationMyTeam: _api_root + 'api/Constellation/myteam', // 我的团队
		ConstellationWithdraw: _api_root + 'api/Constellation/withdraw', // 提现页面
		ConstellationRankingList: _api_root + 'api/Constellation/ranking_list', // 排行榜
		ConstellationCreditLog: _api_root + 'api/Constellation/creditlog', // 余额明细
		ConstellationWithdrawPage: _api_root + 'api/Constellation/withdraw_page', // 提现数据
		ConstellationWithdrawSubmit: _api_root + 'api/Constellation/withdraw_submit', // 提现数据
	},
	quanmin: {
		qmgdIndex: _api_root + 'api/qmgd/index', // 全民股东首页
		qmgdIndexList: _api_root + 'api/qmgd/index_list', // 全民股东首页赠送大厅
		qmgdOrderIndex: _api_root + 'api/qmgd/order_index', // 求购页面MC系数
		qmgdCommitOrder: _api_root + 'api/qmgd/commit_order', // 提交求购订单
		qmgdOrderMcSend: _api_root + 'api/qmgd/order_mc_send', // 接受订单任务-赠送MC
		qmgdMyOrder: _api_root + 'api/qmgd/myorder', // 我的订单（订单类型：1.我的求购单；2.我的赠送单；3.投诉单）
		qmgdOrderInfo: _api_root + 'api/qmgd/orderinfo', // 订单详情
		qmgdOrderFinish: _api_root + 'api/qmgd/order_finish', // 完成订单
		qmgdExchangeIndex: _api_root + 'api/qmgd/exchange_index', // 全民股东股权兑换页面
		qmgdStoreInfo: _api_root + 'api/qmgd/storeinfo', // 店铺详情页
		qmgdExchange: _api_root + 'api/qmgd/exchange', // 兑换股份
		qmgdCancelOrder: _api_root + 'api/qmgd/cancel_order', // 取消订单
		qmgdCancelComplain: _api_root + 'api/qmgd/cancel_complain', // 取消投诉
		qmgdMyCredit: _api_root + 'api/qmgd/mycredit', // 我的余额
		qmgdWithdrawLog: _api_root + 'api/qmgd/withdrawlog', // 提现数据
	}
}

export default {
	_api_root,
	config,
	auth,
	auth2,
	addZero,
	format,
	api
}
