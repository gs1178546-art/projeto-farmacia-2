'use client';

import React from 'react';
import { ShieldAlert, Printer, Phone, MapPin, CreditCard } from 'lucide-react';
import { Order, OrderStatus } from '../../../types/order';
import Modal from '../../ui/Modal';
import OrderStatusBadge from '../../orders/OrderStatusBadge';
import Button from '../../ui/Button';

interface OrderDetailModalProps {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  order,
  onClose,
  onUpdateStatus
}) => {
  const hasControlled = order.items.some((i) => i.productId === 'prod-2');

  const handleStatusChange = (status: OrderStatus) => {
    onUpdateStatus(order.id, status);
  };

  const statusOptions: { label: string; value: OrderStatus }[] = [
    { label: 'Pendente', value: 'pending' },
    { label: 'Aceito / Preparar', value: 'preparing' },
    { label: 'Saiu para Entrega', value: 'shipped' },
    { label: 'Entregue', value: 'delivered' },
    { label: 'Cancelar Pedido', value: 'cancelled' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalhes do Pedido ${order.id}`}
      size="lg"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1 rounded-xl">
            <Printer className="w-4 h-4" /> Imprimir Via
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose} className="rounded-xl">
            Fechar Detalhes
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left column details */}
        <div className="flex flex-col gap-4">
          {/* Status and core metadata */}
          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-slate-50 border border-slate-150">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Status do Pedido</span>
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="mt-2.5 flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-slate-700">Alterar Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Cliente & Entrega</h4>
            
            <div className="text-xs flex flex-col gap-2 text-slate-650">
              <div className="flex gap-2 items-start">
                <Printer className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">{order.customerName}</span>
                  <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5" /> {order.customerPhone}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-start border-t border-slate-100 pt-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Endereço de Entrega:</span>
                  <p className="text-slate-500 leading-normal mt-0.5">
                    {order.address.street}, nº {order.address.number} {order.address.complement && `(${order.address.complement})`}<br />
                    {order.address.neighborhood} - {order.address.city} / {order.address.state}<br />
                    CEP: {order.address.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column items details */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Itens do Pedido</h4>

          <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-1">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-3 items-center text-xs">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-50 border shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-slate-800 line-clamp-1">{item.name}</span>
                  <span className="text-slate-500 text-[10px]">Qtd: {item.quantity} &times; R$ {item.price.toFixed(2)}</span>
                </div>
                <span className="font-bold text-slate-800">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Controlled warning banner */}
          {hasControlled && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 p-3 rounded-xl text-[10px] text-red-750">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-650 mt-0.5" />
              <div>
                <span className="font-bold block">Medicamento Especial Controlado</span>
                <p className="mt-0.5">Este pedido exige verificação física e retenção da receita médica na entrega.</p>
              </div>
            </div>
          )}

          {/* Financial summary details */}
          <div className="border-t border-slate-150 pt-3 flex flex-col gap-1.5 text-xs text-slate-650">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-805">R$ {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega</span>
              <span className="font-semibold text-slate-805">R$ {order.deliveryFee.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Desconto de Cashback</span>
                <span>- R$ {order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-1.5 text-sm font-extrabold text-teal-800">
              <span>Total Pago</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default OrderDetailModal;
