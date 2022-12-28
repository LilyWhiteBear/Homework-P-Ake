export interface DepartmentAPI {
    name: string,
    url: string
}

export interface ReqAuthenLogin {
    headerReq: HeaderReq;
    content: Content;
}

export interface HeaderReq {
    reqID: string;
    reqChannel: string;
    reqDtm: string;
    reqBy: string;
    service: string;
}

export interface Content {
    appId: string;
    uuId: string;
    email: string;
    password: string;
}