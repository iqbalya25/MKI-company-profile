import Link from "next/link";
import Image from "next/image";
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      {/* Just add these 3 simple classes: h-full flex flex-col */}
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
        {service.images && service.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={
                service.images[0].startsWith("//")
                  ? `https:${service.images[0]}`
                  : service.images[0]
              }
              alt={service.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {service.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-teal-600 text-white">Featured</Badge>
              </div>
            )}
          </div>
        )}

        {/* Add flex-1 to this div so it takes remaining space */}
        <div className="p-6 flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-600 transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {service.shortDescription}
          </p>

          {service.features && service.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{service.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          {/**/}
          <div className="flex items-center text-teal-600 font-medium group-hover:gap-2 transition-all">
            Learn More
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
