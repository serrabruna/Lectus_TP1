export interface Usuario {
    nome: string;
    email: string;
    senha_hash: string;
    telefone: string;
    id?: number;
    tipo_usuario?: 'CLIENTE' | 'ADMIN';
}
