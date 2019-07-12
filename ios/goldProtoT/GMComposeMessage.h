//
//  GMComposeMessage.h
//  goldProtoT
//
//  Created by Eduardo Quiroz on 7/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTRootView.h>

@import MessageUI;

NS_ASSUME_NONNULL_BEGIN

@interface GMComposeMessage : NSObject<RCTBridgeModule, MFMessageComposeViewControllerDelegate>
+ (void)setRCTRootView:(RCTRootView *) rootView;
+ (void)setViewController:(UIViewController *) viewController;
@end

NS_ASSUME_NONNULL_END
