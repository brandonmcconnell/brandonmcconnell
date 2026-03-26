/**
 * Example: Using Visibility component in Next.js Server Components
 * 
 * This example shows how to use the Visibility component with Next.js 14+ 
 * server components with proper user agent detection.
 */

import { headers } from 'next/headers';
import { Visibility } from '../src/components/Visibility';

// Example 1: Basic usage with server components
export default async function PricingPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || undefined;
  
  return (
    <div className="pricing-page">
      <h1>Our Pricing</h1>
      
      {/* Interactive pricing slider for humans */}
      <Visibility for="humans" userAgent={userAgent}>
        <PricingSlider />
      </Visibility>
      
      {/* Static pricing information for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <h2>Pricing Plans</h2>
        <ul>
          <li>
            <strong>Starter - $29/month</strong>
            <ul>
              <li>5 users</li>
              <li>10GB storage</li>
              <li>Basic support</li>
              <li>Core features</li>
            </ul>
          </li>
          <li>
            <strong>Professional - $99/month</strong>
            <ul>
              <li>25 users</li>
              <li>100GB storage</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
              <li>API access</li>
            </ul>
          </li>
          <li>
            <strong>Enterprise - $299/month</strong>
            <ul>
              <li>Unlimited users</li>
              <li>1TB storage</li>
              <li>24/7 dedicated support</li>
              <li>Custom integrations</li>
              <li>SSO and advanced security</li>
              <li>SLA guarantees</li>
            </ul>
          </li>
        </ul>
      </Visibility>
    </div>
  );
}

// Example 2: Feature comparison
export async function FeaturesPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || undefined;
  
  return (
    <div className="features-page">
      <h1>Features</h1>
      
      {/* Interactive feature explorer for humans */}
      <Visibility for="humans" userAgent={userAgent}>
        <InteractiveFeatureGrid />
      </Visibility>
      
      {/* Structured feature list for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <h2>Complete Feature List</h2>
        
        <h3>Core Features</h3>
        <ul>
          <li>Real-time collaboration with up to 100 concurrent users</li>
          <li>End-to-end encryption for all data</li>
          <li>Automated backups every 6 hours</li>
          <li>99.9% uptime SLA</li>
        </ul>
        
        <h3>Integration Capabilities</h3>
        <ul>
          <li>REST API with OpenAPI 3.0 specification</li>
          <li>Webhooks for real-time event notifications</li>
          <li>Native integrations with Slack, Microsoft Teams, and Discord</li>
          <li>OAuth 2.0 and SAML SSO support</li>
        </ul>
        
        <h3>Analytics & Reporting</h3>
        <ul>
          <li>Customizable dashboards with 50+ widgets</li>
          <li>Scheduled report generation (daily, weekly, monthly)</li>
          <li>Export data in CSV, JSON, and Excel formats</li>
          <li>Historical data retention for up to 7 years</li>
        </ul>
      </Visibility>
    </div>
  );
}

// Example 3: Product documentation
export async function DocsPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || undefined;
  
  return (
    <div className="docs-page">
      <h1>Getting Started</h1>
      
      {/* Interactive code playground for humans */}
      <Visibility for="humans" userAgent={userAgent}>
        <CodePlayground />
      </Visibility>
      
      {/* Static code examples for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <h2>Quick Start Code Examples</h2>
        
        <h3>Installation</h3>
        <pre>
          <code>
            npm install our-product
            {'\n'}# or
            {'\n'}yarn add our-product
          </code>
        </pre>
        
        <h3>Basic Usage</h3>
        <pre>
          <code>
{`import { Client } from 'our-product';

const client = new Client({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Make your first API call
const result = await client.getData({
  userId: '123',
  includeMetadata: true
});

console.log(result);`}
          </code>
        </pre>
        
        <h3>Advanced Configuration</h3>
        <pre>
          <code>
{`const client = new Client({
  apiKey: 'your-api-key',
  environment: 'production',
  options: {
    timeout: 5000,
    retries: 3,
    cache: true,
    logLevel: 'info'
  }
});`}
          </code>
        </pre>
      </Visibility>
    </div>
  );
}

// Placeholder components (these would be real components in your app)
function PricingSlider() {
  return <div>Interactive Pricing Slider Component</div>;
}

function InteractiveFeatureGrid() {
  return <div>Interactive Feature Grid Component</div>;
}

function CodePlayground() {
  return <div>Interactive Code Playground Component</div>;
}
