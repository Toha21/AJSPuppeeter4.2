Feature: buying tickets

        Scenario: the user selects and books one seat
                Given user is on page
                When user choose day and movie
                And select row and seat
                Then ticket purchase is confirmed

        Scenario: the user selects and books several seats
                Given user is on page
                When user choose day and movie
                And select row and seats
                Then ticket purchase is confirmed

        Scenario: the user trying to select reserved seats
                Given user is on page
                When user choose day and movie
                And select row and seat
                And user is on page
                When user choose day and movie
                Then booking is not possible