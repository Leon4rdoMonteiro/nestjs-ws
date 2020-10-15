import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  private logger: Logger = new Logger('AppGateway')

  @WebSocketServer() wss: Server
    
  afterInit(server: Server) {
    this.logger.log('@SERVER INITIALIZED')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`@CLIENT DISCONNECTED: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`@CLIENT CONNECTED: ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void{
    this.wss.emit('msgToClient', text)
    // return { event: 'msgToClient', data: text };
  }
}
