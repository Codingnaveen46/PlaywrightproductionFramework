Feature: Login Functionality

  @smoke
  Scenario: Successful Login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the products page
