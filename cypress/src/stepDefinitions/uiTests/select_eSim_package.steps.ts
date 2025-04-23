import {DataTable, Given, Then} from '@badeball/cypress-cucumber-preprocessor';
import {SelectEsimPackages} from '@pageObjects/selectEsimPackages';
import {SharedState} from '@support/sharedState';
import {CommonFunctions as commonFunctions} from '@utils/commonFunctions';

const selectEsimPackages = new SelectEsimPackages();

Given(/^I search and select "([^"]*)" under "([^"]*)" region$/, function (coverage: string, region: string) {
  cy.get('[data-testid="search-input"]').type(coverage, {delay: 100});
  cy.get('ul.countries-list.position-absolute')
    .should('be.visible')
    .within(() => {
      switch (region) {
        case 'Local':
          cy.get('li').contains(coverage).click();
          break;
        case 'Regional':
          cy.get('li').contains(commonFunctions.returnRegionalValue(coverage)).click();
          break;
        default:
          cy.get('li').contains('Discover').click();
          break;
      }
    });
});

Given(/^I select the e-sim package that have the following details$/, function (dataTable: DataTable) {
  const dataTableObject = commonFunctions.convertDataTableIntoObject(dataTable);
  const coverageName = commonFunctions.lowercaseFirstCharOfEachWord(dataTableObject.Coverage);
  const urlExtension = commonFunctions.returnUrlExtension(coverageName, dataTableObject.area);
  const eSimPrice = commonFunctions.formatCurrency(dataTableObject.eSimValue, dataTableObject.eSimCurrency);

  SharedState.set('dataTableDetails', dataTableObject);
  cy.url().should('include', urlExtension + '-esim');
  cy.get('[data-testid="sim-package-item"]')
    .should('be.visible')
    .and('have.length.greaterThan', 1)
    .contains(eSimPrice)
    .closest('[data-testid="sim-package-item"]') // Ensure we are in the correct package item container
    .should('be.visible')
    .within(() => {
      cy.get('button.btn.btn-sim-item-btn.btn-block').click();
    });
});

Then(/^I verify the e-sim package I selected$/, function () {
  const retrievedDataTableObject = SharedState.get<any>('dataTableDetails');
  const simValue = commonFunctions.formatCurrency(retrievedDataTableObject.eSimValue, retrievedDataTableObject.eSimCurrency);
  selectEsimPackages.assertSimPackageDetails(simValue, retrievedDataTableObject);
});
