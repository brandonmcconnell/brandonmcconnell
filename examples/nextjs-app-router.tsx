/**
 * Example: Next.js App Router usage
 * 
 * This example shows how to use the Visibility component
 * with Next.js 13+ App Router and server components.
 */

import { headers } from 'next/headers';
import { Visibility } from 'visibility-component';

// Example pricing configuration
const pricingConfig = [
  {
    name: 'Starter',
    price: 29,
    features: [
      '5 users',
      '10GB storage',
      'Email support',
      'Basic analytics'
    ]
  },
  {
    name: 'Professional',
    price: 99,
    features: [
      '25 users',
      '100GB storage',
      'Priority support',
      'Advanced analytics',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'Unlimited users',
      '1TB storage',
      '24/7 dedicated support',
      'Custom integrations',
      'SSO and advanced security'
    ]
  }
];

// Example interactive pricing slider component (human-only)
function PricingSlider() {
  return (
    <div className="pricing-slider">
      <h2>Interactive Pricing Calculator</h2>
      <p>Drag the slider to see pricing for your team size</p>
      {/* Interactive slider would go here */}
    </div>
  );
}

export default async function PricingPage() {
  // Get user agent from request headers
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');

  return (
    <main>
      <h1>Pricing</h1>
      
      {/* Interactive UI for human visitors */}
      <Visibility for="humans" userAgent={userAgent}>
        <PricingSlider />
      </Visibility>

      {/* Structured, plain-text content for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <div>
          <h2>Pricing Plans</h2>
          <p>Choose the plan that best fits your needs:</p>
          
          {pricingConfig.map((plan) => (
            <div key={plan.name}>
              <h3>{plan.name} - ${plan.price}/month</h3>
              <p>Features included:</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Visibility>

      {/* Content visible to everyone */}
      <div>
        <h2>All plans include:</h2>
        <ul>
          <li>99.9% uptime SLA</li>
          <li>Data encryption at rest and in transit</li>
          <li>GDPR and SOC 2 compliance</li>
        </ul>
      </div>
    </main>
  );
}
