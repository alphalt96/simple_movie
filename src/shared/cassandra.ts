import * as cassandra from 'cassandra-driver';

export const client = new cassandra.Client({
  contactPoints: ['cassandra2'],
  localDataCenter: 'datacenter1',
  keyspace: 'simple_movie'
});


export const Mapper = cassandra.mapping.Mapper;
