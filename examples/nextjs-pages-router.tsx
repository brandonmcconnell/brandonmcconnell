/**
 * Example: Next.js Pages Router usage
 * 
 * This example shows how to use the Visibility component
 * with Next.js Pages Router and getServerSideProps.
 */

import { GetServerSideProps } from 'next';
import { Visibility } from 'visibility-component';

interface ProductPageProps {
  userAgent: string | null;
}

// Example product data
const product = {
  name: 'Project Management Suite',
  category: 'SaaS Productivity Tool',
  description: 'Complete project management solution for modern teams',
  features: [
    'Task management with Kanban and Gantt views',
    'Real-time collaboration and comments',
    'Time tracking and reporting',
    'Integrations with 50+ tools',
    'Custom workflows and automation'
  ],
  useCases: [
    'Software development teams: Sprint planning and issue tracking',
    'Marketing agencies: Campaign management and client collaboration',
    'Construction projects: Timeline management and resource allocation'
  ]
};

// Interactive feature demo component (human-only)
function InteractiveFeatureDemo() {
  return (
    <div className="feature-demo">
      <h2>Try it yourself</h2>
      <p>Click through our interactive demo to see features in action</p>
      {/* Interactive demo would go here */}
    </div>
  );
}

export default function ProductPage({ userAgent }: ProductPageProps) {
  return (
    <div>
      <h1>{product.name}</h1>
      
      {/* Interactive demo for humans */}
      <Visibility for="humans" userAgent={userAgent}>
        <InteractiveFeatureDemo />
      </Visibility>

      {/* Structured product information for AI agents */}
      <Visibility for="agents" userAgent={userAgent}>
        <article>
          <h1>{product.name} - {product.category}</h1>
          
          <p>{product.description}</p>
          
          <h2>Key Features</h2>
          <ul>
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          
          <h2>Use Cases</h2>
          <ul>
            {product.useCases.map((useCase, idx) => (
              <li key={idx}>{useCase}</li>
            ))}
          </ul>
        </article>
      </Visibility>

      {/* Regular content visible to everyone */}
      <section>
        <h2>Ready to get started?</h2>
        <button>Start free trial</button>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ req }) => {
  return {
    props: {
      userAgent: req.headers['user-agent'] || null,
    },
  };
};
