
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '../../utils/constant/department';
import { PermissionService } from 'src/app/service/permission.service';
import { DepartmentAPI } from '../../utils/constant/api';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
// import SearchNominatim from 'ol-ext/control/SearchNominatim';
import Zoom from 'ol/control/Zoom';
import Attribution from 'ol/control/Attribution';
import GeoJSON from 'ol/format/GeoJSON';
import * as proj from 'ol/proj';
import { MapLocationService } from 'src/app/service/map-location.service';
import { Location } from 'src/app/utils/constant/location';
import { Clipboard } from '@angular/cdk/clipboard';
import { MainRouteCode } from 'src/app/utils/constant/routing';
import { SessionQuery } from 'src/app/utils/session/session.query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-link-page',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss'],
})
export class LinkPageComponent implements OnInit {

  @HostListener('document:click')
  documentClick() {
    this.isShowingSearchResult = false;
  }

  public department: Array<Department> = [];
  public isLoading: boolean = false;
  public isSearching: boolean = false;
  public isShowingSearchResult: boolean = false;

  public searchResult: Array<Location> = [];
  public historySearch: string = "";
  public currentLonLat: Array<number> = [];

  private ThailandLonLat: Array<number> = [100.83273, 14.8971921];

  private source: any;
  private fieldSource: any;
  private view: any;
  private map: any;

  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private mapLocationService: MapLocationService,
    private clipBoard: Clipboard,
    private sessionQuery: SessionQuery
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    let unsubGetPermission = new Subject();
    this.permissionService.GetPermission().pipe(takeUntil(unsubGetPermission)).subscribe({
      next: (numberOfDept: number) => {
        let unsubGetDepartment = new Subject();
        this.permissionService.GetDepartment(numberOfDept).pipe(takeUntil(unsubGetDepartment)).subscribe(
          {
            next: (res: Array<DepartmentAPI>) => {
              res.forEach((ch: DepartmentAPI, index: number) => {
                this.department.push({
                  name: ch.name,
                  // link: ch.url
                  link: `main/${MainRouteCode[index]}`
                });
              });
            },
            error: (err: any) => {
              this.isLoading = false;
              console.log("error : ", err);
            },
            complete: () => {
              this.isLoading = false;
              unsubGetDepartment.next(0);
              unsubGetDepartment.complete();
            }
          });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("unsub");
        unsubGetPermission.next(0);
        unsubGetPermission.complete();
      }
    })
    this.InitMap();
  }

  public CheckUUID(): void {
    let userDataSubscription = this.sessionQuery.getUserData().subscribe((res: any) => {
      if (res.uuid) {
        alert("Your UUID is : " + res.uuid);
      }
      else {
        alert("Failed to load UUID from Local Storage.");
      }
    });
    setTimeout(() => {
      userDataSubscription.unsubscribe();
    }, 1000);
  }

  //ol-map here
  private InitMap(): void {
    this.source = new VectorSource();
    this.fieldSource = new VectorSource();

    this.view = new View({
      center: fromLonLat(this.ThailandLonLat),
      zoom: 5
    });

    // const searchControl = new SearchNominatim({
    //   centerOnSelect: true,
    //   maxHistory: -1,
    //   onselect: (res) => {
    //     this.source.clear();
    //     this.source.addFeature(new Feature({
    //       geometry: new Polygon([[res.coordinate]]),
    //       name: 'Search marker',
    //     }));
    //     this.fieldSource.clear();
    //     let geoJSON = new GeoJSON();
    //     let format = geoJSON.readFeature(res.search.geojson, { dataProjection: "EPSG:4326"
    //        , featureProjection: this.map.getView().getProjection() });
    //     this.fieldSource.addFeature(format);
    //   },
    //   polygon: true
    // });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: this.view,
      controls: [
        new Attribution({
          collapsible: true,
        }),
        new Zoom({
          delta: 2,
          zoomInClassName: 'zoom-button',
          zoomOutClassName: 'zoom-button'
        }),
        // searchControl
      ]
    });

    new VectorLayer({
      map: this.map,
      source: this.source,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 0.5)',
          width: 20
        }),
        zIndex: Infinity
      })
    });

    new VectorLayer({
      map: this.map,
      source: this.fieldSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(255,165,0, 1)',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255,165,0,.3)'
        }),
      })
    })

    this.map.on('click', (event: any) => {
      let lonLat = toLonLat(event.coordinate, 'EPSG:3857');
      this.currentLonLat = lonLat
      this.historySearch = "loading...";
      this.isSearching = true;
      this.source.clear();
      this.source.addFeature(new Feature({
        geometry: new Polygon([[event.coordinate]]),
        name: 'Marker',
      }));
      this.mapLocationService.ReverseSearchLocationByNominatim(lonLat[1], lonLat[0]).subscribe({
        next: (res: any) => {
          try {
            this.historySearch = res.features[0].properties.display_name;
          }
          catch {
            this.historySearch = "Location not found.";
          }
        },
        error: () => {
          this.historySearch = "Location not found.";
        },
        complete: () => {
          this.isSearching = false;
        }
      })
    });
  }

  public RedirectTo(link: string): void {
    this.router.navigate([link]);
  }

  public SearchLocation(value: string): void {
    this.isSearching = true;
    this.mapLocationService.SearchLocationByNominatim(value).subscribe((res => {
      this.searchResult.splice(0, this.searchResult.length);
      res.forEach(loc => {
        this.searchResult.push(loc);
      });
      this.isShowingSearchResult = true;
      this.isSearching = false;
    }))
  }

  public SelectLocation(i: number): void {
    this.source.clear();
    let coordinate = proj.transform(this.searchResult[i].geojson.coordinates, 'EPSG:4326', 'EPSG:3857');
    if (!coordinate[0] || !coordinate[1]) {
      coordinate = proj.transform([
        parseFloat(this.searchResult[i].lon),
        parseFloat(this.searchResult[i].lat)
      ], 'EPSG:4326', 'EPSG:3857');
    }
    this.source.addFeature(new Feature({
      geometry: new Polygon([[coordinate]]),
      name: 'Search marker',
    }));
    this.view.setCenter(coordinate);
    this.fieldSource.clear();
    let geoJSON = new GeoJSON();
    let format = geoJSON.readFeature(this.searchResult[i].geojson, { dataProjection: "EPSG:4326", featureProjection: this.map.getView().getProjection() });
    this.fieldSource.addFeature(format);
    this.historySearch = this.searchResult[i].display_name;
    this.isShowingSearchResult = false;
  }

  public CopyLonLatText(): void {
    this.clipBoard.copy(`${this.currentLonLat[0]}, ${this.currentLonLat[1]}`)
  }
}
