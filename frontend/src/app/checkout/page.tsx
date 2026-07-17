'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import { useToast } from '../../components/ui/Toast';
import AddressForm, { AddressFormData } from '../../components/checkout/AddressForm';
import PaymentStep, { PaymentMethodType } from '../../components/checkout/PaymentStep';
import OrderSummary from '../../components/checkout/OrderSummary';
import LoyaltyRedemption from '../../components/checkout/LoyaltyRedemption';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated, loginCustomer } = useAuth();
  const { placeOrder } = useOrders();
  const { toast } = useToast();

  // Steps state: 'auth' | 'address' | 'payment'
  const [step, setStep] = useState<'auth' | 'address' | 'payment'>(
    isAuthenticated ? 'address' : 'auth'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [address, setAddress] = useState<AddressFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('mercado_pago');
  const [appliedCashback, setAppliedCashback] = useState(0);

  // Auth handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !document) return;
    setLoginLoading(true);
    try {
      await loginCustomer(email, document);
      toast({
        type: 'success',
        title: 'Bem-vindo(a)!',
        description: 'Autenticação concluída com sucesso.'
      });
      setStep('address');
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Falha ao autenticar. Tente novamente.'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Address Submit
  const handleAddressSubmit = (data: AddressFormData) => {
    setAddress(data);
    setStep('payment');
  };

  // Final Order placement
  const handleConfirmOrder = async () => {
    if (!user || !address) return;
    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      }));

      const deliveryFee = 7.00;
      const total = Math.max(0, subtotal + deliveryFee - appliedCashback);

      const created = await placeOrder({
        storeId: 'store-1',
        customerId: user.id,
        customerName: user.name,
        customerPhone: user.phone,
        items: orderItems,
        subtotal,
        deliveryFee,
        discount: appliedCashback,
        total,
        address: {
          ...address,
          complement: address.complement || undefined
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'mercado_pago' ? 'paid' : 'pending'
      });

      // Se usou cashback, atualiza balance local do usuário
      if (appliedCashback > 0) {
        user.cashbackBalance = Math.max(0, user.cashbackBalance - appliedCashback);
      }
      
      // Credita o novo cashback (5% sobre o subtotal)
      const earned = Number((subtotal * 0.05).toFixed(2));
      user.cashbackBalance += earned;

      clearCart();
      toast({
        type: 'success',
        title: 'Pedido Confirmado!',
        description: `Código do pedido: ${created.id}`
      });
      
      router.push(`/pedido/confirmado?id=${created.id}`);
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro no checkout',
        description: 'Não foi possível registrar seu pedido.'
      });
    }
  };

  if (items.length === 0 && step !== 'payment') {
    return (
      <div className="py-20 text-center flex flex-col gap-4 items-center">
        <span className="text-slate-400 font-bold text-sm">Seu carrinho está vazio</span>
        <Button variant="primary" onClick={() => router.push('/')} className="rounded-xl">
          Voltar para Home
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Forms Flow Columns */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
        
        {/* Progress headers */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-2 pb-4 border-b border-slate-50">
          <span className={step === 'auth' ? 'text-teal-700' : 'text-slate-500'}>1. Identificação</span>
          <span>&rarr;</span>
          <span className={step === 'address' ? 'text-teal-700' : 'text-slate-500'}>2. Endereço</span>
          <span>&rarr;</span>
          <span className={step === 'payment' ? 'text-teal-700' : 'text-slate-500'}>3. Pagamento</span>
        </div>

        {/* Step 1: Auth/Identificação */}
        {step === 'auth' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-700" /> Identifique-se para continuar
            </h3>
            
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 max-w-md w-full">
              <Input
                label="E-mail"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="CPF (apenas números)"
                placeholder="123.456.789-00"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
              
              <Button type="submit" isLoading={loginLoading} className="rounded-xl mt-2 py-2.5">
                Entrar e Continuar
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Address Delivery */}
        {step === 'address' && (
          <AddressForm 
            onSubmit={handleAddressSubmit} 
            defaultValues={address || undefined}
          />
        )}

        {/* Step 3: Payment select & Cashback apply */}
        {step === 'payment' && (
          <div className="flex flex-col gap-6">
            {/* Loyalty Balance Redemption box */}
            <LoyaltyRedemption
              orderSubtotal={subtotal}
              appliedAmount={appliedCashback}
              onApplyCashback={setAppliedCashback}
            />

            {/* Payment Method Selector */}
            <PaymentStep
              selectedMethod={paymentMethod}
              onChangeMethod={setPaymentMethod}
              onBack={() => setStep('address')}
              onConfirm={handleConfirmOrder}
            />
          </div>
        )}

      </div>

      {/* Right Column Order summary */}
      <div className="flex flex-col gap-4">
        <OrderSummary cashbackDiscountApplied={appliedCashback} />
        
        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-semibold mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Gateway processado de forma criptografada
        </div>
      </div>

    </div>
  );
}
