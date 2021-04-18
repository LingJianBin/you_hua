//
//  MobADExpressDrawVideoAd.h
//  MADSDK
//
//  Created by 兵伍 on 2020/4/7.
//  Copyright © 2020 兵伍. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MobADSDKProtocols.h"

//#import "MobADErrorHandler.h"

@interface MobADExpressDrawVideoAd : NSObject<MADExpressDrawVideoAdProtocol>
@property (nonatomic, strong) UIView *adView;
- (void)render;
- (void)unbind;
@end

@class MADIDConfig;
@protocol MADExpressDrawVideoAdImplementorCallback <NSObject>
- (void)drawVideoAdFinishLoad:(NSArray *)ads error:(NSError *)error config:(MADIDConfig *)config;
@end
