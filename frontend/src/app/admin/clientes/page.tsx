'use client';

import React, { useState } from 'react';
import { Users, Edit2, ShieldCheck, DollarSign } from 'lucide-react';
import { mockCustomers } from '../../../mocks/customers';
import { Customer } from '../../../types/customer';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';

export default function AdminCustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState('');

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !adjustAmount) return;

    const value = Number(adjustAmount);
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id
          ? { ...c, cashbackBalance: Math.max(0, c.cashbackBalance + value) }
          : c
      )
    );

    toast({
      type: 'success',
      title: 'Ajuste Realizado',
      description: `O saldo de cashback de ${selectedCustomer.name} foi atualizado.`
    });
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setAdjustAmount('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
          <Users className="w-5 h-5 text-teal-500" />
          Clientes & CRM Básico
        </h1>
        <p className="text-xs text-slate-400">Gerencie a carteira de clientes, acompanhe cashback acumulado e realize ajustes manuais.</p>
      </div>

      <Table headers={['Nome / Email', 'Documento (CPF)', 'Telefone', 'Saldo Cashback', 'Ações']}>
        {customers.map((c) => (
          <tr key={c.id} className="hover:bg-slate-50/50">
            <td className="px-6 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-800 text-xs">{c.name}</span>
                <span className="text-[10px] text-slate-500">{c.email}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-xs font-medium text-slate-650">{c.document}</td>
            <td className="px-6 py-4 text-xs text-slate-650">{c.phone}</td>
            <td className="px-6 py-4 text-xs font-bold text-emerald-600">
              R$ {c.cashbackBalance.toFixed(2)}
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => { setSelectedCustomer(c); setIsModalOpen(true); }}
                className="p-1 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer flex items-center gap-1.5 font-bold text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" /> Ajustar Saldo
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Adjust Cashback modal */}
      {isModalOpen && selectedCustomer && (
        <Modal
          isOpen={true}
          onClose={() => { setIsModalOpen(false); setSelectedCustomer(null); }}
          title={`Ajustar Saldo de Cashback - ${selectedCustomer.name}`}
          size="sm"
        >
          <form onSubmit={handleAdjustSubmit} className="flex flex-col gap-4">
            <div className="p-3 bg-slate-50 border rounded-xl text-xs flex justify-between">
              <span className="text-slate-500 font-semibold">Saldo Atual:</span>
              <span className="font-bold text-slate-800">R$ {selectedCustomer.cashbackBalance.toFixed(2)}</span>
            </div>

            <Input
              label="Valor do Ajuste (R$)"
              type="number"
              step="0.01"
              placeholder="Ex: 10.00 ou -5.00 para debitar"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
              helperText="Use valores negativos para debitar saldos do cliente."
              required
            />

            <Button type="submit" className="w-full rounded-xl">
              Confirmar Ajuste
            </Button>
          </form>
        </Modal>
      )}

    </div>
  );
}
