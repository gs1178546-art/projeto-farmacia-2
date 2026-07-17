'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../services/productService';
import { Product } from '../../../types/product';
import ProductsTable from '../../../components/admin/products/ProductsTable';
import ProductForm from '../../../components/admin/products/ProductForm';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import { useToast } from '../../../components/ui/Toast';

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreateOrUpdate = async (data: any) => {
    setFormLoading(true);
    try {
      if (selectedProduct) {
        // Mode: Update/Edit
        await updateProduct(selectedProduct.id, data);
        toast({
          type: 'success',
          title: 'Produto Atualizado',
          description: `${data.name} foi atualizado com sucesso.`
        });
      } else {
        // Mode: Create
        const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        await createProduct({
          ...data,
          slug,
          active: true
        });
        toast({
          type: 'success',
          title: 'Produto Criado',
          description: `${data.name} foi cadastrado no estoque.`
        });
      }
      setIsModalOpen(false);
      setSelectedProduct(null);
      await load();
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível salvar os dados do produto.'
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Deseja realmente remover este produto do estoque?')) return;
    try {
      await deleteProduct(id);
      toast({
        type: 'success',
        title: 'Produto Removido',
        description: 'O item foi excluído do banco de dados.'
      });
      await load();
    } catch (e) {
      console.error(e);
      toast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível deletar o produto.'
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
      
      {/* Title block */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
            <Package className="w-5 h-5 text-teal-500" />
            Gerenciamento do Catálogo (CRUD)
          </h1>
          <p className="text-xs text-slate-400">Adicione, edite e remova itens da vitrine da farmácia.</p>
        </div>
        
        <Button 
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4.5 h-4.5" /> Adicionar Produto
        </Button>
      </div>

      {/* Grid listing products */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <ProductsTable
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      {/* CRUD modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }}
          title={selectedProduct ? `Editar ${selectedProduct.name}` : 'Cadastrar Novo Produto'}
          size="lg"
        >
          <ProductForm
            onSubmit={handleCreateOrUpdate}
            defaultValues={selectedProduct || undefined}
            isLoading={formLoading}
          />
        </Modal>
      )}

    </div>
  );
}
