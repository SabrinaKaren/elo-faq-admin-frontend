import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-structure',
  templateUrl: './main-structure.component.html',
  styleUrls: ['./main-structure.component.css']
})
export class MainStructureComponent implements OnInit {

  menuItems: MenuItemModel[];

  constructor(
    private router: Router
  ) {
    this.menuItems = [
      { label: 'Categorias', router: 'categoria', active: false },
      { label: 'Dúvidas', router: 'duvida', active: false }
    ];
  }

  ngOnInit(): void {
    this.putItemSelectedByCurrentRouter();
  }

  private putItemSelectedByCurrentRouter(): void {
    if (this.menuItems) {
      const currentRouter = this.router.url;
      const currentRouterLastPart = currentRouter.substring(currentRouter.lastIndexOf('/')+1);
      this.selectedItem(this.menuItems.findIndex(item => item.router == currentRouterLastPart));
    }
  }

  selectedItem(index: number): void {

    // deselect all items
    this.menuItems.forEach(item => item.active = false);

    // select the item selected
    if (index > -1) this.menuItems[index].active = true;

  }

}

export interface MenuItemModel {
  label: string,
  router: string,
  active: boolean
}