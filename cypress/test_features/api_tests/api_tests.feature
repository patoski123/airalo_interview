Feature: Airalo Partner API Automation Tests

  Background:
    Given I obtain a valid access token

  Scenario: Authenticate and order 6 eSIMs
    When I place an order for 6 "merhaba-7days-1gb" eSIMs
    Then the response should have status 200 and a valid order ID
    When I retrieve the list of eSIMs
    Then I should see 6 eSIMs with the package slug "merhaba-7days-1gb"
