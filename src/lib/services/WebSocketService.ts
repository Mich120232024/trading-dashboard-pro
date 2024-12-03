// src/lib/services/WebSocketService.ts
export interface WebSocketMessage {
  type: string;
  data: any;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private url: string;
  private socket: WebSocket | null = null;
  private subscriptions: Map<string, ((data: any) => void)[]> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  private constructor(url: string) {
    this.url = url;
  }

  public static getInstance(url: string): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(url);
    }
    return WebSocketService.instance;
  }

  connect() {
    if (this.isConnected) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        const callbacks = this.subscriptions.get(message.type);
        if (callbacks) {
          callbacks.forEach((callback) => callback(message.data));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
      } else {
        console.log("Max reconnect attempts reached");
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.subscriptions.has(type)) {
      this.subscriptions.set(type, []);
    }
    this.subscriptions.get(type)!.push(callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
