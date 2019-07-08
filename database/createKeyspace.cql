CREATE KEYSPACE IF NOT EXISTS fun 
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };