
import { Pais } from './../paises.model';
import { PaisesService } from './../paises.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-pais-create',
    templateUrl: './paises_update.component.html',
    styleUrls: ['./paises_update.component.css'],
    providers: [MessageService]
})

export class PaisesUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    pais: Pais = {
        nome : "",
        sigla : "",
        pais_id: null
    }
        
    constructor(private loginService: LoginService, private paisService: PaisesService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
        this.loginService.validateSession()
    }
    
    ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Pais', routerLink: '/paises' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.paisService.readById(id).subscribe(pais => {
                this.pais = pais 
            })          
        }, 200) 
    }
    
    update(): void {

        this.pais.nome = this.pais.nome.toUpperCase()
        this.pais.sigla = this.pais.sigla.toUpperCase()

        this.paisService.update(this.pais).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/paises'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => {
                console.log(e.error['message err'])  
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
    }
    
    cancel(): void {       
        this.router.navigate(['/paises'])
    }
    

}