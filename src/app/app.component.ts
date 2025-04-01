import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FlexLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // private productService =  inject(ProductService);

  public title = 'eCommerce-app';

  ngOnInit(): void {

  }
 
}
