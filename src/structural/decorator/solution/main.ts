interface NotifierInterface {
  send: () => void
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

class EmailNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Email was sent:', this.message);
  }
}

class SlackNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Slack notification was sent:', this.message);
  }
}

class TeleNotification implements NotifierInterface {
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
  
  send() {
    console.log('Tele notification was sent:', this.message);
  }
}

interface NotifierDecorator {
  core: NotifierDecorator | null,
  notifier: NotifierInterface,
  decorate?: (nt: NotifierInterface) => NotifierDecorator
}

function decorate(stack: NotifierDecorator | null, notifier: NotifierInterface): NotifierDecorator {
  return {
    core: stack,
    notifier,
  };
}

class NotifierStack {
  core: NotifierDecorator | null;
  notifier: NotifierInterface;

  constructor(core: NotifierDecorator | null, notifier: NotifierInterface) {
    this.core = core;
    this.notifier = notifier;
  }

  decorate(notifier: NotifierInterface): NotifierDecorator {
    return {
      core: this,
      notifier
    } as NotifierDecorator;
  }
}

class NotificationService {
  nd: NotifierDecorator;

  constructor(nd: NotifierDecorator) {
    this.nd = nd;
  }

  send() {
    console.log('Send');
    const nd = this.nd;
    nd.notifier.send();

    if (nd.core !== null) {
      nd.core.notifier.send();
    }
  }
}

function main() {
  const message = 'Testing';

  const notifierStack = new NotifierStack(null, new EmailNotification(message));

  notifierStack.decorate(new SlackNotification(message));

  console.log('notifierStack', notifierStack)


  const notiService = new NotificationService(notifierStack);

  notiService.send();
}

main();

export {};
