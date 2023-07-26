import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000');
  }

  sendMessage(data: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open. Unable to send data.');
    }
  }

  getMessage(callback: (message: string) => void): void {
    this.socket.onmessage = (event: MessageEvent) => {
      callback(event.data as string);
    };
  }

  disconnect() {
    this.socket.close();
  }
}
