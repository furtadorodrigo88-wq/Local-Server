import { isOwner } from "../security/auth.midlewere.js"
import { expect,beforeEach, describe, it, jest } from "@jest/globals"


describe("Unit Test: isOwner middleware", () => {
    let mockRequest: any
    let mockResponse: any
    let mockFunction: any = jest.fn();

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it ("Deve retornar 403 se o utilizador não for o dono do recurso", async () => {
        mockRequest = {
            user: {id: "user-1"},
            params: {id: "resource-2"}
        };
        
        const mockModel = {
            get: jest.fn<any>().mockResolvedValue({id: "outro_user"}),
        };
        const middleware = isOwner(mockModel, "id_utilizador");
        await middleware (mockRequest, mockResponse, mockFunction);
        
        expect (mockResponse.status).toHaveBeenCalledWith(403);
        expect (mockResponse.json).toHaveBeenCalledWith({
            status: "error",
            message: "Nao autorizado",
            data: null
        });
        expect (mockFunction).not.toHaveBeenCalled();
    });
})