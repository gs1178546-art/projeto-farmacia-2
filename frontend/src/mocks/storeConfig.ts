import { StoreConfig } from '../types/store';

export const mockStoreConfig: StoreConfig = {
  id: 'store-1',
  subdomain: 'biosaude-matriz',
  branding: {
    name: 'BioSaúde Farmácia',
    logoUrl: '/images/logo-placeholder.png',
    primaryColor: '#0f766e', // Teal 700
    secondaryColor: '#0d9488', // Teal 600
    themeMode: 'light'
  },
  anvisa: {
    corporateName: 'BioSaúde Drogarias e Perfumaria Ltda',
    cnpj: '12.345.678/0001-99',
    pharmacistInCharge: 'Dra. Ana Paula Medeiros',
    pharmacistCrf: 'CRF-SP 45678',
    afeNumber: '7.12345.6',
    licenseNumber: 'L-SP-998877',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, CEP 01310-100'
  },
  deliveryFee: 7.00,
  minOrderValue: 20.00,
  active: true
};
