import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-12 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Siap Mengoptimalkan Otomasi Industri Anda?</h2>
        <p className="text-lg mb-6">
          Hubungi kami untuk solusi PLC Omron, Mitsubishi, HMI Proface, dan Jasa IoT.
        </p>
        <Link href="/contact">
          <Button size="lg" variant="secondary">
            Kontak Sekarang
          </Button>
        </Link>
      </div>
    </section>
  );
}