import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const categories = [
  { name: 'PLC', description: 'Programmable Logic Controllers', link: '/products/omron-plc' },
  { name: 'HMI', description: 'Human-Machine Interfaces', link: '/products/proface-hmi' },
  { name: 'VFD', description: 'Variable Frequency Drives', link: '/products/vfd' },
];

export default function CategoryShowcase() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Kategori Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={category.link} key={category.name}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}