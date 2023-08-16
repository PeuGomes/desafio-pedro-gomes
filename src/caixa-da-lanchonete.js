class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };

        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;

        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        let hasCafe = false;
        let hasSanduiche = false;

        const extras = {
            'chantily': 0,
            'queijo': 0
        };

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!cardapio[codigo]) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (codigo === 'cafe') {
                hasCafe = true;
            } else if (codigo === 'sanduiche') {
                hasSanduiche = true;
            } else if (extras[codigo] !== undefined) {
                extras[codigo] += parseInt(quantidade);
            } else if (!['combo1', 'combo2'].includes(codigo)) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            total += cardapio[codigo] * parseInt(quantidade);
        }

        if ((extras['chantily'] > 0 && !hasCafe) || (extras['queijo'] > 0 && !hasSanduiche)) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (formaDePagamento === 'dinheiro') {
            total *= (1 - descontoDinheiro);
        } else if (formaDePagamento === 'credito') {
            total *= (1 + acrescimoCredito);
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
