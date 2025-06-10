"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
describe("Testes das rotas de transações", () => {
    let transactionId;
    it("Deve criar uma nova transação", async () => {
        const newTransaction = {
            userId: 1,
            type: "INCOME",
            name: "Pagamento",
            description: "Pagamento de serviços",
            amount: 200,
            pdfUrl: "http://example.com/file.pdf",
        };
        const response = await (0, supertest_1.default)(index_1.app)
            .post("/transaction/create")
            .send(newTransaction);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(newTransaction.name);
        transactionId = response.body.id;
    });
    it("Deve retornar todas as transações", async () => {
        const response = await (0, supertest_1.default)(index_1.app).get("/transaction");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it("Deve retornar a transação por ID", async () => {
        const response = await (0, supertest_1.default)(index_1.app).get(`/transaction/${transactionId}`);
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
        const response = await (0, supertest_1.default)(index_1.app)
            .put(`/transaction/${transactionId}`)
            .send(updatedTransaction);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedTransaction.name);
    });
    it("Deve deletar a transação", async () => {
        const response = await (0, supertest_1.default)(index_1.app).delete(`/transaction/${transactionId}`);
        expect(response.status).toBe(204);
    });
});
