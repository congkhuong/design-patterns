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

function main(type: string) {
  // const type = 'email';
  const message = 'Testing';
  let noti;

  if (type === 'email') {
    noti = new EmailNotification(message);
  } else {
    noti = new SlackNotification(message);
  }

  noti.send();
}

main('email');
main('slack');

export {};
