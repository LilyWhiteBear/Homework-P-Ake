import * as dayjs from "dayjs";
import { RegularHttpHeaderReq } from "../../constant/common";


export type RegularHttpHeaderReqArgs = Partial<RegularHttpHeaderReq>

export class HttpHeaderFactory {
    public static getRegularHeaderReq(params?: RegularHttpHeaderReqArgs): RegularHttpHeaderReq {
        return {
            reqID: params?.reqID || 'CTP-' + this.newGuid(),
            reqChannel: params?.reqChannel || '',
            reqDtm: params?.reqDtm || dayjs().toISOString(),
            reqBy: params?.reqBy || '',
            service: params?.service || '',
        }
    }

    private static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}