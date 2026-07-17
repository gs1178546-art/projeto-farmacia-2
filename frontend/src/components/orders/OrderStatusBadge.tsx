'use client';

import React from 'react';
import { OrderStatus } from '../../types/order';
import Badge from '../ui/Badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const configs: Record<OrderStatus, { label: string; variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' }> = {
    pending: { label: 'Aguardando Aprovação', variant: 'warning' },
    accepted: { label: 'Aceito pela Loja', variant: 'info' },
    preparing: { label: 'Em Preparação', variant: 'primary' },
    shipped: { label: 'Saiu para Entrega', variant: 'warning' },
    delivered: { label: 'Entregue', variant: 'success' },
    cancelled: { label: 'Cancelado', variant: 'danger' }
  };

  const current = configs[status] || { label: status, variant: 'secondary' };

  return (
    <Badge variant={current.variant}>
      {current.label}
    </Badge>
  );
};

export default OrderStatusBadge;
