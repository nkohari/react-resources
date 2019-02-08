type SubscriberCallback = (...args: any[]) => any;

/**
 * Provides a simple means to subscribe to changes.
 */
export abstract class Observable {
  private subscribers: Set<SubscriberCallback>;

  constructor() {
    this.subscribers = new Set();
  }

  /**
   * Subscribe to changes.
   * @param callback The function which should be called when a change occurs.
   */
  subscribe(callback: SubscriberCallback): void {
    this.subscribers.add(callback);
  }

  /**
   * Unsubscribe from changes.
   * @param callback The function which should no longer be called.
   */
  unsubscribe(callback: SubscriberCallback): boolean {
    return this.subscribers.delete(callback);
  }

  /**
   * Announce changes to all subscribers.
   */
  async announceChanges(): Promise<void> {
    for (const subscriber of [...this.subscribers]) {
      subscriber();
    }
  }
}
