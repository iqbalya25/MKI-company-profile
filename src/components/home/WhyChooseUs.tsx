import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reasons = [
  { title: 'Pengalaman', description: 'Lebih dari 10 tahun di bidang otomasi industri.' },
  { title: 'Harga Kompetitif', description: 'Penawaran terbaik untuk PLC dan HMI.' },
  { title: 'Pengiriman Cepat', description: 'Pengiriman ke seluruh Indonesia.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Mengapa Memilih Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <Card key={reason.title}>
              <CardHeader>
                <CardTitle>{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
