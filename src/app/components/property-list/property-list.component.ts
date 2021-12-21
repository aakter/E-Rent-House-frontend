import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/common/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list-grid.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Property[] = []
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  
  previousKeyword: string = null!;

  constructor(private propertyService: PropertyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProperties();
    })
  }

  listProperties() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProperties();
    } else {
      this.handleListProperties();
    }
    
  }

  handleSearchProperties() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have different keyword different than previous
    // set thePageNumber to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`theKeyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    

    // now search for Properties using the keyword
    this.propertyService.searchPropertiesPaginate(this.thePageNumber - 1,
                                                  this.thePageSize,
                                                  theKeyword).subscribe(this.processResult())
  }
  

  handleListProperties () {

        // check if "id" parameter is avaiable
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
          // get the "id" param string. convert string to number using the + symbol
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; 
        } else {
          // no category id is avaailabe ... default to ctegory 1
          this.currentCategoryId = 1;
        }

        // check if we have different category then the previous one
        // then set pageNumber to 1
        if (this.previousCategoryId != this.currentCategoryId) {
          this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;
        console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
        
    
        // get the porperty for that given id
        this.propertyService.getPropertyListPaginate(this.thePageNumber -1,
                                                    this.thePageSize,
                                                    this.currentCategoryId)
                                                    .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.properties = data._embedded.properties;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements
    }
  }


  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProperties()
  }
}
