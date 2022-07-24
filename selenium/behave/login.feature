Feature: Login

  Scenario: Click Home Button
    Given that I am at the Login page
    When I click the home button
    Then I will be redirected to the home page

  Scenario: Click Register Button
    Given that I am at the Login page
    When I click the register button
    Then I will be redirected to the Registration page


  Scenario Outline: Successful Login
    Given that I am at the login page
    When I type in a valid username of <un>
    And a valid password of <pw>
    And I click login
    Then I should be redirected to the <pagename> homepage

    Examples: Student credentials
    | un               | pw            | pagename |
    | ChristopSullivan | PassWord123!  | employee |
    | MartyMcFly       | TheDoc123!    | manager  |

#add more people into table


  Scenario: Invalid username, invalid password
    Given that I am at the login page
    When I type an invalid username of "someOne"
    And I type an invalid password of "yessir"
    And I click login
    Then I should see an alert message of "Invalid username and/or password"

  Scenario: Valid username, invalid password
    Given that I am at the login page
    When I type a valid username of "ChristopSullivan"
    And I type an invalid password of "12345"
    And I click login
    Then I should see an alert message of "Invalid username and/or password"

  Scenario: Invalid username, valid password
    Given that I am at the login page
    When I type an invalid username of "someOne"
    And I type a valid password of "PassWord123!"
    And I click login
    Then I should see an alert message of "Invalid username and/or password"

