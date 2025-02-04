// src/pages/TravelCreate.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainLayout from '../components/TripPlanner/MainLayout';

const TravelCreate = () => {
  const travelPlan = {
    destinationCity: 'Paris',
    travelStart: '2025-03-01', // 여행 시작일
    travelEnd: '2025-03-05', // 여행 종료일 (포함)
    placeList: [
      {
        id: 1,
        name: 'Eiffel Tower',
        address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
        latitude: 48.858844, // ✅ 추가
        longitude: 2.294351, // ✅ 추가
        likes: 100,
      },
      {
        id: 2,
        name: 'Louvre Museum',
        address: 'Rue de Rivoli, 75001 Paris',
        latitude: 48.860611, // ✅ 추가
        longitude: 2.337644, // ✅ 추가
        likes: 150,
      },
      {
        id: 3,
        name: 'Notre-Dame Cathedral',
        address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
        latitude: 48.852968, // ✅ 추가
        longitude: 2.349902, // ✅ 추가
        likes: 90,
      },
      {
        id: 4,
        name: 'Montmartre',
        address: '75018 Paris',
        latitude: 48.886705, // ✅ 추가
        longitude: 2.343104, // ✅ 추가
        likes: 80,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainLayout travelPlan={travelPlan} />
      <Footer />
    </div>
  );
};

export default TravelCreate;
