import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier Industrial Automation Parts - PLC, HMI, VFD Indonesia",
  description:
    "Distributor PLC Mitsubishi, HMI Proface, VFD, Safety Relay, Power Meter di jakarta",
};

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* */}
      <div className="container-industrial py-20">
        <div className="text-center space-y-8">
          <h1 className="heading-primary">Mederi Karya Indonesia</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supplier Industrial Automation Parts - PLC, HMI, VFD, Safety Relay,
            Power Meter
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="card-industrial p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary-600">
                PLC Controllers
              </h3>
              <p>Mitsubishi, Omron, Siemens - All major brands available</p>
            </div>
            <div className="card-industrial p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary-600">
                HMI Panels
              </h3>
              <p className="text-gray-600">
                Proface, Weintek, Delta, Siemens , Allen Bradley - Touch Panels
                and displays
              </p>
            </div>
            <div className="card-industrial p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary-600">
                Safety System
              </h3>
              <p className="text-gray-600">
                Pilz Safety Relays, Safety Sensors, Emergency Stop Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
