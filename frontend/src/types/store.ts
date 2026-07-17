export interface StoreConfig {
  id: string;
  storeId: string;
  name: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  primaryHover: string;
  customDomain?: string;
  subdomain: string;
  // ANVISA obrigatório
  razaoSocial: string;
  cnpj: string;
  ie?: string;
  address: string;
  pharmacist: string;
  crf: string;
  afe: string;
  ae?: string;
  // Contato
  whatsapp?: string;
  email?: string;
  // Entrega
  deliveryFee: number;
  freeDeliveryAbove?: number;
  estimatedDeliveryMinutes: number;
  createdAt: string;
  updatedAt: string;
}
