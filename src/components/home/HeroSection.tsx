import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gray-900 text-white">
      <Image
        src="/images/hero-image.webp"
        alt="Industrial Automation Solutions"
        fill
        className="object-cover opacity-50"
        priority
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Supplier PLC Omron, Mitsubishi, dan HMI Proface di Jakarta
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Solusi otomasi industri terpercaya dengan harga kompetitif.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Hubungi Kami
          </Button>
        </Link>
      </div>
    </section>
  );
}