interface NotificationInterface {
  send: () => void
}

class EmailNotification implements NotificationInterface {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  send() {
    console.log('Email was sent:', this.message);
  }
}

class SlackNotification implements NotificationInterface {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  send() {
    console.log('Slack notification was sent:', this.message);
  }
}

class NotificationService {
  notifier: NotificationInterface;

  constructor(notifier: NotificationInterface) {
    this.notifier = notifier;
  }

  setNotifier(notifier: NotificationInterface) {
    this.notifier = notifier;
  }

  send() {
    this.notifier.send();
  }
}

function main() {
  const message = 'Testing';

  const noti = new NotificationService(new EmailNotification(message));
  // Send EmailNotification
  noti.send();

  noti.setNotifier(new SlackNotification(message));
  // Send SlackNotification
  noti.send();
}

main();

export {};
