//
//  GMComposeMessage.m
//  goldProtoT
//
//  Created by Eduardo Quiroz on 7/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "GMComposeMessage.h"
#import <React/RCTLog.h>
#import <React/RCTBridge.h>

@implementation GMComposeMessage
static RCTRootView *_rootView;
static UIViewController *_viewController;

+ (void)  setRCTRootView:(RCTRootView *) rootView {
  _rootView = rootView;
}
+ (void)setViewController:(UIViewController *) viewController {
  _viewController = viewController;
}


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendMessage:(NSString *)phoneNumber message:(NSString *)body senderBlock:(RCTResponseSenderBlock)callback)
{
  @try {
    if (![MFMessageComposeViewController canSendText]) {
      NSLog(@"Message services are not available.");
      callback(@[[NSNull null], @{@"success": @NO, @"message" : @"Message services are not available."}]);
      return;
    }
    
    MFMessageComposeViewController* composeVC = [[MFMessageComposeViewController alloc] init];
    composeVC.messageComposeDelegate = self;
    composeVC.recipients = @[phoneNumber];
    composeVC.body = body;
    
    // Present the view controller modally.
    [_viewController presentViewController:composeVC animated:YES completion:nil];
    
    callback(@[[NSNull null], @{ @"success": @YES }]);
  } @catch (NSException *exception) {
    NSLog(@"%@", exception);
    callback(@[[NSNull null], @{ @"success": @NO, @"message": [NSString stringWithFormat:@"%@", exception] }]);
  }
}

- (void)messageComposeViewController:(nonnull MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result {
  [_viewController dismissViewControllerAnimated:YES completion:nil];
}
@end
