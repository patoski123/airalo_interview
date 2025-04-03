import { DataTable } from '@badeball/cypress-cucumber-preprocessor';

export class CommonFunctions {
    static formatCountryName(countryName: string): string {
        return countryName.replace(/\s+/g, '-');
    }

    static lowercaseFirstCharOfEachWord(str: string): string {
        return str
            .split(' ')
            .map(word => word.charAt(0).toLowerCase() + word.slice(1))
            .join(' ');
    }

    static isRegionalOrGlobal(area: string): boolean {
        switch (area) {
            case 'Local':
                return false;
            case 'Regional':
            case 'Global':
                return true;
            default:
                throw new Error(`Invalid area: ${area}. Expected 'Local', 'Regional', or 'Global'.`);
        }
    }


    static returnUrlExtension(coverageName: string, areaName: string): string {
        let formattedCoverageName = coverageName;

        if (this.isRegionalOrGlobal(areaName)) {
            const regionalValue = this.returnRegionalValue(coverageName);
            formattedCoverageName = this.lowercaseFirstCharOfEachWord(regionalValue);
        }
        return this.formatCountryName(formattedCoverageName);
    }


    static convertDataTableIntoObject(
        dataTable: DataTable,
    ): Record<string, string> {
        const [headers, rowValues] = dataTable.raw();

        return headers.reduce<Record<string, string>>(
            (resultObject, header: string, index: number) => {
                resultObject[header] = rowValues[index];
                return resultObject;
            },
            {},
        );
    }

    static formatCurrency(amount: string | number, currencyCode: string): string {
        let symbol: string;

        const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (isNaN(numericAmount)) {
            throw new Error("Invalid amount: Amount must be a valid number.");
        }

        switch (currencyCode.toUpperCase()) {
            case 'USD':
                symbol = '$';
                break;
            case 'EUR':
                symbol = '€';
                break;
            case 'GBP':
                symbol = '£';
                break;
            case 'CAD':
                symbol = 'C$';
                break;
            case 'AUD':
                symbol = 'A$';
                break;
            default:
                throw new Error(`Unsupported currency code: ${currencyCode}`);
        }
        return `${symbol}${numericAmount.toFixed(2)}`; // Formats amount with two decimal places
    }

    static returnRegionalValue(coverage: string ): string {
        switch (coverage.toUpperCase()) {
            case 'JAPAN':
            case 'CHINA':
            case 'INDIA':
                return 'Asia';
            case 'NIGERIA':
            case 'EGYPT':
                return 'Africa';
            case 'Arab EGYPT':
                return 'Middle East and North Africa';
            case 'UNITED STATES':
            case 'CANADA':
                return 'North America';
            case 'AUSTRALIA':
                return 'Oceania';
            default:
                throw new Error(`Unsupported regional value, please update the switch block: ${coverage}`);
        }
    }
}