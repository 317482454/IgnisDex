# IgnisDex
ignisDex-HebeBlock

1.Start transaction data
`cd admin`
`npm i`
`npm start`

2.Start Dex
`npm i`
`npm run dev`

3.Set up ignis trading pair：
At present, the attributes of the address setting of ARDOR-8ZZY-VCTC-ELQ2-8PQH7 are obtained, please replace it yourself：
`nxt?requestType=getAccountProperties&recipient=ARDOR-8ZZY-VCTC-ELQ2-8PQH7&setter=ARDOR-8ZZY-VCTC-ELQ2-8PQH7&firstIndex=0&lastIndex=100&chain=2`

4.Trading adds ignis trading pair：
Go to admin/routes, check the usdtDex() method, each add pair needs to add method，
Go to admin/routes/model/dex, you can see the object of usdt, other trading pairs, please add your own


This project is to participate in the development of ardor hackathon。

If you need to use it, please keep our name: hebeblock
