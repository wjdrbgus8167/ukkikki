import React, { useEffect } from 'react';
import { useLoadingStore } from '../stores/loadingStore';
import axios from 'axios';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const EasterEgg = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <h1 className="text-4xl font-bold text-green-600">kiki</h1>
      <Footer />
    </div>
  );
};

export default EasterEgg;
