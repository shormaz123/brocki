import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConst } from 'app/@core/consts/auth.const';
import { AdsService } from 'app/@core/services/ads.service';
import { HelpersService } from 'app/@core/services/helpers.service';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  displaySideNav = true;
  paginationNumber = 1;

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 1,
      height: '100%',
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  public categories = [
    {
      id: 1,
      title: {
        de: 'Antiquitäten & Kunst',
        en: 'Antiques & Art',
        fr: 'Antiquités et Art',
        it: 'Antiquariato e arte',
      },
      image: '../../../assets/images/navigation/Antiquities & Art.svg',
      selectedImage:
        '../../../assets/images/navigation/red/Antiquities & Art.svg',
      imageTo: '',
    },
    {
      id: 15,
      title: {
        de: 'Bücher und Zeitschriften',
        en: 'Books and Magazines',
        fr: 'Livres et magazines',
        it: 'Libri e riviste',
      },
      image: '../../../assets/images/navigation/Books.svg',
      selectedImage: '../../../assets/images/navigation/red/Books.svg',
      imageTo: '',
    },
    {
      id: 9,
      title: {
        de: 'CDs',
        en: 'CDs',
        fr: 'CDs',
        it: 'CDs',
      },
      image: '../../../assets/images/navigation/CD.svg',
      selectedImage: '../../../assets/images/navigation/red/CD.svg',
      imageTo: '',
    },
    {
      id: 28,
      title: {
        de: 'Spirituosen, Wein & Whiskys',
        en: 'Spirits, Wine & Whiskeys',
        fr: 'Spiritueux, Vins & Whiskies',
        it: 'Distillati, Vino & Whisky',
      },
      image: '../../../assets/images/navigation/drinks (3).svg',
      selectedImage: '../../../assets/images/navigation/red/drinks (2).svg',
      imageTo: '',
    },
    {
      id: 3,
      title: {
        de: 'Gewerbe & Handwerk',
        en: 'Trade & Craft',
        fr: 'Commerce et artisanat',
        it: 'Commercio e artigianato',
      },
      image: '../../../assets/images/navigation/Commercial.svg',
      selectedImage: '../../../assets/images/navigation/red/Commercial.svg',
      imageTo: '',
    },
    {
      id: 6,
      title: {
        de: 'Mode & Accessoires',
        en: 'Fashion & Accessories',
        fr: 'Accessoires de mode',
        it: 'Accessori alla moda',
      },
      image: '../../../assets/images/navigation/Fashion.svg',
      selectedImage: '../../../assets/images/navigation/red/Fashion.svg',
      imageTo: '',
    },
    {
      id: 4,
      title: {
        de: 'Garten & Zubehör',
        en: 'Garden & Accessories',
        fr: 'Jardin & Accessoires',
        it: 'Giardino e accessori',
      },
      image: '../../../assets/images/navigation/Garden.svg',
      selectedImage: '../../../assets/images/navigation/red/Garden.svg',
      imageTo: '',
    },
    {
      id: 20,
      title: {
        de: 'Handgemacht',
        en: 'Handmade',
        fr: 'Fait main',
        it: 'Fatto a mano',
      },
      image: '../../../assets/images/navigation/handcrafted.svg',
      selectedImage: '../../../assets/images/navigation/red/Handcrafted.svg',
      imageTo: '',
    },
    {
      id: 5,
      title: {
        de: 'Haushalt & Wohnen',
        en: 'Household & Living',
        fr: 'Ménage et vie',
        it: 'Famiglia e vita',
      },
      image: '../../../assets/images/navigation/Household.svg',
      selectedImage: '../../../assets/images/navigation/red/Household.svg',
      imageTo: '',
    },
    {
      id: 18,
      title: {
        de: 'Instrumente & Studio',
        en: 'Instruments & studio',
        fr: 'Instruments et studio',
        it: 'Strumenti e studio',
      },
      image: '../../../assets/images/navigation/Instruments.svg',
      selectedImage: '../../../assets/images/navigation/red/Instruments.svg',
      imageTo: '',
    },
    {
      id: 27,
      title: {
        de: 'Gut zu gebrauchen & Lifehacks',
        en: 'Good to use & lifehacks',
        fr: 'Bon à utiliser et lifehacks',
        it: 'Buono da usare e salvagenti',
      },
      image: '../../../assets/images/navigation/lifehacks.svg',
      selectedImage: '../../../assets/images/navigation/red/Lifehacks.svg',
      imageTo: '',
    },
    {
      id: 23,
      title: {
        de: 'Luxuriös',
        en: 'Luxurious',
        fr: 'Luxueux',
        it: 'Lussuoso',
      },
      image: '../../../assets/images/navigation/luxury.svg',
      selectedImage: '../../../assets/images/navigation/red/Luxury.svg',
      imageTo: '',
    },
    {
      id: 19,
      title: {
        de: 'Motoren & Räder',
        en: 'Motors & Wheels',
        fr: 'Moteurs et roues',
        it: 'Motori e ruote',
      },
      image: '../../../assets/images/navigation/Motors & wheels.svg',
      selectedImage:
        '../../../assets/images/navigation/red/Motors & Wheels.svg',
      imageTo: '',
    },
    {
      id: 16,
      title: {
        de: 'Bürobedarf & Schreibwaren',
        en: 'Office Supplies and Stationery',
        fr: 'Fournitures de bureau et papeterie',
        it: 'Forniture per ufficio e cancelleria',
      },
      image: '../../../assets/images/navigation/office.svg',
      selectedImage: '../../../assets/images/navigation/red/Office.svg',
      imageTo: '',
    },
    {
      id: 17,
      title: {
        de: 'Tierbedarf',
        en: 'Pet Supplies',
        fr: 'Fournitures pour animaux',
        it: 'Prodotti per animali',
      },
      image: '../../../assets/images/navigation/Pets.svg',
      selectedImage: '../../../assets/images/navigation/red/Pets.svg',
      imageTo: '',
    },
    {
      id: 13,
      title: {
        de: 'Sport, Hobby & Freizeit',
        en: 'Sport, Hobby & Leisure',
        fr: 'Sport, passe-temps et loisirs',
        it: 'Sport, hobby e tempo libero',
      },
      image: '../../../assets/images/navigation/Sport.svg',
      selectedImage: '../../../assets/images/navigation/red/Sport.svg',
      imageTo: '',
    },
    {
      id: 24,
      title: {
        de: 'Spielzeug',
        en: 'Toy',
        fr: 'Jouet',
        it: 'Giocattolo',
      },
      image: '../../../assets/images/navigation/Toys.svg',
      selectedImage: '../../../assets/images/navigation/red/Toys.svg',
      imageTo: '',
    },
    {
      id: 7,
      title: {
        de: 'Outdoor & Überleben',
        en: 'Outdoor & Survival',
        fr: 'Extérieur et survie',
        it: 'Outdoor e sopravvivenza',
      },
      image: '../../../assets/images/navigation/outdoor & survival v2.svg',
      selectedImage:
        '../../../assets/images/navigation/red/outdoor & survival v1.svg',
      imageTo: '',
    },
    {
      id: 25,
      title: {
        de: 'Einzigartig',
        en: 'Unique',
        fr: 'Unique',
        it: 'Unico',
      },
      image: '../../../assets/images/navigation/Unique.svg',
      selectedImage: '../../../assets/images/navigation/red/Unique.svg',
      imageTo: '',
    },
    {
      id: 12,
      title: {
        de: 'Uhren & Schmuck',
        en: 'Watches & Jewellery',
        fr: 'Montres & Bijoux',
        it: 'Orologi e gioielli',
      },
      image: '../../../assets/images/navigation/Watches & Jewlery.svg',
      selectedImage:
        '../../../assets/images/navigation/red/Watches & Jewlery.svg',
      imageTo: '',
    },
    {
      id: 26,
      title: {
        de: 'Aus Holz',
        en: 'Wooden',
        fr: 'En bois',
        it: 'Di legno',
      },
      image: '../../../assets/images/navigation/Wooden.svg',
      selectedImage: '../../../assets/images/navigation/red/Wooden.svg',
      imageTo: '',
    },
    {
      id: 11,
      title: {
        de: 'Batterien und Ladegeräte',
        en: 'Batteries & chargers',
        fr: 'Batteries et chargeurs',
        it: 'Batterie e caricabatterie',
      },
      image: '../../../assets/images/navigation/batteries & chargers.svg',
      selectedImage:
        '../../../assets/images/navigation/red/batteries & chargers.svg',
      imageTo: '',
    },
    {
      id: 2,
      title: {
        de: 'Messer & Werkzeuge',
        en: 'Knives & Tools',
        fr: 'Couteaux et outils',
        it: 'Coltelli e strumenti',
      },
      image: '../../../assets/images/navigation/knives & tools.svg',
      selectedImage:
        '../../../assets/images/navigation/red/knives & tools 2.svg',
      imageTo: '',
    },
    {
      id: 10,
      title: {
        de: 'Lampen & Leuchtmittel',
        en: 'Lamps & Illuminants',
        fr: 'Lampes et illuminants',
        it: 'Lampade e illuminanti',
      },
      image: '../../../assets/images/navigation/Lamps & Illuminants.svg',
      selectedImage:
        '../../../assets/images/navigation/red/lamps & illuminants 2.svg',
      imageTo: '',
    },
    {
      id: 14,
      title: {
        de: 'Modellbau',
        en: 'Modelling',
        fr: 'La modélisation',
        it: 'Modellismo',
      },
      image: '../../../assets/images/navigation/rc toy - modelling.svg',
      selectedImage:
        '../../../assets/images/navigation/red/rc toy - modelling 2.svg',
      imageTo: '',
    },
    {
      id: 22,
      title: {
        de: 'Kilo Ware',
        en: 'Sold by the Kilo',
        fr: 'Vendu au kilo',
        it: 'Venduto da Kilo',
      },
      image: '../../../assets/images/navigation/sold by the kg.svg',
      selectedImage:
        '../../../assets/images/navigation/red/sold by the kg 2.svg',
      imageTo: '',
    },
    {
      id: 21,
      title: {
        de: 'Meter Ware',
        en: 'Sold by the Meter',
        fr: 'Vendu au mètre',
        it: 'Venduto al metro',
      },
      image: '../../../assets/images/navigation/sold by the meter.svg',
      selectedImage:
        '../../../assets/images/navigation/red/sold by the meter.svg',
      imageTo: '',
    },
    {
      id: 8,
      title: {
        de: 'Computer & Software',
        en: 'Computer & Software',
        fr: 'Logiciel',
        it: 'Software per il computer',
      },
      image: '../../../assets/images/navigation/IT.svg',
      selectedImage: '../../../assets/images/navigation/red/IT.svg',
      imageTo: '',
    },
    {
      id: 29,
      title: {
        de: 'Sammlerstücke',
        en: 'Collection',
        fr: 'Objets de collection',
        it: 'Collezionismo',
      },
      image: '../../../assets/images/navigation/Collection.svg',
      selectedImage: '../../../assets/images/navigation/red/Collection.svg',
      imageTo: '',
    },
  ];

  token;
  currentLang = 'de';
  subscriptionLang: Subscription;
  categorySub: Subscription;
  fakedCategoryId;

  constructor(
    private helpersService: HelpersService,
    private translateBackend: TranslateServiceRest,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentLang = localStorage.getItem(AuthConst.language);
    this.fakedCategoryId = Number(sessionStorage.getItem('category_id'));

    this.token = localStorage.getItem(AuthConst.token);
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
    this.deselectAll();
    if (this.fakedCategoryId) {
      this.selectCategory(this.fakedCategoryId);
    }

    this.categorySub = this.helpersService
      .getClearedCategores()
      .subscribe((x) => {
        this.deselectAll();
      });
  }

  deselectAll() {
    this.categories.forEach((item) => {
      item.imageTo = item.image;
    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }

  selectCategory(id: number): void {
    this.router.navigate(['/site/category-ads', id]);
    const imageToShow = this.categories.find((image) => {
      return image.id === id;
    });

    if (imageToShow) {
      this.deselectAll();
      imageToShow.imageTo = imageToShow.selectedImage;
    }
    sessionStorage.setItem('category_id', id.toString());
  }
}
