interface NotifierInterface {
  send: () => void
}

class EmailNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Email was sent: ', this.message);
  }
}

class SlackNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Slack notification was sent: ', this.message);
  }
}

class TeleNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Tele notification was sent: ', this.message);
  }
}

// class SlackEmailNotification implements NotificationInterface {
//   message: string;
  
//   constructor(message: string) {
//     this.message = message;
//   }
  
//   send() {
//     const emailNotification = new EmailNotification(this.message);
//     emailNotification.send();

//     const slackNotification = new SlackNotification(this.message);
//     slackNotification.send();
//   }
// }

interface NotifierDecorator {
  core: NotifierDecorator | null,
  notifier: NotifierInterface
}

// func (nd NotifierDecorator) Decorate(notifier Notifier) NotifierDecorator {
// 	return NotifierDecorator{
// 		core:     &nd,
// 		notifier: notifier,
// 	}
// }

// func NewNotifierDecorator(notifier Notifier) NotifierDecorator {
// 	return NotifierDecorator{notifier: notifier}
// }


class NewNotifierDecorator {
  static create(notifier: NotifierInterface): NotifierDecorator {
    return {
      core: null,
      notifier
    };
  }

  decorate(notifier: NotifierInterface): NotifierDecorator {
    return {
      core: this.nd,
      notifier
    } as NotifierDecorator;
  }
}

class NotificationService {
  nd: NotifierDecorator;

  constructor(nd: NotifierDecorator) {
    this.nd = nd;
  }

  // decorate(notifier: NotifierInterface): NotifierDecorator {
  //   return {
  //     core: this.nd,
  //     notifier
  //   } as NotifierDecorator;
  // }

  send() {
    const nd = this.nd;
    nd.notifier.send();

    if (nd.core !== null) {
      nd.core.notifier.send();
    }
  }
}

function main() {
  const message = 'Testing';

  const notificationService = new NotificationService({
    core: null,
    notifier: new EmailNotification(message),
  });
  notificationService.decorate(new SlackNotification(message));

  notificationService.decorate(new TeleNotification(message));

  notificationService.send();
}

main();

export {};
