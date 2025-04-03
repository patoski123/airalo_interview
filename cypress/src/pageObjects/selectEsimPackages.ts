
 class SelectEsimPackages {
    private readonly coverageValue: string = '[data-testid="COVERAGE-value"]';
    private readonly simPackageDetailsDiv: string =  '[data-testid="package-detail"]';
    private readonly simPackageDetailsInfoList: string = '[data-testid="sim-detail-info-list"]';
    private readonly coverageRow: string =  '[data-testid="COVERAGE-row"]';
    private readonly dataRow: string = '[data-testid="DATA-row"]';
    private readonly dataValue: string = '[data-testid="DATA-value"]';
    private readonly validityRow: string = '[data-testid="VALIDITY-row"]';
    private readonly validityValue: string = '[data-testid="VALIDITY-value"]';
    private readonly priceRow: string = '[data-testid="PRICE-row"]';
    private readonly priceValue: string = '[data-testid="PRICE-value"]';
    private readonly welcomeESimRow: string = '[data-testid="WELCOME eSIM-row"]';
    private readonly welcomeESimValue: string = '[data-testid="WELCOME eSIM-value"]';
    private readonly simPackageItemStarIcon: string = '.airalo-icon-star.list-icon.sim-item-row-left-icon.row-item-icon-padding';
    private readonly simPackageItemGlobeIcon: string = '.airalo-icon-globe-2.list-icon.sim-item-row-left-icon.row-item-icon-padding';
    private readonly simPackageItemDataIcon: string = '.airalo-icon-arrows-up-and-down.list-icon.sim-item-row-left-icon.row-item-icon-padding';
    private readonly simPackageItemIconValidityCalender: string = '.airalo-icon-calendar.list-icon.sim-item-row-left-icon.row-item-icon-padding';
    private readonly simPackageItemPriceIcon: string = '.list-icon.sim-item-row-left-icon';

     public assertFreeSimPackageDetails(retrievedDataTableObject: any): void {
         cy.get(this.simPackageDetailsDiv).should('be.visible').within(()=>{
                     cy.get(this.simPackageDetailsInfoList).should('be.visible').within(()=>{
                         cy.get('li').should('be.visible').each((element, index)=>{
                                 if(index === 0){
                                     cy.get(this.simPackageItemStarIcon).should('be.visible')
                                     cy.get(this.welcomeESimRow).should('be.visible').and('have.text', 'WELCOME eSIM')
                                     cy.get(this.welcomeESimValue).should('be.visible').and('contain.text', 'FREE')
                                 }
                                 if(index === 1){
                                     cy.get(this.simPackageItemGlobeIcon).should('be.visible')
                                     cy.get(this.coverageRow).should('be.visible').and('have.text', 'COVERAGE')
                                     cy.get(this.coverageValue).should('be.visible').and('contain.text', retrievedDataTableObject.Coverage)
                                 }
                                 if(index === 2){
                                     cy.get(this.simPackageItemDataIcon).should('be.visible')
                                     cy.get(this.dataRow).should('be.visible').and('have.text', 'DATA')
                                     cy.get(this.dataValue).should('be.visible').and('contain.text', retrievedDataTableObject.Data)
                                 }
                                 if(index === 3){
                                     cy.get(this.simPackageItemIconValidityCalender).should('be.visible')
                                     cy.get(this.validityRow).should('be.visible').and('have.text', 'VALIDITY')
                                     cy.get(this.validityValue).should('be.visible').and('contain.text', retrievedDataTableObject.Validity)
                                 }
                                 if(index === 4){
                                     cy.get(this.simPackageItemPriceIcon).should('be.visible')
                                     cy.get(this.priceRow).should('be.visible').and('have.text', 'PRICE')
                                     cy.get(this.priceValue).should('be.visible').and('contain.text', '0.00')
                                 }
                         })
                     })
         })
     }

     public assertPaidSimPackageDetails(simValue: string, retrievedDataTableObject: any): void {
         cy.get(this.simPackageDetailsDiv).should('be.visible').within(()=>{
             cy.get(this.simPackageDetailsInfoList).should('be.visible').within(()=>{
                 cy.get('li').should('be.visible').each((element, index)=>{
                   if(index === 0){
                       cy.get(this.simPackageItemGlobeIcon).should('be.visible')
                       cy.get(this.coverageRow).should('be.visible').and('have.text', 'COVERAGE')
                       if(retrievedDataTableObject.area === 'Local'){
                           cy.get(this.coverageValue).should('be.visible').and('contain.text', retrievedDataTableObject.Coverage)
                       }
                       if(retrievedDataTableObject.area === 'Regional'){
                           cy.get(this.coverageValue).should('be.visible').and('contain.text', retrievedDataTableObject.numberOfAreas)
                       }


                   }
                   if(index === 1){
                         cy.get(this.simPackageItemDataIcon).should('be.visible')
                         cy.get(this.dataRow).should('be.visible').and('have.text', 'DATA')
                         cy.get(this.dataValue).should('be.visible').and('contain.text', retrievedDataTableObject.Data)
                   }
                   if(index === 2){
                         cy.get(this.simPackageItemIconValidityCalender).should('be.visible')
                         cy.get(this.validityRow).should('be.visible').and('have.text', 'VALIDITY')
                         cy.get(this.validityValue).should('be.visible').and('contain.text', retrievedDataTableObject.Validity)
                   }
                   if(index === 3){
                       cy.get(this.simPackageItemPriceIcon).should('be.visible')
                       cy.get(this.priceRow).should('be.visible').and('have.text', 'PRICE')
                       cy.get(this.priceValue).should('be.visible').and('contain.text', simValue)
                   }


                 })
             })
         })
     }

     public assertSimPackageDetails(simValue: string, retrievedDataTableObject: any): void {
         if (simValue === '0.00') {
             this.assertFreeSimPackageDetails(retrievedDataTableObject);
         } else {
             this.assertPaidSimPackageDetails(simValue, retrievedDataTableObject);
         }
     }

}
export {SelectEsimPackages};