import {DefaultKeyValueRepository} from '@loopback/repository';
import {Cache} from '../models';
import {CacheDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CacheRepository extends DefaultKeyValueRepository<Cache> {
  constructor(@inject('datasources.cache') dataSource: CacheDataSource) {
    super(Cache, dataSource);
  }
}
