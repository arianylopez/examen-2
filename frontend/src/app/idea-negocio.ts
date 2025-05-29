export interface IdeaNegocio{
    id: number;
    titulo: string;
    descripcion: string;
    categoria: string;
    estado: string;
    innovacion?: string;
    publico?: string;
}

export const CATEGORIAS_IDEAS: string[] = ['Tecnología', 'Salud', 'Educación', 'Finanzas', 'Social', 'Otro'];
export const ESTADOS_IDEAS: string[] = ['Borrador', 'Validando', 'Aprobada', 'Descartada', 'Implementada'];
