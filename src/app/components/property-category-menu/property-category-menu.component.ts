import { Component, OnInit } from '@angular/core';
import { PropertyCategory } from 'src/app/common/property-category';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-category-menu',
  templateUrl: './property-category-menu.component.html',
  styleUrls: ['./property-category-menu.component.css']
})
export class PropertyCategoryMenuComponent implements OnInit {

  propertyCategories: PropertyCategory[];
  
  
  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.listPropertyCategories();
    
  }
  listPropertyCategories() {
    this.propertyService.getPropertyCategories().subscribe(
      data => {
        console.log("Property Categories " + JSON.stringify(data));
        this.propertyCategories = data;
        
      }
    );
  }

}
