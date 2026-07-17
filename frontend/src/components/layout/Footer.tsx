'use client';

import React from 'react';
import { useStoreConfigStore } from '../../store/storeConfigStore';

export const Footer: React.FC = () => {
  const { config } = useStoreConfigStore();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Logo & Name */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold text-lg flex items-center gap-2">
              <span>🏥</span> {config.branding.name}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sua farmácia online white-label. Segurança na compra, rapidez na entrega e o melhor programa de fidelidade com cashback garantido.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Links Úteis</h4>
            <a href="/#produtos" className="text-xs hover:text-white transition-colors">Produtos</a>
            <a href="/conta/fidelidade" className="text-xs hover:text-white transition-colors">Como funciona o Cashback</a>
            <a href="/conta" className="text-xs hover:text-white transition-colors">Acessar minha conta</a>
          </div>

          {/* ANVISA Regulatory Info */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-800 border border-slate-700/50">
            <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🛡️</span> Informações Regulatórias (ANVISA)
            </h4>
            <div className="text-[10px] leading-relaxed flex flex-col gap-1">
              <div><strong className="text-slate-200">Razão Social:</strong> {config.anvisa.corporateName}</div>
              <div><strong className="text-slate-200">CNPJ:</strong> {config.anvisa.cnpj}</div>
              <div><strong className="text-slate-200">Farmacêutico Resp.:</strong> {config.anvisa.pharmacistInCharge} ({config.anvisa.pharmacistCrf})</div>
              <div><strong className="text-slate-200">AFE ANVISA:</strong> {config.anvisa.afeNumber} | <strong className="text-slate-200">Licença:</strong> {config.anvisa.licenseNumber}</div>
              <div className="mt-1 border-t border-slate-700 pt-1 text-[9px] text-slate-500 italic">
                Medicamentos sob prescrição médica serão entregues apenas mediante retenção da receita.
              </div>
            </div>
          </div>

        </div>

        {/* Legal notice and copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} {config.branding.name}. Todos os direitos reservados.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacidade</a>
            <a href="#" className="hover:underline">Termos de Uso</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
