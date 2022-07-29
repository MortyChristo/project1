Feature: Manager


  Scenario Outline: Table sort features                                                14 of 14 test passed
    Given that I am at the manager page
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
    | Employee ID           | 100001   | 100001   |
    | Employee ID           | 123456   | 123456   |

    Scenario: Valid Reimbursement Id and Radio button checked
      Given that I am at the manager page
      When I type in a valid reimbursement id
      And I select a radio button
      Then I will be approve/deny the reimbursement request

    Scenario: Invalid Reimbursement Id and no Radio button checked
      Given that I am at the manager page
      When I type in an Invalid reimbursement id
      And I do not select a radio button
      Then I will receive an alert

      Scenario: Valid Reimbursement Id and no Radio button checked
      Given that I am at the manager page
      When I type in a valid reimbursement id
      And I do not select a radio button
      Then I will receive an alert

        Scenario: Invalid Reimbursement Id and Radio button checked
      Given that I am at the manager page
      When I type in an invalid reimbursement id
      And I select a radio button
      Then I will receive an alert

          Scenario: Click logout
      Given that I am at the manager page
      When I click the logout button
      Then I will be logged out
      And I will be redirected to the login screen



