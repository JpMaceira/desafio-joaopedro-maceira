class CaixaDaLanchonete {
    constructor() {
      this.cardapio = [
        { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
        { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
        { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
        { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
        { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
        { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      ];
    }
  
    calcularValorDaCompra(metodoDePagamento, itens) {
      const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];
      const descontoDinheiro = 0.05;
      const acrescimoCredito = 0.03;
  
      if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      let total = 0;
      let itensComprados = [];
  
      for (const item of itens) {
        const [codigo, quantidade] = item.split(',');
  
        const itemDoCardapio = this.cardapio.find(item => item.codigo === codigo);
  
        if (!itemDoCardapio) {
          return "Item inválido!";
        }
  
        if (itemDoCardapio.descricao.includes('extra')) {
          const itemPrincipal = this.cardapio.find(item => item.descricao.includes(itemDoCardapio.codigo));
  
          if (!itensComprados.includes(itemPrincipal.codigo)) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }
  
        total += itemDoCardapio.valor * quantidade;
        itensComprados.push(codigo);
      }
  
      if (total === 0) {
        return "Quantidade inválida!";
      }
  
      if (metodoDePagamento === 'dinheiro') {
        total -= total * descontoDinheiro;
      } else if (metodoDePagamento === 'credito') {
        total += total * acrescimoCredito;
      }
  
      return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }
  
  export { CaixaDaLanchonete };
  