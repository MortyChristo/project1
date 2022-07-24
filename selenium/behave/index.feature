Feature: Index


  Scenario Outline: Clicking Login and Registration buttons
    Given that I am at the login page
    When I click on button <bn>
    And I am logged in as <li>
    Then I should be redirected to the <pagename> homepage

    Examples: login credentials
    | bn               | li            | pagename |
    | login            | employee      | employee |
    | register         | employee      | employee |
    | login            | manager       | manager  |
    | register         | manager       | manager  |



  Scenario: Clicking Register Button When not logged in
    Given that I am at the home page
    When I click the Register Button
    Then I should be redirected to the Registeration page


  Scenario: Clicking Login Button when not logged in
    Given that I am at the home page
    When I click the Login Button
    Then I should be redirected to the Login page



