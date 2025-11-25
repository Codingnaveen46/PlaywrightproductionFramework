Feature: Facilio login page
  As a Facilio user
  I want to open the login page
  So that I can sign in to my account

  Background:
    Given I am on the Facilio login page

  Scenario: Login page is displayed correctly
    Then I should see the login title "Welcome Back!"
    And I should see the email address input field
    And I should see the submit button
    And I should see SSO options for:
      | Apple     |
      | Microsoft |
      | Google    |
    And the login page URL should contain "identity/login"

  Scenario: Successful Login and Data Storage
    When I enter the email from "validUser"
    And I click the submit button
    And I enter the password from "validUser"
    And I click the sign in button
    Then I store the login data in the data folder
