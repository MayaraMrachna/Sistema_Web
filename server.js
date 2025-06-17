const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL)");
  db.run("CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY, produto_id INTEGER, quantidade INTEGER, total REAL, FOREIGN KEY(produto_id) REFERENCES produtos(id))");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;
  db.run("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [nome, preco], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nome, preco });
  });
});

app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/vendas", (req, res) => {
    const { produto_id, quantidade } = req.body;

    // Verificar se os valores enviados são válidos
    if (!produto_id || !quantidade || quantidade <= 0) {
        return res.status(400).json({ error: "Dados inválidos para venda" });
    }

    db.get("SELECT preco FROM produtos WHERE id = ?", [produto_id], (err, produto) => {
        if (err || !produto) return res.status(404).json({ error: "Produto não encontrado" });

        const total = produto.preco * quantidade;

        db.run("INSERT INTO vendas (produto_id, quantidade, total) VALUES (?, ?, ?)", [produto_id, quantidade, total], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ id: this.lastID, produto_id, quantidade, total });
        });
    });
});

app.get("/vendas", (req, res) => {
  db.all("SELECT * FROM vendas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM produtos WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Produto excluído com sucesso!", id });
    });
});
app.delete("/vendas/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Tentando excluir venda com ID: ${id}`);

    db.get("SELECT * FROM vendas WHERE id = ?", [id], (err, venda) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!venda) return res.status(404).json({ error: "Venda não encontrada" });

        db.run("DELETE FROM vendas WHERE id = ?", [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Venda excluída com sucesso!", id });
        });
    });
});