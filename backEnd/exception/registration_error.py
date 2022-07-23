class RegistrationError(Exception):
    def __init__(self):
        super(RegistrationError, self).__init__()
        self.messages = []
    def getMessages(self):
        return self.messages