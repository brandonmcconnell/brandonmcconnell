import { ReactNode } from 'react';

/**
 * Defines who should see the content
 */
export type VisibilityTarget = 'agents' | 'humans';

/**
 * Props for the Visibility component
 */
export interface VisibilityProps {
  /**
   * Target audience for the content
   * - 'agents': Content only visible to AI bots/LLMs
   * - 'humans': Content only visible to human users
   */
  for: VisibilityTarget;
  
  /**
   * The content to conditionally display
   */
  children: ReactNode;
  
  /**
   * Optional user agent string. If not provided, will attempt to detect from environment.
   * For server-side rendering (Next.js), pass the user agent from headers.
   */
  userAgent?: string | null;
  
  /**
   * Optional className to apply to the wrapper div when content is shown
   */
  className?: string;
}
