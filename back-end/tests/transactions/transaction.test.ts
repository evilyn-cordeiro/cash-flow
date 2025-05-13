import request from "supertest";
import { app } from "../../src/index";

describe("Testes das rotas de transações", () => {
  let transactionId: number;

  it("Deve criar uma nova transação", async () => {
    const newTransaction = {
      userId: 1,
      type: "INCOME",
      name: "Pagamento",
      description: "Pagamento de serviços",
      amount: 200,
      pdfUrl: "http://example.com/file.pdf",
    };

    const response = await request(app)
      .post("/transaction/create")
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newTransaction.name);
    transactionId = response.body.id;
  });

  it("Deve retornar todas as transações", async () => {
    const response = await request(app).get("/transaction");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Deve retornar a transação por ID", async () => {
    const response = await request(app).get(`/transaction/${transactionId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", transactionId);
  });

  it("Deve atualizar uma transação", async () => {
    const updatedTransaction = {
      type: "EXPENSE",
      name: "Pagamento atualizado",
      description: "Pagamento de serviços atualizados",
      amount: 150,
      pdfUrl: "http://example.com/new-file.pdf",
    };

    const response = await request(app)
      .put(`/transaction/${transactionId}`)
      .send(updatedTransaction);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedTransaction.name);
  });

  it("Deve deletar a transação", async () => {
    const response = await request(app).delete(`/transaction/${transactionId}`);

    expect(response.status).toBe(204);
  });
});
