//
//  MobADSDKCallbackDelegates.h
//  MobADSDK
//
//  Created by 兵伍 on 2020/5/23.
//  Copyright © 2020 兵伍. All rights reserved.
//

#import "MobADSDKProtocols.h"

#ifndef MobADSDKCallbackDelegates_h
#define MobADSDKCallbackDelegates_h

// 激励视频广告回调事件
typedef NS_ENUM(NSInteger, MADRewardVideoCallbackEvent) {
    MADRewardVideoCallbackEventAdLoadSuccess,       // 加载成功
    MADRewardVideoCallbackEventAdLoadError,         // 加载失败
    MADRewardVideoCallbackEventAdDidLoadVideo,      // 视频下载成功
    MADRewardVideoCallbackEventAdWillVisible,       // 即将展现
    MADRewardVideoCallbackEventAdDidClick,          // 点击广告
    MADRewardVideoCallbackEventAdPlayFinish,        // 播放结束
    MADRewardVideoCallbackEventAdPlayError,         // 播放出错
    MADRewardVideoCallbackEventAdDidClose,          // 点击关闭
    MADRewardVideoCallbackEventAdRewardSuccess,     // 奖励成功
};

// 开屏广告回调事件
typedef NS_ENUM(NSInteger, MADSplashAdCallbackEvent) {
    MADSplashAdCallbackEventNoAd,               // 没有广告
    MADSplashAdCallbackEventAdLoadSuccess,      // 加载成功
    MADSplashAdCallbackEventAdLoadError,        // 加载出错
    MADSplashAdCallbackEventAdWillVisible,      // 即将展现
    MADSplashAdCallbackEventAdDidClick,         // 点击广告
    MADSplashAdCallbackEventAdDidClose,         // 已经关闭
    MADSplashAdCallbackEventOtherControllerDidClose,   // 广告其他页面已经关闭
};

// Banner广告回调事件
typedef NS_ENUM(NSInteger, MADBannerAdCallbackEvent) {
    MADBannerAdCallbackEventAdLoadSuccess,      // 加载成功
    MADBannerAdCallbackEventAdLoadError,        // 加载出错
    MADBannerAdCallbackEventAdWillVisible,      // 即将展现
    MADBannerAdCallbackEventAdDidClick,         // 点击广告
    MADBannerAdCallbackEventAdDidClose,         // 点击关闭
};

// banner广告尺寸
typedef NS_ENUM(NSInteger, MADBannerAdRatio) {
    MADBannerAdRatio_640x100,
    MADBannerAdRatio_600x150,
    MADBannerAdRatio_600x300,
    MADBannerAdRatio_600x400
};

// 插屏广告回调事件
typedef NS_ENUM(NSInteger, MADInterstitialAdCallbackEvent) {
    MADInterstitialAdCallbackEventAdLoadSuccess,      // 加载成功
    MADInterstitialAdCallbackEventAdLoadError,        // 加载出错
    MADInterstitialAdCallbackEventAdWillVisible,      // 即将展现
    MADInterstitialAdCallbackEventAdDidClick,         // 点击广告
    MADInterstitialAdCallbackEventAdDidClose,         // 点击关闭
};

// 插屏广告尺寸
typedef NS_ENUM(NSInteger, MADInterstitialAdSize) {
    MADInterstitialAdSize_random,
    MADInterstitialAdSize_small,
    MADInterstitialAdSize_middle,
    MADInterstitialAdSize_big,
};

typedef NS_ENUM(NSInteger, MADPlayerPlayState) {
    MADPlayerStateFailed    = 0,
    MADPlayerStateBuffering = 1,
    MADPlayerStatePlaying   = 2,
    MADPlayerStateStopped   = 3,
    MADPlayerStatePause     = 4,
    MADPlayerStateDefalt    = 5
};

#pragma mark - 开屏广告回调
@protocol MADSplashAdCallbackDelegate <NSObject>
@optional
/**
* SDK 开屏广告回调接口
* @param event MADSplashAdCallbackEvent枚举类型
* @param error 错误信息
* @param info  包含 id
*
*/
- (void)ad_splashAdCallbackWithEvent:(MADSplashAdCallbackEvent)event error:(NSError *)error andInfo:(NSDictionary *)info;
@end

#pragma mark - 激励视频广告回调
@protocol MADRewardVideoAdCallbackDelegate <NSObject>
/**
 * SDK 激励视频广告回调接口
 * @param event MADRewardVideoCallbackEvent枚举类型
 * @param error 错误信息
 * @param info  包含 id
 *
 */
- (void)ad_rewardVideoCallbackWithEvent:(MADRewardVideoCallbackEvent)event error:(NSError *)error andInfo:(NSDictionary *)info;

@end

#pragma mark- 横幅广告回调
@protocol MADBannerAdCallbackDelegate <NSObject>
@optional
/**
* SDK 横幅广告回调接口
* @param event MADBannerAdCallbackEvent枚举类型
* @param error 错误信息
* @param info  包含 id
*
*/
- (void)ad_bannerAdView:(UIView<MADBannerAdViewProtocol> *)adView callbackWithEvent:(MADBannerAdCallbackEvent)event error:(NSError *)error andInfo:(NSDictionary *)info;
@end

#pragma mark - 插屏广告回调
@protocol MADInterstitialAdCallbackDelegate <NSObject>
@optional
/**
* SDK 插屏广告回调接口
* @param event MADInterstitialAdCallbackEvent枚举类型
* @param error 错误信息
* @param info  包含 id
*
*/
- (void)ad_interstitialAdCallbackWithEvent:(MADInterstitialAdCallbackEvent)event error:(NSError *)error andInfo:(NSDictionary *)info;
@end

#pragma mark - 原生模板广告回调
@protocol MADNativeExpressAdDelegete <NSObject>
@required
// 广告加载成功/失败
- (void)ad_nativeExpressAdManager:(id<MADNativeExpressAdManagerProtocol>)manager didFinishLoad:(NSArray<id<MADNativeExpressAdProtocol>> *)ads error:(NSError *)error;

@optional

// 渲染成功
- (void)ad_nativeExpressAdViewRenderSuccess:(id<MADNativeExpressAdProtocol>)ad;

// 渲染失败
- (void)ad_nativeExpressAdViewRenderFail:(id<MADNativeExpressAdProtocol>)ad;

// 广告展示
- (void)ad_nativeExpressAdViewWillShow:(id<MADNativeExpressAdProtocol>)ad;

// 点击广告
- (void)ad_nativeExpressAdViewClicked:(id<MADNativeExpressAdProtocol>)ad;

// 点击关闭
- (void)ad_nativeExpressAdViewClosed:(id<MADNativeExpressAdProtocol>)ad reason:(NSString *)reason;
@end

#pragma mark - Draw视频广告回调
@protocol MADExpressDrawVideoAdCallbackDelegate <NSObject>
@required
// 广告加载成功/失败
- (void)ad_drawVideoAdManager:(id<MADExpressDrawVideoAdManagerProtocol>)manager didFinishLoad:(NSArray<id<MADExpressDrawVideoAdProtocol>> *)ads error:(NSError *)error;

@optional
// 广告即将展现
- (void)ad_drawVideoAdViewWillShow:(NSString *)adId;

// 广告点击
- (void)ad_drawVideoAdViewDidClick:(NSString *)adId;

// 视频播放状态改变
- (void)ad_drawVideoAdView:(NSString *)adId stateDidChanged:(MADPlayerPlayState)playerState;

// 视频播放结束
- (void)ad_drawVideoAdPlayerDidPlayFinish:(NSString *)adId error:(NSError *)error;
@end

#pragma mark - DrawFeed回调
@protocol MADDrawFeedCallbackDelegate <NSObject>
@required
/**
 * 视频开始播放
 * @param videoContent 内容模型
 * publicContentId : 内容标识
 * publicContentType : 内容类型 Unknown:未知，正常不会出现; Normal:普通信息流; Ad:SDK内部广告; Embeded:外部广告;
 */
- (void)ad_drawFeedDidStartPlay:(NSDictionary *)videoContent;

// 视频暂停播放
- (void)ad_drawFeedDidPause:(NSDictionary *)videoContent;

// 视频恢复播放

- (void)ad_drawFeedDidResume:(NSDictionary *)videoContent;
// 视频停止播放
- (void)ad_drawFeedDidEndPlay:(NSDictionary *)videoContent isFinished:(BOOL)finished;

// 视频播放失败
- (void)ad_drawFeedDidFailedToPlay:(NSDictionary *)videoContent withError:(NSError *)error;
@end

#endif /* MobADSDKCallbackDelegates_h */
