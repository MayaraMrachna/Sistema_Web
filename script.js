function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Produto excluído!");
            listarProdutos(); // Atualiza a lista de produtos
        })
        .catch(error => console.error("Erro ao excluir produto:", error));
    }
}
function listarProdutos() {
    fetch("http://localhost:3000/produtos")
    .then(response => response.json())
    .then(produtos => {
        const lista = document.getElementById("productList");
        lista.innerHTML = "";
        produtos.forEach(produto => {
            const item = document.createElement("li");
            item.innerHTML = `ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$ ${produto.preco} 
                              <button onclick="excluirProduto(${produto.id})">Excluir</button>`;
            lista.appendChild(item);
        });
    })
    .catch(error => console.error("Erro ao buscar produtos:", error));
}
function excluirVenda(id) {
    if (confirm("Tem certeza que deseja excluir esta venda?")) {
        fetch(`http://localhost:3000/vendas/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Venda excluída!");
            listarVendas(); // Atualiza a lista de vendas
        })
        .catch(error => console.error("Erro ao excluir venda:", error));
    }
}
function listarVendas() {
    fetch("http://localhost:3000/vendas")
    .then(response => response.json())
    .then(vendas => {
        const lista = document.getElementById("saleList");
        lista.innerHTML = "";
        vendas.forEach(venda => {
            const item = document.createElement("li");
            item.innerHTML = `Venda #${venda.id} | Produto ID: ${venda.produto_id} | Quantidade: ${venda.quantidade} | Total: R$ ${venda.total} 
                              <button onclick="excluirVenda(${venda.id})">Excluir</button>`;
            lista.appendChild(item);
        });
    })
    .catch(error => console.error("Erro ao buscar vendas:", error));
}
 
           

document.addEventListener("DOMContentLoaded", function() {
    // Cadastro de Produtos
    const productForm = document.getElementById("productForm");

    if (productForm) {
        productForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const preco = document.getElementById("preco").value;

            fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, preco })
            })
            .then(response => response.json())
            .then(() => {
                alert("Produto cadastrado!");
                listarProdutos();
            })
            .catch(error => console.error("Erro ao cadastrar produto:", error));
        });
    }

    // Função para listar produtos

    // Registro de Vendas
    const saleForm = document.getElementById("saleForm");

    if (saleForm) {
        saleForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const produto_id = document.getElementById("produto_id").value;
            const quantidade = document.getElementById("quantidade").value;
            const botao = saleForm.querySelector("button");

            botao.disabled = true; // Desativa o botão para impedir cliques repetidos

            fetch("http://localhost:3000/vendas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ produto_id, quantidade })
            })
            .then(response => response.json())
            .then(() => {
                alert("Venda registrada com sucesso!");
                botao.disabled = false;
                listarVendas();
            })
            .catch(error => {
                console.error("Erro ao registrar venda:", error);
                botao.disabled = false;
            });
        });
    }

    // Chama as funções ao carregar a página
    listarProdutos();
    listarVendas();
});

