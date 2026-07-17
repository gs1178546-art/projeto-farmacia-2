'use client';

import React from 'react';
import { Edit, Trash2, Eye, ShieldAlert } from 'lucide-react';
import { Product } from '../../../types/product';
import Table from '../../ui/Table';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete
}) => {
  return (
    <Table headers={['Imagem', 'Nome / SKU', 'Categoria', 'Estoque', 'Preço', 'Ações']}>
      {products.map((product) => {
        const finalPrice = product.promoPrice || product.price;

        return (
          <tr key={product.id} className="hover:bg-slate-50/50">
            <td className="px-6 py-4 shrink-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </td>
            
            <td className="px-6 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-800 text-xs line-clamp-1">{product.name}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">{product.sku}</span>
              </div>
            </td>

            <td className="px-6 py-4 text-xs font-medium text-slate-600">{product.category}</td>
            
            <td className="px-6 py-4 text-xs font-semibold text-slate-700">
              {product.stock} un
            </td>

            <td className="px-6 py-4">
              <div className="flex flex-col gap-0.5">
                {product.promoPrice && (
                  <span className="text-[10px] text-slate-400 line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-extrabold text-teal-800">
                  R$ {finalPrice.toFixed(2)}
                </span>
              </div>
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onEdit(product)}
                  className="p-1 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-650 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default ProductsTable;
