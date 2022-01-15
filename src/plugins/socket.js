import {io} from "socket.io-client/build/esm-debug";
import API_ADDRESS from "@/api/Addresses";

const SocketConnection = {
    _instance: null,
    token: null,
    examId: null,
    getInstance (token, examId) {
        if ((this.token !== token || this.examId !== examId) && this._instance) {
            this._instance.disconnect()
        }
        if (!this._instance || this.token !== token || this.examId !== examId) {
            this.token = token
            this.examId = examId
            this._instance = io(API_ADDRESS.socket, {
                withCredentials: true,
                auth: {
                    token,
                    examId
                }
            })
        }
        return this._instance;
    }
}

export default SocketConnection