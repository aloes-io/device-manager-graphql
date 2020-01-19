import {inject, Provider, ValueOrPromise} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Request, Response} from '@loopback/rest';
import {CacheBindings, CacheMetadata, CacheStrategy} from 'loopback-api-cache';
import {Cache} from '../models';
import {CacheRepository} from '../repositories';

export class CacheStrategyProvider implements Provider<CacheStrategy | undefined> {
  constructor(
    @inject(CacheBindings.METADATA)
    private metadata: CacheMetadata,
    @repository(CacheRepository) protected cacheRepo: CacheRepository,
  ) {}

  value(): ValueOrPromise<CacheStrategy | undefined> {
    if (!this.metadata) {
      return undefined;
    }
    // console.log('CACHE STRATEGY', this.cacheRepo, this.metadata);

    const getCacheKey = (req: Request): string => {
      // console.log('BUILD CACHE PATH REQ', req.path, req.query);
      let reqParams = {path: req.path};
      if (req.query) {
        reqParams = {...reqParams, ...req.query};
      }
      // console.log('BUILD CACHE PATH RES', JSON.stringify(reqParams));
      const buff = Buffer.from(JSON.stringify(reqParams));
      const cacheKey = buff.toString('base64');
      return cacheKey;
    };

    return {
      check: (req: Request) => {
        const cacheKey = getCacheKey(req);
        // console.log('GET CACHE', cacheKey);
        return this.cacheRepo.get(cacheKey).catch(err => {
          console.error(err);
          return undefined;
        });
      },

      set: async (req: Request, result: any) => {
        const cacheKey = getCacheKey(req);
        // console.log('SET CACHE', cacheKey);
        const ttl = this.metadata.ttl && this.metadata.ttl > 0 ? this.metadata.ttl : 0;
        const cache = new Cache({id: cacheKey, data: result, ttl});
        this.cacheRepo.set(cacheKey, cache, {ttl: ttl * 1000}).catch(err => {
          console.error(err);
        });
      },
    };
  }
}
