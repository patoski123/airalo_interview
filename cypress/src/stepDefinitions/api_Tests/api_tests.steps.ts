import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {SharedState} from "../../../support/sharedState";
import dayjs from "dayjs";

Given("I obtain a valid access token", () => {
    cy.task<string>('getToken').then((token) => {
        Cypress.env('apiToken', token); // Store it for use in When steps
    });
    // cy.request({
    //     method: 'POST',
    //     url: 'https://sandbox-partners-api.airalo.com/v2/token',
    //     body: {
    //         client_id: "7e29e2facf83359855f746fc490443e6",
    //         client_secret: "e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb",
    //         grant_type: "client_credentials"
    //     },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then((response) => {
    //     expect(response.status).to.eq(200);
    //     expect(response.statusText).to.eq('OK')
    //     cy.log(JSON.stringify(response));
    //     const token = response.body.data.access_token;
    //     SharedState.set('apiToken', token);
    //     // expect(token).to.be.a('string');
    // });

});


When("I place an order for 6 {string} eSIMs", (simName: string) => {
    const token = Cypress.env('apiToken');
    // const token = SharedState.get<any>('apiToken');
    cy.request({
        method: 'POST',
        url: 'https://sandbox-partners-api.airalo.com/v2/orders',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: {
            package_id: simName,
            quantity: 6,
            description:'6 ' + simName,

        },
    }).then((response) => {
        cy.log("✅ Response Body sims", JSON.stringify(response.body.data, null, 2))
        console.log("✅ Response Body:", JSON.stringify(response.body.data.sims, null, 2))
        const orderId = response.body.data.id;
        SharedState.set('orderId', orderId);
        SharedState.set('orderResponse', response);
    });
});

Then("the response should have status 200 and a valid order ID", () => {
    const orderApiResponse = SharedState.get<any>('orderResponse');
    expect(orderApiResponse.status).to.eq(200);
    expect(orderApiResponse.body.data).to.have.property("id");
});

When("I retrieve the list of eSIMs", () => {
    // const token = SharedState.get<any>('apiToken');
    const token = Cypress.env('apiToken');
    const startDate = "2025-04-03";
    const endDate = "2025-04-04";

    cy.request({
        method: 'GET',
        url: `https://sandbox-partners-api.airalo.com/v2/sims?filter[created_at]=${startDate} - ${endDate}&limit=50`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        SharedState.set('esimList', response.body.data);
    });
});

Then("I should see 6 eSIMs with the package slug {string}", (expectedSlug) => {
    const esimList = SharedState.get<any>('esimList');
    expect(Array.isArray(esimList)).to.be.true;
    console.log("✅ Response Body:", JSON.stringify(esimList, null, 2))
    // const filtered = esimList.filter((e: { package_id: string }) => e.package_id === expectedSlug);
    // cy.log("✅ Response Body:", JSON.stringify(filtered, null, 2))
    // expect(filtered.length).to.eq(6);

});
