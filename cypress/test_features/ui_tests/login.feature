@ravenSmokeTest
Feature: login test

  Scenario Outline: User can select the first eSim package <eSimPrice> price
    Given I navigate to airalo website
    When I search and select "<countryCoverage>" under "<eSimRegion>" region
    And I select the e-sim package that have the following details
      | Coverage           | Data        | Validity      | eSimValue   | eSimCurrency | area         |
      | <countryCoverage>  | <dataValue> |<dataValidity> | <eSimPrice> | <currency>   | <eSimRegion> |

    Then I verify the e-sim package I selected
  Examples:
  | countryCoverage | dataValue| dataValidity | eSimPrice | eSimRegion | currency|
  | Japan           | 1 GB     | 1 Day        | 0.00      | Local      | GBP     |

#  Bonus testcase
  | Japan           | 1 GB     | 7 Days       | 4.00      | Local      | GBP     |
  | Egypt           | 1 GB     | 7 Days       | 6.00      | Local      | GBP     |
  | United States   | 20 GB    | 30 Days      | 33.50     | Local      | GBP     |


#Bonus Testcase
  Scenario Outline: User can login
    Given I navigate to airalo website
    When I search and select "<countryCoverage>" under "<eSimRegion>" region
    And I select the e-sim package that have the following details
      | Coverage           | Data        | Validity      | eSimValue   | eSimCurrency | area         | numberOfAreas |
      | <countryCoverage>  | <dataValue> |<dataValidity> | <eSimPrice> | <currency>   | <eSimRegion> | 3 Countries   |

    Then I verify the e-sim package I selected
    Examples:
      | countryCoverage | dataValue| dataValidity | eSimPrice | eSimRegion | currency|
      | United States   | 10 GB    | 30 Days      | 37.00     | Regional   | GBP     |