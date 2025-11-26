@ravenSmokeTest
Feature: Add item into cart test

  Scenario Outline: Add the highest priced item into the cart
    Given I login as a "<userType>" user
    And I select the "highest" priced item on the page
    When I add the selected highest priced item to the cart
    Then The item should be displayed in the cart

    Examples:
      | userType      |
      | standard_user |
