interface NotificationInterface {
  send: () => void
}

class EmailNotification implements NotificationInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Email was sent: ', this.message);
  }
}

class SlackNotification implements NotificationInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Slack notification was sent: ', this.message);
  }
}

class SlackEmailNotification implements NotificationInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    const emailNotification = new EmailNotification(this.message);
    emailNotification.send();

    const slackNotification = new SlackNotification(this.message);
    slackNotification.send();
  }
}

function main() {
  const message = 'Testing';

  const slackEmailNotification = new SlackEmailNotification(message);
  slackEmailNotification.send();
}

main();

export {};
