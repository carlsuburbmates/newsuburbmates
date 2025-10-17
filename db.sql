-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  checkout_session_id TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  user_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Safe upsert by checkout_session_id
CREATE OR REPLACE FUNCTION upsert_order_orders(
  p_id TEXT,
  p_checkout_session_id TEXT,
  p_amount NUMERIC,
  p_currency TEXT,
  p_status TEXT,
  p_user_id TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO orders (id, checkout_session_id, amount, currency, status, user_id)
  VALUES (p_id, p_checkout_session_id, p_amount, p_currency, p_status, p_user_id)
  ON CONFLICT (checkout_session_id) DO UPDATE
    SET amount = EXCLUDED.amount,
        currency = EXCLUDED.currency,
        status = EXCLUDED.status,
        user_id = EXCLUDED.user_id;
END;
$$ LANGUAGE plpgsql;
