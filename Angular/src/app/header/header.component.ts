import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  isMenuOpen = false;

  ngOnInit():void{
    
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  GoToInventory(){
    this.router.navigate(["inventory"]);
  }

  GoToHome(){
    this.router.navigate([""]);
  }

  GoToContact(){
    this.router.navigate(["contact"]);
  }
}
