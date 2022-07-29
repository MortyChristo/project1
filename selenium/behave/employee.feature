Feature: Employee


  Scenario: Clicking Add Reimbursement Button                             11 of 11 passed
    Given that I am at the employee page
    When I click the add reimbursement Button
    Then I should be redirected to the add reimbursement page

  Scenario: Clicking Logout Button
    Given that I am at the employee page
    When I click the logout Button
    Then I should be given an alert that I am logged out
    And I should then be redirected to the login page

  Scenario: Clicking Populate table Button
    Given that I am at the employee page
    When I click the populate table Button
    Then I should be given all reimbursements submitted by user logged in
    And those reimbursements should have information like an id
    And an amount
    And a reimbursement type
    And a description
    And a status
    And a submittied timestamp
    And an Approved timestamp
    And an image file
    And who it was approved by

  Scenario: Loading page and not logged in
    Given that I try to access the employee page
    When I am not logged in
    Then I should be redirected to the login page

  Scenario Outline:
    Given that I am at the employee page
    When I select one of the dropdowns <dropdown>
    And I choose one of the select options <select>
    Then the table should generate data based on that option <table>
    Examples:

    | dropdown              | select   | table    |
    | Type of Reimbursement | Lodging  | Lodging  |
    | Type of Reimbursement | Travel   | Travel   |
    | Type of Reimbursement | Food     | Food     |
    | Type of Reimbursement | Other    | Other    |
    | Status                | Pending  | Pending  |
    | Status                | Accepted | Accepted |
    | Status                | Declined | Declined |






