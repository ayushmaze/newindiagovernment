-- Idempotent init: create payload role if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'payload') THEN
    CREATE ROLE payload WITH LOGIN PASSWORD 'payload';
  END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE payload TO payload;
ALTER DATABASE payload OWNER TO payload;
