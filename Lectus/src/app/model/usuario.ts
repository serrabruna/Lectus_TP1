export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    id?: number;
    tipo_usuario?: 'CLIENTE' | 'ADMIN';
}
