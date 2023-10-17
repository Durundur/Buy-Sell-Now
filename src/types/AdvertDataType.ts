import { AccountAddressDataType } from "./UserDataType";

export interface AdvertDetailsType {
    brand?: string;
    model?: string;
    vinNumber?: string;
    engineSize?: number;
    productionYear?: string;
    enginePower?: number;
    fuel?: 'diesel' | 'benzyna' | 'lpg' | 'elektryczny' | 'hybryda';
    bodyType?: 'sedan' | 'coupe' | 'hatchback' | 'suv' | 'kabriolet' | 'limuzyna' | 'minivan' | 'kombi' | 'pickup';
    mileage?: string;
    color?: string;
    condition?: 'uszkodzony' | 'nieuszkodzony';
    transmission?: 'manualna' | 'automatyczna';
    driveType?: '4x4' | 'przód' | 'tył';
    level?: 'parter' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'powyżej 10' | 'poddasze';
    isFurnished?: boolean;
    buildingType?: 'blok' | 'kamienica' | 'apartamentowiec' | 'pozostałe' | 'wolnostojący' | 'bliźniak' | 'szeregowiec' | 'gospodarstwo' | 'pozostałe';
    livingArea?: number;
    plotArea?: number;
    numberOfRooms?: '1' | '2' | '3' | '4 i więcej';
    numberOfFloors?: 'parterowy' | 'jednopiętrowy' | 'dwupiętrowy i więcej';
    rent?: { value: number };
    typeOfPlot?: 'rekreacyjne' | 'budowlane' | 'rolne' | 'leśne' | 'ogródek działkowy';
    size?: string;
  }

export interface AdvertPriceType{
    value: number,
    currency: 'zl' | '€' | '$',
    isNegotiable: boolean
}

export interface AdvertType {
    _id: string,
    tittle: string;
    price: AdvertPriceType;
    description: string;
    noOfviews?: number;
    advertiser: {
      name: string,
      phoneNumber: string,
      _id: string
    }
    address: AccountAddressDataType;
    images: string[];
    mainCategory: string;
    subCategory: string;
    subSubCategory?: string;
    details: AdvertDetailsType;
    createdAt: Date;
    updatedAt: Date;
    endAt: Date,
  }