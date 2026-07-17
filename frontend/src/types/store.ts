export interface StoreBranding {
  name: string;
  logoUrl?: string;
  primaryColor: string; // Hexadecimal ou classe Tailwind CSS
  secondaryColor: string;
  themeMode: 'light' | 'dark' | 'custom';
}

export interface StoreAnvisa {
  corporateName: string; // Razão Social
  cnpj: string;
  pharmacistInCharge: string; // Farmacêutico Responsável
  pharmacistCrf: string; // CRF do farmacêutico
  afeNumber: string; // Autorização de Funcionamento (AFE) da ANVISA
  licenseNumber: string; // Licença Sanitária Municipal/Estadual
  address: string;
}

export interface StoreConfig {
  id: string;
  subdomain: string;
  branding: StoreBranding;
  anvisa: StoreAnvisa;
  deliveryFee: number;
  minOrderValue: number;
  active: boolean;
}
