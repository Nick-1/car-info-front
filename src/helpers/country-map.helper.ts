import {CountryCode, CountryName} from '../enums/countries.ts';

export const getCountryCodeByName = (countryName?: CountryName): CountryCode => {
    switch (countryName) {
        case CountryName.US:
            return CountryCode.US;
        case CountryName.CANADA:
            return CountryCode.CA;
        default:
            return CountryCode.CA;
    }
}

export const getCountryNameByCode = (countryCode?: CountryCode): CountryName => {
    switch (countryCode) {
        case CountryCode.US:
            return CountryName.US;
        case CountryCode.CA:
            return CountryName.CANADA;
        default:
            return CountryName.CANADA;
    }
}
