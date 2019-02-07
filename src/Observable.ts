type SubscriberCallback = (...args: any[]) => any;

export abstract class Observable {
  private subscribers: Set<SubscriberCallback>;

  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback: SubscriberCallback): void {
    this.subscribers.add(callback);
  }

  unsubscribe(callback: SubscriberCallback): boolean {
    return this.subscribers.delete(callback);
  }

  async announceChanges(): Promise<void> {
    for (const subscriber of [...this.subscribers]) {
      subscriber();
    }
  }
}
