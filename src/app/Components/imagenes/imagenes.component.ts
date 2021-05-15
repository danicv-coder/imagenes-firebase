import { FirebaseCatalgService } from './../../Service/firebase-catalg.service';
import { environment } from './../../../environments/environment.prod';
import { DownloadsService } from './../../Service/downloads.service';
import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";



@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {
  image = "";
  allImage = [""];
  path =  'osm-soft';
  elements = 30;
  catalog = [
    {
      '001':["001$1.png", "001$2.png", "001.png",],
      '002': [ "002$1.png","002$2.png","002.png",],
      '003': ["003$1.png","003.png",],
      '004': ["004$1.png","004.png", ],
      '005': ["005$1.png","005.png",],
      '006': ["006$1.png","006.png", ],
      '007': ["007$1.png","007.png",],
      '008': ["008$1.png", "008.png",],
      '009': ["009$1.png", "009.png",],
      '010': ["010$1.png","010.png",],
      '011': ["011$1.png","011.png",],
      '012': ["012$1.png","012.png",],
      '013': ["013$1.png","013.png",],
      '014': ["014$1.png","014.png",],
      '015': ["015$1.png","015.png",],
      '016': ["016$1.png","016.png",],
      '017': ["017$1.png","017.png",],
      '018': ["018$1.png","018.png",],
      '019': ["019$1.png","019$2.png","019.png",],
      '020': ["020$1.png","020.png",],
      '021': ["021$1.png","021.png",],
      '022': ["022$1.png","022.png",],
      '023': ["023$1.png","023.png",],
      '024': ["024$1.png","024.png",],
      '025': ["025$1.png","025$2.png","025.png",],
      '026': ["026$1.png","026$2.png","026.png",],
      '027': ["027$1.png","027.png",],
      '028': ["028$1.png","028.png",],
      '029': ["029$1.png","029.png",],
      '030': ["030$1.png","030.png",],
    }
  ]
  constructor(private downloadsFirebase: DownloadsService, private firebaseCatalog: FirebaseCatalgService) {

  }

  ngOnInit(): void {
  }


  async OneImage() {
    const storage = firebase.storage();
    const gsReference = storage.refFromURL('gs://osm-soft-dev.appspot.com/images/osm-soft/');
    return await gsReference.child('logo.png').getDownloadURL().then((url) =>{
   this.image = url;
   console.log(url);
    }).catch(()=>{

    });
   }

   allImages(){
    const storage = firebase.storage();
    const gsReference = storage.refFromURL('gs://osm-soft-dev.appspot.com/images/osm-soft/catalog');
    gsReference.listAll().then((result) => {
      result.items.forEach( async (imageRef) => {
       this.allImage.push( await displayImage(imageRef));
      });
    }).catch(function(error) {

    });
    console.log(this.allImage);
}

firebase(){
  this.firebaseCatalog.ImageCatalog("osm-soft")
  .subscribe((catalog) =>{
  /*   console.log(catalog.catalog.code); */
  })
}

}

 async function displayImage(imageRef: firebase.storage.Reference):Promise<string> {
  return await imageRef.getDownloadURL();
}

