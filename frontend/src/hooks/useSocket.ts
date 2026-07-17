import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useOrdersStore } from '../store/ordersStore';
import { Order, OrderStatus } from '../types/order';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://api.biosaude.com';

export function useSocket(orderId?: string, onStatusUpdate?: (status: OrderStatus) => void) {
  const socketRef = useRef<Socket | null>(null);
  const updateStoreStatus = useOrdersStore((state) => state.updateOrderStatus);

  useEffect(() => {
    if (USE_MOCK) {
      // Simulação Mock local para tempo real (muda o status automaticamente para fins de teste visual)
      if (orderId) {
        const statuses: OrderStatus[] = ['pending', 'accepted', 'preparing', 'shipped', 'delivered'];
        let currentIndex = 0;

        const interval = setInterval(() => {
          if (currentIndex < statuses.length - 1) {
            currentIndex++;
            const nextStatus = statuses[currentIndex];
            updateStoreStatus(orderId, nextStatus);
            if (onStatusUpdate) {
              onStatusUpdate(nextStatus);
            }
          } else {
            clearInterval(interval);
          }
        }, 12000); // Muda de etapa a cada 12 segundos

        return () => clearInterval(interval);
      }
      return;
    }

    // Fluxo real com Socket.io
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket.io connected');
      if (orderId) {
        socket.emit('join-order-room', { orderId });
      }
    });

    socket.on('order-status-changed', (data: { orderId: string; status: OrderStatus }) => {
      if (data.orderId === orderId || !orderId) {
        updateStoreStatus(data.orderId, data.status);
        if (onStatusUpdate && data.orderId === orderId) {
          onStatusUpdate(data.status);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, onStatusUpdate, updateStoreStatus]);

  const emitStatusChange = (id: string, status: OrderStatus) => {
    if (USE_MOCK) {
      updateStoreStatus(id, status);
      if (onStatusUpdate && id === orderId) {
        onStatusUpdate(status);
      }
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit('update-order-status', { orderId: id, status });
    }
  };

  return {
    socket: socketRef.current,
    emitStatusChange
  };
}
