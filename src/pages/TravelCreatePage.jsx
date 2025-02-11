// src/pages/TravelCreate.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainLayout from '../components/TripPlanner/MainLayout';
import { ProposalDetailProvider } from '../contexts/ProposalDetailContext';
import { useParams } from 'react-router';

const TravelCreate = () => {
  const { travelPlanId } = useParams();
  console.log('travelPlanId:', travelPlanId);
 
  return (
    <ProposalDetailProvider travelPlanId={travelPlanId}>
        <Header />
            <MainLayout />
        <Footer />
    </ProposalDetailProvider>
  );
};
export default TravelCreate;