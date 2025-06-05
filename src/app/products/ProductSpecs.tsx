// src/components/products/ProductSpecs.tsx
import { ProductSpecification } from "@/types/product";

interface ProductSpecsProps {
  specifications: ProductSpecification[];
}

const ProductSpecs = ({ specifications }: ProductSpecsProps) => {
  // Default specifications if none provided
  const defaultSpecs: ProductSpecification[] = [
    { name: "Brand", value: "Contact for details" },
    { name: "Model", value: "See product title" },
    { name: "Type", value: "Industrial Automation Component" },
    { name: "Application", value: "Industrial automation systems" },
    { name: "Support", value: "Technical support included" },
    { name: "Warranty", value: "Manufacturer warranty" },
  ];

  const displaySpecs = specifications && specifications.length > 0 ? specifications : defaultSpecs;

  if (!displaySpecs || displaySpecs.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">
          Detailed specifications will be provided upon request.
        </p>
        <p className="text-sm text-gray-500">
          Contact our engineering team for complete technical documentation and specifications.
        </p>
      </div>
    );
  }

  // Group specifications into columns for better layout
  const midPoint = Math.ceil(displaySpecs.length / 2);
  const leftColumn = displaySpecs.slice(0, midPoint);
  const rightColumn = displaySpecs.slice(midPoint);

  return (
    <div className="space-y-6">
      {/* Specifications Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Technical Specifications
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* Left Column */}
          <div className="divide-y divide-gray-200">
            {leftColumn.map((spec, index) => (
              <SpecificationRow key={index} specification={spec} />
            ))}
          </div>

          {/* Right Column */}
          {rightColumn.length > 0 && (
            <div className="divide-y divide-gray-200">
              {rightColumn.map((spec, index) => (
                <SpecificationRow key={index} specification={spec} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Need More Detailed Specifications?
            </h4>
            <p className="text-sm text-blue-800">
              Our engineering team can provide complete technical documentation, wiring diagrams, 
              compatibility charts, and application-specific specifications upon request.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Support Notice */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-teal-900 mb-1">
              Technical Support Included
            </h4>
            <p className="text-sm text-teal-800">
              Parameter setting, configuration assistance, and troubleshooting support 
              included with every purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Specification Row Component
function SpecificationRow({ specification }: { specification: ProductSpecification }) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <dt className="text-sm font-medium text-gray-600 min-w-0 flex-1 pr-4">
          {specification.name}
        </dt>
        <dd className="text-sm text-gray-900 text-right min-w-0 flex-1">
          <span className="font-medium">
            {specification.value}
            {specification.unit && (
              <span className="text-gray-500 ml-1">{specification.unit}</span>
            )}
          </span>
        </dd>
      </div>
    </div>
  );
}

export default ProductSpecs;