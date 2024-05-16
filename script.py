import pandas as pd
import sqlite3
import os

def read_csv(file_path):
    """Reads a CSV file into a DataFrame."""
    return pd.read_csv(file_path)

def insert_into_db(df, table_name, conn):
    """Inserts a DataFrame into the SQLite database."""
    df.to_sql(table_name, conn, if_exists='append', index=False)

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, 'data')
    db_path = os.path.join(base_dir, 'shipment_database.db')
    conn = sqlite3.connect(db_path)

    # Load data
    df0 = read_csv(os.path.join(data_dir, 'shipping_data_0.csv'))
    df1 = read_csv(os.path.join(data_dir, 'shipping_data_1.csv'))
    df2 = read_csv(os.path.join(data_dir, 'shipping_data_2.csv'))
    #insert the already processed shipping_data_0 directly into the database
    insert_into_db(df0, 'shipping_data_0', conn)

    # Merge data shipping_data_1 and shipping_data_2 on 'shipment_identifier'
    merged_df = df1.merge(df2, on='shipment_identifier', how='left')
    # Assuming each row represents one product; quantity is thus 1 per product row
    merged_df['quantity'] = 1

    # Preparing data for insertion
    # Mapping 'origin_warehouse' and 'destination_store' from df2 to 'origin' and 'destination' in the shipment table
    merged_df.rename(columns={'origin_warehouse': 'origin', 'destination_store': 'destination'}, inplace=True)

    # Selecting and renaming relevant columns for the shipment table
    shipment_data = merged_df[['product', 'quantity', 'origin', 'destination']]
    shipment_data.rename(columns={'product': 'product_id'}, inplace=True)

    # Insert merged and processed data into database
    insert_into_db(shipment_data, 'shipment', conn)

    # Close the database connection
    conn.close()

if __name__ == '__main__':
    main()