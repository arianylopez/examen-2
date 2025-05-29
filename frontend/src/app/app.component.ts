import { Component } from '@angular/core';
import { GestorIdeas } from './gestor-idea';
import { IdeaNegocio, CATEGORIAS_IDEAS, ESTADOS_IDEAS } from './idea-negocio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    titulo = "StartUp UCB - Catálogo de Ideas";
    gestor: GestorIdeas;

    mostrar_formulario: boolean = false;
    modo_edicion: boolean = false;
    idea_editar_id: number | null = null;

    form_titulo: string = '';
    form_descripcion: string = '';
    form_categoria: string = CATEGORIAS_IDEAS[0];
    form_estado: string = ESTADOS_IDEAS[0];
    form_innovacion: string = '';
    form_publico_objetivo: string = '';
    
    opciones_categoria: string[] = CATEGORIAS_IDEAS;
    opciones_estado: string[] = ESTADOS_IDEAS;

    readonly TAMANO_PAGINA: number = 3;
    pagina_actual: number = 0;
    total_paginas: number = 0;

    idea_slot_1: IdeaNegocio | null = null;
    idea_slot_2: IdeaNegocio | null = null;
    idea_slot_3: IdeaNegocio | null = null;

    constructor(){
        this.gestor = new GestorIdeas();
        this.actualizar_lista_visible();
    }

    actualizar_lista_visible(): void {
      const todas_las_ideas = this.gestor.obtener_ideas();
      this.total_paginas = Math.ceil(todas_las_ideas.length / this.TAMANO_PAGINA);
      if(this.total_paginas === 0){
        this.pagina_actual = 0;
      } else if(this.pagina_actual >= this.total_paginas){
        this.pagina_actual = this.total_paginas - 1;
      }
      if(this.pagina_actual < 0 && this.total_paginas > 0){
        this.pagina_actual = 0;
    }
    const inicio = this.pagina_actual * this.TAMANO_PAGINA;
    const ideas_pagina = [];
    for(let i = 0; i < this.TAMANO_PAGINA; i++){
      const indice_real = inicio + i;
      if(indice_real < todas_las_ideas.length){
        ideas_pagina.push(todas_las_ideas[indice_real]);
      } else {
        ideas_pagina.push(null);
      }
    }
    this.idea_slot_1 = ideas_pagina[0] || null;
    this.idea_slot_2 = ideas_pagina[1] || null;
    this.idea_slot_3 = ideas_pagina[2] || null;
  }

  siguiente_pagina(): void {
      if(this.pagina_actual + 1 < this.total_paginas){
          this.pagina_actual++;
          this.actualizar_lista_visible();
      }
  }
  anterior_pagina(): void {
      if(this.pagina_actual > 0){
          this.pagina_actual--;
          this.actualizar_lista_visible();
      }
  }

    formulario_nueva_idea(): void{
        this.limpiar_formulario();
        this.modo_edicion = false;
        this.idea_editar_id = null;
        this.mostrar_formulario = true;
    }

    formulario_editar_idea(id_idea: number | undefined): void{
        if(id_idea === undefined) return;
        const idea = this.gestor.obtener_idea_por_id(id_idea);
        if(idea){
            this.form_titulo = idea.titulo;
            this.form_descripcion = idea.descripcion;
            this.form_categoria = idea.categoria;
            this.form_estado = idea.estado;
            this.form_innovacion = idea.innovacion || '';
            this.form_publico_objetivo = idea.publico || '';

            this.modo_edicion = true;
            this.idea_editar_id = idea.id;
            this.mostrar_formulario = true;
        }
    }

    guardar_idea(): void{
        if(!this.form_titulo.trim() || !this.form_descripcion.trim()){
            console.error('El titulo y descripcion son obligatorios.');
            return;
        }
        const datos_idea: Omit<IdeaNegocio, 'id'> = {
            titulo: this.form_titulo,
            descripcion: this.form_descripcion,
            categoria: this.form_categoria,
            estado: this.form_estado,
            innovacion: this.form_innovacion,
            publico: this.form_publico_objetivo
        };
        if(this.modo_edicion && this.idea_editar_id !== null){
            this.gestor.actualizar_idea({...datos_idea, id: this.idea_editar_id})
        } else{ 
            this.gestor.agregar_idea(datos_idea);
        }
        this.actualizar_lista_visible();
        this.cerrar_formulario();
    }

    cerrar_formulario(): void {
        this.mostrar_formulario = false;
        this.limpiar_formulario();
    }

    limpiar_formulario(): void{
        this.form_titulo = '';
        this.form_descripcion = '';
        this.form_categoria = CATEGORIAS_IDEAS[0];
        this.form_estado = ESTADOS_IDEAS[0];
        this.form_innovacion = '';
        this.form_publico_objetivo = '';
        this.modo_edicion = false;
        this.idea_editar_id = null;
    }

    eliminar_idea(id_idea: number | undefined): void{
        if(id_idea === undefined) return;
        this.gestor.eliminar_idea(id_idea);
        this.actualizar_lista_visible();
    }

    actualizar_titulo(evento: Event): void { this.form_titulo = (evento.target as HTMLSelectElement).value; }
    actualizar_descripcion(evento: Event): void { this.form_descripcion = (evento.target as HTMLSelectElement).value; }
    actualizar_categoria(evento: Event): void { this.form_categoria = (evento.target as HTMLSelectElement).value; }
    actualizar_estado(evento: Event): void { this.form_estado = (evento.target as HTMLSelectElement).value; }
    actualizar_innovacion(evento: Event): void { this.form_innovacion = (evento.target as HTMLSelectElement).value; }
    actualizar_publico_objetivo(evento: Event): void { this.form_publico_objetivo = (evento.target as HTMLSelectElement).value; }
}