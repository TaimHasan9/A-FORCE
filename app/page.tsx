'use client';

import { useState } from 'react';
import AtelierHeader from '@/components/AtelierHeader';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import ApproachSection from '@/components/ApproachSection';
import CraftServicesSection from '@/components/CraftServicesSection';
import TransitionSection from '@/components/TransitionSection';
import ShowcasesSection from '@/components/ShowcasesSection';
import FooterSection from '@/components/FooterSection';
import {
  AvailableStockModal,
  CommissionModal,
  PreviousBuildsModal,
} from '@/components/AtelierModals';

export default function HomePage() {
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<
    string | undefined
  >(undefined);
  const [preselectedVehicleModel, setPreselectedVehicleModel] = useState<
    string | undefined
  >(undefined);
  const [buildsOpen, setBuildsOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  const handleOpenCommission = (serviceId?: string, vehicleModel?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedVehicleModel(vehicleModel);
    setBuildsOpen(false);
    setStockOpen(false);
    setCommissionOpen(true);
  };

  const handleExploreHero = () => {
    const el = document.getElementById('philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#F4F4F1]">
      <AtelierHeader
        onOpenCommission={(serviceId) => handleOpenCommission(serviceId)}
        onOpenBuilds={() => setBuildsOpen(true)}
        onOpenStock={() => setStockOpen(true)}
      />

      <main>
        <HeroSection onExploreClick={handleExploreHero} />
        <PhilosophySection />
        <ApproachSection
          onOpenCommission={(serviceId) => handleOpenCommission(serviceId)}
        />
        <CraftServicesSection
          onOpenCommission={(serviceId) => handleOpenCommission(serviceId)}
        />
        <TransitionSection />
        <ShowcasesSection
          onOpenBuilds={() => setBuildsOpen(true)}
          onOpenStock={() => setStockOpen(true)}
        />
      </main>

      <FooterSection
        onOpenCommission={(serviceId) => handleOpenCommission(serviceId)}
        onOpenBuilds={() => setBuildsOpen(true)}
        onOpenStock={() => setStockOpen(true)}
      />

      <CommissionModal
        open={commissionOpen}
        initialServiceId={preselectedServiceId}
        initialVehicleModel={preselectedVehicleModel}
        onClose={() => setCommissionOpen(false)}
      />

      <PreviousBuildsModal
        open={buildsOpen}
        onClose={() => setBuildsOpen(false)}
        onCommissionSimilar={(vehicleTitle) =>
          handleOpenCommission(undefined, `Similar to ${vehicleTitle}`)
        }
      />

      <AvailableStockModal
        open={stockOpen}
        onClose={() => setStockOpen(false)}
        onInquireVehicle={(vehicleName) =>
          handleOpenCommission(undefined, vehicleName)
        }
      />
    </div>
  );
}
