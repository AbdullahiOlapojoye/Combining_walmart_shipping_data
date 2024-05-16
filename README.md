
Wrote a a Python script which:

**Reads each row from the spreadsheets.**
**Extracts the relevant data.**
**Munges it into a format that fits the database schema.**
**Inserts the data into the database.**

Shipping_data 0 is self contained and can simply be inserted into the database, but shipping_datas 1 and 2 are dependent on one another. Shipping_data 1 contains a single product per row, you will need to combine each row based on its shipping identifier, determine the quantity of goods in the shipment, and add a new row to the database for each product in the shipment. The origin and destination for each shipment in shipping_data 1 are contained in shipping_data 2.
