Feature: add

  Scenario: Valid Reimbursement                                                    4 of 4 passed test
      Given that I am at the add page
      When select a radio button
      And enter a valid amount
      And I upload an image
      Then a new reimbursement request will be added to my account


  Scenario: Invalid Reimbursement no radio button selected
      Given that I am at the add page
      When I do not select a radio button
      And I enter a valid amount
      And I upload an image
      Then I will receive an alert error


  Scenario: Invalid Reimbursement: bad amount
      Given that I am at the add page
      When I select a radio button
      And I enter an Invalid amount
      And I upload an image
      Then I will receive an alert error


  Scenario: Invalid Reimbursement: no image
      Given that I am at the add page
      When I select a radio button
      And I enter a valid amount
      And I do not upload an image
      Then I will receive an alert error
