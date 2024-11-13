import { IApi, ICard, IUser} from "../types";
import { ApiListResponse } from "./base/api";


export class AppApi {
    private _baseApi: IApi;
    readonly cdn: string;

    constructor(cdn: string, baseApi: IApi) {
        this.cdn = cdn;
        this._baseApi = baseApi;
    }

    getCards(): Promise<ICard[]> {
        return this._baseApi.get(`/product`).then((data: ApiListResponse<ICard>) => 
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        )
    }
    
    orderLots(order: IUser): Promise<IUser> {
        return this._baseApi.post('/order', order).then(
            (data: IUser) => data
        );
    }
}