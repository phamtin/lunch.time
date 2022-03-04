import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    getData(key: string) {
        return this.cache.get(key);
    }

    setData(key: any, value: any, ttl = 5 * 60) {
        return this.cache.set(key, value, {
            ttl,
        });
    }

    deleteKey(key: string) {
        return this.cache.del(key);
    }
}
