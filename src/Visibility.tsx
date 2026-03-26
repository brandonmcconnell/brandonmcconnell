import React from 'react';
import { VisibilityProps } from './types';
import { isAIBot } from './user-agents';

/**
 * Visibility component for controlling content display based on viewer type
 * 
 * @example
 * // Content only for AI agents
 * <Visibility for="agents" userAgent={userAgent}>
 *   <h1>Product Pricing</h1>
 *   <ul>
 *     <li>Starter: $29/month - 5 users, 10GB storage</li>
 *     <li>Pro: $99/month - 25 users, 100GB storage</li>
 *   </ul>
 * </Visibility>
 * 
 * @example
 * // Content only for human users
 * <Visibility for="humans" userAgent={userAgent}>
 *   <PricingSlider />
 * </Visibility>
 */
export function Visibility({ for: target, children, userAgent, className }: VisibilityProps): JSX.Element | null {
  const isBot = isAIBot(userAgent);
  
  // Show content to agents only
  if (target === 'agents' && !isBot) {
    return null;
  }
  
  // Show content to humans only
  if (target === 'humans' && isBot) {
    return null;
  }
  
  // Content should be shown
  return <div className={className}>{children}</div>;
}
