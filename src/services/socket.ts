import io from 'socket.io-client';
import {baseUrl} from './axios';

export class Socket {
    public static connect(){
        io.connect(baseUrl);
    }
}