import md5 from "./md5";

export default class Service {
    date = new Date();
    year = this.date.getFullYear();
    month = this.date.getUTCMonth() + 1 >= 10 ? this.date.getUTCMonth() + 1 : `0${this.date.getUTCMonth() + 1}`;
    day = this.date.getUTCDate() >= 10 ? this.date.getUTCDate() : `0${this.date.getUTCDate()}`;
    _pass = 'Valantis';
    _timestamp = `${this.year}${this.month}${this.day}`;

    _url = 'https://api.valantis.store:41000/';

    getResource = async (body) => {
        let _options = {
                            'method': 'POST',
                            'headers': {
                                'X-Auth': md5(`${this._pass}_${this._timestamp}`),
                                'Content-Type': 'application/json'
                            },
                            'body': body
                        }
        let res = await fetch(this._url, _options);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._url}, status ${res.status}`)
        }
        return res.json();
    }

    get_ids = (offset = 0, limit = 50) => {
        const res_body = JSON.stringify({"action": "get_ids","params": {offset, limit}});
        return this.getResource(res_body); 
    }


    // get_items - возвращает упорядоченный список товаров со всеми характеристиками, если переданы идентификаторы товаров.
    //"1789ecf3-f81c-4f49-ada2-83804dcc74b0" пример ID
    get_items = (idsArray) => {
        const res_body = JSON.stringify({"action": "get_items","params": {"ids": idsArray}})
        return this.getResource(res_body); 
    }

    //get_fields - без параметров возвращает упорядоченный список имеющихся полей товаров.
    //fields brand, id, price, product
    //.get_fields('https://api.valantis.store:41000/', 'product', 0, 50) - пример запроса
    get_fields = (field, offset = 0, limit = 50) => {
        const res_body = JSON.stringify({"action": "get_fields",
                                         "params": {"field": field, "offset": offset, "limit": limit}})
        return this.getResource(res_body); 
    }

    //filter - используется для фильтрации.
    filter = (name, valueOfFilter) => {
        const res_body = JSON.stringify({"action": "filter",
                                         "params": {[name]: valueOfFilter}})
        return this.getResource(res_body); 
    }
}