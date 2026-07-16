import type { ServicoType, ResponseType, ServicoDBType } from "../utils/types.js";
export declare let catalogoServicos: ServicoType[];
export declare function AdicionarServico(servico: ServicoType): ResponseType | string;
export declare function ListarServico(): ServicoType[];
export declare function ApagarServico(nome: string): boolean;
export declare function obterServico(nome: string): ServicoType | null;
export declare function addServicoDB(newservice: ServicoDBType): Promise<any>;
export declare function getServiceById(id: string): Promise<any>;
export declare function getAllServices(): Promise<any>;
export declare function updateService(id: string, updatedService: ServicoDBType): Promise<any>;
export declare function deleteService(id: string): Promise<any>;
//# sourceMappingURL=servico.d.ts.map