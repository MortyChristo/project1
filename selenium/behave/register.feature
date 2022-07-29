Feature: Register

  Scenario Outline: Successful Employee Registration                             11 of 14 test passed 95% total passing
    Given that I am at the registration page
    When I type in a valid Employee ID of <id>
    And a valid username of <un>
    And a valid password of <pw>
    And a valid firstname of <fn>
    And a valid last name of <ln>
    And a valid email address of <ea>
    And I click Register
    Then I should be redirected to the <pagename> homepage

    Examples: Student credentials
    |id    | un               | pw            | fn    | ln       | ea                         | pagename |
    |123456| jackieboy        | PassWord123!  | Jack  | Sparrow  | thepirate@rev.net          | login    |
    |987654| drsuess          | WHOOville!1   | The   | Grinch   | hateschristmas@whoville.com| login    |
    |852147| nighthawk        | TheDragonB4D1 |Brennan| Huff     | president@prestigeworldwide| login    |


  Scenario: Employee Id is already in use
    Given that I am at the registration page
    When I type in a valid employee id that is already in use
    And a valid username
    And a valid password
    And a valid firstname
    And a valid last name
    And a valid email address
    And I click Register
    Then I should receive an error stating the username is already in use


  Scenario: Username is already in use
    Given that I am at the registration page
    When I type in a valid employee id
    And a username that is already in use
    And a valid password
    And a valid firstname
    And a valid last name
    And a valid email address
    And I click Register
    Then I should receive an error stating the username is already in use

      Scenario: Email is already in use
    Given that I am at the registration page
    When I type in a valid employee id
    And a valid username
    And a valid password
    And a valid firstname
    And a valid last name
    And a valid email address that is already in use
    And I click Register
    Then I should receive an error stating the username is already in use

  Scenario: Invalid employee id, Invalid username, invalid password, Invalid first name, Invalid last name, Invalid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type an invalid username of "someOne"
    And I type an invalid password of "yessir"
    And I type an invalid first name of "C"
    And I type an invalid last name of "S"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, username, password, firstname, lastname, email address)

  Scenario: Valid employee id, Invalid username, invalid password, Invalid first name, Invalid last name, Invalid email address
    Given that I am at the registration page
    When I type a valid employee id "582364"
    And I type an invalid username of "someOne"
    And I type an invalid password of "yessir"
    And I type an invalid first name of "C"
    And I type an invalid last name of "S"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (username, password, firstname, lastname, email address)

      Scenario: Invalid employee id, Valid username, invalid password, Invalid first name, Invalid last name, Invalid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type a valid username of "TheGreat"
    And I type an invalid password of "yessir"
    And I type an invalid first name of "C"
    And I type an invalid last name of "S"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, password, firstname, lastname, email address)

      Scenario: Invalid employee id, Invalid username, Valid password, Invalid first name, Invalid last name, Invalid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type an invalid username of "someOne"
    And I type a valid password of "PassWord123!"
    And I type an invalid first name of "C"
    And I type an invalid last name of "S"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, username, firstname, lastname, email address)

        Scenario: Invalid employee id, Invalid username, invalid password, Valid first name, Invalid last name, Invalid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type an invalid username of "someOne"
    And I type an invalid password of "yessir"
    And I type a valid first name of "Chris"
    And I type an invalid last name of "S"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, username, password, lastname, email address)

      Scenario: Invalid employee id, Invalid username, invalid password, Invalid first name, Valid last name, Invalid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type an invalid username of "someOne"
    And I type a valid password of "pass"
    And I type an invalid first name of "C"
    And I type an invalid last name of "SkyWalker"
    And I type an invalid email address of "blank"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, username, password, firstname, email address)

 Scenario: Invalid employee id, Invalid username, invalid password, Invalid first name, Invalid last name, Valid email address
    Given that I am at the registration page
    When I type an invalid employee id "1"
    And I type an invalid username of "someOne"
    And I type an invalid password of "yessir"
    And I type an invalid first name of "C"
    And I type an invalid last name of "S"
    And I type a valid email address of "jasonVorhees@camp"
    And I click Register
    Then I should see an alert message for all Invaild fields (employee id, username, password, firstname, lastname)


 Scenario: At least one Invalid input and any number of Valid inputs
    Given that I am at the registration page
    When at least one invalid input
    And I have any number of other valid inputs
    And I click Register
    Then I should see an alert message for all Invaild fields

