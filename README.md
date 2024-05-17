
Wrote a a Python script which:

**Reads each row from the spreadsheets.**
**Extracts the relevant data.**
**Munges it into a format that fits the database schema.**
**Inserts the data into the database.**

Shipping_data 0 is self contained and can simply be inserted into the database, but shipping_datas 1 and 2 are dependent on one another. Shipping_data 1 contains a single product per row, you will need to combine each row based on its shipping identifier, determine the quantity of goods in the shipment, and add a new row to the database for each product in the shipment. The origin and destination for each shipment in shipping_data 1 are contained in shipping_data 2.
![ERD_task3](https://github.com/AbdullahiOlapojoye/Combining_walmart_shipping_data/assets/106112822/dec1816b-b1e5-456b-b044-867738c1d2c7)
![uml_diagram](https://github.com/AbdullahiOlapojoye/Combining_walmart_shipping_data/assets/106112822/652af7c1-fcf7-45fd-aa5a-f92b1db9e4fb)

