//
//  MobADSDKProtocols.h
//  MobADSDK
//
//  Created by 兵伍 on 2020/5/23.
//  Copyright © 2020 兵伍. All rights reserved.
//

#ifndef MobADSDKProtocols_h
#define MobADSDKProtocols_h

#pragma mark - 激励视频
@protocol MADRewardVideoAdCallbackDelegate;
@protocol MADRewardVideoAdManagerProtocol <NSObject>
/**
* 加载激励视频
* @param vc 广告展示基于的viewController
* @param delegate 回调代理
* @param timeout 超时时间
* @param group 广告组，一般可以传@"rv1"
*/
- (void)loadRewardVideoWithViewController:(UIViewController *)vc delegate:(id<MADRewardVideoAdCallbackDelegate>)delegate timeout:(CGFloat)timeout group:(NSString *)group;
@end

#pragma mark - 横幅广告
@protocol MADBannerAdCallbackDelegate;
@protocol MADBannerAdManagerProtocol <NSObject>
/**
* 加载横幅广告
* @param frame 广告的位置和大小
* @param vc 广告展示基于的viewController
* @param delegate 回调代理
* @param interval 轮播间隔时间（30-120秒）
* @param group 广告组，一般可以传@"b1"
*/
- (void)loadBannerAdWithFrame:(CGRect)frame viewController:(UIViewController *)vc delegate:(id<MADBannerAdCallbackDelegate>)delegate interval:(NSInteger)interval group:(NSString *)group;

/**
 * 移除横幅广告
 * @param view 横幅广告视图
 */
- (void)removeBannerAd:(UIView *)view;
@end

@protocol MADBannerAdViewProtocol <NSObject>
@property (nonatomic, strong, readonly) NSString *group;
@end

#pragma mark - Draw视频广告
@protocol MADExpressDrawVideoAdCallbackDelegate;
@protocol MADExpressDrawVideoAdManagerProtocol <NSObject>
/**
* 加载Draw视频广告
* @param vc 广告展示基于的viewController
* @param delegate 回调代理
* @param count 加载个数(以实际返回的为准)
* @param size 视频宽高
* @param cfg 其他配置信息（bottomOffset:按钮距离底部距离）
* @param group 广告组，一般可以传@"dv1"
*/
- (void)loadVideoAdWithViewController:(UIViewController *)vc delegate:(id<MADExpressDrawVideoAdCallbackDelegate>)delegate adCount:(NSInteger)count adSize:(CGSize)size config:(NSDictionary *)cfg group:(NSString *)group;
@end

@protocol MADExpressDrawVideoAdProtocol <NSObject>
@property (nonatomic, strong, readonly) UIView *adView;
- (void)render;
- (void)unbind;
@end

#pragma mark - 原生模板
@protocol MADNativeExpressAdDelegete;
@protocol MADNativeExpressAdManagerProtocol <NSObject>
/**
* 加载原生模板广告
* @param count 加载个数(以实际返回的为准)
* @param width 原生广告的宽度
* @param delegate 回调代理
* @param group 广告组，一般可以传@"n1"
*/
- (void)loadNativeExpressAdWithCount:(NSInteger)count width:(CGFloat)width delegate:(id<MADNativeExpressAdDelegete>)delegate group:(NSString *)group;
/**
 * 默认与屏幕等宽
 */
- (void)loadNativeExpressAdWithCount:(NSInteger)count delegate:(id<MADNativeExpressAdDelegete>)delegate group:(NSString *)group;
@end

@protocol  MADNativeExpressAdProtocol <NSObject>
@property (nonatomic, weak, readwrite) UIViewController *viewController;
@property (nonatomic, strong, readonly) NSString *adId;
@property (nonatomic, strong, readonly) UIView *adView;
@property (nonatomic, strong, readonly) NSNumber *adHeight;
- (void)render;
@end

#pragma mark - DrawFeed视频
@protocol MADDrawFeedCallbackDelegate;
@protocol MADDrawFeedCallbackProtocol <NSObject>
/**
* 加载DrawFeed视频
* @param delegate 回调代理
* @param group 广告组，一般可以传@"dv1"
*/
- (void)loadDrawFeedWithDelegate:(id<MADDrawFeedCallbackDelegate>)delegate group:(NSString *)group;

@end

#endif /* MobADSDKProtocols_h */
