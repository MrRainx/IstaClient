import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FichaSalud } from '../../../../models/ficha-salud';
import { FichaSaludService } from '../../services/ficha-salud.service';
import { User } from '../../../../models/user';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SeccionFS } from '../../../../models/seccion-ficha-salud';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public ficha: FichaSalud;
  private subscriptions: Subscription[] = []
  private user: User;

  public loading: boolean

  constructor(
    private fichaSrv: FichaSaludService,
    private userSrv: UsersService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.userSrv.getUserLoggedIn();

    const fichaSub = this.fichaSrv.findFichaByPersonaID(this.user.persona.id)
      .subscribe(({ data, loading }) => {
        this.loading = loading
        this.ficha = data['ficha']

        this.ficha.seccionfsSet.sort(function (item1: SeccionFS, item2: SeccionFS) {
          if (item1.seccionNombre.id < item2.seccionNombre.id) {
            return -1
          }
          if (item1.seccionNombre.id > item2.seccionNombre.id) {
            return 1
          }
          return 0
        })
      });



    this.subscriptions.push(fichaSub)

  }

  ngOnDestroy() {
    this.subscriptions.forEach(obj => obj.unsubscribe())
  }

  btnConfirmar() {
    this.fichaSrv.confirmarFicha(this.ficha.id, "CONFIRMADO")
    this.router.navigate(['ficha-confirm'])
  }

}
