import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/common/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  property: Property = new Property();
  
  constructor(private propertyService: PropertyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.handlePropertyDetails();
    })
  }
  handlePropertyDetails() {
    // get the "id" param string convert to number
    const thePropertyId: number = +this.route.snapshot.paramMap.get('id')!;

    this.propertyService.getProperty(thePropertyId).subscribe(
      data => {
        this.property = data;
      }
    )

  }

}
