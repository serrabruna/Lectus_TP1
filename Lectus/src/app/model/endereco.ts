// model/endereco.ts
export interface Endereco {
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}
