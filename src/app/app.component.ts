import { Component } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputMessage: string = '';
  public outputMessages: string[] = [];

  constructor(private websocketService: WebsocketService) {
    this.websocketService.getMessage((message: string) => {
      if (typeof message === 'string') {
        this.outputMessages.push(message);
      }
    });
  }

  public sendMessage(): void {
    if (this.inputMessage && this.inputMessage.trim() !== '') {
      this.websocketService.sendMessage(this.inputMessage);
      this.inputMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}
