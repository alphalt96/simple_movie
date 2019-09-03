import { client, Mapper } from '../../shared/cassandra';
import { mapping } from 'cassandra-driver';

const UnderscoreToCamelMappings = mapping.UnderscoreCqlToCamelCaseMappings;

const userCredentialMapper = new Mapper(client, {
  models: {
    UserCredential: {
      tables: ['user_credentials'],
      mappings: new UnderscoreToCamelMappings(),
      columns: {
        user_id: 'id'
      }
    },
  }
});

const userProfileMapper = new Mapper(client, {
  models: {
    UserProfile: {
      tables: ['user_profiles'],
      mappings: new UnderscoreToCamelMappings(),
      columns: {
        user_id: 'id'
      }
    },
  }
});

// define model UserCredential
export const UserCredential = userCredentialMapper.forModel('UserCredential');

// define model UserProfile
export const UserProfile = userProfileMapper.forModel('UserProfile');
