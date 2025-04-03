import {DataTable, Given, Then} from '@badeball/cypress-cucumber-preprocessor';
import {CommonFunctions as commonFunctions} from "../../utilities/commonFunctions";
import {SharedState} from '../../../support/sharedState';
import {SelectEsimPackages } from "../../pageObjects/selectEsimPackages";
const selectEsimPackages = new SelectEsimPackages();



Given(/^I search and select "([^"]*)" under "([^"]*)" region$/, function (coverage: string, region: string) {
    cy.get('[data-testid="search-input"]').type(coverage, { delay: 100 });
    cy.get('ul.countries-list.position-absolute').should('be.visible').within(()=>{
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

    })
})

Given(/^I select the e-sim package that have the following details$/, function (dataTable: DataTable) {
    const dataTableObject = commonFunctions.convertDataTableIntoObject(dataTable)
    const coverageName = commonFunctions.lowercaseFirstCharOfEachWord(dataTableObject.Coverage)
    const urlExtension = commonFunctions.returnUrlExtension(coverageName, dataTableObject.area)
    const eSimPrice = commonFunctions.formatCurrency(dataTableObject.eSimValue, dataTableObject.eSimCurrency)

    SharedState.set('dataTableDetails', dataTableObject)
    cy.url().should('include', urlExtension + '-esim');
    cy.get('[data-testid="sim-package-item"]').should('be.visible')
        .and('have.length.greaterThan', 1).contains(eSimPrice)
        .closest('[data-testid="sim-package-item"]') // Ensure we are in the correct package item container
        .should('be.visible').within(() => {
        cy.get('button.btn.btn-sim-item-btn.btn-block')
            .scrollIntoView().should('be.visible').click();
    });
})

Then(/^I verify the e-sim package I selected$/, function () {
    const retrievedDataTableObject = SharedState.get<any>('dataTableDetails');
    const simValue = commonFunctions.formatCurrency(retrievedDataTableObject.eSimValue, retrievedDataTableObject.eSimCurrency);
    selectEsimPackages.assertSimPackageDetails(simValue, retrievedDataTableObject);
});


Then(/^I verify the e-sim package I selectedqwe$/, function () {
    const retrievedDataTableObject = SharedState.get<any>('dataTableDetails');
    const simValue = commonFunctions.formatCurrency(retrievedDataTableObject.eSimValue, retrievedDataTableObject.eSimCurrency);
    cy.get('[data-testid="package-detail"]').should('be.visible').within(()=>{
        cy.get('[data-testid="sim-detail-info-list"]').should('be.visible').within(()=>{
            cy.get('li').should('be.visible').each((element, index)=>{
                if(simValue === '£0.00'){
                    if(index === 0){
                        cy.get('.airalo-icon-star.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="WELCOME eSIM-row"]').should('be.visible').and('have.text', 'WELCOME eSIM')
                        cy.get('[data-testid="WELCOME eSIM-value"]').should('be.visible').and('contain.text', 'FREE')
                    }
                    if(index === 1){
                        cy.get('.airalo-icon-globe-2.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="COVERAGE-row"]').should('be.visible').and('have.text', 'COVERAGE')
                        cy.get('[data-testid="COVERAGE-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Coverage)
                    }
                    if(index === 2){
                        cy.get('.airalo-icon-arrows-up-and-down.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="DATA-row"]').should('be.visible').and('have.text', 'DATA')
                        cy.get('[data-testid="DATA-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Data)
                    }
                    if(index === 3){
                        cy.get('.airalo-icon-calendar.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="VALIDITY-row"]').should('be.visible').and('have.text', 'VALIDITY')
                        cy.get('[data-testid="VALIDITY-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Validity)
                    }
                    if(index === 4){
                        cy.get('.list-icon.sim-item-row-left-icon').should('be.visible')
                        cy.get('[data-testid="PRICE-row"]').should('be.visible').and('have.text', 'PRICE')
                        cy.get('[data-testid="PRICE-value"]').should('be.visible').and('contain.text', simValue)
                    }

                } else{
                    if(index === 0){
                        cy.get('.airalo-icon-globe-2.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="COVERAGE-row"]').should('be.visible').and('have.text', 'COVERAGE')
                        cy.get('[data-testid="COVERAGE-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Coverage)
                    }
                    if(index === 1){
                        cy.get('.airalo-icon-arrows-up-and-down.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="DATA-row"]').should('be.visible').and('have.text', 'DATA')
                        cy.get('[data-testid="DATA-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Data)
                    }
                    if(index === 2){
                        cy.get('.airalo-icon-calendar.list-icon.sim-item-row-left-icon.row-item-icon-padding').should('be.visible')
                        cy.get('[data-testid="VALIDITY-row"]').should('be.visible').and('have.text', 'VALIDITY')
                        cy.get('[data-testid="VALIDITY-value"]').should('be.visible').and('contain.text', retrievedDataTableObject.Validity)
                    }
                    if(index === 3){
                        cy.get('.list-icon.sim-item-row-left-icon').should('be.visible')
                        cy.get('[data-testid="PRICE-row"]').should('be.visible').and('have.text', 'PRICE')
                        cy.get('[data-testid="PRICE-value"]').should('be.visible').and('contain.text', simValue)
                    }
                }


            })


        })


    })

})
