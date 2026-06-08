import { CarProps, FilterProps } from "@/types";
import carsData from "@/constants/carsData";

export async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
  const { manufacturer, year, model, fuel } = filters;

  return carsData.filter((car) => {
    if (manufacturer && !car.make.toLowerCase().includes(manufacturer.toLowerCase())) return false;
    if (year && car.year !== Number(year)) return false;
    if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (fuel && car.fuel_type.toLowerCase() !== fuel.toLowerCase()) return false;
    return true;
  });
};
export const calculateCarRent = (city_mpg: number, year:number)=>{
  const basePricePerDay = 50; //base rental price per day in dollars
  const mileageFactor = 0.1; //Additional rate per mile driven
  const ageFactor = 0.05; //additional rate per year of vehicle age
  //calculate additional rate based on milage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear()-year)*ageFactor;
  //Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay+mileageRate+ageRate;
  return rentalRatePerDay.toFixed(0);
}
export const generateCarImageUrl = (car: CarProps, angle?: string)=>{
  const url = new URL('https://cdn.imagin.studio/getimage');
  const {make, year, model} = car;
  //second value is the key
  url.searchParams.append('customer', 'hrjavascript-mastery' || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split('')[0]);
  url.searchParams.append('zoomType','fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  return `${url}`;
}
export const updateSearchParams = (type: string, value:string)=>{
   const searchParams = new URLSearchParams(window.location.search);

      searchParams.set(type,value);


    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname;
}