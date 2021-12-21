import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../common/property';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyCategory } from '../common/property-category';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // need to build URL based on theKeyword
  private baseUrl = 'http://localhost:8080/api/properties';
  private categoryUrl = 'http://localhost:8080/api/property-category';


  constructor(private httpClient: HttpClient) { }

  getProperty (thePropertyId: number): Observable<Property>  {
    // build url based on the Property Id
    const propertyUrl = `${this.baseUrl}/${thePropertyId}`

    return this.httpClient.get<Property>(propertyUrl);
} //

getPropertyListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number): Observable<GetResponseProperties> {

  // need to build URL based on category id, page and size
  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProperties>(searchUrl);
  
}

  getPropertyList(theCategoryId: number): Observable<Property[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProperties(searchUrl);
    
  }

    
  searchProperties(theKeyword: string): Observable<Property[]>  {
        // need to build URL based on theKeyword
    const searchUrl = `${this.baseUrl}/search/findByPropertyAddressContaining?property_address=${theKeyword}`;

    return this.getProperties(searchUrl);
  }

  searchPropertiesPaginate(thePage: number,
                          thePageSize: number,
                          theKeyword: string): Observable<GetResponseProperties> {

    // need to build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByPropertyAddressContaining?property_address=${theKeyword}` 
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProperties>(searchUrl);

  }


  private getProperties(searchUrl: string): Observable<Property[]> {
    return this.httpClient.get<GetResponseProperties>(searchUrl).pipe(
      map(response => response._embedded.properties)
    );
  }

  getPropertyCategories(): Observable<PropertyCategory[]> {
    return this.httpClient.get<GetResponsePropertyCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.propertyCategory)
    );
  }

}

interface GetResponseProperties {
  _embedded: {
    properties: Property[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponsePropertyCategory {
  _embedded: {
    propertyCategory: PropertyCategory[];
  }
}