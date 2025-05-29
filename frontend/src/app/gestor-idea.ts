import { IdeaNegocio } from './idea-negocio';

export class GestorIdeas {
    public ideas: IdeaNegocio[] = [];
    public proximo_id: number = 1;

    obtener_ideas(): IdeaNegocio[]{
        return [...this.ideas]; 
    }

    agregar_idea(nueva_idea_sin_id: Omit<IdeaNegocio, 'id'>): boolean {
        const nueva_idea_con_id: IdeaNegocio = { ...nueva_idea_sin_id, id: this.proximo_id++ };
        this.ideas.push(nueva_idea_con_id);
        return true;
    }

    obtener_idea_por_id(id: number): IdeaNegocio | null {
        for(let i = 0; i < this.ideas.length; i++){
            if(this.ideas[i].id === id){
                return {...this.ideas[i]};
            }
        }
        return null;
    }

    actualizar_idea(idea_actualizada: IdeaNegocio): boolean{
        for(let i = 0; i < this.ideas.length; i++){
            if(this.ideas[i].id === idea_actualizada.id){
                this.ideas[i] = {...idea_actualizada};
                return true;
            }
        }
        return false;
    }

    eliminar_idea(id: number): boolean{
        let indice_eliminar = -1;
        for(let i = 0; i < this.ideas.length; i++){
            if(this.ideas[i].id === id){
                indice_eliminar = i;
                break;
            }
        }
        if(indice_eliminar !== -1){
            const nuevas_ideas = [];
            for(let i = 0; i < this.ideas.length; i++){
                if(i !== indice_eliminar){
                    nuevas_ideas.push(this.ideas[i]);
                }
            }
            this.ideas = nuevas_ideas;
            return true;
        }
        return false;
    }
}